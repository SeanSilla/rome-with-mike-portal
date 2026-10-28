import React, { useState } from 'react';
import { useTourMan } from '../../context/TourManContext';
import { Guide } from '../../types';
import { 
  Users, 
  Star, 
  Award, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Plus, 
  X, 
  Check, 
  Compass, 
  Euro,
  MessageSquare
} from 'lucide-react';

export const GuidesView: React.FC = () => {
  const { guides, showToast } = useTourMan();
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New guide form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Certified Tour Guide');
  const [newLanguages, setNewLanguages] = useState('English, Italian');
  const [newRate, setNewRate] = useState(90);
  const [newLicense, setNewLicense] = useState('RM-LIC-099411');

  const handleAddGuide = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`👤 Added ${newName} to certified guide roster!`);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Certified Guide Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your certified local guides, municipal licenses, languages, and payout rates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Guide Account</span>
        </button>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map(guide => (
          <div
            key={guide.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Avatar & Rating */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/50"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{guide.name}</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{guide.role}</p>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      Lic: {guide.licenseNumber}
                    </span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl text-right">
                  <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-extrabold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{guide.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{guide.reviewCount} reviews</span>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                {guide.bio}
              </p>

              {/* Languages Badges */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Spoken Languages
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {guide.languages.map(lang => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tour Stats & Payout Rate */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs mb-4">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Tours Completed</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{guide.totalTours}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Base Rate / Tour</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 text-sm">€{guide.baseRatePerTour} EUR</strong>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`tel:${guide.phone}`}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span>Call</span>
              </a>
              <button
                onClick={() => showToast(`💬 Opened WhatsApp direct chat with ${guide.name}`)}
                className="flex-1 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Guide Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Add Certified Guide</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Create a staff profile for guide app login and shift assignment.</p>

            <form onSubmit={handleAddGuide} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lorenzo De Luca"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Role / Specialization</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Languages (comma-separated)</label>
                  <input
                    type="text"
                    value={newLanguages}
                    onChange={e => setNewLanguages(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Base Rate / Tour (€)</label>
                  <input
                    type="number"
                    value={newRate}
                    onChange={e => setNewRate(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Official Guide License #</label>
                <input
                  type="text"
                  value={newLicense}
                  onChange={e => setNewLicense(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30"
                >
                  Save Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
