import React, { useState, useEffect } from 'react';
import { 
  Key, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  Sparkles 
} from 'lucide-react';

const REQUIRED_PASS = 'inhocsignovinces';
const STORAGE_KEY = 'rwm_site_passphrase_unlocked';

export const SitePasswordGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true' || localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Check URL query parameters or hash on mount (e.g. ?pass=inhocsignovinces or ?access=inhocsignovinces)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryPass = urlParams.get('pass') || urlParams.get('access') || urlParams.get('password');
      if (queryPass && queryPass.trim().toLowerCase() === REQUIRED_PASS) {
        unlockSite();
      }
    } catch {
      // ignore
    }
  }, []);

  const unlockSite = () => {
    setSuccessMsg(true);
    setErrorMsg('');
    setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
      setIsUnlocked(true);
    }, 400);
  };

  const handleLockSite = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsUnlocked(false);
    setInputPass('');
    setErrorMsg('');
    setSuccessMsg(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputPass.trim().toLowerCase();

    if (cleaned === REQUIRED_PASS) {
      unlockSite();
    } else {
      setErrorMsg('Incorrect access password. Please try again.');
      setSuccessMsg(false);
    }
  };

  // If site is unlocked, display a security banner at top and render site content
  if (isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Top Passphrase Protection Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs px-4 py-1.5 flex items-center justify-between border-b border-indigo-500/30 shadow-sm z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-300">Rome With Mike Portal</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-emerald-400 font-mono text-[11px]">Passphrase Protected (inhocsignovinces)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Verified Access
            </span>
            <button
              onClick={handleLockSite}
              className="text-[10px] text-slate-400 hover:text-white hover:underline transition"
              title="Lock site and require passphrase again"
            >
              🔒 Lock Site
            </button>
          </div>
        </div>

        {children}
      </div>
    );
  }

  // If locked, render the access protection gate
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-to-tl from-amber-500/10 via-orange-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Top Brand Bar */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg font-black text-sm text-white">
            RM
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white">Rome With Mike</h1>
            <span className="text-[10px] text-slate-400 font-medium">Official Tour Guide & Operations Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold">Protected Access</span>
        </div>
      </header>

      {/* Main Lock Card */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative">
          {/* Key Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-blue-600/30">
            <Key className="w-7 h-7" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Site Passphrase Required
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              This preview deployment of <strong className="text-slate-200">Rome With Mike Portal</strong> is restricted. Please enter the site password to enter.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Passphrase accepted! Unlocking portal...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Access Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter access passphrase"
                  value={inputPass}
                  onChange={e => {
                    setInputPass(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                  title={showPass ? 'Hide password' : 'Show password'}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transform active:scale-[0.99]"
            >
              <span>Unlock Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500">
              Passphrase: <span className="font-mono text-slate-400">inhocsignovinces</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full text-center py-2 text-[11px] text-slate-500">
        Rome With Mike &bull; Protected Preview Portal &bull; &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};
