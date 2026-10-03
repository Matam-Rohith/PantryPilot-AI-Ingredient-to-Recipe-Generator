import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Bookmark, Sparkles, ShoppingBag, History, Flame, Utensils } from 'lucide-react';
import { UserProfile } from '../types/recipe.js';

interface DashboardStats {
  savedCount: number;
  searchesCount: number;
  shoppingCount: number;
  topIngredients: { name: string; count: number }[];
  favoriteCuisines: string[];
  recentSaved: any[];
  recentHistory: any[];
}

interface DashboardViewProps {
  currentUser: UserProfile | null;
  onSelectTab: (tab: 'search' | 'saved' | 'shopping' | 'history') => void;
  onSelectRecipe: (recipeId: string) => void;
  onSearchIngredient: (ing: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onSelectTab,
  onSelectRecipe,
  onSearchIngredient
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to load dashboard metrics:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Kitchen Dashboard
          </h2>
        </div>
        <p className="mt-1 text-xs text-slate-600">
          Overview of your cooking activity, kitchen inventory tendencies, and saved recipes.
        </p>
      </div>

      {loading || !stats ? (
        <div className="py-12 text-center text-slate-500 font-medium">Loading dashboard metrics...</div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => onSelectTab('saved')}
              className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Saved Recipes</span>
                <Bookmark className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-3xl font-serif font-extrabold text-slate-900">
                {stats.savedCount}
              </div>
              <div className="text-xs text-slate-500 mt-1">Bookmarked culinary inspirations</div>
            </div>

            <div
              onClick={() => onSelectTab('history')}
              className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Searches Run</span>
                <History className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-serif font-extrabold text-slate-900">
                {stats.searchesCount}
              </div>
              <div className="text-xs text-slate-500 mt-1">Kitchen extractions performed</div>
            </div>

            <div
              onClick={() => onSelectTab('shopping')}
              className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Items on Shopping List</span>
                <ShoppingBag className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-3xl font-serif font-extrabold text-slate-900">
                {stats.shoppingCount}
              </div>
              <div className="text-xs text-slate-500 mt-1">Ingredients remaining to buy</div>
            </div>
          </div>

          {/* Two-Column Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Kitchen Ingredients */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <h3 className="text-base font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Frequently Used Ingredients</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Ingredients you most often have in your kitchen:
              </p>

              {stats.topIngredients.length === 0 ? (
                <div className="text-xs text-slate-400 italic">No search patterns recorded yet.</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {stats.topIngredients.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSearchIngredient(item.name)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <span className="capitalize">{item.name}</span>
                      <span className="px-1.5 py-0.2 bg-amber-200/80 rounded text-[10px] font-bold text-amber-950">
                        {item.count}×
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Favorite Cuisines & Preferences */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <h3 className="text-base font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>Favorite Cooking Styles</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Cuisines preferred for ranking and AI recipe recommendations:
              </p>

              <div className="flex flex-wrap gap-2">
                {(stats.favoriteCuisines.length > 0
                  ? stats.favoriteCuisines
                  : ['Indian (Homestyle)', 'South Indian', 'Chinese-inspired', 'Italian', 'Mexican']
                ).map((cui, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 text-slate-800 text-xs font-semibold border border-stone-200"
                  >
                    {cui}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Saved Recipes */}
          {stats.recentSaved.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-serif font-bold text-slate-900">
                  Recently Saved Recipes
                </h3>
                <button
                  onClick={() => onSelectTab('saved')}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.recentSaved.map(({ recipe }: any) => (
                  <div
                    key={recipe.id}
                    onClick={() => onSelectRecipe(recipe.id)}
                    className="rounded-xl border border-stone-200 overflow-hidden hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="h-28 overflow-hidden bg-stone-100">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-serif font-bold text-slate-900 truncate">
                        {recipe.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {recipe.cuisine} · {recipe.prep_time + recipe.cook_time}m
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
