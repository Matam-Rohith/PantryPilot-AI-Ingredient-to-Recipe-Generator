-- ====================================================================
-- PantryPilot: Supabase PostgreSQL Schema & Security Policies
-- Migration: 001_initial_schema.sql
-- ====================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Profiles Table (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Ingredients Table (Canonical catalogue)
CREATE TABLE IF NOT EXISTS ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('produce', 'dairy', 'protein', 'grain', 'spice', 'condiment', 'baking', 'oil', 'other')),
  is_pantry_staple BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Ingredient Aliases Table (For natural language normalization)
CREATE TABLE IF NOT EXISTS ingredient_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  alias TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Recipes Table (Core recipe catalogue)
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  prep_time INTEGER NOT NULL DEFAULT 5, -- minutes
  cook_time INTEGER NOT NULL DEFAULT 15, -- minutes
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Advanced')),
  servings INTEGER NOT NULL DEFAULT 2,
  diet TEXT NOT NULL CHECK (diet IN ('Vegetarian', 'Non-vegetarian', 'Vegan', 'Eggitarian')),
  image_url TEXT,
  is_leftover_friendly BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'seed' CHECK (source IN ('seed', 'ai_generated', 'user')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Recipe Ingredients Table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL,
  quantity NUMERIC,
  unit TEXT,
  is_optional BOOLEAN DEFAULT FALSE,
  is_pantry_basics BOOLEAN DEFAULT FALSE,
  substitutions JSONB DEFAULT '[]'::jsonb
);

-- 7. Recipe Steps Table
CREATE TABLE IF NOT EXISTS recipe_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL
);

-- 8. Generated Recipes Table (AI-created recipes cached per user)
CREATE TABLE IF NOT EXISTS generated_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recipe_data JSONB NOT NULL,
  prompt_ingredients JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Saved Recipes Table (Bookmarks with personal notes)
CREATE TABLE IF NOT EXISTS saved_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  notes TEXT,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- 10. User Preferences Table (Dietary & Pantry Basics)
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dietary_preference TEXT DEFAULT 'Any',
  favorite_cuisines JSONB DEFAULT '[]'::jsonb,
  default_servings INTEGER DEFAULT 2,
  pantry_basics JSONB DEFAULT '["salt", "oil", "water", "black pepper", "turmeric", "sugar", "cumin"]'::jsonb,
  disliked_ingredients JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Recipe Ratings Table
CREATE TABLE IF NOT EXISTS recipe_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- 12. Search History Table
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  raw_input TEXT NOT NULL,
  extracted_ingredients JSONB NOT NULL,
  match_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Shopping List Table
CREATE TABLE IF NOT EXISTS shopping_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ingredient_name TEXT NOT NULL,
  recipe_name TEXT,
  recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
  quantity TEXT,
  unit TEXT,
  is_purchased BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes(slug);
CREATE INDEX IF NOT EXISTS idx_recipes_diet ON recipes(diet);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_normalized ON recipe_ingredients(normalized_name);
CREATE INDEX IF NOT EXISTS idx_saved_recipes_user ON saved_recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_list_user ON shopping_list(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_user ON search_history(user_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_recipes ENABLE ROW LEVEL SECURITY;

-- Recipes & Ingredients are publicly viewable by everyone
CREATE POLICY "Public recipes are readable by everyone" ON recipes FOR SELECT USING (true);
CREATE POLICY "Recipe ingredients are readable by everyone" ON recipe_ingredients FOR SELECT USING (true);
CREATE POLICY "Recipe steps are readable by everyone" ON recipe_steps FOR SELECT USING (true);
CREATE POLICY "Ingredients catalog is readable by everyone" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Ingredient aliases are readable by everyone" ON ingredient_aliases FOR SELECT USING (true);

-- User Profiles: Users can only read & update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Saved Recipes: Strict per-user isolation
CREATE POLICY "Users can view own saved recipes" ON saved_recipes FOR SELECT USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = saved_recipes.user_id));
CREATE POLICY "Users can insert own saved recipes" ON saved_recipes FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = saved_recipes.user_id));
CREATE POLICY "Users can delete own saved recipes" ON saved_recipes FOR DELETE USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = saved_recipes.user_id));

-- Shopping List: Strict per-user isolation
CREATE POLICY "Users can view own shopping list" ON shopping_list FOR SELECT USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = shopping_list.user_id));
CREATE POLICY "Users can modify own shopping list" ON shopping_list FOR ALL USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = shopping_list.user_id));

-- User Preferences: Strict per-user isolation
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = user_preferences.user_id));

-- Ratings & Search History: Per-user isolation
CREATE POLICY "Ratings viewable by everyone" ON recipe_ratings FOR SELECT USING (true);
CREATE POLICY "Users can submit own rating" ON recipe_ratings FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = recipe_ratings.user_id));
CREATE POLICY "Users can view own search history" ON search_history FOR SELECT USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = search_history.user_id));
