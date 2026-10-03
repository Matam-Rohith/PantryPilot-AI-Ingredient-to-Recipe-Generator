import React, { useState } from 'react';
import { ShoppingBag, Check, Trash2, Plus, Copy, CheckCheck } from 'lucide-react';
import { ShoppingListItem } from '../types/recipe.js';

interface ShoppingListViewProps {
  items: ShoppingListItem[];
  onTogglePurchased: (id: string, isPurchased: boolean) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onAddItem: (name: string) => void;
}

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  items,
  onTogglePurchased,
  onDeleteItem,
  onClearAll,
  onAddItem
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onAddItem(quickInput.trim());
    setQuickInput('');
  };

  const handleCopyList = () => {
    const unpurchased = items.filter(i => !i.isPurchased).map(i => `• ${i.ingredientName}${i.recipeName ? ` (for ${i.recipeName})` : ''}`);
    const text = `PantryPilot Shopping List:\n` + unpurchased.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCount = items.filter(i => !i.isPurchased).length;
  const completedCount = items.filter(i => i.isPurchased).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Kitchen Shopping List
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Missing ingredients from recipes you want to cook. Check them off as you shop.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyList}
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-slate-700 hover:bg-stone-50 transition-colors inline-flex items-center space-x-1 cursor-pointer"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy List'}</span>
            </button>
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-transparent transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Quick Add Bar */}
      <form onSubmit={handleAdd} className="mt-6 flex items-center space-x-2">
        <input
          type="text"
          value={quickInput}
          onChange={(e) => setQuickInput(e.target.value)}
          placeholder="Add an item to buy (e.g., Soy sauce, Biryani masala)..."
          className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold flex items-center space-x-1 shadow-2xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Items List */}
      <div className="mt-6 space-y-2">
        {items.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-stone-300">
            <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">Your shopping list is empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              When viewing recipes that are &quot;Almost There&quot;, click &quot;+ Add Missing Ingredients&quot; to automatically collect what you need here.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                item.isPurchased
                  ? 'bg-stone-50 border-stone-200 text-slate-400 line-through'
                  : 'bg-white border-stone-200 text-slate-800 shadow-2xs'
              }`}
            >
              <div
                onClick={() => onTogglePurchased(item.id, !item.isPurchased)}
                className="flex items-center space-x-3 cursor-pointer flex-1"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    item.isPurchased
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-stone-300 bg-white hover:border-amber-500'
                  }`}
                >
                  {item.isPurchased && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <div className="font-semibold text-sm capitalize">
                    {item.ingredientName}
                  </div>
                  {item.recipeName && (
                    <div className="text-[11px] text-slate-400">
                      Required for: <span className="font-medium text-slate-600">{item.recipeName}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDeleteItem(item.id)}
                className="text-slate-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-4 text-xs text-slate-500 text-right">
          {activeCount} item{activeCount !== 1 ? 's' : ''} to buy · {completedCount} marked purchased
        </div>
      )}
    </div>
  );
};
