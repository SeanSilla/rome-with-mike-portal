import React from 'react';
import { useTourMan } from '../context/TourManContext';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, WifiOff, Share, PlusSquare } from 'lucide-react';

export const PWAInstallModal: React.FC = () => {
  const { showPwaModal, setShowPwaModal } = useTourMan();

  if (!showPwaModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setShowPwaModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 dark:border-blue-500/30">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Install TourMan PWA</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fast, app-like experience with zero app store downloads</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-2.5">
            <WifiOff className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">Offline Mode</span>
              <span className="text-slate-500 dark:text-slate-400">Works in low-reception zones</span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">Instant Updates</span>
              <span className="text-slate-500 dark:text-slate-400">Never wait for App Store review</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/40">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🍎 iPhone / iPad (Safari)</span>
            </h4>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
              <li>Open <strong className="text-blue-600 dark:text-blue-400">tourman.app</strong> in Safari</li>
              <li className="flex items-center gap-1">Tap the <Share className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 inline" /> <strong>Share</strong> button at bottom of screen</li>
              <li className="flex items-center gap-1">Scroll down and tap <PlusSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 inline" /> <strong>Add to Home Screen</strong></li>
              <li>Launch from your home screen for full-screen mode</li>
            </ol>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/40">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🤖 Android (Chrome / Brave)</span>
            </h4>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
              <li>Open <strong className="text-blue-600 dark:text-blue-400">tourman.app</strong> in Google Chrome</li>
              <li>Tap the <strong>3 vertical dots</strong> (Menu) at top right</li>
              <li>Tap <strong>Install app</strong> or <strong>Add to Home Screen</strong></li>
              <li>Follow the prompt to install the native standalone icon</li>
            </ol>
          </div>
        </div>

        <button
          onClick={() => {
            setShowPwaModal(false);
          }}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-lg shadow-blue-600/25"
        >
          Got it, Close
        </button>
      </div>
    </div>
  );
};
