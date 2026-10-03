import { deterministicExtractIngredients } from '../server/services/ingredient_extractor.js';
import { matchRecipes } from '../server/services/matching_engine.js';
import { store } from '../server/store.js';
import { Recipe } from '../src/types/recipe.js';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('========================================================');
console.log('RUNNING PANTRYPILOT TEST SUITE');
console.log('========================================================\n');

// 1. INGREDIENT EXTRACTION TESTS
console.log('1. Test: Natural Language Ingredient Extraction');
{
  const input1 = "2 eggs and some leftover rice";
  const result1 = deterministicExtractIngredients(input1);
  const egg = result1.find(i => i.normalizedName === 'egg');
  const rice = result1.find(i => i.normalizedName === 'rice');

  assert(Boolean(egg && egg.quantity === 2), 'Extracts "2 eggs" -> quantity: 2, normalized: "egg"');
  assert(Boolean(rice && rice.normalizedName === 'rice'), 'Extracts "leftover rice" -> normalized: "rice"');

  const input2 = "There are three tomatoes, onion and potatoes in my kitchen";
  const result2 = deterministicExtractIngredients(input2);
  const tomato = result2.find(i => i.normalizedName === 'tomato');
  const onion = result2.find(i => i.normalizedName === 'onion');
  const potato = result2.find(i => i.normalizedName === 'potato');

  assert(Boolean(tomato && tomato.quantity === 3), 'Extracts "three tomatoes" -> quantity: 3, normalized: "tomato"');
  assert(Boolean(onion && potato), 'Extracts onion and potatoes cleanly');
}

