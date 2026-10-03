import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { store } from './server/store.js';
import { extractIngredientsNLP } from './server/services/ingredient_extractor.js';
import { matchRecipes } from './server/services/matching_engine.js';
import { generateCustomRecipe } from './server/services/ai_recipe_generator.js';
import { CANONICAL_INGREDIENTS, CURATED_SUBSTITUTIONS, DEFAULT_PANTRY_BASICS } from './server/data/ingredients.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Helper to extract or fallback userId from headers
function getUserId(req: Request): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  const customId = req.headers['x-user-id'] as string;
  if (customId) return customId;
  return 'demo-user-1'; // fallback default session
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Extract ingredients from natural language
app.post('/api/ingredients/extract', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text input is required' });
      return;
    }
    const extracted = await extractIngredientsNLP(text);
    res.json({
      rawText: text,
      ingredients: extracted
    });
  } catch (err: any) {
    console.error('Error in /api/ingredients/extract:', err);
    res.status(500).json({ error: 'Failed to extract ingredients', details: err.message });
  }
});

// 2. Match recipes based on user ingredients & pantry basics
app.post('/api/recipes/match', (req: Request, res: Response) => {
  try {
    const { ingredients = [], pantryBasics, filters = {} } = req.body;
    const userId = getUserId(req);

    // If pantryBasics not supplied in body, load from user preferences
    const activePantryBasics = pantryBasics || store.getUserPreferences(userId).pantryBasics;

    // Run deterministic matching engine across all recipes (seed + generated)
    const allRecipes = store.getAllRecipes();
    const matchResult = matchRecipes(allRecipes, {
      userIngredients: ingredients,
      userPantryBasics: activePantryBasics,
      filters
    });

    // Record in search history if ingredients were provided
    if (ingredients.length > 0) {
      const rawText = ingredients.join(', ');
      store.addSearchHistory(
        userId,
        rawText,
        ingredients.map((name: string) => ({ name, normalizedName: name })),
        matchResult.allMatches.length
      );
    }

    res.json({
      totalMatches: matchResult.allMatches.length,
      canMakeNow: matchResult.canMakeNow,
      almostThere: matchResult.almostThere,
      explore: matchResult.explore,
      allMatches: matchResult.allMatches
    });
  } catch (err: any) {
    console.error('Error in /api/recipes/match:', err);
    res.status(500).json({ error: 'Failed to match recipes', details: err.message });
  }
});

// 3. AI Recipe Generation ("Create a Recipe")
app.post('/api/recipes/generate', async (req: Request, res: Response) => {
  try {
    const { userIngredients = [], pantryBasics, preferredCuisine, diet, specialNotes } = req.body;
    const userId = getUserId(req);

    const activePantryBasics = pantryBasics || store.getUserPreferences(userId).pantryBasics;

    const recipe = await generateCustomRecipe({
      userIngredients,
      pantryBasics: activePantryBasics,
      preferredCuisine,
      diet,
      specialNotes
    });

    recipe.authorId = userId;
    store.saveGeneratedRecipe(recipe);

    res.json({
      recipe,
      message: 'Recipe generated successfully'
    });
  } catch (err: any) {
    console.error('Error in /api/recipes/generate:', err);
    res.status(500).json({ error: 'Failed to generate recipe', details: err.message });
  }
});

// 4. Get recipe by ID
app.get('/api/recipes/:id', (req: Request, res: Response) => {
  const recipe = store.getRecipe(req.params.id);
  if (!recipe) {
    res.status(404).json({ error: 'Recipe not found' });
    return;
  }
  const userId = getUserId(req);
  const isSaved = store.isRecipeSaved(userId, recipe.id);
  const userRating = store.getRecipeRating(userId, recipe.id);

  res.json({
    recipe,
    isSaved,
    userRating: userRating?.rating || null
  });
});

// 5. Get all recipes catalog
app.get('/api/recipes', (req: Request, res: Response) => {
  const { category, cuisine, diet, search } = req.query;
  let list = store.getAllRecipes();

  if (category) {
    list = list.filter(r => r.category.toLowerCase() === (category as string).toLowerCase());
  }
  if (cuisine) {
    list = list.filter(r => r.cuisine.toLowerCase() === (cuisine as string).toLowerCase());
  }
  if (diet) {
    list = list.filter(r => r.diet.toLowerCase() === (diet as string).toLowerCase());
  }
  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(r => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
  }

  res.json({
    recipes: list,
    total: list.length
  });
});

// 6. Save recipe (Bookmark)
app.post('/api/recipes/:id/save', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { notes } = req.body;
  const saved = store.saveRecipe(userId, req.params.id, notes);
  if (!saved) {
    res.status(404).json({ error: 'Recipe not found' });
    return;
  }
  res.json({ success: true, savedRecipe: saved });
});

// 7. Remove saved recipe
app.delete('/api/recipes/:id/save', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const success = store.removeSavedRecipe(userId, req.params.id);
  res.json({ success });
});

