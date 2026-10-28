import React, { useState } from 'react';
import { useTourMan } from '../../context/TourManContext';
import { ThemeToggle } from '../ThemeToggle';
import { 
  Building2, 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  Key, 
  Bell, 
  Save,
  Check,
  Sun
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { setShowPwaModal, showToast } = useTourMan();
  const [agencyName, setAgencyName] = useState('Rome With Mike');
  const [currency, setCurrency] = useState('EUR (€)');
  const [timezone, setTimezone] = useState('Europe/Rome (GMT+1)');
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [emailForwardingDomain, setEmailForwardingDomain] = useState('romewithmike.tourman.app');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    showToast('💾 Tour operator settings updated successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Agency & Organization Settings</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Configure your agency details, appearance, currency, and PWA preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Appearance & Color Scheme Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Appearance & Color Scheme</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Choose Light Mode, Dark Mode, or automatically match your System OS settings.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Agency Profile */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span>Tour Operator Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Company Legal Name</label>
              <input
                type="text"
                value={agencyName}
                onChange={e => setAgencyName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Operating Timezone</label>
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Europe/Rome (GMT+1)">Europe/Rome (GMT+1 / GMT+2)</option>
                <option value="Europe/Paris (GMT+1)">Europe/Paris (GMT+1)</option>
                <option value="Europe/Madrid (GMT+1)">Europe/Madrid (GMT+1)</option>
                <option value="Europe/London (GMT+0)">Europe/London (GMT+0)</option>
                <option value="America/New_York (GMT-5)">America/New_York (EST)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Primary Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Inbound Dedicated Forwarding Domain</label>
              <input
                type="text"
                disabled
                value={emailForwardingDomain}
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* PWA & Mobile Guide App Configuration */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-500" />
                <span>Guide Progressive Web App (PWA)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your guides can install Rome With Mike Portal directly from Safari or Chrome onto their device home screens.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPwaModal(true)}
              className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-600/30 text-xs font-semibold border border-blue-200 dark:border-blue-500/30"
            >
              View Install Instructions
            </button>
          </div>
        </div>

        {/* Notifications & AI WhatsApp Bot */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Automated Guest Dispatch</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600 w-4 h-4" />
              <span className="text-slate-700 dark:text-slate-200">
                Send automated WhatsApp meeting point map pin 2 hours before departure
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600 w-4 h-4" />
              <span className="text-slate-700 dark:text-slate-200">
                Auto-notify guide when new OTA reservation is ingested for today's departure
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600 w-4 h-4" />
              <span className="text-slate-700 dark:text-slate-200">
                Allow AI Concierge to handle multi-lingual questions regarding strollers, dress code & delays
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Successfully' : 'Save Organization Settings'}</span>
        </button>
      </form>
    </div>
  );
};
