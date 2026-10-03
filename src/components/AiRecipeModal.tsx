import React, { useState } from 'react';
import { X, Sparkles, ChefHat, Loader2, ArrowRight, Check } from 'lucide-react';
import { Cuisine, Diet, ExtractedIngredient, Recipe } from '../types/recipe.js';

interface AiRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableIngredients: ExtractedIngredient[];
  onRecipeGenerated: (recipe: Recipe) => void;
}

export const AiRecipeModal: React.FC<AiRecipeModalProps> = ({
  isOpen,
  onClose,
  availableIngredients,
  onRecipeGenerated
}) => {
  const [preferredCuisine, setPreferredCuisine] = useState<Cuisine>('Any');
  const [diet, setDiet] = useState<Diet>('Any');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (availableIngredients.length === 0) {
      setError('Please add at least one kitchen ingredient first');
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userIngredients: availableIngredients,
          preferredCuisine,
          diet,
          specialNotes
        })
      });

      const data = await res.json();
      if (!res.ok || !data.recipe) {
        throw new Error(data.error || 'Failed to generate AI recipe');
      }

      onRecipeGenerated(data.recipe);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI chef');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
              Creative AI Chef
            </span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            Create an Original Custom Recipe
          </h3>
          <p className="mt-1 text-xs text-amber-50">
            PantryPilot will craft an authentic recipe tailored exclusively to what is currently in your kitchen.
          </p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          {/* Ingredients Being Used */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Ingredients to be utilized ({availableIngredients.length}):
            </label>
            <div className="p-3 bg-white rounded-xl border border-stone-200 flex flex-wrap gap-1.5 min-h-[44px]">
              {availableIngredients.length > 0 ? (
                availableIngredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200"
                  >
                    <span>✓</span>
                    <span className="capitalize">{ing.name}</span>
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">
                  No ingredients provided yet. Please enter your ingredients in the main search.
                </span>
              )}
            </div>
          </div>

          {/* Cuisine Style & Diet */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Cuisine
              </label>
              <select
                value={preferredCuisine}
                onChange={(e) => setPreferredCuisine(e.target.value as Cuisine)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Any">Chef's Choice (Best Fit)</option>
                <option value="Indian">Indian (Homestyle)</option>
                <option value="South Indian">South Indian</option>
                <option value="North Indian">North Indian</option>
                <option value="Chinese-inspired">Indo-Chinese</option>
                <option value="Italian">Italian</option>
                <option value="Mexican-inspired">Mexican</option>
                <option value="American">American / Continental</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dietary Preference
              </label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value as Diet)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Any">Any Diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Eggitarian">Eggitarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-vegetarian">Non-vegetarian</option>
              </select>
            </div>
          </div>

          {/* Special Chef Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Custom Chef Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Extra spicy, suitable for toddler, make it crispy..."
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
              {error}
            </div>
          )}

          {/* Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating || availableIngredients.length === 0}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Authentic Recipe...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Generate Custom Recipe</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
