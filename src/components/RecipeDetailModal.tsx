import React, { useState, useEffect } from 'react';
import { X, Clock, Users, Bookmark, ChefHat, Check, AlertCircle, ShoppingBag, Star, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { Recipe, RecipeMatchResult } from '../types/recipe.js';

interface RecipeDetailModalProps {
  recipeId: string | null;
  matchResult?: RecipeMatchResult;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (recipeId: string) => void;
  onAddMissingToShoppingList: (missing: string[], recipeName: string, recipeId: string) => void;
  onRateRecipe: (recipeId: string, rating: number, review?: string) => Promise<void>;
  userRating?: number | null;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipeId,
  matchResult,
  onClose,
  isSaved,
  onToggleSave,
  onAddMissingToShoppingList,
  onRateRecipe,
  userRating: initialUserRating
}) => {
  const [recipe, setRecipe] = useState<Recipe | null>(matchResult?.recipe || null);
  const [loading, setLoading] = useState(!recipe);
  const [activeTab, setActiveTab] = useState<'instructions' | 'variations' | 'substitutions'>('instructions');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Step Timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Rating State
  const [selectedRating, setSelectedRating] = useState<number>(initialUserRating || 0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  useEffect(() => {
    if (!recipeId) return;

    if (matchResult?.recipe && matchResult.recipe.id === recipeId) {
      setRecipe(matchResult.recipe);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/recipes/${recipeId}`)
      .then(res => res.json())
      .then(data => {
        if (data.recipe) {
          setRecipe(data.recipe);
          if (data.userRating) setSelectedRating(data.userRating);
        }
      })
      .catch(err => console.error('Failed to load recipe detail:', err))
      .finally(() => setLoading(false));
  }, [recipeId, matchResult]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => (s > 0 ? s - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!recipeId) return null;

  const handleStartTimer = (mins: number) => {
    setTimerSeconds(mins * 60);
    setIsTimerRunning(true);
  };

  const handleRatingSubmit = async () => {
    if (!selectedRating || !recipe) return;
    setIsSubmittingRating(true);
    try {
      await onRateRecipe(recipe.id, selectedRating, reviewText);
      setRatingSubmitted(true);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const missingList = matchResult?.missingIngredients || [];
  const matchedSet = new Set(matchResult?.matchedIngredients || []);
  const pantrySet = new Set(matchResult?.pantryBasicsUsed || []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {loading || !recipe ? (
          <div className="p-12 text-center text-slate-500 font-medium">Loading recipe details...</div>
        ) : (
          <>
            {/* Header Hero Image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-amber-600 text-white">
                    {matchResult ? `${matchResult.matchPercentage}% Match` : recipe.cuisine}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/50 backdrop-blur-xs text-white">
                    {recipe.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/50 backdrop-blur-xs text-white">
                    {recipe.diet}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  {recipe.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-200 line-clamp-2">
                  {recipe.description}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="bg-white border-b border-stone-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1.5 font-medium">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Prep: {recipe.prep_time}m · Cook: {recipe.cook_time}m</span>
                </div>
                <div className="flex items-center space-x-1.5 font-medium">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>{recipe.servings} Servings</span>
                </div>
                <div className="capitalize font-medium">
                  <span className="text-slate-400">Difficulty: </span>
                  <span className="text-slate-900 font-bold">{recipe.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => onToggleSave(recipe.id)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-amber-700' : ''}`} />
                <span>{isSaved ? 'Saved in Bookmarks' : 'Save Recipe'}</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-7 space-y-6">
              {/* Ingredients Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                    Ingredients Checklist
                  </h3>
                  {missingList.length > 0 && (
                    <button
                      onClick={() => onAddMissingToShoppingList(missingList, recipe.name, recipe.id)}
                      className="text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1 rounded-lg transition-colors inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add {missingList.length} Missing to Shopping List</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.ingredients.map((ing, idx) => {
                    const norm = ing.normalizedName;
                    const isMatched = matchedSet.has(norm);
                    const isPantry = pantrySet.has(norm) || ing.isPantryBasics;
                    const isMissing = !isMatched && !isPantry && !ing.isOptional;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs sm:text-sm font-medium ${
                          isMatched
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : isPantry
                            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                            : isMissing
                            ? 'bg-red-50/70 border-red-200 text-red-950'
                            : 'bg-stone-50 border-stone-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {isMatched ? (
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          ) : isPantry ? (
                            <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                              🧂
                            </span>
                          ) : isMissing ? (
                            <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">
                              ✕
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-full bg-stone-300 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                              ○
                            </span>
                          )}

                          <span className="font-semibold">{ing.name}</span>
                          {ing.quantity && (
                            <span className="text-slate-500 text-xs">
                              ({ing.quantity} {ing.unit || ''})
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-semibold">
                          {isMatched && <span className="text-emerald-700">You have</span>}
                          {isPantry && <span className="text-amber-700">Pantry staple</span>}
                          {isMissing && <span className="text-red-700">Missing</span>}
                          {ing.isOptional && <span className="text-slate-500">Optional</span>}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Tabs for Cooking, Variations, Substitutions */}
              <div className="border-b border-stone-200">
                <div className="flex space-x-6 text-sm font-bold">
                  <button
                    onClick={() => setActiveTab('instructions')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'instructions'
                        ? 'border-amber-700 text-amber-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Instructions & Cooking Mode
                  </button>
                  <button
                    onClick={() => setActiveTab('variations')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'variations'
                        ? 'border-amber-700 text-amber-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Recipe Variations
                  </button>
                  <button
                    onClick={() => setActiveTab('substitutions')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'substitutions'
                        ? 'border-amber-700 text-amber-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Kitchen Substitutions
                  </button>
                </div>
              </div>

              {/* Tab 1: Step by Step Cooking Mode */}
              {activeTab === 'instructions' && (
                <div className="space-y-4">
                  {/* Step Timer Widget */}
                  <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-amber-700" />
                      <div>
                        <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                          Active Kitchen Timer
                        </div>
                        <div className="text-lg font-mono font-bold text-slate-900">
                          {formatTimer(timerSeconds)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {!isTimerRunning ? (
                        <button
                          onClick={() => handleStartTimer(recipe.cook_time || 10)}
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Start ({recipe.cook_time}m)</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsTimerRunning(false)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setIsTimerRunning(false);
                          setTimerSeconds(0);
                        }}
                        className="p-1.5 rounded-lg border border-amber-300 text-slate-700 hover:bg-amber-100 transition-colors cursor-pointer"
                        title="Reset timer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-3">
                    {recipe.steps.map((step, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          activeStepIndex === idx
                            ? 'bg-white border-amber-500 shadow-sm ring-2 ring-amber-500/10'
                            : 'bg-white/60 border-stone-200/80 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                            activeStepIndex === idx
                              ? 'bg-amber-600 text-white'
                              : 'bg-stone-200 text-slate-700'
                          }`}>
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                              Step {idx + 1}
                            </h4>
                            <p className="text-sm sm:text-base text-slate-800 font-normal leading-relaxed">
                              {step}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Recipe Variations */}
              {activeTab === 'variations' && (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-2xl border border-stone-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
                      <span className="text-red-500 font-bold">🌶️</span>
                      <span>Spicy Version</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {recipe.variations?.spicy || 'Add sliced fiery green chillies or extra crushed black pepper to give this recipe an assertive kick.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-stone-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
                      <span>💪</span>
                      <span>High-Protein Version</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {recipe.variations?.highProtein || 'Boost the protein content by folding in an extra scrambled egg, 50g cubed paneer, or shredded boiled chicken.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-stone-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
                      <span>🌱</span>
                      <span>Vegetarian / Vegan Version</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {recipe.variations?.vegetarian || 'Replace eggs with crumbled firm tofu or pan-seared paneer cubes seasoned with turmeric.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-stone-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
                      <span>⚡</span>
                      <span>Quick Under-10-Min Version</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {recipe.variations?.quick || 'Cook over high wok heat for 5-7 minutes flat, using pre-cooked or day-old chilled rice.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Substitutions */}
              {activeTab === 'substitutions' && (
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-slate-600 mb-2">
                    Missing an ingredient? Use these culinary-tested kitchen substitutions:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                      <div className="text-xs font-bold text-slate-900">Soy Sauce Substitute</div>
                      <div className="text-xs text-slate-600 mt-1">Use a pinch of salt plus a drop of vinegar or lime juice for savory depth.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                      <div className="text-xs font-bold text-slate-900">Butter Substitute</div>
                      <div className="text-xs text-slate-600 mt-1">Use equal parts neutral cooking oil or aromatic ghee.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                      <div className="text-xs font-bold text-slate-900">Coriander / Cilantro Substitute</div>
                      <div className="text-xs text-slate-600 mt-1">Fresh mint leaves or thinly sliced spring onion greens.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                      <div className="text-xs font-bold text-slate-900">Lemon Juice Substitute</div>
                      <div className="text-xs text-slate-600 mt-1">Use 1/2 amount of white vinegar or a spoonful of whisked curd.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Star Rating & Review Section */}
              <div className="pt-6 border-t border-stone-200">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-2">
                  Rate & Review this Recipe
                </h4>

                {ratingSubmitted ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium border border-emerald-200">
                    Thank you! Your rating has been recorded.
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSelectedRating(star)}
                          className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${star <= selectedRating ? 'fill-amber-500' : 'text-stone-300'}`} />
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder="Optional feedback (e.g. Delicious with extra pepper!)"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-stone-300 text-slate-800 focus:outline-none focus:border-amber-500"
                    />

                    <button
                      onClick={handleRatingSubmit}
                      disabled={selectedRating === 0 || isSubmittingRating}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      {isSubmittingRating ? 'Saving...' : 'Submit'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
