import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.js';
import { HeroSearch } from './components/HeroSearch.js';
import { FilterToolbar } from './components/FilterToolbar.js';
import { RecipeCard } from './components/RecipeCard.js';
import { RecipeDetailModal } from './components/RecipeDetailModal.js';
import { AiRecipeModal } from './components/AiRecipeModal.js';
import { PantryBasicsModal } from './components/PantryBasicsModal.js';
import { ShoppingListView } from './components/ShoppingListView.js';
import { SavedRecipesView } from './components/SavedRecipesView.js';
import { HistoryView } from './components/HistoryView.js';
import { DashboardView } from './components/DashboardView.js';
import { AuthModal } from './components/AuthModal.js';
import { ExtractedIngredient, FilterPreferences, Recipe, RecipeMatchResult, SavedRecipe, ShoppingListItem, UserProfile } from './types/recipe.js';
import { Sparkles, Utensils, CheckCircle2, AlertCircle } from 'lucide-react';
import { DEFAULT_PANTRY_BASICS } from '../server/data/ingredients.js';
import { clientExtractIngredients, clientMatchRecipes } from './lib/clientFallback.js';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'saved' | 'shopping' | 'history' | 'dashboard'>('search');
  const [activeCategorySection, setActiveCategorySection] = useState<'CAN_MAKE_NOW' | 'ALMOST_THERE' | 'EXPLORE' | 'ALL'>('CAN_MAKE_NOW');

  // Ingredients and Matching State
  const [extractedIngredients, setExtractedIngredients] = useState<ExtractedIngredient[]>([]);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [allMatches, setAllMatches] = useState<RecipeMatchResult[]>([]);
  const [canMakeNow, setCanMakeNow] = useState<RecipeMatchResult[]>([]);
  const [almostThere, setAlmostThere] = useState<RecipeMatchResult[]>([]);
  const [explore, setExplore] = useState<RecipeMatchResult[]>([]);
  const [exactRecipeMatch, setExactRecipeMatch] = useState<RecipeMatchResult | null>(null);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('I have 2 eggs, rice, onion, tomato and green chilli.');

  // Filters State - Default to using ONLY entered ingredients
  const [filters, setFilters] = useState<FilterPreferences>({
    maxTime: undefined,
    difficulty: 'Any',
    cuisine: 'Any',
    diet: 'Any',
    useOnlyMyIngredients: true,
    leftoverMode: false
  });

  // User and Collections State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userPantryBasics, setUserPantryBasics] = useState<string[]>(DEFAULT_PANTRY_BASICS);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  // Modals
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPantryModalOpen, setIsPantryModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Initial Load & Auth
  useEffect(() => {
    // Check session or initialize demo user
    fetch('/api/auth/me', { headers: { 'Authorization': `Bearer demo-user-1` } })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {
        setCurrentUser({
          id: 'demo-user-1',
          email: 'chef@pantrypilot.local',
          name: 'Pantry Explorer',
          isGuest: false,
          createdAt: new Date().toISOString()
        });
      });

    loadSavedRecipes();
    loadShoppingList();
    loadPreferences();

    // Run initial demo extraction
    handleExtractText('I have 2 eggs, rice, onion, tomato and green chilli.');
  }, []);

  const loadSavedRecipes = () => {
    fetch('/api/saved-recipes', { headers: { 'Authorization': `Bearer ${currentUser?.id || 'demo-user-1'}` } })
      .then(res => res.json())
      .then(data => setSavedRecipes(data.savedRecipes || []))
      .catch(console.error);
  };

  const loadShoppingList = () => {
    fetch('/api/shopping-list', { headers: { 'Authorization': `Bearer ${currentUser?.id || 'demo-user-1'}` } })
      .then(res => res.json())
      .then(data => setShoppingList(data.items || []))
      .catch(console.error);
  };

  const loadPreferences = () => {
    fetch('/api/user/preferences', { headers: { 'Authorization': `Bearer ${currentUser?.id || 'demo-user-1'}` } })
      .then(res => res.json())
      .then(data => {
        if (data.preferences?.pantryBasics) {
          setUserPantryBasics(data.preferences.pantryBasics);
        }
      })
      .catch(console.error);
  };

  // 2. Ingredient Extraction
  const handleExtractText = async (text: string) => {
    setIsExtracting(true);
    setLastSearchQuery(text);
    // When user enters ingredients, show only recipes that can be made with entered ingredients
    setActiveCategorySection('CAN_MAKE_NOW');
    try {
      const res = await fetch('/api/ingredients/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error(`API extraction returned ${res.status}`);
      const data = await res.json();
      if (data.ingredients && Array.isArray(data.ingredients) && data.ingredients.length > 0) {
        setExtractedIngredients(data.ingredients);
        const updatedFilters = { ...filters, useOnlyMyIngredients: true };
        setFilters(updatedFilters);
        executeMatching(data.ingredients.map((i: any) => i.normalizedName), userPantryBasics, updatedFilters, text);
        return;
      }
      throw new Error('No ingredients in response');
    } catch (err) {
      console.warn('API extraction unavailable or failed, utilizing browser engine fallback:', err);
      const fallback = clientExtractIngredients(text);
      setExtractedIngredients(fallback);
      const updatedFilters = { ...filters, useOnlyMyIngredients: true };
      setFilters(updatedFilters);
      executeMatching(fallback.map(i => i.normalizedName), userPantryBasics, updatedFilters, text);
    } finally {
      setIsExtracting(false);
    }
  };

  // 3. Recipe Matching
  const executeMatching = useCallback(async (
    ingredients: string[],
    pantryBasics: string[],
    currentFilters: FilterPreferences,
    rawTextQuery?: string
  ) => {
    setIsMatching(true);
    const query = rawTextQuery !== undefined ? rawTextQuery : lastSearchQuery;
    try {
      const res = await fetch('/api/recipes/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.id || 'demo-user-1'}`
        },
        body: JSON.stringify({
          ingredients,
          pantryBasics,
          filters: currentFilters,
          rawText: query
        })
      });
      if (!res.ok) throw new Error(`API matching returned ${res.status}`);
      const data = await res.json();
      setAllMatches(data.allMatches || []);
      setCanMakeNow(data.canMakeNow || []);
      setAlmostThere(data.almostThere || []);
      setExplore(data.explore || []);
      setExactRecipeMatch(data.exactRecipeMatch || null);
    } catch (err) {
      console.warn('API matching unavailable or failed, utilizing browser matching engine fallback:', err);
      const fallback = clientMatchRecipes(ingredients, pantryBasics, currentFilters, query);
      setAllMatches(fallback.allMatches);
      setCanMakeNow(fallback.canMakeNow);
      setAlmostThere(fallback.almostThere);
      setExplore(fallback.explore);
      setExactRecipeMatch(fallback.exactRecipeMatch || null);
    } finally {
      setIsMatching(false);
    }
  }, [currentUser, lastSearchQuery]);

  // Re-run matching when filters change
  const handleFilterChange = (newFilters: FilterPreferences) => {
    setFilters(newFilters);
    executeMatching(
      extractedIngredients.map(i => i.normalizedName),
      userPantryBasics,
      newFilters
    );
  };

  // Ingredient list mutations
  const handleRemoveIngredient = (index: number) => {
    const updated = [...extractedIngredients];
    updated.splice(index, 1);
    setExtractedIngredients(updated);
    executeMatching(updated.map(i => i.normalizedName), userPantryBasics, filters);
  };

  const handleAddIngredient = (name: string) => {
    const norm = name.toLowerCase().trim();
    if (!norm) return;
    const updated = [...extractedIngredients, { name, normalizedName: norm, quantity: 1, unit: 'piece' }];
    setExtractedIngredients(updated);
    executeMatching(updated.map(i => i.normalizedName), userPantryBasics, filters);
  };

  // 4. Saved Recipes Actions
  const handleToggleSave = async (recipeId: string) => {
    const isSaved = savedRecipes.some(s => s.recipeId === recipeId);
    const userId = currentUser?.id || 'demo-user-1';

    if (isSaved) {
      await fetch(`/api/recipes/${recipeId}/save`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${userId}` }
      });
      setSavedRecipes(prev => prev.filter(s => s.recipeId !== recipeId));
      showToast('Removed from saved recipes');
    } else {
      const res = await fetch(`/api/recipes/${recipeId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ notes: '' })
      });
      const data = await res.json();
      if (data.savedRecipe) {
        setSavedRecipes(prev => [data.savedRecipe, ...prev]);
        showToast('Recipe saved to your bookmarks!');
      }
    }
  };

  // 5. Shopping List Actions
  const handleAddMissingToShoppingList = async (missing: string[], recipeName: string, recipeId: string) => {
    const userId = currentUser?.id || 'demo-user-1';
    const items = missing.map(name => ({
      name,
      recipeName,
      recipeId
    }));

    try {
      const res = await fetch('/api/shopping-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ items })
      });
      const data = await res.json();
      if (data.items) {
        setShoppingList(prev => [...data.items, ...prev]);
        showToast(`Added ${missing.length} missing items to shopping list`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePurchased = async (id: string, isPurchased: boolean) => {
    await fetch(`/api/shopping-list/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPurchased })
    });
    setShoppingList(prev => prev.map(item => item.id === id ? { ...item, isPurchased } : item));
  };

  const handleDeleteShoppingItem = async (id: string) => {
    await fetch(`/api/shopping-list/${id}`, { method: 'DELETE' });
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const handleClearShoppingList = async () => {
    await fetch('/api/shopping-list', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${currentUser?.id || 'demo-user-1'}` }
    });
    setShoppingList([]);
    showToast('Shopping list cleared');
  };

  const handleAddSingleShoppingItem = async (name: string) => {
    const res = await fetch('/api/shopping-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser?.id || 'demo-user-1'}`
      },
      body: JSON.stringify({ ingredientName: name })
    });
    const data = await res.json();
    if (data.item) {
      setShoppingList(prev => [data.item, ...prev]);
      showToast(`Added "${name}" to shopping list`);
    }
  };

  // 6. Rating Recipe
  const handleRateRecipe = async (recipeId: string, rating: number, review?: string) => {
    const userId = currentUser?.id || 'demo-user-1';
    await fetch(`/api/recipes/${recipeId}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userId}`
      },
      body: JSON.stringify({ rating, review })
    });
    showToast('Recipe review submitted! Thank you.');
  };

  // 7. Save Pantry Basics
  const handleSavePantryBasics = async (basics: string[]) => {
    setUserPantryBasics(basics);
    const userId = currentUser?.id || 'demo-user-1';
    await fetch('/api/user/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userId}`
      },
      body: JSON.stringify({ pantryBasics: basics })
    });
    showToast('Pantry basics updated');
    executeMatching(extractedIngredients.map(i => i.normalizedName), basics, filters);
  };

  // 8. Auth handlers
  const handleLogin = async (email: string, pass: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    setCurrentUser(data.user);
    showToast(`Welcome back, ${data.user.name}!`);
    loadSavedRecipes();
    loadShoppingList();
  };

  const handleRegister = async (email: string, name: string, pass: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password: pass })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    setCurrentUser(data.user);
    showToast(`Welcome to PantryPilot, Chef ${data.user.name}!`);
  };

  const handleGuestMode = async () => {
    const res = await fetch('/api/auth/guest', { method: 'POST' });
    const data = await res.json();
    setCurrentUser(data.user);
    showToast('Continuing as Guest Explorer');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out');
  };

  // Which list of recipes to show based on active tab in search
  const displayedMatches = (() => {
    if (activeCategorySection === 'CAN_MAKE_NOW') return canMakeNow;
    if (activeCategorySection === 'ALMOST_THERE') return almostThere;
    if (activeCategorySection === 'EXPLORE') return explore;
    return allMatches;
  })();

  const selectedMatch = allMatches.find(m => m.recipe.id === selectedRecipeId);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedRecipes.length}
        shoppingCount={shoppingList.filter(i => !i.isPurchased).length}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPantryBasics={() => setIsPantryModalOpen(true)}
        onOpenAiGenerator={() => setIsAiModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'search' && (
          <div>
            {/* Hero Input Area */}
            <HeroSearch
              onSearch={(ings) => executeMatching(ings, userPantryBasics, filters)}
              extractedIngredients={extractedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
              onAddIngredient={handleAddIngredient}
              isExtracting={isExtracting}
              onExtractText={handleExtractText}
            />

            {/* Filter Toolbar */}
            <FilterToolbar
              filters={filters}
              onFilterChange={handleFilterChange}
              activeCategorySection={activeCategorySection}
              setActiveCategorySection={setActiveCategorySection}
              canMakeNowCount={canMakeNow.length}
              almostThereCount={almostThere.length}
              exploreCount={explore.length}
            />

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header Title for Current Category */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 mb-6 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {activeCategorySection === 'CAN_MAKE_NOW' && 'Recipes Made With Your Entered Ingredients'}
                      {activeCategorySection === 'ALMOST_THERE' && 'Almost There (Missing 1-2 Items)'}
                      {activeCategorySection === 'EXPLORE' && 'Explore (Dishes using your ingredients)'}
                      {activeCategorySection === 'ALL' && 'All Recommended Recipes'}
                    </h2>
                    {activeCategorySection === 'CAN_MAKE_NOW' && (
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        100% Core Match Only
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {activeCategorySection === 'CAN_MAKE_NOW'
                      ? `Showing only recipes you can prepare using the ingredients you entered (0 missing ingredients).`
                      : `Showing ${displayedMatches.length} recipe${displayedMatches.length !== 1 ? 's' : ''} ranked by ingredient match and feasibility.`}
                  </p>
                </div>

                {/* Almost There Toggle or AI Recipe Generator Callout */}
                <div className="flex items-center space-x-2">
                  {activeCategorySection === 'CAN_MAKE_NOW' && almostThere.length > 0 && (
                    <button
                      onClick={() => setActiveCategorySection('ALMOST_THERE')}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors cursor-pointer"
                    >
                      <span>Also see {almostThere.length} almost-there recipes</span>
                    </button>
                  )}
                  {activeCategorySection !== 'CAN_MAKE_NOW' && canMakeNow.length > 0 && (
                    <button
                      onClick={() => setActiveCategorySection('CAN_MAKE_NOW')}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer"
                    >
                      <span>Back to strictly entered ingredients ({canMakeNow.length})</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                    <span className="hidden md:inline">Create AI Recipe</span>
                  </button>
                </div>
              </div>

              {/* Exact Recipe Spotlight Card if user searched for a recipe directly */}
              {exactRecipeMatch && (
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                      ★
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                        Direct Entered Recipe Found
                      </div>
                      <div className="text-base font-serif font-bold text-slate-900">
                        {exactRecipeMatch.recipe.name}
                      </div>
                      <div className="text-xs text-slate-600">
                        {exactRecipeMatch.matchPercentage}% match with your kitchen · {exactRecipeMatch.recipe.prep_time + exactRecipeMatch.recipe.cook_time} mins · {exactRecipeMatch.recipe.cuisine}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRecipeId(exactRecipeMatch.recipe.id)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-center"
                  >
                    Cook This Recipe
                  </button>
                </div>
              )}

              {/* Grid or Empty State */}
              {isMatching ? (
                <div className="py-20 text-center text-slate-500 font-medium">
                  Evaluating 100+ recipes against your kitchen items...
                </div>
              ) : displayedMatches.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-stone-300 max-w-md mx-auto p-8">
                  <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <h3 className="text-base font-bold text-slate-700">No exact 100% matches with only these items</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    You can view recipes that need only 1 or 2 extra pantry items, or let our AI Chef create an original dish tailored to your exact ingredients.
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    {almostThere.length > 0 && (
                      <button
                        onClick={() => setActiveCategorySection('ALMOST_THERE')}
                        className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        View {almostThere.length} Almost-There Recipes
                      </button>
                    )}
                    <button
                      onClick={() => setIsAiModalOpen(true)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Generate with AI Chef
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedMatches.map((match) => (
                    <RecipeCard
                      key={match.recipe.id}
                      matchResult={match}
                      isSaved={savedRecipes.some(s => s.recipeId === match.recipe.id)}
                      onToggleSave={handleToggleSave}
                      onSelectRecipe={(id) => setSelectedRecipeId(id)}
                      onAddMissingToShoppingList={handleAddMissingToShoppingList}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Saved Recipes */}
        {activeTab === 'saved' && (
          <SavedRecipesView
            savedRecipes={savedRecipes}
            onSelectRecipe={(id) => setSelectedRecipeId(id)}
            onRemoveSaved={handleToggleSave}
          />
        )}

        {/* Tab 3: Shopping List */}
        {activeTab === 'shopping' && (
          <ShoppingListView
            items={shoppingList}
            onTogglePurchased={handleTogglePurchased}
            onDeleteItem={handleDeleteShoppingItem}
            onClearAll={handleClearShoppingList}
            onAddItem={handleAddSingleShoppingItem}
          />
        )}

        {/* Tab 4: Search History */}
        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onRerunSearch={(ings) => {
              setActiveTab('search');
              executeMatching(ings, userPantryBasics, filters);
            }}
          />
        )}

        {/* Tab 5: Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            onSelectTab={setActiveTab}
            onSelectRecipe={(id) => setSelectedRecipeId(id)}
            onSearchIngredient={(ing) => {
              setActiveTab('search');
              handleAddIngredient(ing);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-8 border-t border-stone-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-white text-sm">PantryPilot</span>
            <span>—</span>
            <span>AI Ingredient-to-Recipe Generator</span>
          </div>
          <div className="text-stone-400 text-[11px]">
            100+ Authentic Recipes · Deterministic Ingredient Matching · Zero Kitchen Waste
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedRecipeId && (
        <RecipeDetailModal
          recipeId={selectedRecipeId}
          matchResult={selectedMatch}
          onClose={() => setSelectedRecipeId(null)}
          isSaved={savedRecipes.some(s => s.recipeId === selectedRecipeId)}
          onToggleSave={handleToggleSave}
          onAddMissingToShoppingList={handleAddMissingToShoppingList}
          onRateRecipe={handleRateRecipe}
        />
      )}

      <AiRecipeModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        availableIngredients={extractedIngredients}
        onRecipeGenerated={(newRecipe) => {
          showToast(`Generated: ${newRecipe.name}!`);
          setSelectedRecipeId(newRecipe.id);
          // Re-evaluate matches
          executeMatching(extractedIngredients.map(i => i.normalizedName), userPantryBasics, filters);
        }}
      />

      <PantryBasicsModal
        isOpen={isPantryModalOpen}
        onClose={() => setIsPantryModalOpen(false)}
        userPantryBasics={userPantryBasics}
        onSavePantryBasics={handleSavePantryBasics}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGuestMode={handleGuestMode}
        onLogout={handleLogout}
      />
    </div>
  );
}
