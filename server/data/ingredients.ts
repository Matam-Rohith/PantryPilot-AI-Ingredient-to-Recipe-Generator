import { SubstitutionGuide } from '../../src/types/recipe.js';

export interface CanonicalIngredient {
  id: string;
  name: string;
  category: 'produce' | 'dairy' | 'protein' | 'grain' | 'spice' | 'condiment' | 'baking' | 'oil' | 'other';
  isPantryStaple: boolean;
  aliases: string[];
}

export const CANONICAL_INGREDIENTS: CanonicalIngredient[] = [
  // Grains & Staples
  { id: 'rice', name: 'rice', category: 'grain', isPantryStaple: false, aliases: ['cooked rice', 'leftover rice', 'white rice', 'basmati rice', 'brown rice', 'jasmine rice', 'steamed rice'] },
  { id: 'flour', name: 'flour', category: 'grain', isPantryStaple: true, aliases: ['wheat flour', 'atta', 'maida', 'all-purpose flour', 'all purpose flour', 'plain flour'] },
  { id: 'bread', name: 'bread', category: 'grain', isPantryStaple: false, aliases: ['bread slice', 'bread slices', 'sliced bread', 'stale bread', 'white bread', 'brown bread', 'toast'] },
  { id: 'pasta', name: 'pasta', category: 'grain', isPantryStaple: false, aliases: ['spaghetti', 'penne', 'macaroni', 'noodles', 'fusilli'] },
  { id: 'oats', name: 'oats', category: 'grain', isPantryStaple: false, aliases: ['rolled oats', 'quick oats', 'oatmeal'] },
  { id: 'lentils', name: 'lentils', category: 'grain', isPantryStaple: false, aliases: ['dal', 'daal', 'toor dal', 'moong dal', 'masoor dal', 'chana dal', 'yellow lentils', 'red lentils'] },
  { id: 'semolina', name: 'semolina', category: 'grain', isPantryStaple: false, aliases: ['sooji', 'suji', 'rava', 'sooji rava'] },
  { id: 'cornstarch', name: 'cornstarch', category: 'baking', isPantryStaple: true, aliases: ['corn starch', 'corn flour', 'cornflour'] },

  // Proteins & Dairy
  { id: 'egg', name: 'egg', category: 'protein', isPantryStaple: false, aliases: ['eggs', 'boiled egg', 'boiled eggs', 'egg whites', 'whole egg', 'whole eggs'] },
  { id: 'chicken', name: 'chicken', category: 'protein', isPantryStaple: false, aliases: ['chicken breast', 'chicken thighs', 'boneless chicken', 'cooked chicken', 'shredded chicken', 'chicken pieces', 'chicken mince'] },
  { id: 'paneer', name: 'paneer', category: 'dairy', isPantryStaple: false, aliases: ['cottage cheese', 'paneer cubes', 'indian cottage cheese'] },
  { id: 'tofu', name: 'tofu', category: 'protein', isPantryStaple: false, aliases: ['firm tofu', 'silken tofu', 'bean curd'] },
  { id: 'milk', name: 'milk', category: 'dairy', isPantryStaple: true, aliases: ['dairy milk', 'whole milk', 'skim milk', 'cow milk'] },
  { id: 'curd', name: 'curd', category: 'dairy', isPantryStaple: false, aliases: ['yogurt', 'plain yogurt', 'dahi', 'greek yogurt'] },
  { id: 'cheese', name: 'cheese', category: 'dairy', isPantryStaple: false, aliases: ['cheddar', 'mozzarella', 'parmesan', 'cheese cubes', 'grated cheese', 'processed cheese'] },
  { id: 'butter', name: 'butter', category: 'dairy', isPantryStaple: true, aliases: ['salted butter', 'unsalted butter', 'makkhan'] },
  { id: 'ghee', name: 'ghee', category: 'dairy', isPantryStaple: true, aliases: ['clarified butter', 'desi ghee'] },

  // Vegetables & Herbs
  { id: 'onion', name: 'onion', category: 'produce', isPantryStaple: false, aliases: ['onions', 'red onion', 'red onions', 'yellow onion', 'chopped onion', 'shallots'] },
  { id: 'tomato', name: 'tomato', category: 'produce', isPantryStaple: false, aliases: ['tomatoes', 'fresh tomato', 'red tomato', 'red tomatoes', 'cherry tomatoes', 'chopped tomatoes', 'tamatar'] },
  { id: 'potato', name: 'potato', category: 'produce', isPantryStaple: false, aliases: ['potatoes', 'boiled potato', 'boiled potatoes', 'aloo', 'baby potatoes'] },
  { id: 'green chilli', name: 'green chilli', category: 'produce', isPantryStaple: false, aliases: ['green chili', 'green chilies', 'green chillies', 'chillies', 'chilli', 'chili', 'hari mirch', 'green peppers'] },
  { id: 'garlic', name: 'garlic', category: 'produce', isPantryStaple: true, aliases: ['garlic cloves', 'garlic clove', 'crushed garlic', 'lehsun', 'minced garlic'] },
  { id: 'ginger', name: 'ginger', category: 'produce', isPantryStaple: true, aliases: ['fresh ginger', 'ginger root', 'adrak', 'grated ginger'] },
  { id: 'ginger-garlic paste', name: 'ginger-garlic paste', category: 'condiment', isPantryStaple: true, aliases: ['ginger garlic paste', 'adrak lehsun paste'] },
  { id: 'coriander', name: 'coriander', category: 'produce', isPantryStaple: false, aliases: ['cilantro', 'coriander leaves', 'fresh coriander', 'dhania', 'dhaniya', 'kothmir'] },
  { id: 'mint', name: 'mint', category: 'produce', isPantryStaple: false, aliases: ['mint leaves', 'pudina', 'fresh mint'] },
  { id: 'capsicum', name: 'capsicum', category: 'produce', isPantryStaple: false, aliases: ['bell pepper', 'bell peppers', 'green capsicum', 'green bell pepper', 'red capsicum', 'shimla mirch'] },
  { id: 'spring onion', name: 'spring onion', category: 'produce', isPantryStaple: false, aliases: ['spring onions', 'scallion', 'scallions', 'green onions', 'green onion'] },
  { id: 'carrot', name: 'carrot', category: 'produce', isPantryStaple: false, aliases: ['carrots', 'gajar', 'diced carrots'] },
  { id: 'peas', name: 'peas', category: 'produce', isPantryStaple: false, aliases: ['green peas', 'frozen peas', 'matar', 'mutter'] },
  { id: 'spinach', name: 'spinach', category: 'produce', isPantryStaple: false, aliases: ['palak', 'spinach leaves', 'baby spinach'] },
  { id: 'cabbage', name: 'cabbage', category: 'produce', isPantryStaple: false, aliases: ['patta gobhi', 'shredded cabbage'] },
  { id: 'cauliflower', name: 'cauliflower', category: 'produce', isPantryStaple: false, aliases: ['gobi', 'gobhi', 'cauliflower florets'] },
  { id: 'cucumber', name: 'cucumber', category: 'produce', isPantryStaple: false, aliases: ['kheera', 'cucumbers'] },
  { id: 'lemon', name: 'lemon', category: 'produce', isPantryStaple: false, aliases: ['lemons', 'lemon juice', 'lime', 'limes', 'nimbu'] },
  { id: 'curry leaves', name: 'curry leaves', category: 'produce', isPantryStaple: false, aliases: ['curry leaf', 'kadi patta', 'karivepaku'] },

  // Pantry Basics & Spices
  { id: 'oil', name: 'oil', category: 'oil', isPantryStaple: true, aliases: ['cooking oil', 'vegetable oil', 'sunflower oil', 'refined oil', 'mustard oil', 'olive oil'] },
  { id: 'salt', name: 'salt', category: 'spice', isPantryStaple: true, aliases: ['table salt', 'sea salt', 'namak'] },
  { id: 'black pepper', name: 'black pepper', category: 'spice', isPantryStaple: true, aliases: ['pepper', 'crushed pepper', 'black pepper powder', 'kali mirch'] },
  { id: 'turmeric', name: 'turmeric', category: 'spice', isPantryStaple: true, aliases: ['turmeric powder', 'haldi'] },
  { id: 'red chilli powder', name: 'red chilli powder', category: 'spice', isPantryStaple: true, aliases: ['chilli powder', 'red chili powder', 'lal mirch', 'paprika', 'cayenne'] },
  { id: 'cumin', name: 'cumin', category: 'spice', isPantryStaple: true, aliases: ['cumin seeds', 'jeera', 'cumin powder', 'roasted cumin'] },
  { id: 'mustard seeds', name: 'mustard seeds', category: 'spice', isPantryStaple: true, aliases: ['rai', 'sarson', 'black mustard seeds'] },
  { id: 'garam masala', name: 'garam masala', category: 'spice', isPantryStaple: true, aliases: ['all spice', 'curry powder'] },
  { id: 'coriander powder', name: 'coriander powder', category: 'spice', isPantryStaple: true, aliases: ['dhaniya powder', 'ground coriander'] },
  { id: 'sugar', name: 'sugar', category: 'spice', isPantryStaple: true, aliases: ['white sugar', 'brown sugar', 'cheeni'] },
  { id: 'water', name: 'water', category: 'other', isPantryStaple: true, aliases: ['warm water', 'tap water'] },

  // Condiments & Sauces
  { id: 'soy sauce', name: 'soy sauce', category: 'condiment', isPantryStaple: false, aliases: ['soya sauce', 'dark soy sauce', 'light soy sauce'] },
  { id: 'vinegar', name: 'vinegar', category: 'condiment', isPantryStaple: true, aliases: ['white vinegar', 'apple cider vinegar'] },
  { id: 'tomato ketchup', name: 'tomato ketchup', category: 'condiment', isPantryStaple: false, aliases: ['ketchup', 'tomato sauce'] },
  { id: 'chilli sauce', name: 'chilli sauce', category: 'condiment', isPantryStaple: false, aliases: ['hot sauce', 'sriracha', 'red chilli sauce', 'green chilli sauce'] },
  { id: 'mayonnaise', name: 'mayonnaise', category: 'condiment', isPantryStaple: false, aliases: ['mayo', 'eggless mayo'] },
  { id: 'biryani masala', name: 'biryani masala', category: 'spice', isPantryStaple: false, aliases: ['biryani spice', 'pulao masala'] },
  { id: 'maggi masala', name: 'maggi masala', category: 'spice', isPantryStaple: false, aliases: ['tastemaker', 'noodle masala', 'magic masala'] },
];

