import React from 'react';
import { Clock, Users, Bookmark, CheckCircle2, XCircle, Plus, Sparkles, ChefHat } from 'lucide-react';
import { RecipeMatchResult } from '../types/recipe.js';

interface RecipeCardProps {
  matchResult: RecipeMatchResult;
  isSaved: boolean;
  onToggleSave: (recipeId: string) => void;
  onSelectRecipe: (recipeId: string) => void;
  onAddMissingToShoppingList: (missing: string[], recipeName: string, recipeId: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  matchResult,
  isSaved,
  onToggleSave,
  onSelectRecipe,
  onAddMissingToShoppingList
}) => {
  const { recipe, matchPercentage, matchedIngredients, missingIngredients, canMakeNow, substitutedIngredients } = matchResult;
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  const getMatchBadgeStyle = () => {
    if (canMakeNow || matchPercentage === 100) {
      return 'bg-emerald-600 text-white border-emerald-700 shadow-xs';
    }
    if (matchPercentage >= 70) {
      return 'bg-amber-600 text-white border-amber-700 shadow-xs';
    }
    return 'bg-slate-700 text-white border-slate-800';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5DFD5] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Recipe Header & Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectRecipe(recipe.id)}>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
          <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wide border ${getMatchBadgeStyle()}`}>
            {matchPercentage}% Match
          </span>
          {canMakeNow && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-white/90 text-emerald-800 backdrop-blur-xs">
              Can make now
            </span>
          )}
          {recipe.source === 'ai_generated' && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-white flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Chef</span>
            </span>
          )}
        </div>

        {/* Save Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(recipe.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-transform active:scale-90 ${
            isSaved
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save recipe'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Cuisine and Category Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/90">
          <span className="font-semibold drop-shadow-xs">{recipe.cuisine} • {recipe.category}</span>
          <span className="bg-black/40 px-2 py-0.5 rounded text-[11px] font-medium backdrop-blur-xs">
            {recipe.diet}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onSelectRecipe(recipe.id)}
              className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1 cursor-pointer"
            >
              {recipe.name}
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>

          {/* Quick Metrics: Time, Difficulty, Servings */}
          <div className="mt-3 flex items-center space-x-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{totalTime} min</span>
            </span>
            <span>•</span>
            <span className="capitalize">{recipe.difficulty}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{recipe.servings} serv</span>
            </span>
          </div>

          {/* Ingredients Analysis Breakdown */}
          <div className="mt-4 pt-3 border-t border-[#F0EBE1] space-y-2">
            {/* Matched Ingredients You Have */}
            <div>
              <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>You Have ({matchedIngredients.length}):</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {matchedIngredients.slice(0, 5).map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    {ing} ✓
                  </span>
                ))}
                {matchedIngredients.length > 5 && (
                  <span className="text-[11px] text-slate-400 self-center">
                    +{matchedIngredients.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Substituted ingredients if any */}
            {substitutedIngredients.length > 0 && (
              <div className="pt-1">
                <div className="text-[11px] font-semibold text-amber-800 flex items-center space-x-1">
                  <span>💡 Substitute:</span>
                  <span className="font-normal text-slate-600">
                    Use {substitutedIngredients[0].substitute} for {substitutedIngredients[0].original}
                  </span>
                </div>
              </div>
            )}

            {/* Missing Ingredients */}
            {missingIngredients.length > 0 && (
              <div className="pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <div className="flex items-center space-x-1 text-red-600">
                    <XCircle className="w-3 h-3" />
                    <span>Missing ({missingIngredients.length}):</span>
                  </div>
                  <button
                    onClick={() => onAddMissingToShoppingList(missingIngredients, recipe.name, recipe.id)}
                    className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold underline inline-flex items-center cursor-pointer"
                  >
                    + Add to list
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {missingIngredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-700 border border-red-200"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 flex items-center space-x-2">
          <button
            onClick={() => onSelectRecipe(recipe.id)}
            className="flex-1 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold transition-colors text-center cursor-pointer"
          >
            Cook Recipe
          </button>
          {missingIngredients.length > 0 && (
            <button
              onClick={() => onAddMissingToShoppingList(missingIngredients, recipe.name, recipe.id)}
              className="p-2 rounded-xl border border-stone-300 text-slate-700 hover:bg-stone-100 transition-colors"
              title="Add missing ingredients to shopping list"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
