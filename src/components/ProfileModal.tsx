import React, { useState } from 'react';
import { useTourMan } from '../context/TourManContext';
import { 
  X, 
  User, 
  Phone, 
  ShieldCheck, 
  Check, 
  Key, 
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { 
    showProfileModal, 
    setShowProfileModal, 
    currentUser, 
    updateUserProfile, 
    logout,
    setShowLoginModal 
  } = useTourMan();

  if (!showProfileModal || !currentUser) return null;

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match. Please verify.');
      return;
    }

    if (newPassword && newPassword.length < 5) {
      setError('Password should be at least 5 characters long.');
      return;
    }

    updateUserProfile(currentUser.id, {
      displayName,
      phone,
      password: newPassword || undefined
    });

    setNewPassword('');
    setConfirmPassword('');
    setShowProfileModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setShowProfileModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.displayName}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/50 shadow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{currentUser.displayName}</h3>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                currentUser.role === 'admin'
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                  : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20'
              }`}>
                {currentUser.role === 'admin' ? 'Master Admin' : 'Certified Guide'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{currentUser.email}</p>
            {currentUser.licenseNumber && (
              <span className="text-[10px] text-slate-400 font-mono block">Lic: {currentUser.licenseNumber}</span>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Your Display Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">This name appears on tour manifests and calculator submissions.</p>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              WhatsApp / Mobile Phone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+39 340 000 0000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-blue-500" />
              <span>Change Account Password</span>
            </h4>

            <div className="space-y-2.5">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {newPassword && (
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowProfileModal(false);
                logout();
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-500/10 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-800 transition flex items-center gap-1.5"
            >
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg shadow-blue-600/30 text-center"
            >
              Save Profile & Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
