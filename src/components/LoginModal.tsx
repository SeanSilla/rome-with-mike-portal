import React, { useState } from 'react';
import { useTourMan } from '../context/TourManContext';
import { 
  X, 
  User, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Eye, 
  Key,
  CheckCircle2,
  AlertCircle,
  Users
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    showLoginModal, 
    setShowLoginModal, 
    login, 
    users, 
    switchUser,
    currentUser 
  } = useTourMan();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!showLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = login(usernameOrEmail, password);
    if (!result.success) {
      setErrorMessage(result.error || 'Login failed.');
    }
  };

  const handleQuickLogin = (userId: string) => {
    switchUser(userId);
    setShowLoginModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/25">
            <Compass className="w-7 h-7 text-white stroke-[2.2]" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Rome With Mike Portal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to access your digital tour manifests & calculation sheets
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. mike@romewithmike.com or alain.piredda"
                value={usernameOrEmail}
                onChange={e => setUsernameOrEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your account password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <span>Log In to Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Fast Demo Account Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2 text-center tracking-wider">
            ⚡ Quick 1-Click Role Switcher (For Testing)
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Master Admin */}
            <button
              onClick={() => handleQuickLogin('usr_mike')}
              className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 col-span-2 ${
                currentUser?.id === 'usr_mike'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/40'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow">
                👑
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-slate-900 dark:text-white truncate">Mighty Mike (The Boss)</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Master Admin • Full Oversight & Approvals</div>
              </div>
            </button>

            {/* Alain Piredda */}
            <button
              onClick={() => handleQuickLogin('usr_alain_piredda')}
              className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                currentUser?.id === 'usr_alain_piredda'
                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/40'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                AP
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 dark:text-white truncate">Alain Piredda</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400">Single Guide</div>
              </div>
            </button>

            {/* Amanda Karr */}
            <button
              onClick={() => handleQuickLogin('usr_amanda_karr')}
              className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                currentUser?.id === 'usr_amanda_karr'
                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/40'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                AK
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 dark:text-white truncate">Amanda Karr</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Single Guide</div>
              </div>
            </button>
          </div>
        </div>

        {/* Role Privileges Explainer */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <p>🔒 <strong>Single Guides:</strong> See only their own assigned tours, only their own calculation sheet, and can update their display name and password.</p>
          <p>👑 <strong>Master Admin (Mike):</strong> Oversees all tour departures, approves guide monthly payouts, and creates new guide profiles.</p>
        </div>
      </div>
    </div>
  );
};
