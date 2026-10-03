import { GoogleGenAI, Type } from '@google/genai';
import { Cuisine, Difficulty, ExtractedIngredient, Recipe, RecipeIngredient } from '../../src/types/recipe.js';
import { CURATED_SUBSTITUTIONS, DEFAULT_PANTRY_BASICS, normalizeIngredientName } from '../data/ingredients.js';

let geminiAiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (geminiAiClient) return geminiAiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  try {
    geminiAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    return geminiAiClient;
  } catch (err) {
    console.error('Failed to initialize Gemini client:', err);
    return null;
  }
}

export interface GenerateRecipeOptions {
  userIngredients: ExtractedIngredient[];
  pantryBasics?: string[];
  preferredCuisine?: string;
  diet?: string;
  specialNotes?: string;
}

export async function generateCustomRecipe(options: GenerateRecipeOptions): Promise<Recipe> {
  const userIngredients = options.userIngredients || [];
  const pantryBasics = options.pantryBasics || DEFAULT_PANTRY_BASICS;
  const ingredientNames = userIngredients.map(i => `${i.quantity ? i.quantity + ' ' : ''}${i.unit ? i.unit + ' ' : ''}${i.name}`).join(', ');

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are an expert chef in PantryPilot. A home cook has only the following ingredients in their kitchen:
AVAILABLE INGREDIENTS: ${ingredientNames}
STANDARD PANTRY BASICS (Assumed available): ${pantryBasics.join(', ')}
${options.preferredCuisine && options.preferredCuisine !== 'Any' ? `PREFERRED CUISINE: ${options.preferredCuisine}` : ''}
${options.diet && options.diet !== 'Any' ? `DIET: ${options.diet}` : ''}
${options.specialNotes ? `ADDITIONAL PREFERENCES: ${options.specialNotes}` : ''}

CRITICAL RULES:
1. ONLY utilize the user's available ingredients and standard pantry basics for the core required ingredients.
2. DO NOT invent unavailable major ingredients (e.g. do not add chicken, shrimp, beef, paneer, or exotic spices unless the user explicitly provided them).
3. If an ingredient would enhance the dish but wasn't provided, mark it strictly as "isOptional: true".
4. Provide authentic, flavorful, realistic cooking steps.
5. Provide helpful variations and substitutions for missing ingredients.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: 'Creative, appetizing name of the dish' },
              description: { type: Type.STRING, description: 'One or two sentence mouth-watering description' },
              cuisine: { type: Type.STRING, description: 'Cuisine style, e.g. Indian, Chinese-inspired, Italian, American' },
              category: { type: Type.STRING, description: 'Meal category: Breakfast, Lunch, Dinner, Snacks, Quick meals, High-protein meals' },
              prep_time: { type: Type.NUMBER, description: 'Prep time in minutes' },
              cook_time: { type: Type.NUMBER, description: 'Cook time in minutes' },
              difficulty: { type: Type.STRING, description: 'Easy, Medium, or Advanced' },
              servings: { type: Type.NUMBER, description: 'Number of servings' },
              diet: { type: Type.STRING, description: 'Vegetarian, Non-vegetarian, Vegan, or Eggitarian' },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    quantity: { type: Type.STRING },
                    unit: { type: Type.STRING },
                    isOptional: { type: Type.BOOLEAN, description: 'True if optional or not in user ingredients' },
                    isPantryBasics: { type: Type.BOOLEAN }
                  },
                  required: ['name', 'isOptional']
                }
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              variations: {
                type: Type.OBJECT,
                properties: {
                  spicy: { type: Type.STRING },
                  mild: { type: Type.STRING },
                  highProtein: { type: Type.STRING },
                  quick: { type: Type.STRING }
                }
              },
              substitutions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    substitute: { type: Type.STRING },
                    note: { type: Type.STRING }
                  },
                  required: ['original', 'substitute']
                }
              }
            },
            required: ['name', 'description', 'prep_time', 'cook_time', 'difficulty', 'servings', 'ingredients', 'steps']
          }
        }
      });

      const text = response.text?.trim();
      if (text) {
        const parsed = JSON.parse(text);
        const recipeIngredients: RecipeIngredient[] = (parsed.ingredients || []).map((ing: any) => ({
          name: ing.name,
          normalizedName: normalizeIngredientName(ing.name),
          quantity: ing.quantity || 1,
          unit: ing.unit || 'unit',
          isOptional: Boolean(ing.isOptional),
          isPantryBasics: Boolean(ing.isPantryBasics)
        }));

        const id = 'ai-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

        return {
          id,
          name: parsed.name,
          description: parsed.description,
          category: parsed.category || 'Quick meals',
          cuisine: (parsed.cuisine as Cuisine) || 'Any',
          prep_time: parsed.prep_time || 5,
          cook_time: parsed.cook_time || 12,
          difficulty: (parsed.difficulty as Difficulty) || 'Easy',
          servings: parsed.servings || 2,
          diet: parsed.diet || 'Vegetarian',
          ingredients: recipeIngredients,
          steps: parsed.steps || ['Sauté ingredients', 'Simmer until tender', 'Serve warm.'],
          tags: ['AI Chef', 'Custom Made', parsed.category || 'Quick meals'],
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          source: 'ai_generated',
          variations: parsed.variations || {},
          substitutions: parsed.substitutions || [],
          createdAt: new Date().toISOString()
        };
      }
    } catch (err) {
      console.warn('Gemini recipe generation failed, using intelligent chef fallback:', err);
    }
  }

  // Deterministic Chef Fallback:
  const primaryNames = userIngredients.map(i => i.normalizedName);
  const mainTitle = primaryNames.slice(0, 3).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ') + ' Skillet Sauté';

  const ingredientsList: RecipeIngredient[] = userIngredients.map(item => ({
    name: item.name,
    normalizedName: item.normalizedName,
    quantity: item.quantity || 1,
    unit: item.unit || 'portion',
    isOptional: false,
    isPantryBasics: item.isPantryBasics
  }));

  // Add default staples
  ingredientsList.push(
    { name: 'Cooking Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
    { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
    { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.5, unit: 'tsp', isPantryBasics: true }
  );

  return {
    id: 'ai-' + Date.now(),
    name: mainTitle,
    description: `A fragrant homestyle stir-fry prepared directly with your ${ingredientNames}, seared over high heat for deep roasted flavor.`,
    category: 'Quick meals',
    cuisine: (options.preferredCuisine as Cuisine) || 'Any',
    prep_time: 5,
    cook_time: 12,
    difficulty: 'Easy',
    servings: 2,
    diet: userIngredients.some(i => i.normalizedName === 'chicken') ? 'Non-vegetarian' : (userIngredients.some(i => i.normalizedName === 'egg') ? 'Eggitarian' : 'Vegetarian'),
    ingredients: ingredientsList,
    steps: [
      `Clean, chop, and portion all available ingredients: ${ingredientNames}.`,
      `Heat 1.5 tbsp cooking oil in a wide heavy skillet over medium-high heat.`,
      `Add any aromatics first (like onions or chillies), sautéing for 2-3 minutes until golden.`,
      `Toss in remaining items, seasoning with salt and black pepper. Stir-fry for 6-8 minutes until tender and caramelized.`,
      `Check seasoning, remove from heat, and serve steaming hot.`
    ],
    tags: ['AI Chef', 'Custom Made', 'Quick meals'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    source: 'ai_generated',
    variations: {
      spicy: 'Add extra chopped green chillies or red pepper flakes.',
      quick: 'Cook over high heat wok-style in 7 minutes.'
    },
    substitutions: [
      { original: 'butter', substitute: 'oil', note: 'Provides clean cooking temperature' }
    ],
    createdAt: new Date().toISOString()
  };
}