export const DEFAULT_PANTRY_BASICS = [
  'salt',
  'oil',
  'water',
  'black pepper',
  'sugar',
  'turmeric',
  'cumin',
  'red chilli powder',
];

// Curated substitutions dictionary
export const CURATED_SUBSTITUTIONS: Record<string, { substitute: string; note: string }[]> = {
  'soy sauce': [
    { substitute: 'salt', note: 'Use a pinch of salt plus a drop of vinegar or lime juice for savory depth' },
    { substitute: 'worcestershire sauce', note: 'Use equal parts with a drop of soy or water' }
  ],
  'butter': [
    { substitute: 'oil', note: 'Use equal volume of neutral cooking oil' },
    { substitute: 'ghee', note: 'Ghee adds aromatic richness similar to butter' }
  ],
  'ghee': [
    { substitute: 'butter', note: 'Melted butter works well in tempering' },
    { substitute: 'oil', note: 'Standard cooking oil works cleanly' }
  ],
  'coriander': [
    { substitute: 'mint', note: 'Fresh mint provides an aromatic herbal freshness' },
    { substitute: 'spring onion', note: 'Finely sliced spring onion greens offer a fresh punch' }
  ],
  'lemon': [
    { substitute: 'vinegar', note: 'Use 1/2 the amount of white vinegar for acidity' },
    { substitute: 'curd', note: 'A spoonful of whisked curd adds mild tartness to curries' }
  ],
  'curd': [
    { substitute: 'lemon', note: 'Milk plus a squeeze of lemon juice provides acidity' },
    { substitute: 'mayonnaise', note: 'For dressings and cold marinades' }
  ],
  'paneer': [
    { substitute: 'tofu', note: 'Pressed firm tofu absorbs flavors identically to paneer' },
    { substitute: 'potato', note: 'Boiled potato cubes mimic paneer texture in curries' }
  ],
  'ginger-garlic paste': [
    { substitute: 'garlic', note: 'Minced garlic with crushed black pepper or grated fresh ginger' }
  ],
  'spring onion': [
    { substitute: 'onion', note: 'Finely diced red or white onion gives crisp sweetness' }
  ],
  'capsicum': [
    { substitute: 'onion', note: 'Sliced crunchy onions add bulk and sweetness to stir-fries' },
    { substitute: 'cabbage', note: 'Shredded cabbage provides crunch and body' }
  ],
  'biryani masala': [
    { substitute: 'garam masala', note: 'Garam masala combined with cumin, coriander, and turmeric' }
  ],
  'cornstarch': [
    { substitute: 'flour', note: 'Whisk all-purpose flour into a slurry with cold water to thicken' }
  ],
  'cheese': [
    { substitute: 'paneer', note: 'Grated paneer seasoned with salt and pepper' }
  ],
  'tomato ketchup': [
    { substitute: 'tomato', note: 'Simmer chopped tomato with a pinch of sugar and salt' }
  ]
};