// 2. RECIPE MATCHING TESTS
console.log('\n2. Test: Deterministic Recipe Matching Engine');
{
  const mockRecipes: Recipe[] = [
    {
      id: 'test-fried-rice',
      name: 'Egg Fried Rice',
      description: 'Test dish',
      category: 'Quick meals',
      cuisine: 'Chinese-inspired',
      prep_time: 5,
      cook_time: 10,
      difficulty: 'Easy',
      servings: 2,
      diet: 'Eggitarian',
      tags: [],
      imageUrl: '',
      ingredients: [
        { name: 'Rice', normalizedName: 'rice', quantity: 2, unit: 'cups' },
        { name: 'Egg', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
        { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
        { name: 'Oil', normalizedName: 'oil', isPantryBasics: true },
        { name: 'Salt', normalizedName: 'salt', isPantryBasics: true }
      ],
      steps: ['Cook it']
    },
    {
      id: 'test-biryani',
      name: 'Egg Biryani',
      description: 'Test biryani',
      category: 'Dinner',
      cuisine: 'Indian',
      prep_time: 10,
      cook_time: 25,
      difficulty: 'Medium',
      servings: 2,
      diet: 'Eggitarian',
      tags: [],
      imageUrl: '',
      ingredients: [
        { name: 'Rice', normalizedName: 'rice', quantity: 2, unit: 'cups' },
        { name: 'Egg', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
        { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
        { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'medium' },
        { name: 'Biryani Masala', normalizedName: 'biryani masala', quantity: 1, unit: 'tsp' },
        { name: 'Oil', normalizedName: 'oil', isPantryBasics: true },
        { name: 'Salt', normalizedName: 'salt', isPantryBasics: true }
      ],
      steps: ['Cook it']
    }
  ];

  // User has: rice, egg
  const matchResult = matchRecipes(mockRecipes, {
    userIngredients: ['rice', 'egg'],
    userPantryBasics: ['oil', 'salt', 'pepper', 'water']
  });

  const friedRiceMatch = matchResult.allMatches.find(m => m.recipe.id === 'test-fried-rice');
  assert(Boolean(friedRiceMatch), 'Finds matches containing user ingredients');
  assert(friedRiceMatch?.missingIngredients.includes('onion') === true, 'Accurately identifies missing ingredient (onion)');
  assert(friedRiceMatch?.matchPercentage === 80, 'Computes correct percentage match (4/5 including available pantry basics = 80%)');

  // User adds onion: now 100% can make
  const matchResult2 = matchRecipes(mockRecipes, {
    userIngredients: ['rice', 'egg', 'onion'],
    userPantryBasics: ['oil', 'salt']
  });
  const canMakeFriedRice = matchResult2.canMakeNow.find(m => m.recipe.id === 'test-fried-rice');
  assert(Boolean(canMakeFriedRice && canMakeFriedRice.matchPercentage === 100), 'Egg Fried Rice enters CAN_MAKE_NOW with 100% match');
  assert(canMakeFriedRice?.missingIngredients.length === 0, 'Zero missing core ingredients for 100% match');
}

// 3. RECIPE RANKING TESTS
console.log('\n3. Test: Recipe Ranking Logic');
{
  const mockRecipes: Recipe[] = [
    {
      id: 'full-match',
      name: '100% Dish',
      description: 'Full',
      category: 'Dinner',
      cuisine: 'Indian',
      prep_time: 5,
      cook_time: 10,
      difficulty: 'Easy',
      servings: 2,
      diet: 'Vegetarian',
      tags: [],
      imageUrl: '',
      ingredients: [
        { name: 'Rice', normalizedName: 'rice' },
        { name: 'Oil', normalizedName: 'oil', isPantryBasics: true }
      ],
      steps: []
    },
    {
      id: 'partial-match',
      name: 'Partial Dish',
      description: 'Partial',
      category: 'Dinner',
      cuisine: 'Indian',
      prep_time: 5,
      cook_time: 10,
      difficulty: 'Easy',
      servings: 2,
      diet: 'Vegetarian',
      tags: [],
      imageUrl: '',
      ingredients: [
        { name: 'Rice', normalizedName: 'rice' },
        { name: 'Paneer', normalizedName: 'paneer' },
        { name: 'Capsicum', normalizedName: 'capsicum' },
        { name: 'Oil', normalizedName: 'oil', isPantryBasics: true }
      ],
      steps: []
    }
  ];

  const ranked = matchRecipes(mockRecipes, {
    userIngredients: ['rice'],
    userPantryBasics: ['oil']
  });

  assert(ranked.allMatches[0].recipe.id === 'full-match', '100% match ranks higher than partial match');
}

// 4. USER DATA ISOLATION & SECURITY TESTS
console.log('\n4. Test: User Data Isolation & Security');
{
  const userA = store.createUser('userA@test.com', 'User A', 'passA');
  const userB = store.createUser('userB@test.com', 'User B', 'passB');

  store.saveRecipe(userA.id, 'egg-fried-rice');
  const savedA = store.getUserSavedRecipes(userA.id);
  const savedB = store.getUserSavedRecipes(userB.id);

  assert(savedA.length === 1, 'User A has 1 saved recipe');
  assert(savedB.length === 0, 'User B has 0 saved recipes (No cross-tenant leak)');

  store.addShoppingListItem(userA.id, 'Fresh Cream', 'Egg Fried Rice', 'egg-fried-rice');
  const shopA = store.getUserShoppingList(userA.id);
  const shopB = store.getUserShoppingList(userB.id);

  assert(shopA.length === 1, 'User A shopping list contains item');
  assert(shopB.length === 0, 'User B cannot see User A shopping list items');
}

// 5. END-TO-END FLOW VERIFICATION
console.log('\n5. Test: End-to-End User Flow');
{
  const rawInput = "I have rice, 2 eggs, onion and tomato";
  const extracted = deterministicExtractIngredients(rawInput);
  assert(extracted.length === 4, 'E2E: Extracted all 4 ingredients');

  const matches = matchRecipes(store.getAllRecipes(), {
    userIngredients: extracted.map(e => e.normalizedName),
    userPantryBasics: ['salt', 'oil', 'black pepper', 'water']
  });

  assert(matches.canMakeNow.length > 0, 'E2E: Found recipes that can be made right now');
  const topRecipe = matches.canMakeNow[0].recipe;
  assert(Boolean(topRecipe), `E2E: Selected recipe: "${topRecipe.name}"`);

  // Save recipe
  const testUser = store.createUser('e2e@test.com', 'E2E Chef', 'pass');
  const saved = store.saveRecipe(testUser.id, topRecipe.id);
  assert(Boolean(saved), 'E2E: Recipe saved to user bookmarks');

  // Add missing items from an almost-there recipe
  if (matches.almostThere.length > 0) {
    const almostRecipe = matches.almostThere[0];
    for (const missing of almostRecipe.missingIngredients) {
      store.addShoppingListItem(testUser.id, missing, almostRecipe.recipe.name, almostRecipe.recipe.id);
    }
    const list = store.getUserShoppingList(testUser.id);
    assert(list.length > 0, `E2E: Added ${list.length} missing ingredients to shopping list`);
  }
}

console.log('\n========================================================');
console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`);
console.log('========================================================\n');

if (failed > 0) {
  process.exit(1);
}
