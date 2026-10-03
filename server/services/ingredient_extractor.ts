import { GoogleGenAI, Type } from '@google/genai';
import { ExtractedIngredient } from '../../src/types/recipe.js';
import { CANONICAL_INGREDIENTS, isDefaultPantryStaple, normalizeIngredientName } from '../data/ingredients.js';

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

/**
 * Deterministic fallback parser for natural language ingredient strings.
 * Handles numbers, word numbers, common units, commas, "and", "some", "leftover", etc.
 */
export function deterministicExtractIngredients(input: string): ExtractedIngredient[] {
  if (!input || !input.trim()) return [];

  // Remove common phrases like "I have", "there are", "in my kitchen", "in my fridge"
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
    // Check quantity & unit
    // Match patterns like "2 eggs", "3 pieces of tomato", "500g chicken", "1 cup rice"
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

  // If no segments were cleanly split, scan for canonical ingredients mentioned
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
 * Extracts structured ingredients with zero latency:
 * Prioritizes instantaneous deterministic parsing for common ingredient inputs,
 * using Gemini 3.8 Flash for complex/colloquial phrasing with a graceful fallback.
 */
export async function extractIngredientsNLP(userInput: string): Promise<ExtractedIngredient[]> {
  const fallback = deterministicExtractIngredients(userInput);

  // If deterministic extraction cleanly parsed the ingredients, return immediately!
  // This provides instant (<1ms) response time and prevents timeout errors.
  if (fallback.length > 0) {
    return fallback;
  }

  const ai = getGeminiClient();
  if (!ai) {
    return fallback;
  }

  try {
    const prompt = `Extract all food ingredients mentioned by the user in this sentence: "${userInput}".
For each ingredient, identify the ingredient name, estimated quantity (as a number), and unit (e.g. piece, cup, gram, slice).
Only output the ingredients that are edible food items.`;

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'Single food ingredient name, e.g. egg, rice, tomato' },
                  quantity: { type: Type.NUMBER, description: 'Numeric count or amount' },
                  unit: { type: Type.STRING, description: 'Unit of measure, e.g. piece, cup, g, tbsp' }
                },
                required: ['name']
              }
            }
          },
          required: ['ingredients']
        }
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI extraction timeout')), 5000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const text = response.text?.trim();
    if (!text) return fallback;

    const parsed = JSON.parse(text);
    if (!parsed.ingredients || !Array.isArray(parsed.ingredients) || parsed.ingredients.length === 0) {
      return fallback;
    }

    const structured: ExtractedIngredient[] = [];
    const seen = new Set<string>();

    for (const item of parsed.ingredients) {
      if (!item.name) continue;
      const normalized = normalizeIngredientName(item.name);
      if (!seen.has(normalized)) {
        seen.add(normalized);
        structured.push({
          name: item.name,
          normalizedName: normalized,
          quantity: typeof item.quantity === 'number' ? item.quantity : 1,
          unit: item.unit || 'piece',
          isPantryBasics: isDefaultPantryStaple(normalized)
        });
      }
    }

    return structured.length > 0 ? structured : fallback;
  } catch (_err) {
    // Graceful fallback to deterministic parsing without noisy timeout logs
    return fallback;
  }
}
