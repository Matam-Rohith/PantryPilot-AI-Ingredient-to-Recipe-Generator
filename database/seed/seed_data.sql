-- Seed canonical ingredients and sample recipes for Supabase PostgreSQL
INSERT INTO ingredients (id, name, category, is_pantry_staple) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'rice', 'grain', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'egg', 'protein', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'onion', 'produce', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'tomato', 'produce', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'green chilli', 'produce', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'potato', 'produce', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'paneer', 'dairy', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'chicken', 'protein', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'bread', 'grain', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'pasta', 'grain', false),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'oil', 'oil', true),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'salt', 'spice', true),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'black pepper', 'spice', true),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'turmeric', 'spice', true),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'cumin', 'spice', true)
ON CONFLICT (name) DO NOTHING;

INSERT INTO ingredient_aliases (ingredient_id, alias) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'eggs'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'boiled egg'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'tomatoes'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'fresh tomato'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'chillies'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'green chili'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'cooked rice'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'leftover rice')
ON CONFLICT (alias) DO NOTHING;

INSERT INTO recipes (id, slug, name, description, category, cuisine, prep_time, cook_time, difficulty, servings, diet, image_url, is_leftover_friendly) VALUES
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'egg-fried-rice', 'Egg Fried Rice', 'Quick wok-tossed leftover rice with scrambled eggs, caramelized onions, and crisp seasoning.', 'Quick meals', 'Chinese-inspired', 5, 10, 'Easy', 2, 'Eggitarian', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80', true),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'egg-tomato-rice', 'Egg Tomato Rice', 'Tangy and savory skillet rice with juicy spiced tomatoes and fluffy soft scrambled eggs.', 'Lunch', 'South Indian', 5, 12, 'Easy', 2, 'Eggitarian', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', true),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'egg-biryani', 'Homestyle Spiced Egg Biryani', 'Fragrant basmati rice layered with pan-roasted eggs, caramelized onions, and warming spices.', 'Dinner', 'Indian', 10, 20, 'Medium', 2, 'Eggitarian', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', true)
ON CONFLICT (slug) DO NOTHING;