// 8. Get user's saved recipes
app.get('/api/saved-recipes', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const list = store.getUserSavedRecipes(userId);
  res.json({ savedRecipes: list });
});

// 9. Get search history
app.get('/api/history', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const history = store.getUserSearchHistory(userId);
  res.json({ history });
});

// 10. Shopping list
app.get('/api/shopping-list', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const items = store.getUserShoppingList(userId);
  res.json({ items });
});

app.post('/api/shopping-list', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { items, ingredientName, recipeName, recipeId, quantity, unit } = req.body;

  // Support both bulk addition (e.g. "Add Missing Ingredients") and single addition
  if (Array.isArray(items)) {
    const added = items.map((it: any) =>
      store.addShoppingListItem(userId, it.name || it.ingredientName, it.recipeName, it.recipeId, it.quantity, it.unit)
    );
    res.json({ success: true, count: added.length, items: added });
    return;
  }

  if (!ingredientName) {
    res.status(400).json({ error: 'ingredientName is required' });
    return;
  }

  const newItem = store.addShoppingListItem(userId, ingredientName, recipeName, recipeId, quantity, unit);
  res.json({ success: true, item: newItem });
});

app.patch('/api/shopping-list/:id', (req: Request, res: Response) => {
  const { isPurchased } = req.body;
  const updated = store.updateShoppingListItem(req.params.id, Boolean(isPurchased));
  if (!updated) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  res.json({ success: true, item: updated });
});

app.delete('/api/shopping-list/:id', (req: Request, res: Response) => {
  const success = store.deleteShoppingListItem(req.params.id);
  res.json({ success });
});

app.delete('/api/shopping-list', (req: Request, res: Response) => {
  const userId = getUserId(req);
  store.clearUserShoppingList(userId);
  res.json({ success: true });
});

// 11. Rate a recipe
app.post('/api/recipes/:id/rate', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { rating, review } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    res.status(400).json({ error: 'Rating must be between 1 and 5' });
    return;
  }
  const result = store.rateRecipe(userId, req.params.id, rating, review);
  res.json({ success: true, rating: result });
});

// 12. Substitutions catalogue
app.get('/api/substitutions', (_req: Request, res: Response) => {
  res.json({ substitutions: CURATED_SUBSTITUTIONS });
});

// 13. Canonical ingredients & pantry basics
app.get('/api/ingredients/canonical', (_req: Request, res: Response) => {
  res.json({
    ingredients: CANONICAL_INGREDIENTS,
    defaultPantryBasics: DEFAULT_PANTRY_BASICS
  });
});

// 14. User Preferences & Pantry Basics
app.get('/api/user/preferences', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const prefs = store.getUserPreferences(userId);
  res.json({ preferences: prefs });
});

app.post('/api/user/preferences', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const updated = store.updateUserPreferences(userId, req.body);
  res.json({ preferences: updated });
});

// 15. Authentication (Register, Login, Guest, Me)
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }
  const existing = store.getUserByEmail(email);
  if (existing) {
    res.status(400).json({ error: 'User with this email already exists' });
    return;
  }
  const user = store.createUser(email, name, password, false);
  res.json({ user, token: user.id });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = store.getUserByEmail(email);
  if (!user || user.passwordHash !== password) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }
  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isGuest: user.isGuest,
      createdAt: user.createdAt
    },
    token: user.id
  });
});

app.post('/api/auth/guest', (_req: Request, res: Response) => {
  const guestUser = store.createUser(`guest-${Date.now()}@pantrypilot.local`, 'Guest Chef', 'guest', true);
  res.json({ user: guestUser, token: guestUser.id });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const user = store.getUserById(userId);
  if (!user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.json({ user });
});

// 16. Dashboard stats
app.get('/api/dashboard/stats', (req: Request, res: Response) => {
  const userId = getUserId(req);
  const saved = store.getUserSavedRecipes(userId);
  const history = store.getUserSearchHistory(userId);
  const prefs = store.getUserPreferences(userId);
  const shopping = store.getUserShoppingList(userId);

  // Compute recently used ingredients
  const ingredientFrequency: Record<string, number> = {};
  for (const h of history) {
    for (const ing of h.extractedIngredients) {
      const name = ing.normalizedName || ing.name;
      ingredientFrequency[name] = (ingredientFrequency[name] || 0) + 1;
    }
  }

  const topIngredients = Object.entries(ingredientFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  res.json({
    savedCount: saved.length,
    searchesCount: history.length,
    shoppingCount: shopping.filter(s => !s.isPurchased).length,
    topIngredients,
    favoriteCuisines: prefs.favoriteCuisines,
    recentSaved: saved.slice(0, 4),
    recentHistory: history.slice(0, 5)
  });
});

// ==========================================
// VITE MIDDLEWARE (DEV) & STATIC FILES (PROD)
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PantryPilot server listening on port ${PORT}`);
  });
}

startServer();
