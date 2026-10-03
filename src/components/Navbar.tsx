import React from 'react';
import { ChefHat, Bookmark, ShoppingBag, History, LayoutDashboard, Sliders, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/recipe.js';

interface NavbarProps {
  activeTab: 'search' | 'saved' | 'shopping' | 'history' | 'dashboard';
  setActiveTab: (tab: 'search' | 'saved' | 'shopping' | 'history' | 'dashboard') => void;
  savedCount: number;
  shoppingCount: number;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenPantryBasics: () => void;
  onOpenAiGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  shoppingCount,
  currentUser,
  onOpenAuth,
  onOpenPantryBasics,
  onOpenAiGenerator
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-2 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold font-serif tracking-tight text-slate-900 group-hover:text-amber-800 transition-colors">
                PantryPilot
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                AI Ingredient-to-Recipe
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-amber-100/70 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/50'
              }`}
            >
              Find Recipes
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                activeTab === 'saved'
                  ? 'bg-amber-100/70 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/50'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Bookmark className="w-4 h-4" />
                <span>Saved</span>
                {savedCount > 0 && (
                  <span className="ml-1 text-xs bg-amber-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                    {savedCount}
                  </span>
                )}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('shopping')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                activeTab === 'shopping'
                  ? 'bg-amber-100/70 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/50'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Shopping List</span>
                {shoppingCount > 0 && (
                  <span className="ml-1 text-xs bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                    {shoppingCount}
                  </span>
                )}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-amber-100/70 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/50'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <History className="w-4 h-4" />
                <span>History</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-amber-100/70 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/50'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Generator Button */}
            <button
              onClick={onOpenAiGenerator}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 transition-colors shadow-xs"
              title="Create an AI Recipe from what you have"
            >
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline">AI Recipe</span>
            </button>

            {/* Pantry Staples Button */}
            <button
              onClick={onOpenPantryBasics}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-stone-100 border border-[#DDD5C7] transition-colors"
              title="Configure your Pantry Basics (Oil, Salt, Spices)"
            >
              <Sliders className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Pantry Basics</span>
            </button>

            {/* User Profile / Login */}
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-800 bg-white hover:bg-stone-100 border border-[#DDD5C7] transition-colors shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
              <span className="max-w-[100px] truncate hidden md:inline">
                {currentUser?.isGuest ? 'Guest Chef' : (currentUser?.name || 'Sign In')}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#EBE5DA] text-xs font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('search')}
            className={`py-1 px-2 rounded ${activeTab === 'search' ? 'text-amber-800 font-bold bg-amber-100/60' : ''}`}
          >
            Find
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-1 px-2 rounded ${activeTab === 'saved' ? 'text-amber-800 font-bold bg-amber-100/60' : ''}`}
          >
            Saved {savedCount > 0 && `(${savedCount})`}
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`py-1 px-2 rounded ${activeTab === 'shopping' ? 'text-amber-800 font-bold bg-amber-100/60' : ''}`}
          >
            Shopping {shoppingCount > 0 && `(${shoppingCount})`}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-1 px-2 rounded ${activeTab === 'history' ? 'text-amber-800 font-bold bg-amber-100/60' : ''}`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-1 px-2 rounded ${activeTab === 'dashboard' ? 'text-amber-800 font-bold bg-amber-100/60' : ''}`}
          >
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
};
