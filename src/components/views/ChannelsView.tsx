import React, { useState } from 'react';
import { useTourMan } from '../../context/TourManContext';
import { RAW_EMAIL_SAMPLES } from '../../mockData/mockData';
import { 
  Globe, 
  CheckCircle2, 
  RefreshCw, 
  Zap, 
  Copy, 
  ExternalLink, 
  Mail, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ChannelsView: React.FC = () => {
  const { channels, parseAndImportEmail, showToast, setCurrentAppTab } = useTourMan();
  const [copied, setCopied] = useState(false);
  const [testEmail, setTestEmail] = useState(RAW_EMAIL_SAMPLES.getyourguide);
  const [parseOutput, setParseOutput] = useState<any>(null);

  const handleCopyForwarding = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    showToast(`📋 Forwarding address copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunParser = () => {
    const res = parseAndImportEmail(testEmail);
    setParseOutput(res);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">OTA Channels & Ingestion Hub</h2>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              6 Active Connectors
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automatic email parser bridges and direct API webhooks from all major online travel agencies.
          </p>
        </div>

        <button
          onClick={() => showToast('🔄 Polling all channel webhooks... All synced!')}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Sync All Now</span>
        </button>
      </div>

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map(ch => (
          <div
            key={ch.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{ch.logo}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{ch.name}</h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{ch.syncMethod}</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Connected
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 text-xs space-y-1.5 mb-4">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Active Bookings:</span>
                <strong className="text-slate-900 dark:text-white">{ch.activeBookingsCount}</strong>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Last Activity:</span>
                <span className="text-slate-700 dark:text-slate-300 font-mono">{ch.lastSync}</span>
              </div>
            </div>

            {ch.forwardingAddress && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  Dedicated Forwarding Address:
                </span>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 text-[11px]">
                  <span className="text-slate-700 dark:text-slate-300 font-mono truncate flex-1">{ch.forwardingAddress}</span>
                  <button
                    onClick={() => handleCopyForwarding(ch.forwardingAddress!)}
                    className="p-1 hover:text-slate-900 dark:hover:text-white text-slate-400 transition"
                    title="Copy address"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Embedded Live Email Parser Test Sandbox */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>In-App Inbound Email Parser Debugger</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste any raw confirmation text to test regex extraction and instant manifest ingestion.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setTestEmail(RAW_EMAIL_SAMPLES.getyourguide); setParseOutput(null); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              GYG Sample
            </button>
            <button
              onClick={() => { setTestEmail(RAW_EMAIL_SAMPLES.viator); setParseOutput(null); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              Viator Sample
            </button>
            <button
              onClick={() => { setTestEmail(RAW_EMAIL_SAMPLES.airbnb); setParseOutput(null); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              Airbnb Sample
            </button>
          </div>
        </div>

        <textarea
          rows={6}
          value={testEmail}
          onChange={e => setTestEmail(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-800 dark:text-slate-300 focus:outline-none focus:border-blue-500"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">Extracts lead name, pax, tour time, price, and dietary needs.</span>
          <button
            onClick={handleRunParser}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Parse & Sync to Bookings</span>
          </button>
        </div>

        {parseOutput && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Parsed & Ingested: {parseOutput.booking?.reference} • {parseOutput.booking?.customerName} ({parseOutput.booking?.pax} Pax)
              </span>
              <button
                onClick={() => setCurrentAppTab('bookings')}
                className="text-xs text-blue-600 dark:text-blue-400 underline font-semibold"
              >
                View in Bookings Pipeline →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
