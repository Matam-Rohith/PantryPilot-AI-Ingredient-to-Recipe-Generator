# PantryPilot 🍳 — AI Ingredient-to-Recipe Generator

> **"Tell me what ingredients you have, and PantryPilot tells you what you can make."**

PantryPilot is an intelligent full-stack culinary application designed to eliminate food waste and answer the everyday kitchen dilemma: *"What can I cook with what I already have?"*

Unlike generic AI chat wrappers that hallucinate recipes with ingredients you do not have, PantryPilot executes a **deterministic ingredient-to-recipe matching pipeline** combined with **Gemini AI natural-language extraction & custom chef synthesis**.

---

## 🚀 The Core Pipeline

```text
User Natural Language Input
  ("I have 2 eggs, rice, onion, tomato and green chilli")
              ↓
  1. Ingredient Extraction (Gemini 3.8 Flash + Heuristic Fallback)
              ↓
  2. Ingredient Normalization (Synonym resolution: tomatoes → tomato, chillies → green chilli)
              ↓
  3. Canonical Ingredient Database & Pantry Basics Filtering
              ↓
  4. Deterministic Recipe Matching Engine (100+ Authentic Recipes)
              ↓
  5. Curated Substitution Engine (Soy Sauce → Salt + Vinegar, Butter → Oil)
              ↓
  6. Multi-Factor Recipe Ranking (Match % + Utilization + Missing Penalty + Leftover Bonus)
              ↓
  7. Categorization: [ CAN MAKE NOW (100%) | ALMOST THERE (75%) | EXPLORE ]
              ↓
  8. AI Custom Chef Generation ("Create a Recipe" honoring exact pantry constraints)
              ↓
  9. Shopping List Integration (1-Click "Add Missing Ingredients")
```

---

## ✨ Key Features

1. **Natural Language Ingredient Extraction**
   - Type conversational sentences like *"I have 2 eggs and some leftover rice"* or *"There are 3 tomatoes and an onion in my fridge"*.
   - Automatically extracts counts, units, and canonical ingredient names.

2. **100+ Authentic Seed Recipes**
   - Spans Indian (South & North), Indo-Chinese, Italian, Mexican, American, and Mediterranean cuisines.
   - Categorized by Breakfast, Lunch, Dinner, Snacks, Quick meals (< 15 mins), and High-Protein.
   - Includes real culinary steps, dietary classifications (Vegetarian, Vegan, Eggitarian, Non-veg), and recipe variations (Spicy, Mild, High Protein, Quick, Budget).

3. **Three-Tier Recipe Categorization**
   - **CAN MAKE NOW (100% Core Match)**: Recipes you can prepare right now with your ingredients + basic pantry staples (oil, salt, water, pepper).
   - **ALMOST THERE**: Recipes missing only 1 or 2 ingredients.
   - **EXPLORE**: Inspiring recipes utilizing several of your items.

4. **"Use Only My Ingredients" Mode**
   - Strict filter that hides all recipes requiring unowned items.

5. **Configurable Pantry Basics**
   - Set common pantry staples (Salt, Oil, Black Pepper, Turmeric, Cumin, Sugar) as always available so they never count as missing.

6. **Curated Substitution Engine**
   - Intelligently recommends kitchen-tested substitutes (e.g., Soy sauce → Salt + splash of vinegar; Paneer → Tofu).

7. **"Use My Leftovers" Mode**
   - Prioritizes recipes designed for cooked rice, stale bread, boiled potatoes, or cooked chicken.

8. **AI Chef "Create a Recipe"**
   - Generates original recipes strictly constrained to your available ingredients without hallucinating unavailable meats or exotic ingredients.

9. **Interactive Cook Mode & Shopping List**
   - Step-by-step checklist with built-in timers.
   - 1-click "Add Missing Ingredients" to an interactive, persistent shopping list.

