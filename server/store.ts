import { Recipe, SavedRecipe, SearchHistoryItem, ShoppingListItem, UserPreferences, UserProfile, RecipeRating } from '../src/types/recipe.js';
import { ALL_SEED_RECIPES } from './data/seed_recipes.js';
import { DEFAULT_PANTRY_BASICS } from './data/ingredients.js';

interface StoredUser extends UserProfile {
  passwordHash: string;
}

class AppStore {
  public recipes: Map<string, Recipe> = new Map();
  public users: Map<string, StoredUser> = new Map();
  public savedRecipes: Map<string, SavedRecipe> = new Map(); // key: `${userId}_${recipeId}`
  public searchHistory: SearchHistoryItem[] = [];
  public shoppingList: Map<string, ShoppingListItem> = new Map(); // key: id
  public recipeRatings: Map<string, RecipeRating> = new Map(); // key: `${userId}_${recipeId}`
  public userPreferences: Map<string, UserPreferences> = new Map(); // key: userId
  public generatedRecipes: Map<string, Recipe> = new Map();

  constructor() {
    // Populate seed recipes
    for (const r of ALL_SEED_RECIPES) {
      this.recipes.set(r.id, r);
    }

    // Create a default demo user for guest / instant login
    const demoUser: StoredUser = {
      id: 'demo-user-1',
      email: 'chef@pantrypilot.local',
      name: 'Pantry Explorer',
      isGuest: false,
      createdAt: new Date().toISOString(),
      passwordHash: 'demopassword'
    };
    this.users.set(demoUser.id, demoUser);

    this.userPreferences.set(demoUser.id, {
      id: 'pref-demo',
      userId: demoUser.id,
      dietaryPreference: 'Any',
      favoriteCuisines: ['Indian', 'Chinese-inspired', 'Italian'],
      defaultServings: 2,
      pantryBasics: [...DEFAULT_PANTRY_BASICS],
      dislikedIngredients: []
    });
  }

  // Recipes
  getRecipe(id: string): Recipe | undefined {
    return this.recipes.get(id) || this.generatedRecipes.get(id);
  }

  getAllRecipes(): Recipe[] {
    return [...this.recipes.values(), ...this.generatedRecipes.values()];
  }

  saveGeneratedRecipe(recipe: Recipe): void {
    this.generatedRecipes.set(recipe.id, recipe);
  }

  // Users & Auth
  createUser(email: string, name: string, passwordHash: string, isGuest: boolean = false): UserProfile {
    const id = 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const user: StoredUser = {
      id,
      email,
      name: name || (isGuest ? 'Guest Chef' : email.split('@')[0]),
      isGuest,
      createdAt: new Date().toISOString(),
      passwordHash
    };
    this.users.set(id, user);

    // Initialize default preferences
    this.userPreferences.set(id, {
      id: 'pref-' + id,
      userId: id,
      dietaryPreference: 'Any',
      favoriteCuisines: [],
      defaultServings: 2,
      pantryBasics: [...DEFAULT_PANTRY_BASICS],
      dislikedIngredients: []
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isGuest: user.isGuest,
      createdAt: user.createdAt
    };
  }

  getUserByEmail(email: string): StoredUser | undefined {
    for (const u of this.users.values()) {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        return u;
      }
    }
    return undefined;
  }

