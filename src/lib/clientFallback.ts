import { ExtractedIngredient, FilterPreferences, Recipe, RecipeMatchResult } from '../types/recipe.js';
import { ALL_SEED_RECIPES } from '../../server/data/seed_recipes.js';
import { CANONICAL_INGREDIENTS, CURATED_SUBSTITUTIONS, DEFAULT_PANTRY_BASICS, isDefaultPantryStaple, normalizeIngredientName } from '../../server/data/ingredients.js';
import { matchRecipes } from '../../server/services/matching_engine.js';

/**
 * Pure client-side natural language parser that runs offline / in-browser
 * without any external AI SDK dependencies.
 */
export function clientExtractIngredients(input: string): ExtractedIngredient[] {
  if (!input || !input.trim()) return [];

  let cleaned = input
    .replace(/\b(i have|there are|i've got|we have|in my kitchen|in my fridge|in the pantry|only|some|a bit of|leftover|cooked|fresh|few|lots of|half a kilo of|kilo of|grams of|gm of|pieces of)\b/gi, ' ')
    .replace(/\s+and\s+/gi, ', ')
    .replace(/\s+with\s+/gi, ', ')
    .replace(/[+&;]/g, ', ');

  const segments = cleaned.split(',').map(s => s.trim()).filter(Boolean);
  const results: ExtractedIngredient[] = [];
  const seen = new Set<string>();

  const wordNumbers: Record<string, number> = {
    one: 1, a: 1, an: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
    half: 0.5, quarter: 0.25
  };

  for (const seg of segments) {
    const match = seg.match(/^(\d+(?:\.\d+)?|\b(?:one|two|three|four|five|half|a|an)\b)?\s*(cups?|tbsp|tsp|pieces?|pcs?|kg|g|grams?|cloves?|slices?|stalks?)?\s*(.*)$/i);

    let quantity: number | undefined;
    let unit: string | undefined;
    let rawName = seg;

    if (match) {
      const qStr = match[1]?.toLowerCase();
      if (qStr) {
        if (wordNumbers[qStr] !== undefined) {
          quantity = wordNumbers[qStr];
        } else {
          const num = parseFloat(qStr);
          if (!isNaN(num)) quantity = num;
        }
      }
      if (match[2]) {
        unit = match[2].toLowerCase();
      }
      if (match[3] && match[3].trim()) {
        rawName = match[3].trim();
      }
    }

    const norm = normalizeIngredientName(rawName);
    if (norm && !seen.has(norm)) {
      seen.add(norm);
      results.push({
        name: rawName,
        normalizedName: norm,
        quantity: quantity || 1,
        unit: unit || 'piece',
        isPantryBasics: isDefaultPantryStaple(norm),
      });
    }
  }

  if (results.length === 0) {
    const lower = input.toLowerCase();
    for (const item of CANONICAL_INGREDIENTS) {
      if (lower.includes(item.name) || item.aliases.some(a => lower.includes(a))) {
        if (!seen.has(item.name)) {
          seen.add(item.name);
          results.push({
            name: item.name,
            normalizedName: item.name,
            quantity: 1,
            unit: 'piece',
            isPantryBasics: item.isPantryStaple
          });
        }
      }
    }
  }

  return results;
}

/**
 * Pure client-side recipe matching fallback
 */
export function clientMatchRecipes(
  ingredients: string[],
  pantryBasics: string[],
  filters: FilterPreferences,
  rawQuery?: string
): {
  allMatches: RecipeMatchResult[];
  canMakeNow: RecipeMatchResult[];
  almostThere: RecipeMatchResult[];
  explore: RecipeMatchResult[];
  exactRecipeMatch?: RecipeMatchResult;
} {
  return matchRecipes(ALL_SEED_RECIPES, {
    userIngredients: ingredients,
    userPantryBasics: pantryBasics,
    filters,
    rawQuery
  });
}

/**
 * Pure client-side creative recipe generator fallback
 */
export function clientGenerateRecipe(
  userIngredients: ExtractedIngredient[],
  pantryBasics: string[],
  preferredCuisine?: string,
  diet?: string
): Recipe {
  const ingredientNames = userIngredients.map(i => `${i.quantity ? i.quantity + ' ' : ''}${i.unit ? i.unit + ' ' : ''}${i.name}`).join(', ');
  const primaryNames = userIngredients.map(i => i.normalizedName);
  const mainTitle = primaryNames.slice(0, 3).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ') + ' Skillet Sauté';

  const ingredientsList = userIngredients.map(item => ({
    name: item.name,
    normalizedName: item.normalizedName,
    quantity: item.quantity || 1,
    unit: item.unit || 'portion',
    isOptional: false,
    isPantryBasics: item.isPantryBasics
  }));

  ingredientsList.push(
    { name: 'Cooking Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true, isOptional: false },
    { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true, isOptional: false },
    { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.5, unit: 'tsp', isPantryBasics: true, isOptional: false }
  );

  return {
    id: 'ai-' + Date.now(),
    name: mainTitle,
    description: `A fragrant skillet meal prepared directly with your ${ingredientNames}, cooked to tender perfection.`,
    category: 'Quick meals',
    cuisine: (preferredCuisine as any) || 'Any',
    prep_time: 5,
    cook_time: 12,
    difficulty: 'Easy',
    servings: 2,
    diet: userIngredients.some(i => i.normalizedName === 'chicken') ? 'Non-vegetarian' : (userIngredients.some(i => i.normalizedName === 'egg') ? 'Eggitarian' : 'Vegetarian'),
    ingredients: ingredientsList,
    steps: [
      `Clean and slice your ingredients: ${ingredientNames}.`,
      `Heat 1.5 tbsp cooking oil in a wide skillet over medium-high flame.`,
      `Sauté aromatics (onions, chillies, garlic) for 2 minutes until fragrant.`,
      `Toss in remaining items, seasoning with salt and pepper. Stir-fry for 6-8 minutes until tender and caramelized.`,
      `Serve hot and enjoy immediately.`
    ],
    tags: ['AI Chef', 'Custom Made', 'Quick meals'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    source: 'ai_generated',
    variations: {
      spicy: 'Add extra chopped green chillies or red pepper flakes.',
      quick: 'Cook over high heat wok-style in 7 minutes.'
    },
    createdAt: new Date().toISOString()
  };
}