10. **Full User Accounts & Guest Mode**
    - Instant guest access without signup.
    - User registration, bookmarking/saved recipes, search history, and recipe ratings.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Backend**: Express + Node.js (with full-stack Vite middleware mode in dev).
- **AI Model**: Google Gemini (`@google/genai` TypeScript SDK with `gemini-3.8-flash`).
- **Database**: Supabase PostgreSQL schemas with Row-Level Security (RLS) policies, UUID primary keys, and relations.
- **Testing**: End-to-end automated test runner for extraction, matching, ranking, and tenant security.
- **CI/CD & DevOps**: GitHub Actions workflow and production Dockerfile / docker-compose.

---

## 🗄️ Database Schema (Supabase PostgreSQL)

Located in `database/migrations/001_initial_schema.sql`:

- `profiles`: User account details and metadata.
- `ingredients`: Canonical food items and categories.
- `ingredient_aliases`: Multi-variant synonyms for natural language normalization.
- `recipes`: Core recipe catalogue with cooking metadata.
- `recipe_ingredients`: Join table with quantities, units, and optional flags.
- `recipe_steps`: Ordered cooking instructions.
- `generated_recipes`: User-generated AI recipes.
- `saved_recipes`: Bookmarked recipes with personal notes.
- `user_preferences`: Dietary choices and custom pantry staples.
- `recipe_ratings`: User reviews and 1-5 star ratings.
- `search_history`: Search queries and extracted ingredients.
- `shopping_list`: User missing ingredients checklist.

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/ingredients/extract` | `POST` | Extracts structured ingredients from raw natural language input. |
| `/api/recipes/match` | `POST` | Matches user ingredients & pantry basics against 100+ recipes; returns categorized results. |
| `/api/recipes/generate` | `POST` | Generates a custom original recipe using Gemini 3.8 Flash honoring exact pantry constraints. |
| `/api/recipes/:id` | `GET` | Fetches complete recipe details, steps, variations, and user rating. |
| `/api/recipes` | `GET` | Catalog browsing with category, cuisine, and dietary filters. |
| `/api/recipes/:id/save` | `POST` | Bookmarks a recipe for the authenticated user. |
| `/api/recipes/:id/save` | `DELETE` | Removes a saved recipe. |
| `/api/saved-recipes` | `GET` | Returns user's saved recipes. |
| `/api/history` | `GET` | Returns search & extraction history. |
| `/api/shopping-list` | `GET` / `POST` | Manages user's missing ingredients shopping list. |
| `/api/shopping-list/:id` | `PATCH` / `DELETE` | Marks items as purchased or removes them. |
| `/api/recipes/:id/rate` | `POST` | Submits a 1-5 star rating and optional review. |
| `/api/substitutions` | `GET` | Returns curated kitchen substitution guide. |
| `/api/user/preferences` | `GET` / `POST` | Manages dietary preferences and custom pantry staples. |
| `/api/auth/login` | `POST` | Authenticates user and returns session token. |
| `/api/auth/register` | `POST` | Registers a new home cook profile. |
| `/api/auth/guest` | `POST` | Creates an instant guest session. |
| `/api/dashboard/stats` | `GET` | Aggregates user cooking metrics and top kitchen ingredients. |

---

## 🧪 Automated Testing

Run the automated test suite verifying extraction, matching, ranking, and tenant isolation:

```bash
npm run test
```

Test coverage includes:
- Natural language parsing ("2 eggs and rice", "three tomatoes and onions").
- Core vs. optional ingredient matching.
- Missing ingredients detection & pantry staple awareness.
- Ranking verification (100% matches strictly outranking partial matches).
- Multi-user data isolation (User A cannot access or delete User B's saved items).
- End-to-end extraction -> matching -> bookmarking -> shopping list flow.

---

## 🚢 Local Development & Docker

### 1. Environment Setup
Copy `.env.example` to `.env` and provide your Gemini API key:
```bash
GEMINI_API_KEY="your-gemini-api-key"
```

### 2. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 3. Run with Docker Compose
```bash
docker-compose up --build
```
