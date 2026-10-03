import React, { useState } from 'react';
import { X, User, Mail, Lock, ChefHat, Check, LogOut } from 'lucide-react';
import { UserProfile } from '../types/recipe.js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (email: string, pass: string) => Promise<void>;
  onRegister: (email: string, name: string, pass: string) => Promise<void>;
  onGuestMode: () => Promise<void>;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onRegister,
  onGuestMode,
  onLogout
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await onLogin(email, password);
      } else {
        await onRegister(email, name, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    try {
      await onGuestMode();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-200 hover:bg-stone-300 text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser && !currentUser.isGuest ? (
          /* Profile & Logout View */
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Kitchen Profile
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as <span className="font-semibold text-slate-800">{currentUser.email}</span>
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="font-semibold text-slate-900">{currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account Type:</span>
                <span className="font-semibold text-emerald-700">Pantry Member</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Member Since:</span>
                <span className="text-slate-700">
                  {new Date(currentUser.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register Form */
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-xs">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  {mode === 'login' ? 'Welcome Back Chef' : 'Create Your Pantry Account'}
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              {mode === 'login'
                ? 'Sign in to access your saved recipes, shopping list, and customized pantry staples.'
                : 'Save favorite recipes and personalize your kitchen preferences across devices.'}
            </p>

            {/* Mode Toggle */}
            <div className="flex rounded-xl bg-stone-200/80 p-1 mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); }}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  mode === 'login' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(null); }}
                className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  mode === 'register' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Chef Alex"
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chef@example.com"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {error && (
                <div className="p-2.5 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-2xs cursor-pointer mt-2"
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Guest Mode Option */}
            <div className="mt-5 pt-4 border-t border-stone-200 text-center">
              <span className="text-xs text-slate-500">Want to test without signing up?</span>
              <button
                type="button"
                onClick={handleGuest}
                className="mt-1.5 block w-full py-2 px-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Continue as Guest Explorer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
