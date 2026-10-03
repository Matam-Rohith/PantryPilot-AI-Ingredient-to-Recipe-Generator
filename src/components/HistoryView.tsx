import React from 'react';
import { History, Search, ArrowRight, Clock } from 'lucide-react';
import { SearchHistoryItem } from '../types/recipe.js';

interface HistoryViewProps {
  history: SearchHistoryItem[];
  onRerunSearch: (extracted: string[]) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onRerunSearch
}) => {
  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
            <History className="w-4 h-4" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Kitchen Search History
          </h2>
        </div>
        <p className="mt-1 text-xs text-slate-600">
          Previous kitchen ingredient combinations you searched for. Click any record to restore its recipe matches.
        </p>
      </div>

      {/* History List */}
      <div className="mt-6 space-y-3">
        {history.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-stone-300">
            <Search className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">No search history yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your searches and ingredient extractions will automatically be archived here.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => onRerunSearch(item.extractedIngredients.map(i => i.normalizedName || i.name))}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(item.timestamp)}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-700">{item.matchCount} recipes matched</span>
                </div>

                <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors">
                  &quot;{item.rawInput}&quot;
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.extractedIngredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-slate-700 capitalize"
                    >
                      {ing.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="self-end sm:self-center">
                <span className="px-3 py-1.5 rounded-xl bg-stone-100 group-hover:bg-amber-100 text-slate-700 group-hover:text-amber-900 text-xs font-bold transition-colors inline-flex items-center space-x-1">
                  <span>Re-match</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