/**
 * Normalizes an ingredient name into its canonical lowercase singular form.
 */
export function normalizeIngredientName(rawName: string): string {
  if (!rawName) return '';
  let cleaned = rawName
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Remove common adjectives/noise
  cleaned = cleaned
    .replace(/\b(fresh|dry|dried|leftover|cooked|chopped|diced|sliced|grated|minced|crushed|raw|boiled|warm|cold)\b/g, '')
    .trim();

  // Check direct alias match
  for (const item of CANONICAL_INGREDIENTS) {
    if (item.name === cleaned || item.id === cleaned) return item.name;
    if (item.aliases.some(alias => alias === cleaned || alias.includes(cleaned) || cleaned.includes(alias))) {
      return item.name;
    }
  }

  // Singularize common plurals
  if (cleaned.endsWith('ies')) {
    const singular = cleaned.replace(/ies$/, 'y');
    for (const item of CANONICAL_INGREDIENTS) {
      if (item.name === singular || item.aliases.includes(singular)) return item.name;
    }
  }
  if (cleaned.endsWith('es') && !cleaned.endsWith('cheese')) {
    const singular = cleaned.replace(/es$/, '');
    for (const item of CANONICAL_INGREDIENTS) {
      if (item.name === singular || item.aliases.includes(singular)) return item.name;
    }
  }
  if (cleaned.endsWith('s') && !cleaned.endsWith('ss') && !cleaned.endsWith('peas')) {
    const singular = cleaned.replace(/s$/, '');
    for (const item of CANONICAL_INGREDIENTS) {
      if (item.name === singular || item.aliases.includes(singular)) return item.name;
    }
  }

  return cleaned;
}

export function isDefaultPantryStaple(normalizedName: string, userPantryBasics?: string[]): boolean {
  const basics = userPantryBasics || DEFAULT_PANTRY_BASICS;
  const canonical = normalizeIngredientName(normalizedName);
  return basics.includes(canonical);
}
