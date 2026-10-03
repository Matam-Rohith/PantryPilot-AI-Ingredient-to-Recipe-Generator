import React, { useState } from 'react';
import { Search, Sparkles, X, Plus, Shuffle, Loader2 } from 'lucide-react';
import { ExtractedIngredient } from '../types/recipe.js';

interface HeroSearchProps {
  onSearch: (ingredients: string[]) => void;
  extractedIngredients: ExtractedIngredient[];
  onRemoveIngredient: (index: number) => void;
  onAddIngredient: (name: string) => void;
  isExtracting: boolean;
  onExtractText: (text: string) => void;
}

const PRESET_EXAMPLES = [
  { label: 'Rice + Egg', text: 'I have 2 eggs, cooked rice, onion, tomato and green chilli' },
  { label: 'Potato + Onion', text: 'There are 2 potatoes, onions, cumin and green chillies in my kitchen' },
  { label: 'Chicken + Rice', text: 'I have 250g chicken breast, leftover rice, garlic and onions' },
  { label: 'Tomato + Bread', text: 'I have sliced bread, 2 ripe tomatoes, onion and butter' },
  { label: 'Paneer + Onion', text: 'I have 200g paneer, onions, capsicum and tomatoes' },
  { label: 'Leftover Rice + Veggies', text: 'I have cold leftover rice, carrots, peas, onion and soy sauce' },
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  extractedIngredients,
  onRemoveIngredient,
  onAddIngredient,
  isExtracting,
  onExtractText,
}) => {
  const [inputText, setInputText] = useState('I have 2 eggs, rice, onion, tomato and green chilli.');
  const [quickAddInput, setQuickAddInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onExtractText(inputText);
  };

  const handleSurpriseMe = () => {
    const randomPreset = PRESET_EXAMPLES[Math.floor(Math.random() * PRESET_EXAMPLES.length)];
    setInputText(randomPreset.text);
    onExtractText(randomPreset.text);
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddInput.trim()) return;
    onAddIngredient(quickAddInput.trim());
    setQuickAddInput('');
  };

  return (
    <div className="relative pt-6 pb-8 md:pt-10 md:pb-12 border-b border-[#EBE5DA] bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Main Heading */}
        <span className="inline-block uppercase tracking-wider text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-md mb-3 border border-amber-200">
          Smart Kitchen Assistant
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-slate-900 tracking-tight leading-tight">
          What can you make with what you already have?
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
          Tell us what&apos;s in your kitchen. We&apos;ll match authentic recipes you can cook right now without unexpected grocery trips.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-3xl mx-auto">
          <div className="relative rounded-2xl bg-white shadow-md shadow-stone-200/50 border-2 border-stone-200 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all p-2 sm:p-2.5">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1 flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g., I have 2 eggs, leftover rice, onion and tomato..."
                  className="w-full pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-normal bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                  title="Try a random pantry combination"
                >
                  <Shuffle className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Surprise Me</span>
                </button>

                <button
                  type="submit"
                  disabled={isExtracting || !inputText.trim()}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Extracting...</span>
                    </>
                  ) : (
                    <>
                      <span>Find Recipes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Preset Shortcuts */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span className="font-medium mr-1 text-slate-700">Quick ideas:</span>
          {PRESET_EXAMPLES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(preset.text);
                onExtractText(preset.text);
              }}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-stone-200/80 transition-all font-medium text-slate-700 cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Extracted Structured Ingredients Preview */}
        {extractedIngredients.length > 0 && (
          <div className="mt-6 pt-5 border-t border-[#EBE5DA] text-left max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Recognized Kitchen Items ({extractedIngredients.length}):
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  (Used directly in matching)
                </span>
              </div>
              <button
                onClick={() => onSearch(extractedIngredients.map(i => i.normalizedName))}
                className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline"
              >
                Re-match
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {extractedIngredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-[#DDD5C7] text-slate-800 shadow-2xs group"
                >
                  <span className="text-amber-700 font-bold">✓</span>
                  <span className="capitalize">{ing.normalizedName}</span>
                  {ing.quantity && (ing.quantity > 1 || ing.unit !== 'piece') && (
                    <span className="text-slate-500 font-normal text-[11px]">
                      ({ing.quantity} {ing.unit || ''})
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onRemoveIngredient(idx)}
                    className="text-slate-400 hover:text-red-500 focus:outline-none transition-colors ml-1"
                    title="Remove ingredient"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Quick Add Extra Ingredient */}
              <form onSubmit={handleQuickAdd} className="inline-flex items-center">
                <input
                  type="text"
                  value={quickAddInput}
                  onChange={(e) => setQuickAddInput(e.target.value)}
                  placeholder="+ Add more (e.g., garlic)"
                  className="w-36 text-xs px-2.5 py-1 rounded-lg bg-stone-100 border border-dashed border-stone-300 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
