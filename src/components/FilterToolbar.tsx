import React from 'react';
import { Filter, Clock, Flame, Utensils, RotateCcw, Sparkles } from 'lucide-react';
import { Cuisine, Diet, Difficulty, FilterPreferences } from '../types/recipe.js';

interface FilterToolbarProps {
  filters: FilterPreferences;
  onFilterChange: (filters: FilterPreferences) => void;
  activeCategorySection: 'CAN_MAKE_NOW' | 'ALMOST_THERE' | 'EXPLORE' | 'ALL';
  setActiveCategorySection: (sec: 'CAN_MAKE_NOW' | 'ALMOST_THERE' | 'EXPLORE' | 'ALL') => void;
  canMakeNowCount: number;
  almostThereCount: number;
  exploreCount: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFilterChange,
  activeCategorySection,
  setActiveCategorySection,
  canMakeNowCount,
  almostThereCount,
  exploreCount
}) => {
  const updateFilter = (key: keyof FilterPreferences, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onFilterChange({
      maxTime: undefined,
      difficulty: 'Any',
      cuisine: 'Any',
      diet: 'Any',
      useOnlyMyIngredients: false,
      leftoverMode: false
    });
  };

  const hasActiveFilters = Boolean(
    filters.maxTime ||
    (filters.difficulty && filters.difficulty !== 'Any') ||
    (filters.cuisine && filters.cuisine !== 'Any') ||
    (filters.diet && filters.diet !== 'Any') ||
    filters.useOnlyMyIngredients ||
    filters.leftoverMode
  );

  return (
    <div className="bg-white border-b border-[#EBE5DA] py-3.5 px-4 sm:px-6 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Category Tabs: CAN MAKE NOW | ALMOST THERE | EXPLORE */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategorySection('CAN_MAKE_NOW')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeCategorySection === 'CAN_MAKE_NOW'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            <span>Can Make Now</span>
            <span className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
              activeCategorySection === 'CAN_MAKE_NOW' ? 'bg-white/20 text-white' : 'bg-stone-200 text-slate-800'
            }`}>
              {canMakeNowCount}
            </span>
          </button>

          <button
            onClick={() => setActiveCategorySection('ALMOST_THERE')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeCategorySection === 'ALMOST_THERE'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            <span>Almost There</span>
            <span className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
              activeCategorySection === 'ALMOST_THERE' ? 'bg-white/20 text-white' : 'bg-stone-200 text-slate-800'
            }`}>
              {almostThereCount}
            </span>
          </button>

          <button
            onClick={() => setActiveCategorySection('EXPLORE')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeCategorySection === 'EXPLORE'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            <span>Explore</span>
            <span className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
              activeCategorySection === 'EXPLORE' ? 'bg-white/20 text-white' : 'bg-stone-200 text-slate-800'
            }`}>
              {exploreCount}
            </span>
          </button>

          <button
            onClick={() => setActiveCategorySection('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategorySection === 'ALL'
                ? 'bg-stone-800 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            All Results
          </button>
        </div>

        {/* Filters and Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Use Only My Ingredients Toggle */}
          <label className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border font-semibold cursor-pointer transition-colors ${
            filters.useOnlyMyIngredients
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-stone-50 text-slate-600 border-stone-200 hover:bg-stone-100'
          }`}>
            <input
              type="checkbox"
              checked={Boolean(filters.useOnlyMyIngredients)}
              onChange={(e) => updateFilter('useOnlyMyIngredients', e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Use only my ingredients</span>
          </label>

          {/* Leftover Mode Toggle */}
          <label className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border font-semibold cursor-pointer transition-colors ${
            filters.leftoverMode
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : 'bg-stone-50 text-slate-600 border-stone-200 hover:bg-stone-100'
          }`}>
            <input
              type="checkbox"
              checked={Boolean(filters.leftoverMode)}
              onChange={(e) => updateFilter('leftoverMode', e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
            />
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Use my leftovers</span>
            </span>
          </label>

          {/* Cooking Time Dropdown */}
          <select
            value={filters.maxTime || ''}
            onChange={(e) => updateFilter('maxTime', e.target.value ? Number(e.target.value) : undefined)}
            className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-slate-700 font-medium focus:outline-none focus:border-amber-500"
          >
            <option value="">Any Time</option>
            <option value="15">Under 15 mins</option>
            <option value="30">Under 30 mins</option>
            <option value="45">Under 45 mins</option>
          </select>

          {/* Diet Dropdown */}
          <select
            value={filters.diet || 'Any'}
            onChange={(e) => updateFilter('diet', e.target.value as Diet)}
            className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-slate-700 font-medium focus:outline-none focus:border-amber-500"
          >
            <option value="Any">All Diets</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-vegetarian">Non-vegetarian</option>
            <option value="Eggitarian">Eggitarian</option>
            <option value="Vegan">Vegan</option>
          </select>

          {/* Cuisine Dropdown */}
          <select
            value={filters.cuisine || 'Any'}
            onChange={(e) => updateFilter('cuisine', e.target.value as Cuisine)}
            className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-slate-700 font-medium focus:outline-none focus:border-amber-500"
          >
            <option value="Any">All Cuisines</option>
            <option value="Indian">Indian (Homestyle)</option>
            <option value="South Indian">South Indian</option>
            <option value="North Indian">North Indian</option>
            <option value="Chinese-inspired">Chinese / Indo-Chinese</option>
            <option value="Italian">Italian</option>
            <option value="Mexican-inspired">Mexican</option>
            <option value="American">American / Continental</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-1 px-2 py-1.5 text-xs text-slate-500 hover:text-amber-800 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
