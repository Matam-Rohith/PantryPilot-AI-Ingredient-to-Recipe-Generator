export type Difficulty = 'Easy' | 'Medium' | 'Advanced';
export type Cuisine = 'Indian' | 'South Indian' | 'North Indian' | 'Chinese-inspired' | 'Italian' | 'Mexican-inspired' | 'American' | 'Mediterranean' | 'Asian' | 'Any';
export type Diet = 'Vegetarian' | 'Non-vegetarian' | 'Vegan' | 'Eggitarian' | 'Any';
export type RecipeCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Quick meals' | 'High-protein meals' | 'Dessert';

export interface ExtractedIngredient {
  name: string;
  normalizedName: string;
  quantity?: number;
  unit?: string;
  isPantryBasics?: boolean;
}

export interface RecipeIngredient {
  name: string;
  normalizedName: string;
  quantity?: number | string;
  unit?: string;
  isOptional?: boolean;
  isPantryBasics?: boolean;
  substitutions?: string[];
}

export interface RecipeVariation {
  spicy?: string;
  mild?: string;
  highProtein?: string;
  vegetarian?: string;
  quick?: string;
  budget?: string;
  [key: string]: string | undefined;
}

export interface SubstitutionGuide {
  original: string;
  substitute: string;
  note?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  cuisine: Cuisine;
  prep_time: number; // minutes
  cook_time: number; // minutes
  difficulty: Difficulty;
  servings: number;
  diet: Diet;
  ingredients: RecipeIngredient[];
  steps: string[];
  tags: string[];
  imageUrl: string;
  isLeftoverFriendly?: boolean;
  variations?: RecipeVariation;
  substitutions?: SubstitutionGuide[];
  source?: 'seed' | 'ai_generated';
  authorId?: string;
  createdAt?: string;
  rating?: number;
  ratingCount?: number;
}

export interface RecipeMatchResult {
  recipe: Recipe;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  missingOptionalIngredients: string[];
  pantryBasicsUsed: string[];
  substitutedIngredients: {
    original: string;
    substitute: string;
    note?: string;
  }[];
  canMakeNow: boolean;
  isAlmostThere: boolean;
  categorySection: 'CAN_MAKE_NOW' | 'ALMOST_THERE' | 'EXPLORE';
  rankingScore: number;
}

export interface FilterPreferences {
  maxTime?: number; // in minutes (15, 30, 60, etc.)
  difficulty?: Difficulty | 'Any';
  cuisine?: Cuisine | 'Any';
  diet?: Diet | 'Any';
  servings?: number;
  useOnlyMyIngredients?: boolean;
  leftoverMode?: boolean;
  searchQuery?: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  dietaryPreference: Diet;
  favoriteCuisines: string[];
  defaultServings: number;
  pantryBasics: string[];
  dislikedIngredients: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
  createdAt: string;
}

export interface SavedRecipe {
  id: string;
  userId: string;
  recipeId: string;
  recipe: Recipe;
  savedAt: string;
  notes?: string;
}

export interface SearchHistoryItem {
  id: string;
  userId: string;
  rawInput: string;
  extractedIngredients: ExtractedIngredient[];
  matchCount: number;
  timestamp: string;
}

export interface ShoppingListItem {
  id: string;
  userId: string;
  ingredientName: string;
  recipeName?: string;
  recipeId?: string;
  quantity?: string | number;
  unit?: string;
  isPurchased: boolean;
  addedAt: string;
}

export interface RecipeRating {
  id: string;
  recipeId: string;
  userId: string;
  rating: number; // 1-5
  review?: string;
  createdAt: string;
}
