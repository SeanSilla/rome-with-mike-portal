import React from 'react';
import { useTourMan } from '../context/TourManContext';
import { ThemeToggle } from './ThemeToggle';
import { 
  Compass, 
  Sparkles, 
  Smartphone, 
  LayoutDashboard, 
  Globe, 
  ExternalLink, 
  Zap,
  ArrowRight,
  User,
  Key
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeMode, 
    setActiveMode, 
    triggerSimulatedBooking, 
    setShowPwaModal,
    setShowNewBookingModal,
    bookings,
    currentUser,
    setShowLoginModal,
    setShowProfileModal
  } = useTourMan();

  const totalBookingsCount = bookings.length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-blue-700 text-white text-xs font-medium py-1 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 text-white">
          OFFICIAL PORTAL
        </span>
        <span>Rome With Mike Tour Operations • Live Digital Manifests & Guide Calculator</span>
        <button 
          onClick={() => { setActiveMode('app'); }}
          className="underline hover:text-amber-100 hidden sm:inline"
        >
          Open Guide Workspace →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveMode('landing')}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-sans">Rome With Mike</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">Tour Operations & Guide Calculator</p>
              </div>
            </button>

            {/* Quick status pill */}
            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200 dark:border-slate-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {totalBookingsCount} live bookings synced
              </span>
            </div>
          </div>

          {/* Navigation items (when on landing) */}
          {activeMode === 'landing' ? (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
              <button 
                onClick={() => { setActiveMode('app'); }} 
                className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1"
              >
                <span>Mike Calculator</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">New</span>
              </button>
              <a href="#email-parser" className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Zap className="w-3.5 h-3.5" />
                Live Email Parser
              </a>
              <a href="#ota-sync" className="hover:text-slate-900 dark:hover:text-white transition-colors">OTA Integrations</a>
              <a href="#roi-calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">Savings Calc</a>
              <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</a>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700/50">
                Rome With Mike • Via Cavour 147, Rome, IT (UTC+2)
              </span>
            </div>
          )}

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle (Light / Dark / System) */}
            <ThemeToggle />

            {/* User Account / Role Pill */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition"
                  title="My Account: Click to change name & password"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.displayName}
                    className="w-7 h-7 rounded-lg object-cover border border-amber-500/50"
                  />
                  <div className="text-left hidden lg:block">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block leading-none truncate max-w-[120px]">
                      {currentUser.displayName}
                    </span>
                    <span className={`text-[9px] font-bold uppercase leading-none block mt-0.5 ${
                      currentUser.role === 'admin' ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {currentUser.role === 'admin' ? '👑 Master Admin' : '👤 Guide'}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setShowLoginModal(true)}
                  title="Switch between Master Admin & Guide view"
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition"
                >
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}

            {/* Quick OTA Ping simulator button */}
            <button
              onClick={triggerSimulatedBooking}
              title="Simulate incoming real-time booking from Viator / GYG / Airbnb"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
              <span>Simulate Ping</span>
            </button>

            {/* Switch Mode Button */}
            {activeMode === 'landing' ? (
              <button
                onClick={() => setActiveMode('app')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition transform active:scale-95"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNewBookingModal(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow transition"
                >
                  + Direct Booking
                </button>
                <button
                  onClick={() => setActiveMode('landing')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Landing</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
