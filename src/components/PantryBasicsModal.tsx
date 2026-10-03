import React, { useState } from 'react';
import { X, Check, Sliders, RotateCcw } from 'lucide-react';
import { DEFAULT_PANTRY_BASICS } from '../../server/data/ingredients.js';

interface PantryBasicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPantryBasics: string[];
  onSavePantryBasics: (basics: string[]) => void;
}

const COMMON_PANTRY_ITEMS = [
  { id: 'salt', name: 'Table Salt / Sea Salt' },
  { id: 'oil', name: 'Cooking Oil (Vegetable / Olive)' },
  { id: 'water', name: 'Water' },
  { id: 'black pepper', name: 'Black Pepper (Ground / Crushed)' },
  { id: 'sugar', name: 'Sugar' },
  { id: 'turmeric', name: 'Turmeric Powder (Haldi)' },
  { id: 'cumin', name: 'Cumin Seeds (Jeera)' },
  { id: 'red chilli powder', name: 'Red Chilli Powder / Paprika' },
  { id: 'mustard seeds', name: 'Mustard Seeds (Rai)' },
  { id: 'butter', name: 'Butter' },
  { id: 'ghee', name: 'Ghee (Clarified Butter)' },
  { id: 'garlic', name: 'Garlic' },
  { id: 'ginger', name: 'Fresh Ginger' },
  { id: 'vinegar', name: 'White Vinegar' },
  { id: 'flour', name: 'Wheat Flour / Atta / Plain Flour' },
  { id: 'cornstarch', name: 'Cornstarch / Corn Flour' }
];

export const PantryBasicsModal: React.FC<PantryBasicsModalProps> = ({
  isOpen,
  onClose,
  userPantryBasics,
  onSavePantryBasics
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(userPantryBasics));

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    const next = new Set(selectedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedItems(next);
  };

  const handleResetDefaults = () => {
    setSelectedItems(new Set(DEFAULT_PANTRY_BASICS));
  };

  const handleSave = () => {
    onSavePantryBasics(Array.from(selectedItems));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-200 hover:bg-stone-300 text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-900">
            Configure Your Pantry Basics
          </h3>
        </div>

        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          Select the everyday ingredients and spices you always have in stock. When calculating recipes, PantryPilot will treat these items as available so they won&apos;t count as missing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
          {COMMON_PANTRY_ITEMS.map((item) => {
            const isChecked = selectedItems.has(item.id);
            return (
              <label
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
                    : 'bg-white border-stone-200 text-slate-600 hover:bg-stone-50'
                }`}
              >
                <span>{item.name}</span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-amber-600 text-white' : 'border border-stone-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs text-slate-500 hover:text-amber-800 font-medium inline-flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
