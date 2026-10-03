import { FilterPreferences, Recipe, RecipeMatchResult } from '../../src/types/recipe.js';
import { CURATED_SUBSTITUTIONS, DEFAULT_PANTRY_BASICS, normalizeIngredientName } from '../data/ingredients.js';

export interface MatchingOptions {
  userIngredients: string[]; // Normalized names
  userPantryBasics?: string[]; // Normalized names
  filters?: FilterPreferences;
}

export function matchRecipes(recipes: Recipe[], options: MatchingOptions): {
  allMatches: RecipeMatchResult[];
  canMakeNow: RecipeMatchResult[];
  almostThere: RecipeMatchResult[];
  explore: RecipeMatchResult[];
} {
  const userIngredients = (options.userIngredients || []).map(normalizeIngredientName);
  const userPantryBasics = (options.userPantryBasics || DEFAULT_PANTRY_BASICS).map(normalizeIngredientName);
  const filters = options.filters || {};

  // Set of all available items (user ingredients + pantry basics)
  const userInventorySet = new Set<string>([...userIngredients, ...userPantryBasics]);
  const userIngredientSet = new Set<string>(userIngredients);

  const matchedResults: RecipeMatchResult[] = [];

  for (const recipe of recipes) {
    // 1. Filter checks (diet, cuisine, maxTime, difficulty, servings)
    if (filters.diet && filters.diet !== 'Any') {
      if (filters.diet === 'Vegetarian' && (recipe.diet === 'Non-vegetarian' || recipe.diet === 'Eggitarian')) {
        continue;
      }
      if (filters.diet === 'Vegan' && recipe.diet !== 'Vegan') {
        continue;
      }
      if (filters.diet === 'Eggitarian' && recipe.diet === 'Non-vegetarian') {
        continue;
      }
      if (filters.diet === 'Non-vegetarian' && recipe.diet !== 'Non-vegetarian') {
        // usually non-veg eaters can eat veg too, but if strictly filtered:
        // we allow all or filter strictly based on preference
      }
    }

    if (filters.cuisine && filters.cuisine !== 'Any' && recipe.cuisine !== filters.cuisine) {
      continue;
    }

    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
    if (filters.maxTime && totalTime > filters.maxTime) {
      continue;
    }

    if (filters.difficulty && filters.difficulty !== 'Any' && recipe.difficulty !== filters.difficulty) {
      continue;
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchName = recipe.name.toLowerCase().includes(q);
      const matchDesc = recipe.description.toLowerCase().includes(q);
      const matchTag = recipe.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag) {
        continue;
      }
    }

    // 2. Evaluate ingredients
    const matchedIngredients: string[] = [];
    const missingIngredients: string[] = [];
    const missingOptionalIngredients: string[] = [];
    const pantryBasicsUsed: string[] = [];
    const substitutedIngredients: { original: string; substitute: string; note?: string }[] = [];

    let totalRequiredCount = 0;
    let matchedRequiredCount = 0;

    for (const ing of recipe.ingredients) {
      const normIng = normalizeIngredientName(ing.normalizedName || ing.name);

      // Is it optional?
      if (ing.isOptional) {
        if (userIngredientSet.has(normIng)) {
          matchedIngredients.push(normIng);
        } else if (userPantryBasics.includes(normIng)) {
          pantryBasicsUsed.push(normIng);
        } else {
          missingOptionalIngredients.push(normIng);
        }
        continue;
      }

      // It is required
      totalRequiredCount++;

      // Check if user explicitly provided this ingredient
      if (userIngredientSet.has(normIng)) {
        matchedIngredients.push(normIng);
        matchedRequiredCount++;
        continue;
      }

      // Check if it is a pantry staple marked as available
      if (userPantryBasics.includes(normIng) || ing.isPantryBasics) {
        pantryBasicsUsed.push(normIng);
        matchedRequiredCount++;
        continue;
      }

      // Check if user has a valid substitution for this ingredient
      const subs = CURATED_SUBSTITUTIONS[normIng];
      let substituted = false;
      if (subs && subs.length > 0) {
        for (const sub of subs) {
          const normSub = normalizeIngredientName(sub.substitute);
          if (userInventorySet.has(normSub)) {
            substitutedIngredients.push({
              original: ing.name,
              substitute: sub.substitute,
              note: sub.note
            });
            matchedRequiredCount++;
            substituted = true;
            break;
          }
        }
      }

      if (!substituted) {
        missingIngredients.push(normIng);
      }
    }

    // Match percentage calculation
    const matchPercentage = totalRequiredCount > 0
      ? Math.round((matchedRequiredCount / totalRequiredCount) * 100)
      : 100;

    // Must use at least one ingredient the user actually listed (unless user didn't enter any ingredients)
    const usesAtLeastOneUserIngredient = userIngredients.length === 0 || matchedIngredients.length > 0;
    if (!usesAtLeastOneUserIngredient && matchPercentage < 100) {
      continue;
    }

    // Determine category
    const canMakeNow = missingIngredients.length === 0;
    const isAlmostThere = !canMakeNow && (missingIngredients.length <= 2 || matchPercentage >= 65);

    let categorySection: 'CAN_MAKE_NOW' | 'ALMOST_THERE' | 'EXPLORE';
    if (canMakeNow) {
      categorySection = 'CAN_MAKE_NOW';
    } else if (isAlmostThere) {
      categorySection = 'ALMOST_THERE';
    } else {
      categorySection = 'EXPLORE';
    }

    // Strict filter: "Use only my ingredients"
    if (filters.useOnlyMyIngredients && !canMakeNow) {
      continue;
    }

    // Ranking score calculation:
    // matchPercentage (weight: 100)
    // -25 per missing required ingredient
    // +15 per user ingredient utilized
    // +20 if leftover friendly and leftover mode active
    // +10 for quick cooking time (< 15 mins)
    // +5 for easy difficulty
    let rankingScore = matchPercentage;
    rankingScore -= missingIngredients.length * 25;
    rankingScore += matchedIngredients.length * 15;

    if (filters.leftoverMode && recipe.isLeftoverFriendly) {
      rankingScore += 25;
    }
    if (totalTime <= 15) {
      rankingScore += 10;
    } else if (totalTime <= 30) {
      rankingScore += 5;
    }
    if (recipe.difficulty === 'Easy') {
      rankingScore += 5;
    }

    matchedResults.push({
      recipe,
      matchPercentage,
      matchedIngredients,
      missingIngredients,
      missingOptionalIngredients,
      pantryBasicsUsed,
      substitutedIngredients,
      canMakeNow,
      isAlmostThere,
      categorySection,
      rankingScore
    });
  }

  // Sort descending by rankingScore
  matchedResults.sort((a, b) => {
    // 100% matches always rank higher than non-100% matches
    if (a.canMakeNow !== b.canMakeNow) {
      return a.canMakeNow ? -1 : 1;
    }
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    if (a.missingIngredients.length !== b.missingIngredients.length) {
      return a.missingIngredients.length - b.missingIngredients.length;
    }
    return b.rankingScore - a.rankingScore;
  });

  const canMakeNow = matchedResults.filter(r => r.categorySection === 'CAN_MAKE_NOW');
  const almostThere = matchedResults.filter(r => r.categorySection === 'ALMOST_THERE');
  const explore = matchedResults.filter(r => r.categorySection === 'EXPLORE');

  return {
    allMatches: matchedResults,
    canMakeNow,
    almostThere,
    explore
  };
}
