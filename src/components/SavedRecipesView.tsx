import React, { useState } from 'react';
import { Bookmark, Clock, Users, Trash2, ExternalLink } from 'lucide-react';
import { SavedRecipe } from '../types/recipe.js';

interface SavedRecipesViewProps {
  savedRecipes: SavedRecipe[];
  onSelectRecipe: (recipeId: string) => void;
  onRemoveSaved: (recipeId: string) => void;
}

export const SavedRecipesView: React.FC<SavedRecipesViewProps> = ({
  savedRecipes,
  onSelectRecipe,
  onRemoveSaved
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filtered = filterCategory === 'All'
    ? savedRecipes
    : savedRecipes.filter(s => s.recipe.category.toLowerCase() === filterCategory.toLowerCase());

  const categories = ['All', ...Array.from(new Set(savedRecipes.map(s => s.recipe.category)))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Your Saved Recipes
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Bookmarked recipes you love or plan to cook again soon.
          </p>
        </div>

        {/* Category Filter */}
        {savedRecipes.length > 0 && (
          <div className="flex items-center space-x-1 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-amber-600 text-white'
                    : 'bg-white border border-stone-200 text-slate-600 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-12 p-12 text-center bg-white rounded-3xl border border-dashed border-stone-300 max-w-md mx-auto">
          <Bookmark className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">No saved recipes yet</h3>
          <p className="text-xs text-slate-500 mt-1">
            Browse through recipe matches and tap the bookmark icon on any card to save it here for quick access.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(({ recipe, savedAt, notes }) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div
                  className="relative h-44 cursor-pointer overflow-hidden group"
                  onClick={() => onSelectRecipe(recipe.id)}
                >
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex justify-between items-center">
                    <span className="font-semibold">{recipe.cuisine}</span>
                    <span className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">{recipe.diet}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3
                    onClick={() => onSelectRecipe(recipe.id)}
                    className="font-serif font-bold text-base text-slate-900 hover:text-amber-800 cursor-pointer line-clamp-1"
                  >
                    {recipe.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="mt-3 flex items-center space-x-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{recipe.prep_time + recipe.cook_time}m</span>
                    </span>
                    <span>•</span>
                    <span className="capitalize">{recipe.difficulty}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{recipe.servings} serv</span>
                    </span>
                  </div>

                  {notes && (
                    <div className="mt-2.5 p-2 bg-amber-50 rounded-lg text-[11px] text-amber-900 border border-amber-200 italic">
                      &quot;{notes}&quot;
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectRecipe(recipe.id)}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onRemoveSaved(recipe.id)}
                  className="text-slate-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
