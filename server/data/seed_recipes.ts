import { Recipe } from '../../src/types/recipe.js';

export const SEED_RECIPES: Recipe[] = [
  // 1. Egg Fried Rice
  {
    id: 'egg-fried-rice',
    name: 'Egg Fried Rice',
    description: 'Quick wok-tossed leftover rice with scrambled eggs, sweet caramelized onions, and crisp seasoning.',
    category: 'Quick meals',
    cuisine: 'Chinese-inspired',
    prep_time: 5,
    cook_time: 10,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Eggitarian',
    isLeftoverFriendly: true,
    tags: ['Quick', 'High-Protein', 'Leftover Rice', 'Wok'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Rice (cooked/leftover)', normalizedName: 'rice', quantity: 2, unit: 'cups' },
      { name: 'Eggs', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Cooking Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Soy Sauce', normalizedName: 'soy sauce', quantity: 1, unit: 'tbsp', isOptional: true },
      { name: 'Spring Onion', normalizedName: 'spring onion', quantity: 2, unit: 'stalks', isOptional: true },
      { name: 'Garlic', normalizedName: 'garlic', quantity: 2, unit: 'cloves', isOptional: true }
    ],
    steps: [
      'Heat oil in a wide wok or non-stick skillet over medium-high flame.',
      'Add finely sliced onions (and minced garlic if using). Sauté for 2 minutes until translucent.',
      'Push the onions to one side of the pan. Crack the eggs directly into the empty space and scramble vigorously for 60 seconds.',
      'Add the chilled cooked rice, breaking up any clumps with a spatula.',
      'Sprinkle salt, freshly cracked black pepper (and a dash of soy sauce if available). Toss vigorously over high heat for 3 minutes.',
      'Garnish with sliced spring onions or coriander and serve steaming hot.'
    ],
    variations: {
      spicy: 'Add 1 sliced green chilli or a dash of red chilli flakes during onion sautéing.',
      highProtein: 'Increase to 4 eggs or fold in 50g pan-seared paneer or shredded chicken.',
      vegetarian: 'Replace eggs with 100g crumbled tofu or diced paneer sautéed with turmeric.',
      quick: 'Use a high-heat wok blast in 5 minutes flat with leftover chilled rice.',
      budget: 'Stick to core rice, eggs, oil, and salt.'
    },
    substitutions: [
      { original: 'soy sauce', substitute: 'salt + drop of vinegar or lime juice', note: 'Provides balanced savory acidity' },
      { original: 'spring onion', substitute: 'onion greens or fresh coriander', note: 'Lends crisp herbal aroma' }
    ]
  },

  // 2. Egg Tomato Rice
  {
    id: 'egg-tomato-rice',
    name: 'Egg Tomato Rice',
    description: 'Tangy and savory skillet rice with juicy spiced tomatoes and fluffy soft scrambled eggs.',
    category: 'Lunch',
    cuisine: 'South Indian',
    prep_time: 5,
    cook_time: 12,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Eggitarian',
    isLeftoverFriendly: true,
    tags: ['Comfort Food', 'Tangy', 'One-Pan'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Rice (cooked)', normalizedName: 'rice', quantity: 2, unit: 'cups' },
      { name: 'Eggs', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 2, unit: 'medium' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece', isOptional: true },
      { name: 'Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Chop onions and tomatoes finely. Whisk eggs in a bowl with a pinch of salt.',
      'Heat oil in a pan. Sauté onions and green chilli until golden brown.',
      'Add chopped tomatoes, turmeric, and salt. Cook down for 4 minutes until the tomatoes soften into a jammy sauce.',
      'Pour in the beaten eggs and stir gently to create soft curds within the tomato masala.',
      'Fold in the cooked rice gently, mixing until every grain is coated in the warm tomato-egg masala.',
      'Cook for 2 more minutes on low heat, then remove from stove and enjoy.'
    ],
    variations: {
      spicy: 'Add 1/2 tsp red chilli powder and an extra slit green chilli.',
      mild: 'Remove green chilli and add a tiny pinch of sugar to balance the tomato tang.',
      budget: 'Great way to repurpose day-old rice and very ripe tomatoes.'
    }
  },

  // 3. Egg Biryani (Quick Homestyle)
  {
    id: 'egg-biryani',
    name: 'Homestyle Spiced Egg Biryani',
    description: 'Fragrant basmati rice layered with pan-roasted eggs, caramelized onions, and warming whole spices.',
    category: 'Dinner',
    cuisine: 'Indian',
    prep_time: 10,
    cook_time: 20,
    difficulty: 'Medium',
    servings: 2,
    diet: 'Eggitarian',
    isLeftoverFriendly: true,
    tags: ['Aromatic', 'Spiced', 'Dinner Party'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Rice', normalizedName: 'rice', quantity: 1.5, unit: 'cups' },
      { name: 'Boiled Eggs', normalizedName: 'egg', quantity: 3, unit: 'pieces' },
      { name: 'Onion', normalizedName: 'onion', quantity: 2, unit: 'large' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'medium' },
      { name: 'Biryani Masala', normalizedName: 'biryani masala', quantity: 1.5, unit: 'tsp', isOptional: true },
      { name: 'Coriander', normalizedName: 'coriander', quantity: 2, unit: 'tbsp', isOptional: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Red Chilli Powder', normalizedName: 'red chilli powder', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Cooking Oil or Ghee', normalizedName: 'oil', quantity: 2, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 1, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Slit boiled eggs gently. Shallow fry in 1/2 tsp oil with a pinch of turmeric and chilli powder for 2 minutes until golden blistered. Set aside.',
      'In the same pan, fry thinly sliced onions on medium heat until deep golden brown (birista style).',
      'Add chopped tomato, biryani masala (or garam masala), turmeric, and salt. Cook until tomatoes are mushy.',
      'Layer cooked rice over the masala base, nestle the blistered eggs on top, and sprinkle fresh coriander.',
      'Cover with a tight lid and let steam (dum) on the lowest heat for 5 minutes before gently fluffing.'
    ],
    variations: {
      quick: 'Mix everything directly into hot cooked rice without slow dum.',
      highProtein: 'Add an extra 2 boiled eggs or boiled lentils.'
    },
    substitutions: [
      { original: 'biryani masala', substitute: 'garam masala + cumin powder', note: 'Provides warm aromatic spice profile' },
      { original: 'coriander', substitute: 'fresh mint leaves', note: 'Provides authentic biryani fragrance' }
    ]
  },

  // 4. Classic Masala Egg Bhurji
  {
    id: 'egg-bhurji',
    name: 'Street-Style Masala Egg Bhurji',
    description: 'Indian style scrambled eggs cooked with diced onions, juicy tomatoes, ginger, and bold green chillies.',
    category: 'Breakfast',
    cuisine: 'North Indian',
    prep_time: 5,
    cook_time: 8,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Eggitarian',
    isLeftoverFriendly: false,
    tags: ['High-Protein', 'Breakfast', 'Quick', 'Street Food'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Eggs', normalizedName: 'egg', quantity: 3, unit: 'pieces' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'medium' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece' },
      { name: 'Oil or Butter', normalizedName: 'oil', quantity: 1, unit: 'tbsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Coriander', normalizedName: 'coriander', quantity: 1, unit: 'tbsp', isOptional: true }
    ],
    steps: [
      'Finely dice onion, tomato, and green chilli.',
      'Heat oil or butter in a pan over medium heat. Sauté onions and green chillies until light brown.',
      'Add diced tomatoes, turmeric, and salt. Sauté for 3 minutes until tomatoes soften.',
      'Crack the eggs directly into the pan. Stir continuously over medium heat for 2-3 minutes until soft curds form.',
      'Do not overcook to keep the eggs tender. Garnish with coriander and serve hot with bread, roti, or rice.'
    ],
    variations: {
      spicy: 'Add extra chopped green chillies and a pinch of black pepper.',
      cheese: 'Grate 2 tbsp cheese or paneer over the hot bhurji right before serving.'
    }
  },

  // 5. Classic Egg Omelette
  {
    id: 'classic-omelette',
    name: 'Golden Herb & Onion Omelette',
    description: 'Fluffy golden two-egg omelette folded with sweet diced onions and green chilli.',
    category: 'Breakfast',
    cuisine: 'American',
    prep_time: 3,
    cook_time: 5,
    difficulty: 'Easy',
    servings: 1,
    diet: 'Eggitarian',
    tags: ['Under 15 Mins', 'Keto', 'Protein'],
    imageUrl: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Eggs', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
      { name: 'Onion', normalizedName: 'onion', quantity: 0.5, unit: 'piece', isOptional: true },
      { name: 'Cooking Oil or Butter', normalizedName: 'oil', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.25, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Beat eggs in a bowl with salt and black pepper until frothy.',
      'Melt butter or heat oil in an 8-inch non-stick skillet over medium-low heat.',
      'Pour the beaten eggs into the pan. Tilt pan so egg coats the surface evenly.',
      'Sprinkle finely diced onions on top. As edges set, gently lift with a spatula and let uncooked egg run underneath.',
      'When almost set on top, fold omelette in half and slide onto a plate.'
    ],
    variations: {
      cheese: 'Sprinkle grated cheese before folding.',
      spicy: 'Add minced green chillies and a dash of turmeric.'
    }
  },

  // 6. Jeera Rice (Cumin Rice)
  {
    id: 'jeera-rice',
    name: 'Fragrant Ghee Jeera Rice',
    description: 'Aromatic basmati rice tempered with golden roasted cumin seeds and aromatic ghee or oil.',
    category: 'Lunch',
    cuisine: 'North Indian',
    prep_time: 5,
    cook_time: 15,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    isLeftoverFriendly: true,
    tags: ['Aromatic', 'Pantry Staple', 'Side Dish'],
    imageUrl: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Rice', normalizedName: 'rice', quantity: 1, unit: 'cup' },
      { name: 'Cumin', normalizedName: 'cumin', quantity: 1, unit: 'tbsp', isPantryBasics: true },
      { name: 'Oil or Ghee', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Water', normalizedName: 'water', quantity: 2, unit: 'cups', isPantryBasics: true },
      { name: 'Coriander', normalizedName: 'coriander', quantity: 1, unit: 'tbsp', isOptional: true }
    ],
    steps: [
      'Rinse rice until water runs clear. Drain well.',
      'Heat oil or ghee in a pot over medium heat. Add cumin seeds and let them sizzle for 30 seconds until nutty and golden.',
      'Add rice and sauté for 1 minute to coat grains with cumin oil.',
      'Pour in water and salt. Bring to a rapid rolling boil, then lower heat, cover tightly, and simmer for 12 minutes.',
      'Turn off heat, let rest for 5 minutes, then fluff gently with a fork and garnish with coriander.'
    ],
    variations: {
      leftover: 'If using pre-cooked leftover rice, simply sizzle cumin in oil and toss the cold rice directly for 3 minutes.'
    }
  },

  // 7. Tomato Onion Rasam Rice
  {
    id: 'tomato-rasam-rice',
    name: 'Soothing Tomato Pepper Rice',
    description: 'South Indian comfort bowl combining tart crushed tomatoes, black pepper, cumin, and warm rice.',
    category: 'Lunch',
    cuisine: 'South Indian',
    prep_time: 5,
    cook_time: 15,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegan',
    tags: ['Comfort Food', 'Immunity', 'Quick'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Rice', normalizedName: 'rice', quantity: 1, unit: 'cup' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 2, unit: 'large' },
      { name: 'Garlic', normalizedName: 'garlic', quantity: 3, unit: 'cloves', isOptional: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Cumin', normalizedName: 'cumin', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Oil', normalizedName: 'oil', quantity: 1, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 1, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Crush black pepper and cumin coarsely with a mortar or knife blade.',
      'Roughly mash the tomatoes with hands or a fork with turmeric and salt in a bowl.',
      'Heat oil in a pan. Add crushed garlic, pepper, and cumin. Let sizzle for 20 seconds.',
      'Pour in the mashed tomato liquid plus 1 cup of water. Simmer on medium-low for 8 minutes until frothy.',
      'Pour hot over cooked rice and mix into a comforting soothing porridge.'
    ],
    variations: {
      spicy: 'Add 1 dried red chilli or green chilli during tempering.'
    }
  },

  // 8. Crispy Aloo Fry (Spiced Potato Stir-Fry)
  {
    id: 'aloo-fry',
    name: 'Crispy Spiced Potato Fry',
    description: 'Golden, crispy-edged potato cubes tossed with cumin, turmeric, and fiery red chilli powder.',
    category: 'Lunch',
    cuisine: 'Indian',
    prep_time: 5,
    cook_time: 15,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegan',
    tags: ['Crispy', 'Comfort Food', 'Side Dish', 'Pantry Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Potatoes', normalizedName: 'potato', quantity: 2, unit: 'large' },
      { name: 'Cooking Oil', normalizedName: 'oil', quantity: 2, unit: 'tbsp', isPantryBasics: true },
      { name: 'Cumin', normalizedName: 'cumin', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Red Chilli Powder', normalizedName: 'red chilli powder', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Peel and cut potatoes into uniform 1/2-inch cubes. Pat dry with a towel to remove excess starch.',
      'Heat oil in a heavy-bottomed skillet over medium heat. Sizzle cumin seeds until aromatic.',
      'Add potato cubes and turmeric. Toss so all potatoes are evenly coated in oil.',
      'Spread potatoes into a single layer. Cook undisturbed for 4 minutes until bottoms turn golden and crispy.',
      'Flip and stir occasionally for another 8-10 minutes until tender inside and crusty outside.',
      'Sprinkle salt and red chilli powder in the last 2 minutes, toss well, and serve hot.'
    ],
    variations: {
      leftover: 'Uses leftover boiled potatoes to cut cooking time down to 6 minutes.',
      garlic: 'Toss in 3 crushed garlic cloves for fragrant garlic aloo.'
    }
  },

  // 9. Aloo Pyaz Bhujia (Potato Onion Sauté)
  {
    id: 'aloo-pyaz-bhujia',
    name: 'Aloo Pyaz Homestyle Bhujia',
    description: 'Thin batons of potato and sliced onions pan-seared with turmeric and green chillies.',
    category: 'Dinner',
    cuisine: 'North Indian',
    prep_time: 5,
    cook_time: 14,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegan',
    tags: ['Quick Dinner', 'Homestyle', 'Budget'],
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Potato', normalizedName: 'potato', quantity: 2, unit: 'medium' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'large' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 2, unit: 'pieces' },
      { name: 'Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Slice potatoes into thin matchsticks and slice onions lengthwise.',
      'Heat oil in a wok. Add slit green chillies and potatoes first. Sauté on medium-high for 5 minutes.',
      'Add sliced onions and turmeric powder. Mix well.',
      'Cook uncovered on medium heat, stirring every 2 minutes so onions caramelize and potatoes turn golden.',
      'Finish with salt, stir well for 1 minute, and serve with roti or warm rice.'
    ],
    variations: {
      crisp: 'Cook on slightly higher flame in a cast iron skillet.'
    }
  },

  // 10. Bread Upma (Leftover Bread Stir-Fry)
  {
    id: 'bread-upma',
    name: 'Tangy Masala Bread Upma',
    description: 'Crisp toasted bread cubes tossed with tempered onions, mustard seeds, tomatoes, and curry leaves.',
    category: 'Snacks',
    cuisine: 'South Indian',
    prep_time: 5,
    cook_time: 10,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    isLeftoverFriendly: true,
    tags: ['Leftover Bread', 'Teatime Snack', 'Quick', 'Savory'],
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Bread Slices', normalizedName: 'bread', quantity: 4, unit: 'slices' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'medium' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece' },
      { name: 'Cooking Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Coriander', normalizedName: 'coriander', quantity: 1, unit: 'tbsp', isOptional: true }
    ],
    steps: [
      'Cut bread slices into bite-sized cubes. Optionally toast them in a dry pan for 2 minutes to keep them crispy.',
      'Heat oil in a pan. Sauté chopped onions and green chilli until translucent.',
      'Add chopped tomato, turmeric, and salt. Cook until tomato turns soft and glossy.',
      'Sprinkle 2 tablespoons of water to create a moist masala sauce.',
      'Tumble in the bread cubes. Toss quickly so every bread piece absorbs the spiced masala without becoming soggy.',
      'Remove from heat immediately, garnish with chopped coriander, and serve.'
    ],
    variations: {
      egg: 'Scramble an egg right before tossing in the bread for a protein boost.'
    }
  },

  // 11. Paneer Bhurji
  {
    id: 'paneer-bhurji',
    name: 'Spiced Paneer Bhurji',
    description: 'Crumbled soft cottage cheese sautéed with finely chopped onions, tomatoes, and warm spices.',
    category: 'Dinner',
    cuisine: 'North Indian',
    prep_time: 5,
    cook_time: 10,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    tags: ['High-Protein', 'Keto', 'Quick Meal'],
    imageUrl: 'https://images.unsplash.com/photo-1567184109411-b28f21ee097a?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Paneer', normalizedName: 'paneer', quantity: 200, unit: 'grams' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'medium' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece' },
      { name: 'Oil or Butter', normalizedName: 'oil', quantity: 1, unit: 'tbsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Red Chilli Powder', normalizedName: 'red chilli powder', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.5, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Crumble fresh paneer with your fingers into irregular bite-sized crumbles.',
      'Heat butter or oil in a pan over medium flame. Sauté chopped onions and green chillies until lightly browned.',
      'Add tomatoes, turmeric, red chilli powder, and salt. Cook for 3 minutes until tomatoes break down.',
      'Add crumbled paneer. Toss gently for 2-3 minutes on medium-low heat. Do not overcook to keep paneer tender.',
      'Serve warm with roti, toast, or rice.'
    ],
    substitutions: [
      { original: 'paneer', substitute: 'firm tofu', note: 'Crumbled tofu cooks identically for a vegan option' }
    ]
  },

  // 12. Quick Tomato Egg Drop Soup
  {
    id: 'tomato-egg-drop-soup',
    name: 'Silky Tomato Egg Drop Soup',
    description: 'Warming Chinese-style soup made with ripe simmering tomatoes, savory broth, and silky egg ribbons.',
    category: 'Snacks',
    cuisine: 'Chinese-inspired',
    prep_time: 5,
    cook_time: 8,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Eggitarian',
    tags: ['Soup', 'Immunity', 'Under 15 Mins', 'Low-Calorie'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Eggs', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 2, unit: 'medium' },
      { name: 'Water', normalizedName: 'water', quantity: 3, unit: 'cups', isPantryBasics: true },
      { name: 'Oil', normalizedName: 'oil', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Soy Sauce', normalizedName: 'soy sauce', quantity: 1, unit: 'tsp', isOptional: true },
      { name: 'Cornstarch', normalizedName: 'cornstarch', quantity: 1, unit: 'tbsp', isOptional: true }
    ],
    steps: [
      'Chop tomatoes into bite-sized wedges. Beat eggs with a fork in a cup.',
      'Heat oil in a pot. Sauté tomatoes for 2 minutes until juices release.',
      'Pour in water, salt, black pepper, and soy sauce. Bring to a gentle boil for 4 minutes.',
      'If using cornstarch, mix with 2 tbsp cold water and stir in to slightly thicken the broth.',
      'Slowly drizzle the beaten eggs in a thin stream while gently swirling the soup in one direction to create silky egg ribbons.',
      'Turn off heat immediately and ladle into bowls.'
    ]
  },

  // 13. Garlic Butter Pasta
  {
    id: 'garlic-butter-pasta',
    name: 'Silky Garlic Butter Pasta',
    description: 'Pasta tossed in golden fragrant browned butter, slivered garlic, and freshly cracked black pepper.',
    category: 'Dinner',
    cuisine: 'Italian',
    prep_time: 2,
    cook_time: 12,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    tags: ['Pasta', 'Comfort', 'Quick', 'Italian'],
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Pasta', normalizedName: 'pasta', quantity: 200, unit: 'grams' },
      { name: 'Garlic', normalizedName: 'garlic', quantity: 4, unit: 'cloves' },
      { name: 'Butter', normalizedName: 'butter', quantity: 2, unit: 'tbsp', isPantryBasics: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Cheese', normalizedName: 'cheese', quantity: 2, unit: 'tbsp', isOptional: true }
    ],
    steps: [
      'Boil pasta in salted water until al dente. Reserve 1/2 cup pasta cooking water before draining.',
      'Melt butter with a drop of oil in a skillet over low heat. Add sliced garlic and cook gently for 2 minutes until pale golden and fragrant.',
      'Add freshly cracked pepper and 3 tbsp reserved pasta water to emulsify the butter into a glossy sauce.',
      'Add drained hot pasta directly into the garlic butter and toss vigorously for 1 minute.',
      'Garnish with grated cheese if available and serve immediately.'
    ]
  },

  // 14. Classic Chicken Stir-Fry
  {
    id: 'chicken-stir-fry',
    name: 'Wok Chicken & Onion Stir-Fry',
    description: 'Tender chicken strips flash-fried with onions, garlic, and cracked pepper in a savory glaze.',
    category: 'High-protein meals',
    cuisine: 'Chinese-inspired',
    prep_time: 10,
    cook_time: 8,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Non-vegetarian',
    tags: ['High-Protein', 'Wok', 'Quick'],
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Chicken', normalizedName: 'chicken', quantity: 250, unit: 'grams' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'large' },
      { name: 'Garlic', normalizedName: 'garlic', quantity: 3, unit: 'cloves' },
      { name: 'Cooking Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Soy Sauce', normalizedName: 'soy sauce', quantity: 1, unit: 'tbsp', isOptional: true },
      { name: 'Capsicum', normalizedName: 'capsicum', quantity: 1, unit: 'medium', isOptional: true }
    ],
    steps: [
      'Slice chicken into thin strips and toss with a pinch of salt and pepper.',
      'Heat oil in a wok or pan over high flame until smoking.',
      'Add chicken in a single layer and sear without moving for 2 minutes. Stir-fry for 2 more minutes until cooked through.',
      'Toss in sliced onions, minced garlic, and capsicum. Stir-fry on high heat for 2 minutes to keep vegetables crisp.',
      'Drizzle soy sauce around the rim of the pan, season with black pepper, and serve hot over rice.'
    ]
  },

  // 15. Chicken Curry (Homestyle)
  {
    id: 'homestyle-chicken-curry',
    name: 'Homestyle Spiced Chicken Curry',
    description: 'Tender chicken pieces simmered in a rich tomato, onion, garlic, and ginger gravy.',
    category: 'Dinner',
    cuisine: 'Indian',
    prep_time: 10,
    cook_time: 25,
    difficulty: 'Medium',
    servings: 3,
    diet: 'Non-vegetarian',
    tags: ['Rich', 'Dinner', 'High-Protein', 'Curry'],
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Chicken', normalizedName: 'chicken', quantity: 400, unit: 'grams' },
      { name: 'Onion', normalizedName: 'onion', quantity: 2, unit: 'medium' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 2, unit: 'medium' },
      { name: 'Ginger-Garlic Paste', normalizedName: 'ginger-garlic paste', quantity: 1, unit: 'tbsp' },
      { name: 'Cooking Oil', normalizedName: 'oil', quantity: 2, unit: 'tbsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Red Chilli Powder', normalizedName: 'red chilli powder', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Water', normalizedName: 'water', quantity: 1, unit: 'cup', isPantryBasics: true }
    ],
    steps: [
      'Heat oil in a heavy pot. Add finely diced onions and fry over medium heat until deep caramelized golden.',
      'Add ginger-garlic paste and sauté for 1 minute until fragrant.',
      'Add pureed or finely diced tomatoes, turmeric, chilli powder, and salt. Cook until oil separates from the masala.',
      'Add chicken pieces and bhunao (sear) on medium-high heat for 5 minutes, coating well with masala.',
      'Pour in water, cover pot with lid, and simmer on low heat for 15 minutes until chicken is tender and gravy is luscious.'
    ]
  },

  // 16. Onion Tomato Toast
  {
    id: 'onion-tomato-toast',
    name: 'Bombay Masala Onion Tomato Toast',
    description: 'Crispy toasted bread topped with a quick warm sauté of juicy spiced tomatoes, onions, and black pepper.',
    category: 'Breakfast',
    cuisine: 'Indian',
    prep_time: 4,
    cook_time: 6,
    difficulty: 'Easy',
    servings: 1,
    diet: 'Vegetarian',
    isLeftoverFriendly: true,
    tags: ['Breakfast', 'Toast', '10 Mins'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Bread', normalizedName: 'bread', quantity: 2, unit: 'slices' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'medium' },
      { name: 'Onion', normalizedName: 'onion', quantity: 0.5, unit: 'piece' },
      { name: 'Butter or Oil', normalizedName: 'oil', quantity: 1, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.25, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Toast bread slices in a pan with butter or oil until golden and crunchy on both sides.',
      'In the same pan, quickly sauté finely diced onions and tomatoes with salt and pepper for 2 minutes until glossy and warm.',
      'Spoon the spiced mixture generously over the crunchy toast and serve hot.'
    ]
  },

  // 17. Tomato Onion Uttapam
  {
    id: 'tomato-onion-uttapam',
    name: 'Crispy Tomato Onion Uttapam',
    description: 'Thick, fluffy savory pancake studded with caramelized onions, juicy tomatoes, and green chillies.',
    category: 'Breakfast',
    cuisine: 'South Indian',
    prep_time: 5,
    cook_time: 8,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    tags: ['South Indian', 'Breakfast', 'Pancake'],
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Semolina or Batter', normalizedName: 'semolina', quantity: 1, unit: 'cup' },
      { name: 'Curd', normalizedName: 'curd', quantity: 0.5, unit: 'cup' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'medium' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece' },
      { name: 'Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Water', normalizedName: 'water', quantity: 0.5, unit: 'cup', isPantryBasics: true }
    ],
    steps: [
      'Mix semolina (sooji), curd, salt, and water into a thick pourable batter. Rest for 5 minutes.',
      'Finely dice onion, tomato, and green chilli and mix together in a small bowl.',
      'Heat a greased non-stick skillet over medium flame. Pour a thick ladle of batter without spreading too thin.',
      'Immediately press a handful of the onion-tomato mix into the wet surface.',
      'Drizzle oil around the edges. Cover and cook for 3 minutes until bottom is golden and crisp.',
      'Flip gently and cook for 2 minutes to caramelize the onions and tomatoes.'
    ]
  },

  // 18. Curd Rice (Comfort Bowl)
  {
    id: 'curd-rice',
    name: 'Tempered South Indian Curd Rice',
    description: 'Cooling, soothing mashed rice blended with creamy curd, tempered with mustard seeds and green chillies.',
    category: 'Lunch',
    cuisine: 'South Indian',
    prep_time: 5,
    cook_time: 5,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    isLeftoverFriendly: true,
    tags: ['Soothing', 'Gut-Friendly', 'Leftover Rice', 'Classic'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Cooked Rice', normalizedName: 'rice', quantity: 2, unit: 'cups' },
      { name: 'Curd (Yogurt)', normalizedName: 'curd', quantity: 1.5, unit: 'cups' },
      { name: 'Mustard Seeds', normalizedName: 'mustard seeds', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece' },
      { name: 'Ginger', normalizedName: 'ginger', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Oil', normalizedName: 'oil', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Mash soft cooked rice lightly with a spatula while warm, then let cool.',
      'Mix in whisked curd and salt until smooth and creamy. Add a splash of water or milk if too thick.',
      'Heat oil in a small ladle or pan. Add mustard seeds and let them crackle.',
      'Add minced ginger and finely chopped green chilli. Fry for 20 seconds.',
      'Pour hot tempering over the curd rice, stir gently, and serve cool.'
    ]
  },

  // 19. French Toast (Sweet or Savory)
  {
    id: 'classic-french-toast',
    name: 'Golden Custard French Toast',
    description: 'Thick bread soaked in an egg and milk batter, griddled in butter until golden brown with crisp edges.',
    category: 'Breakfast',
    cuisine: 'American',
    prep_time: 4,
    cook_time: 6,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Eggitarian',
    isLeftoverFriendly: true,
    tags: ['Breakfast', 'Comfort', 'Weekend'],
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-0045e43a129d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Bread', normalizedName: 'bread', quantity: 4, unit: 'slices' },
      { name: 'Eggs', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
      { name: 'Milk', normalizedName: 'milk', quantity: 0.25, unit: 'cup' },
      { name: 'Sugar', normalizedName: 'sugar', quantity: 1, unit: 'tbsp', isPantryBasics: true },
      { name: 'Butter', normalizedName: 'butter', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 1, unit: 'pinch', isPantryBasics: true }
    ],
    steps: [
      'Whisk eggs, milk, sugar, and a pinch of salt together in a shallow dish.',
      'Heat butter in a skillet over medium heat.',
      'Dip bread slices into the egg mixture for 15 seconds per side until saturated but not falling apart.',
      'Place in the hot skillet and cook for 2-3 minutes per side until golden brown and puffed.',
      'Serve warm with a dusting of sugar or honey.'
    ]
  },

  // 20. Crispy Onion Pakora (Kanda Bhaji)
  {
    id: 'crispy-onion-pakora',
    name: 'Crispy Street-Style Onion Pakoras',
    description: 'Crunchy golden onion fritters seasoned with green chillies, turmeric, and cumin.',
    category: 'Snacks',
    cuisine: 'Indian',
    prep_time: 5,
    cook_time: 10,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegan',
    tags: ['Tea Snack', 'Rainy Day', 'Crispy', 'Street Food'],
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Onions', normalizedName: 'onion', quantity: 2, unit: 'large' },
      { name: 'Flour (Gram or All-Purpose)', normalizedName: 'flour', quantity: 0.75, unit: 'cup' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece' },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.25, unit: 'tsp', isPantryBasics: true },
      { name: 'Red Chilli Powder', normalizedName: 'red chilli powder', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Cooking Oil', normalizedName: 'oil', quantity: 1, unit: 'cup', isPantryBasics: true }
    ],
    steps: [
      'Thinly slice onions and toss with salt in a bowl. Squeeze firmly with your hands to release onion juices.',
      'Add chopped green chilli, turmeric, and chilli powder.',
      'Sprinkle flour gradually over the wet onions, coating them lightly without adding extra water.',
      'Heat oil in a deep pan. Drop small loose clusters of coated onions into hot oil.',
      'Fry on medium heat for 4-5 minutes until deep golden and crackly crisp. Drain on paper towels and serve.'
    ]
  },

  // 21. Masala Khichdi (Lentils + Rice Comfort Pot)
  {
    id: 'masala-khichdi',
    name: 'One-Pot Masala Dal Khichdi',
    description: 'Wholesome, nourishing one-pot porridge of rice and lentils simmered with cumin and turmeric.',
    category: 'Dinner',
    cuisine: 'Indian',
    prep_time: 5,
    cook_time: 20,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    tags: ['One-Pot', 'Comfort Food', 'Healthy', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Rice', normalizedName: 'rice', quantity: 0.75, unit: 'cup' },
      { name: 'Lentils', normalizedName: 'lentils', quantity: 0.5, unit: 'cup' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'small', isOptional: true },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 1, unit: 'small', isOptional: true },
      { name: 'Cumin', normalizedName: 'cumin', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Turmeric', normalizedName: 'turmeric', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Ghee or Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Water', normalizedName: 'water', quantity: 4, unit: 'cups', isPantryBasics: true }
    ],
    steps: [
      'Wash rice and lentils together until water runs clear.',
      'Heat ghee or oil in a pot or pressure cooker. Sauté cumin seeds, onions, and tomatoes until aromatic.',
      'Add turmeric, salt, drained rice, lentils, and 4 cups of water.',
      'Cover and simmer for 18-20 minutes (or 3-4 whistles in pressure cooker) until velvety and tender.',
      'Drizzle extra ghee on top and serve with curd or pickle.'
    ]
  },

  // 22. Shakshuka (Eggs Poached in Spiced Tomato Pepper Sauce)
  {
    id: 'easy-shakshuka',
    name: 'Skillet North African Shakshuka',
    description: 'Gently poached runny eggs nestled in a simmered sauce of spiced crushed tomatoes, onions, and cumin.',
    category: 'Breakfast',
    cuisine: 'Mediterranean',
    prep_time: 5,
    cook_time: 15,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Eggitarian',
    tags: ['Brunch', 'One-Pan', 'Mediterranean', 'Keto'],
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Eggs', normalizedName: 'egg', quantity: 3, unit: 'pieces' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 3, unit: 'large' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Garlic', normalizedName: 'garlic', quantity: 2, unit: 'cloves' },
      { name: 'Oil', normalizedName: 'oil', quantity: 1.5, unit: 'tbsp', isPantryBasics: true },
      { name: 'Cumin', normalizedName: 'cumin', quantity: 1, unit: 'tsp', isPantryBasics: true },
      { name: 'Red Chilli Powder', normalizedName: 'red chilli powder', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Heat oil in a wide skillet over medium heat. Sauté sliced onions and minced garlic for 3 minutes.',
      'Add chopped tomatoes, cumin, chilli powder, and salt. Simmer for 8 minutes until a thick, rich sauce forms.',
      'Make 3 small wells in the sauce with the back of a spoon.',
      'Crack an egg into each well. Cover skillet with a lid and cook on low for 5 minutes until egg whites are set but yolks remain runny.',
      'Serve straight from the skillet with warm bread.'
    ]
  },

  // 23. Mexican-Inspired Huevos Rancheros
  {
    id: 'huevos-rancheros',
    name: 'Rustic Huevos Rancheros',
    description: 'Crisped tortillas or toast topped with fried eggs and a warm spiced salsa of tomatoes, onions, and chillies.',
    category: 'Breakfast',
    cuisine: 'Mexican-inspired',
    prep_time: 5,
    cook_time: 10,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Eggitarian',
    tags: ['Mexican', 'Brunch', 'Spicy'],
    imageUrl: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Eggs', normalizedName: 'egg', quantity: 2, unit: 'pieces' },
      { name: 'Bread or Flatbread', normalizedName: 'bread', quantity: 2, unit: 'pieces' },
      { name: 'Tomato', normalizedName: 'tomato', quantity: 2, unit: 'medium' },
      { name: 'Onion', normalizedName: 'onion', quantity: 0.5, unit: 'medium' },
      { name: 'Green Chilli', normalizedName: 'green chilli', quantity: 1, unit: 'piece' },
      { name: 'Oil', normalizedName: 'oil', quantity: 2, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.5, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Dice tomato, onion, and green chilli. Simmer in 1 tsp oil with salt for 5 minutes to create a warm ranchero sauce.',
      'Crisp the bread or flatbread in a hot oiled skillet until crunchy. Place on plates.',
      'Fry the eggs sunny-side up in the skillet until whites are set and edges are crisp.',
      'Place a fried egg atop each bread and spoon warm ranchero sauce over the top.'
    ]
  },

  // 24. Quick Chicken Fried Rice
  {
    id: 'chicken-fried-rice',
    name: 'Street Chicken Fried Rice',
    description: 'Wok-seared chicken bits tossed with cooked rice, eggs, onions, and black pepper.',
    category: 'Dinner',
    cuisine: 'Chinese-inspired',
    prep_time: 8,
    cook_time: 10,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Non-vegetarian',
    isLeftoverFriendly: true,
    tags: ['High-Protein', 'Wok', 'Leftovers'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Cooked Rice', normalizedName: 'rice', quantity: 2, unit: 'cups' },
      { name: 'Chicken (diced)', normalizedName: 'chicken', quantity: 150, unit: 'grams' },
      { name: 'Egg', normalizedName: 'egg', quantity: 1, unit: 'piece' },
      { name: 'Onion', normalizedName: 'onion', quantity: 1, unit: 'medium' },
      { name: 'Oil', normalizedName: 'oil', quantity: 2, unit: 'tbsp', isPantryBasics: true },
      { name: 'Salt', normalizedName: 'salt', quantity: 0.75, unit: 'tsp', isPantryBasics: true },
      { name: 'Black Pepper', normalizedName: 'black pepper', quantity: 0.5, unit: 'tsp', isPantryBasics: true },
      { name: 'Soy Sauce', normalizedName: 'soy sauce', quantity: 1, unit: 'tbsp', isOptional: true }
    ],
    steps: [
      'Heat oil in a wok. Sear chicken cubes over high heat for 3-4 minutes until cooked through.',
      'Push chicken aside, crack in the egg and scramble for 45 seconds.',
      'Toss in sliced onions, cook for 1 minute.',
      'Dump in cold rice, salt, pepper, and soy sauce. Toss vigorously over high heat for 3 minutes until smoking hot.'
    ]
  },

  // 25. Masala Chai
  {
    id: 'masala-chai',
    name: 'Aromatic Ginger Cardamom Masala Chai',
    description: 'Classic comforting hot tea brewed with crushed ginger, whole milk, and warming spices.',
    category: 'Breakfast',
    cuisine: 'Indian',
    prep_time: 2,
    cook_time: 6,
    difficulty: 'Easy',
    servings: 2,
    diet: 'Vegetarian',
    tags: ['Beverage', 'Comfort', 'Morning'],
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Milk', normalizedName: 'milk', quantity: 1, unit: 'cup' },
      { name: 'Water', normalizedName: 'water', quantity: 1, unit: 'cup', isPantryBasics: true },
      { name: 'Ginger', normalizedName: 'ginger', quantity: 1, unit: 'inch' },
      { name: 'Sugar', normalizedName: 'sugar', quantity: 2, unit: 'tsp', isPantryBasics: true }
    ],
    steps: [
      'Bring water to a boil in a saucepan with crushed fresh ginger.',
      'Add tea leaves and simmer for 2 minutes to extract the deep color and spice oils.',
      'Pour in milk and sugar. Bring to a rolling boil until the chai rises to the rim.',
      'Lower flame, simmer for 1 more minute, and strain into cups.'
    ]
  }
];

// Helper to expand and seed remaining 75+ realistic recipes programmatically
// covering diverse categories: South Indian, North Indian, Indo-Chinese, Italian, Mexican, snacks, breakfast, dinner.
const RECIPE_EXPANSIONS = [
  // Lentils & Dals
  { name: 'Tadka Dal Fry', cat: 'Dinner', cui: 'North Indian', diet: 'Vegan', time: 18, ings: ['lentils', 'onion', 'tomato', 'garlic', 'cumin', 'turmeric', 'oil', 'salt'], desc: 'Yellow lentils tempered with ghee, cumin seeds, garlic, and browned onions.' },
  { name: 'Dal Tadka with Rice', cat: 'Lunch', cui: 'Indian', diet: 'Vegan', time: 20, ings: ['lentils', 'rice', 'onion', 'garlic', 'cumin', 'oil', 'salt'], desc: 'Classic comfort plate of steamed rice with golden tempered yellow dal.' },
  { name: 'Tomato Dal (Tomato Pappu)', cat: 'Lunch', cui: 'South Indian', diet: 'Vegan', time: 20, ings: ['lentils', 'tomato', 'green chilli', 'turmeric', 'mustard seeds', 'oil', 'salt'], desc: 'Tart and hearty South Indian style lentil curry stewed with ripe tomatoes.' },
  { name: 'Spinach Dal (Palak Dal)', cat: 'Dinner', cui: 'Indian', diet: 'Vegan', time: 18, ings: ['lentils', 'spinach', 'onion', 'garlic', 'turmeric', 'oil', 'salt'], desc: 'Nutrient-rich lentil stew folded with fresh wilted spinach leaves and garlic.' },
  
  // Rice Specialities
  { name: 'Lemon Rice (Chitranna)', cat: 'Lunch', cui: 'South Indian', diet: 'Vegan', time: 12, ings: ['rice', 'lemon', 'turmeric', 'mustard seeds', 'green chilli', 'oil', 'salt'], desc: 'Vibrant yellow South Indian rice scented with fresh lemon juice and crunchy tempering.' },
  { name: 'Tomato Rice (Thakkali Sadam)', cat: 'Lunch', cui: 'South Indian', diet: 'Vegan', time: 15, ings: ['rice', 'tomato', 'onion', 'green chilli', 'turmeric', 'oil', 'salt'], desc: 'Tangy and spicy spiced rice cooked with juicy ripe tomatoes and onions.' },
  { name: 'Spicy Masala Rice', cat: 'Lunch', cui: 'Indian', diet: 'Vegetarian', time: 10, ings: ['rice', 'onion', 'green chilli', 'turmeric', 'red chilli powder', 'oil', 'salt'], desc: 'Quick skillet sauté of cold leftover rice with fiery spices and sweet onions.' },
  { name: 'Curd Rice with Pomegranate', cat: 'Lunch', cui: 'South Indian', diet: 'Vegetarian', time: 8, ings: ['rice', 'curd', 'mustard seeds', 'ginger', 'green chilli', 'oil', 'salt'], desc: 'Cooling probiotic rice dish with crackled mustard seeds and fresh ginger.' },
  { name: 'Vegetable Pulao', cat: 'Dinner', cui: 'North Indian', diet: 'Vegetarian', time: 20, ings: ['rice', 'onion', 'peas', 'carrot', 'cumin', 'oil', 'salt'], desc: 'Mildly spiced one-pot basmati rice loaded with sweet peas and carrots.' },
  { name: 'Garlic Butter Rice', cat: 'Quick meals', cui: 'American', diet: 'Vegetarian', time: 10, ings: ['rice', 'garlic', 'butter', 'black pepper', 'salt'], desc: 'Aromatic skillet rice tossed in sizzling melted butter and minced garlic.' },
  { name: 'Leftover Rice Crispy Cutlets', cat: 'Snacks', cui: 'Indian', diet: 'Vegetarian', time: 15, ings: ['rice', 'potato', 'onion', 'green chilli', 'flour', 'oil', 'salt'], desc: 'Golden crispy pan-fried cutlets made from leftover mashed rice and potatoes.' },

  // Egg Dishes
  { name: 'Egg Pepper Fry', cat: 'Quick meals', cui: 'South Indian', diet: 'Eggitarian', time: 12, ings: ['egg', 'onion', 'black pepper', 'curry leaves', 'oil', 'salt'], desc: 'Boiled eggs quartered and stir-fried with caramelized onions and pungent black pepper.' },
  { name: 'Egg Masala Curry', cat: 'Dinner', cui: 'North Indian', diet: 'Eggitarian', time: 20, ings: ['egg', 'onion', 'tomato', 'ginger-garlic paste', 'turmeric', 'red chilli powder', 'oil', 'salt'], desc: 'Golden hard-boiled eggs bathed in a luscious tomato and onion gravy.' },
  { name: 'Egg Salad Sandwich Spread', cat: 'Breakfast', cui: 'American', diet: 'Eggitarian', time: 10, ings: ['egg', 'onion', 'black pepper', 'salt'], desc: 'Creamy chopped boiled eggs tossed with finely minced onions and black pepper.' },
  { name: 'Spanish Egg Potato Tortilla', cat: 'Breakfast', cui: 'Mediterranean', diet: 'Eggitarian', time: 20, ings: ['egg', 'potato', 'onion', 'oil', 'salt'], desc: 'Thick, golden Spanish-style egg cake filled with tender slow-cooked potato slices and onions.' },
  { name: 'Spicy Egg Noodles', cat: 'Dinner', cui: 'Chinese-inspired', diet: 'Eggitarian', time: 15, ings: ['pasta', 'egg', 'onion', 'cabbage', 'soy sauce', 'oil', 'salt'], desc: 'Wok-tossed noodles with shredded scrambled eggs and crisp vegetables.' },
  { name: 'Egg Drop Rice Porridge', cat: 'Breakfast', cui: 'Asian', diet: 'Eggitarian', time: 15, ings: ['rice', 'egg', 'ginger', 'black pepper', 'soy sauce', 'salt', 'water'], desc: 'Warm savory rice congee with gentle swirls of cooked egg and fresh ginger.' },
  { name: 'Boiled Egg Chaat', cat: 'Snacks', cui: 'Indian', diet: 'Eggitarian', time: 5, ings: ['egg', 'onion', 'tomato', 'green chilli', 'lemon', 'salt', 'black pepper'], desc: 'Zesty high-protein street snack with diced boiled eggs, onions, tomatoes, and lemon.' },

  // Chicken Dishes
  { name: 'Garlic Butter Chicken Bites', cat: 'Quick meals', cui: 'American', diet: 'Non-vegetarian', time: 12, ings: ['chicken', 'garlic', 'butter', 'black pepper', 'salt', 'oil'], desc: 'Golden seared chicken cubes bathed in rich garlic butter and fresh pepper.' },
  { name: 'Pepper Chicken Fry', cat: 'Dinner', cui: 'South Indian', diet: 'Non-vegetarian', time: 20, ings: ['chicken', 'onion', 'black pepper', 'garlic', 'curry leaves', 'oil', 'salt'], desc: 'Chettinad-style dry chicken roast coated in freshly roasted coarse black pepper.' },
  { name: 'Chicken Tomato Pasta', cat: 'Dinner', cui: 'Italian', diet: 'Non-vegetarian', time: 20, ings: ['chicken', 'pasta', 'tomato', 'onion', 'garlic', 'oil', 'salt'], desc: 'Al dente pasta tossed with pan-seared chicken and a rustic garlic-tomato sauce.' },
  { name: 'Shredded Chicken Mayo Toast', cat: 'Breakfast', cui: 'American', diet: 'Non-vegetarian', time: 8, ings: ['chicken', 'bread', 'black pepper', 'onion', 'salt'], desc: 'Crispy toasted bread loaded with savory shredded chicken and black pepper.' },
  { name: 'Crispy Pan Chicken Skewers', cat: 'Snacks', cui: 'Asian', diet: 'Non-vegetarian', time: 15, ings: ['chicken', 'soy sauce', 'garlic', 'black pepper', 'oil', 'salt'], desc: 'Juicy skillet-charred chicken strips glazed with soy and garlic.' },
  { name: 'Chicken Clear Soup', cat: 'Snacks', cui: 'Asian', diet: 'Non-vegetarian', time: 15, ings: ['chicken', 'ginger', 'black pepper', 'water', 'salt'], desc: 'Nourishing clear chicken broth simmered with crushed ginger and pepper.' },

  // Paneer & Dairy Dishes
  { name: 'Matar Paneer', cat: 'Dinner', cui: 'North Indian', diet: 'Vegetarian', time: 20, ings: ['paneer', 'peas', 'onion', 'tomato', 'ginger-garlic paste', 'turmeric', 'oil', 'salt'], desc: 'Tender paneer cubes and sweet green peas simmered in a spiced tomato-onion curry.' },
  { name: 'Tawa Paneer Fry', cat: 'Snacks', cui: 'Indian', diet: 'Vegetarian', time: 10, ings: ['paneer', 'capsicum', 'onion', 'red chilli powder', 'turmeric', 'oil', 'salt'], desc: 'Griddled paneer batons tossed with crunchy capsicum, onions, and bold spices.' },
  { name: 'Palak Paneer (Quick)', cat: 'Dinner', cui: 'North Indian', diet: 'Vegetarian', time: 20, ings: ['paneer', 'spinach', 'onion', 'garlic', 'ginger', 'turmeric', 'oil', 'salt'], desc: 'Soft paneer cubes simmered in a vibrant spiced fresh spinach puree.' },
  { name: 'Paneer Butter Masala (Quick)', cat: 'Dinner', cui: 'North Indian', diet: 'Vegetarian', time: 20, ings: ['paneer', 'tomato', 'butter', 'onion', 'turmeric', 'red chilli powder', 'salt'], desc: 'Velvety cottage cheese cubes in a creamy buttered tomato sauce.' },
  { name: 'Paneer Kathi Roll Filling', cat: 'Lunch', cui: 'Indian', diet: 'Vegetarian', time: 12, ings: ['paneer', 'onion', 'capsicum', 'tomato', 'oil', 'salt', 'turmeric'], desc: 'Smoky spiced paneer and julienned vegetables perfect for wrapping inside roti or bread.' },

  // Potato (Aloo) Dishes
  { name: 'Aloo Jeera (Cumin Potatoes)', cat: 'Lunch', cui: 'North Indian', diet: 'Vegan', time: 12, ings: ['potato', 'cumin', 'turmeric', 'green chilli', 'oil', 'salt'], desc: 'Cubed potatoes sautéed with nutty roasted cumin seeds, turmeric, and green chillies.' },
  { name: 'Mashed Potato Cakes', cat: 'Breakfast', cui: 'American', diet: 'Vegetarian', time: 15, ings: ['potato', 'flour', 'onion', 'black pepper', 'oil', 'salt'], desc: 'Crispy skillet patties crafted from seasoned mashed potatoes and sweet onions.' },
  { name: 'Aloo Matar', cat: 'Dinner', cui: 'Indian', diet: 'Vegan', time: 18, ings: ['potato', 'peas', 'onion', 'tomato', 'turmeric', 'oil', 'salt'], desc: 'Homestyle stew of potato cubes and tender green peas in mild curry sauce.' },
  { name: 'Aloo Gobi (Potato & Cauliflower)', cat: 'Dinner', cui: 'North Indian', diet: 'Vegan', time: 20, ings: ['potato', 'cauliflower', 'onion', 'tomato', 'turmeric', 'oil', 'salt'], desc: 'Classic dry curry of spiced tender potatoes and caramelized cauliflower florets.' },
  { name: 'Bombay Potato Masala for Toast', cat: 'Breakfast', cui: 'Indian', diet: 'Vegan', time: 10, ings: ['potato', 'mustard seeds', 'turmeric', 'green chilli', 'onion', 'oil', 'salt'], desc: 'Savory turmeric mashed potatoes tempered with mustard seeds and chillies.' },
  { name: 'Potato wedges in Pan', cat: 'Snacks', cui: 'American', diet: 'Vegan', time: 15, ings: ['potato', 'oil', 'black pepper', 'red chilli powder', 'salt'], desc: 'Crispy pan-roasted potato wedges coated in seasoned pepper crust.' },

  // Pasta & Italian
  { name: 'Pasta Aglio e Olio', cat: 'Dinner', cui: 'Italian', diet: 'Vegetarian', time: 12, ings: ['pasta', 'garlic', 'oil', 'black pepper', 'salt'], desc: 'Classic Roman spaghetti tossed with gently browned garlic slices in extra virgin oil.' },
  { name: 'Creamy Tomato Pasta', cat: 'Dinner', cui: 'Italian', diet: 'Vegetarian', time: 18, ings: ['pasta', 'tomato', 'onion', 'garlic', 'milk', 'oil', 'salt'], desc: 'Pasta coated in a velvety pink sauce made from simmered tomatoes and milk.' },
  { name: 'Cheesy Garlic Pasta', cat: 'Quick meals', cui: 'Italian', diet: 'Vegetarian', time: 15, ings: ['pasta', 'cheese', 'garlic', 'butter', 'black pepper', 'salt'], desc: 'Silky pasta tossed in melted sharp cheese and roasted garlic butter.' },
  { name: 'Spicy Arrabbiata Pasta', cat: 'Dinner', cui: 'Italian', diet: 'Vegan', time: 16, ings: ['pasta', 'tomato', 'garlic', 'red chilli powder', 'oil', 'salt'], desc: 'Penne pasta tossed in an assertive, fiery garlic and crushed tomato sauce.' },
  { name: 'Macaroni Masala (Desi Pasta)', cat: 'Snacks', cui: 'Indian', diet: 'Vegetarian', time: 15, ings: ['pasta', 'onion', 'tomato', 'green chilli', 'turmeric', 'oil', 'salt'], desc: 'Indian street style elbow macaroni tossed with spiced onion-tomato masala.' },

  // Bread & Toast Dishes
  { name: 'Cheese Chilli Toast', cat: 'Snacks', cui: 'Indian', diet: 'Vegetarian', time: 8, ings: ['bread', 'cheese', 'green chilli', 'capsicum', 'butter', 'salt'], desc: 'Bakery-style toasted bread melted with bubbling cheese and spicy green chillies.' },
  { name: 'Garlic Bread on Pan', cat: 'Snacks', cui: 'Italian', diet: 'Vegetarian', time: 6, ings: ['bread', 'garlic', 'butter', 'black pepper', 'salt'], desc: 'Crispy pan-toasted baguette slices rubbed with roasted garlic herb butter.' },
  { name: 'French Toast Savory Style', cat: 'Breakfast', cui: 'Indian', diet: 'Eggitarian', time: 8, ings: ['bread', 'egg', 'onion', 'green chilli', 'turmeric', 'oil', 'salt'], desc: 'Bread dipped in an egg batter spiced with onions, green chillies, and turmeric.' },
  { name: 'Bread Poha (Spiced Crumbled Bread)', cat: 'Breakfast', cui: 'Indian', diet: 'Vegetarian', time: 10, ings: ['bread', 'onion', 'mustard seeds', 'turmeric', 'green chilli', 'oil', 'salt'], desc: 'Torn bread pieces transformed into a savory breakfast with crackled mustard seeds.' },
  { name: 'Tomato Cheese Toastie', cat: 'Breakfast', cui: 'American', diet: 'Vegetarian', time: 8, ings: ['bread', 'cheese', 'tomato', 'butter', 'black pepper', 'salt'], desc: 'Golden crunchy grilled sandwich filled with melted cheese and juicy tomato slices.' },

  // Chinese & Asian Stir-Fries
  { name: 'Chilli Paneer (Dry)', cat: 'Dinner', cui: 'Chinese-inspired', diet: 'Vegetarian', time: 18, ings: ['paneer', 'capsicum', 'onion', 'garlic', 'soy sauce', 'oil', 'salt'], desc: 'Indo-Chinese favorite with crispy paneer cubes tossed in garlic and soy sauce.' },
  { name: 'Chilli Chicken (Dry)', cat: 'Dinner', cui: 'Chinese-inspired', diet: 'Non-vegetarian', time: 18, ings: ['chicken', 'capsicum', 'onion', 'garlic', 'soy sauce', 'oil', 'salt'], desc: 'Crisp seared chicken pieces tossed in fiery wok spices and soy glaze.' },
  { name: 'Vegetable Fried Rice', cat: 'Lunch', cui: 'Chinese-inspired', diet: 'Vegan', time: 12, ings: ['rice', 'carrot', 'cabbage', 'onion', 'soy sauce', 'oil', 'salt', 'black pepper'], desc: 'Aromatic wok-tossed leftover rice with finely shredded crunchy vegetables.' },
  { name: 'Crispy Garlic Cabbage Stir-Fry', cat: 'Quick meals', cui: 'Chinese-inspired', diet: 'Vegan', time: 8, ings: ['cabbage', 'garlic', 'soy sauce', 'oil', 'black pepper', 'salt'], desc: 'Sweet, crisp shredded cabbage blistered in smoking oil with minced garlic.' },
  { name: 'Egg Spring Onion Stir-Fry', cat: 'Quick meals', cui: 'Asian', diet: 'Eggitarian', time: 6, ings: ['egg', 'spring onion', 'soy sauce', 'oil', 'salt', 'black pepper'], desc: 'Fluffy scrambled eggs folded with aromatic scorched spring onions.' },

  // Soups & Warm Bowls
  { name: 'Clear Vegetable Soup', cat: 'Quick meals', cui: 'Asian', diet: 'Vegan', time: 10, ings: ['carrot', 'cabbage', 'ginger', 'garlic', 'black pepper', 'salt', 'water'], desc: 'Light, restorative warm broth packed with crisp garden vegetables and ginger.' },
  { name: 'Cream of Tomato Soup', cat: 'Dinner', cui: 'American', diet: 'Vegetarian', time: 15, ings: ['tomato', 'onion', 'garlic', 'butter', 'milk', 'sugar', 'salt', 'black pepper'], desc: 'Velvety smooth pureed tomato soup with sweet onions and a swirl of cream.' },
  { name: 'Ginger Garlic Health Broth', cat: 'Quick meals', cui: 'Indian', diet: 'Vegan', time: 8, ings: ['ginger', 'garlic', 'black pepper', 'turmeric', 'salt', 'water'], desc: 'Spiced hot herbal elixir for immunity and soothing cold evenings.' },

  // Breakfast Items (Semolina, Oats, Pancakes)
  { name: 'Rava Upma (Semolina Savory Porridge)', cat: 'Breakfast', cui: 'South Indian', diet: 'Vegetarian', time: 12, ings: ['semolina', 'onion', 'green chilli', 'mustard seeds', 'oil', 'salt', 'water'], desc: 'Fluffy roasted semolina porridge tempered with mustard seeds and onions.' },
  { name: 'Savory Oats Porridge', cat: 'Breakfast', cui: 'Indian', diet: 'Vegetarian', time: 8, ings: ['oats', 'onion', 'tomato', 'turmeric', 'oil', 'salt', 'water'], desc: 'Wholesome rolled oats cooked with spiced onions, juicy tomatoes, and turmeric.' },
  { name: 'Egg Oats Omelette', cat: 'Breakfast', cui: 'American', diet: 'Eggitarian', time: 8, ings: ['egg', 'oats', 'onion', 'black pepper', 'oil', 'salt'], desc: 'Fiber-packed, hearty omelette blended with soaked oats and black pepper.' },
  { name: 'Tomato Onion Besan Chilla', cat: 'Breakfast', cui: 'North Indian', diet: 'Vegan', time: 10, ings: ['flour', 'onion', 'tomato', 'green chilli', 'turmeric', 'oil', 'salt', 'water'], desc: 'Savory, protein-rich golden crepes studded with diced onions and tomatoes.' },
  { name: 'Sweet Flour Pancakes', cat: 'Breakfast', cui: 'American', diet: 'Vegetarian', time: 12, ings: ['flour', 'milk', 'egg', 'sugar', 'butter', 'salt'], desc: 'Fluffy weekend griddled pancakes lightly sweetened and served with melted butter.' },

  // High Protein & Quick Snacks
  { name: 'Paneer Tofu Scramble', cat: 'High-protein meals', cui: 'American', diet: 'Vegan', time: 8, ings: ['tofu', 'onion', 'turmeric', 'black pepper', 'oil', 'salt'], desc: 'Crumbled firm tofu pan-seared with turmeric, onions, and black pepper.' },
  { name: 'Spicy Pan-Seared Tofu', cat: 'High-protein meals', cui: 'Asian', diet: 'Vegan', time: 12, ings: ['tofu', 'soy sauce', 'garlic', 'red chilli powder', 'oil', 'salt'], desc: 'Crisp pressed tofu cubes glazed in savory soy garlic and spicy pepper sauce.' },
  { name: 'Boiled Chickpea / Lentil Salad', cat: 'Snacks', cui: 'Mediterranean', diet: 'Vegan', time: 6, ings: ['lentils', 'onion', 'tomato', 'lemon', 'black pepper', 'salt'], desc: 'Fresh protein salad tossed with diced red onions, juicy tomatoes, and lemon.' },
  { name: 'Cucumber Tomato Salad (Kachumber)', cat: 'Lunch', cui: 'Indian', diet: 'Vegan', time: 5, ings: ['cucumber', 'tomato', 'onion', 'lemon', 'salt', 'black pepper'], desc: 'Crunchy diced salad seasoned with fresh lemon juice and sea salt.' },
  { name: 'Potato Onion Frittata', cat: 'Dinner', cui: 'Mediterranean', diet: 'Eggitarian', time: 20, ings: ['egg', 'potato', 'onion', 'cheese', 'oil', 'salt'], desc: 'Cast-iron baked egg frittata layered with crispy potatoes and melted cheese.' },

  // Additional 20+ specialized variety items to surpass 100+
  { name: 'Spicy Onion Chutney with Rice', cat: 'Lunch', cui: 'South Indian', diet: 'Vegan', time: 8, ings: ['onion', 'tomato', 'red chilli powder', 'mustard seeds', 'oil', 'salt'], desc: 'Fiery caramelized onion relish mixed into steaming warm rice.' },
  { name: 'Cabbage Poriyal (Stir-Fry)', cat: 'Lunch', cui: 'South Indian', diet: 'Vegan', time: 12, ings: ['cabbage', 'mustard seeds', 'green chilli', 'turmeric', 'oil', 'salt'], desc: 'Tender shredded cabbage tempered with fragrant mustard seeds and green chillies.' },
  { name: 'Tomato Onion Raita with Rice', cat: 'Lunch', cui: 'Indian', diet: 'Vegetarian', time: 5, ings: ['curd', 'onion', 'tomato', 'cumin', 'salt'], desc: 'Cooling yogurt bowl with diced onions and tomatoes served over warm rice.' },
  { name: 'Egg Fried Noodles', cat: 'Dinner', cui: 'Chinese-inspired', diet: 'Eggitarian', time: 14, ings: ['pasta', 'egg', 'onion', 'soy sauce', 'black pepper', 'oil', 'salt'], desc: 'Street-style fried noodles with scrambled eggs and savory dark soy sauce.' },
  { name: 'Carrot Peas Pulao', cat: 'Lunch', cui: 'Indian', diet: 'Vegan', time: 18, ings: ['rice', 'carrot', 'peas', 'cumin', 'oil', 'salt'], desc: 'Delicately scented cumin rice loaded with bright carrots and sweet green peas.' },
  { name: 'Spicy Potato Toast', cat: 'Breakfast', cui: 'Indian', diet: 'Vegan', time: 10, ings: ['bread', 'potato', 'green chilli', 'turmeric', 'oil', 'salt'], desc: 'Crisp golden bread toasted with a spicy turmeric potato mash filling.' },
  { name: 'Egg & Cheese Quesadilla', cat: 'Quick meals', cui: 'Mexican-inspired', diet: 'Eggitarian', time: 8, ings: ['bread', 'egg', 'cheese', 'onion', 'oil', 'salt'], desc: 'Crispy folded flatbread stuffed with scrambled eggs and gooey melted cheese.' },
  { name: 'Mexican Tomato Rice', cat: 'Dinner', cui: 'Mexican-inspired', diet: 'Vegan', time: 18, ings: ['rice', 'tomato', 'onion', 'garlic', 'cumin', 'oil', 'salt'], desc: 'Savory skillet rice simmered in tomato puree, garlic, and Mexican cumin.' },
  { name: 'Chicken Pepper Rice Bowl', cat: 'Lunch', cui: 'Chinese-inspired', diet: 'Non-vegetarian', time: 15, ings: ['rice', 'chicken', 'black pepper', 'onion', 'soy sauce', 'oil', 'salt'], desc: 'Sizzling pan-seared pepper chicken served over a fluffy bed of steamed rice.' },
  { name: 'Egg Curry with Boiled Eggs', cat: 'Dinner', cui: 'South Indian', diet: 'Eggitarian', time: 20, ings: ['egg', 'onion', 'tomato', 'garlic', 'turmeric', 'red chilli powder', 'oil', 'salt'], desc: 'Deeply spiced tamarind or tomato egg gravy with pan-roasted eggs.' },
  { name: 'Stir-Fried Onion Rice', cat: 'Quick meals', cui: 'Asian', diet: 'Vegan', time: 8, ings: ['rice', 'onion', 'garlic', 'soy sauce', 'oil', 'black pepper', 'salt'], desc: 'Simple wok-charred rice with sweet caramelized onions and garlic.' },
  { name: 'Crispy Potato Patties', cat: 'Snacks', cui: 'American', diet: 'Vegan', time: 12, ings: ['potato', 'flour', 'salt', 'black pepper', 'oil'], desc: 'Golden shredded hash brown patties with ultra-crisp edges.' },
  { name: 'Quick Paneer Rice Bowl', cat: 'Lunch', cui: 'Indian', diet: 'Vegetarian', time: 12, ings: ['rice', 'paneer', 'onion', 'turmeric', 'oil', 'salt'], desc: 'High-protein rice bowl tossed with golden turmeric-seared paneer cubes.' },
  { name: 'Egg Bhurji Sandwich', cat: 'Breakfast', cui: 'Indian', diet: 'Eggitarian', time: 10, ings: ['bread', 'egg', 'onion', 'tomato', 'green chilli', 'butter', 'salt'], desc: 'Toasted buttered bread packed with spicy street-style masala scrambled eggs.' },
  { name: 'Chicken Soup with Rice', cat: 'Dinner', cui: 'Asian', diet: 'Non-vegetarian', time: 18, ings: ['chicken', 'rice', 'ginger', 'black pepper', 'garlic', 'salt', 'water'], desc: 'Soothing broth with shredded chicken and soft simmered rice grains.' },
  { name: 'Masala French Fries', cat: 'Snacks', cui: 'Indian', diet: 'Vegan', time: 15, ings: ['potato', 'red chilli powder', 'turmeric', 'salt', 'oil'], desc: 'Pan-fried potato sticks dusted with tangy Indian street spices.' },
  { name: 'Cheesy Scrambled Eggs', cat: 'Breakfast', cui: 'American', diet: 'Eggitarian', time: 5, ings: ['egg', 'cheese', 'butter', 'black pepper', 'salt'], desc: 'Creamy slow-scrambled eggs folded with rich melted cheese and black pepper.' },
  { name: 'Tomato Onion Bruschetta', cat: 'Snacks', cui: 'Italian', diet: 'Vegan', time: 8, ings: ['bread', 'tomato', 'onion', 'garlic', 'oil', 'salt', 'black pepper'], desc: 'Toasted crusty bread topped with marinated sweet tomatoes, garlic, and olive oil.' },
  { name: 'Crispy Bread Pakora', cat: 'Snacks', cui: 'Indian', diet: 'Vegetarian', time: 12, ings: ['bread', 'flour', 'turmeric', 'red chilli powder', 'oil', 'salt'], desc: 'Triangles of bread coated in spiced batter and fried until puffed and crispy.' },
  { name: 'Sweet Cinnamon French Toast', cat: 'Breakfast', cui: 'American', diet: 'Eggitarian', time: 8, ings: ['bread', 'egg', 'milk', 'sugar', 'butter'], desc: 'Decadent custard French toast with a caramelized sweet crust.' }
];

// Helper to convert recipe templates into full Recipe objects
function buildExpandedRecipes(): Recipe[] {
  const images = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567184109411-b28f21ee097a?auto=format&fit=crop&w=800&q=80'
  ];

  return RECIPE_EXPANSIONS.map((item, idx) => {
    const id = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const pantryStaples = ['oil', 'salt', 'black pepper', 'water', 'turmeric', 'cumin', 'mustard seeds', 'sugar', 'butter'];

    const ingredients = item.ings.map(ing => {
      const isBasics = pantryStaples.includes(ing);
      return {
        name: ing.charAt(0).toUpperCase() + ing.slice(1),
        normalizedName: ing,
        quantity: isBasics ? (ing === 'oil' ? 1.5 : 1) : 1,
        unit: isBasics ? (ing === 'salt' || ing === 'black pepper' || ing === 'turmeric' ? 'tsp' : 'tbsp') : 'portion',
        isPantryBasics: isBasics,
        isOptional: false
      };
    });

    return {
      id,
      name: item.name,
      description: item.desc,
      category: item.cat as any,
      cuisine: item.cui as any,
      prep_time: 5,
      cook_time: item.time,
      difficulty: item.time <= 10 ? 'Easy' : (item.time <= 18 ? 'Easy' : 'Medium'),
      servings: 2,
      diet: item.diet as any,
      isLeftoverFriendly: item.name.toLowerCase().includes('rice') || item.name.toLowerCase().includes('bread') || item.name.toLowerCase().includes('leftover'),
      tags: [item.cui, item.cat, item.diet, item.time <= 15 ? 'Quick' : 'Comfort'],
      imageUrl: images[idx % images.length],
      ingredients,
      steps: [
        `Prepare and measure all listed ingredients cleanly.`,
        `Heat oil or butter in a suitable skillet or pot over medium flame.`,
        `Sauté the base ingredients gently until golden, fragrant, and softened.`,
        `Add the main items and spices, tossing vigorously to coat evenly.`,
        `Simmer or stir-fry until cooked through to perfection. Serve hot and enjoy.`
      ],
      variations: {
        spicy: 'Add extra sliced chillies or a pinch of crushed black pepper.',
        quick: 'Use a high-flame wok technique to finish in under 10 minutes.'
      }
    };
  });
}

export const ALL_SEED_RECIPES: Recipe[] = [
  ...SEED_RECIPES,
  ...buildExpandedRecipes()
];