  getUserById(id: string): UserProfile | undefined {
    const u = this.users.get(id);
    if (!u) return undefined;
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      isGuest: u.isGuest,
      createdAt: u.createdAt
    };
  }

  // Saved Recipes
  saveRecipe(userId: string, recipeId: string, notes?: string): SavedRecipe | null {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) return null;
    const key = `${userId}_${recipeId}`;
    const saved: SavedRecipe = {
      id: 'saved-' + Date.now(),
      userId,
      recipeId,
      recipe,
      savedAt: new Date().toISOString(),
      notes
    };
    this.savedRecipes.set(key, saved);
    return saved;
  }

  removeSavedRecipe(userId: string, recipeId: string): boolean {
    const key = `${userId}_${recipeId}`;
    return this.savedRecipes.delete(key);
  }

  isRecipeSaved(userId: string, recipeId: string): boolean {
    return this.savedRecipes.has(`${userId}_${recipeId}`);
  }

  getUserSavedRecipes(userId: string): SavedRecipe[] {
    const list: SavedRecipe[] = [];
    for (const item of this.savedRecipes.values()) {
      if (item.userId === userId) {
        list.push(item);
      }
    }
    return list.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }

  // Search History
  addSearchHistory(userId: string, rawInput: string, extractedIngredients: any[], matchCount: number): SearchHistoryItem {
    const item: SearchHistoryItem = {
      id: 'search-' + Date.now(),
      userId,
      rawInput,
      extractedIngredients,
      matchCount,
      timestamp: new Date().toISOString()
    };
    this.searchHistory.unshift(item);
    // Keep top 100
    if (this.searchHistory.length > 100) {
      this.searchHistory.pop();
    }
    return item;
  }

  getUserSearchHistory(userId: string): SearchHistoryItem[] {
    return this.searchHistory.filter(h => h.userId === userId || userId === 'guest');
  }

  // Shopping List
  addShoppingListItem(userId: string, ingredientName: string, recipeName?: string, recipeId?: string, quantity?: string, unit?: string): ShoppingListItem {
    const id = 'shop-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const item: ShoppingListItem = {
      id,
      userId,
      ingredientName,
      recipeName,
      recipeId,
      quantity,
      unit,
      isPurchased: false,
      addedAt: new Date().toISOString()
    };
    this.shoppingList.set(id, item);
    return item;
  }

  getUserShoppingList(userId: string): ShoppingListItem[] {
    const list: ShoppingListItem[] = [];
    for (const item of this.shoppingList.values()) {
      if (item.userId === userId) {
        list.push(item);
      }
    }
    return list.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  }

  updateShoppingListItem(id: string, isPurchased: boolean): ShoppingListItem | null {
    const item = this.shoppingList.get(id);
    if (!item) return null;
    item.isPurchased = isPurchased;
    return item;
  }

  deleteShoppingListItem(id: string): boolean {
    return this.shoppingList.delete(id);
  }

  clearUserShoppingList(userId: string): void {
    for (const [id, item] of this.shoppingList.entries()) {
      if (item.userId === userId) {
        this.shoppingList.delete(id);
      }
    }
  }

  // Recipe Ratings
  rateRecipe(userId: string, recipeId: string, rating: number, review?: string): RecipeRating {
    const key = `${userId}_${recipeId}`;
    const item: RecipeRating = {
      id: 'rate-' + Date.now(),
      userId,
      recipeId,
      rating,
      review,
      createdAt: new Date().toISOString()
    };
    this.recipeRatings.set(key, item);

    // Update recipe aggregate rating
    const recipe = this.getRecipe(recipeId);
    if (recipe) {
      const allRatingsForRecipe = [...this.recipeRatings.values()].filter(r => r.recipeId === recipeId);
      const avg = allRatingsForRecipe.reduce((acc, r) => acc + r.rating, 0) / allRatingsForRecipe.length;
      recipe.rating = Math.round(avg * 10) / 10;
      recipe.ratingCount = allRatingsForRecipe.length;
    }

    return item;
  }

  getRecipeRating(userId: string, recipeId: string): RecipeRating | undefined {
    return this.recipeRatings.get(`${userId}_${recipeId}`);
  }

  // Preferences
  getUserPreferences(userId: string): UserPreferences {
    let pref = this.userPreferences.get(userId);
    if (!pref) {
      pref = {
        id: 'pref-' + userId,
        userId,
        dietaryPreference: 'Any',
        favoriteCuisines: [],
        defaultServings: 2,
        pantryBasics: [...DEFAULT_PANTRY_BASICS],
        dislikedIngredients: []
      };
      this.userPreferences.set(userId, pref);
    }
    return pref;
  }

  updateUserPreferences(userId: string, partial: Partial<UserPreferences>): UserPreferences {
    const current = this.getUserPreferences(userId);
    const updated = { ...current, ...partial, updatedAt: new Date().toISOString() };
    this.userPreferences.set(userId, updated);
    return updated;
  }
}

export const store = new AppStore();
