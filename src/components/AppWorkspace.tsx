import React from 'react';
import { useTourMan } from '../context/TourManContext';
import { DashboardView } from './views/DashboardView';
import { LiveManifestView } from './views/LiveManifestView';
import { BookingsView } from './views/BookingsView';
import { SchedulerView } from './views/SchedulerView';
import { GuidesView } from './views/GuidesView';
import { FinancialsView } from './views/FinancialsView';
import { AIConciergeView } from './views/AIConciergeView';
import { ChannelsView } from './views/ChannelsView';
import { SettingsView } from './views/SettingsView';
import { MikeCalculatorView } from './views/MikeCalculatorView';
import { ThemeToggle } from './ThemeToggle';
import { 
  Compass, 
  LayoutDashboard, 
  UserCheck, 
  BookOpen, 
  Calendar, 
  Users, 
  Euro, 
  MessageSquare, 
  Radio, 
  Settings, 
  Globe, 
  Plus, 
  Zap, 
  Smartphone,
  CheckCircle2,
  Bell,
  Search,
  Calculator
} from 'lucide-react';

export const AppWorkspace: React.FC = () => {
  const { 
    currentAppTab, 
    setCurrentAppTab, 
    setActiveMode, 
    triggerSimulatedBooking, 
    setShowNewBookingModal,
    setShowPwaModal,
    selectedDate,
    setSelectedDate,
    bookings,
    toastMessage
  } = useTourMan();

  const navItems = [
    { id: 'dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
    { id: 'manifest', label: 'Live Digital Manifest', icon: UserCheck, badge: 'PWA' },
    { id: 'mike-calculator', label: 'Mike Tours Calculator', icon: Calculator, badge: 'OFFICIAL' },
    { id: 'bookings', label: 'Bookings Pipeline', icon: BookOpen, count: bookings.length },
    { id: 'scheduler', label: 'Smart Guide Scheduler', icon: Calendar },
    { id: 'guides', label: 'Certified Guides', icon: Users },
    { id: 'financials', label: 'Financials & Payouts', icon: Euro },
    { id: 'concierge', label: 'AI WhatsApp Concierge', icon: MessageSquare, badge: 'AI' },
    { id: 'channels', label: 'OTA Channel Sync', icon: Radio },
    { id: 'settings', label: 'Agency Settings', icon: Settings }
  ];

  const renderActiveView = () => {
    switch (currentAppTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'manifest':
        return <LiveManifestView />;
      case 'mike-calculator':
        return <MikeCalculatorView />;
      case 'bookings':
        return <BookingsView />;
      case 'scheduler':
        return <SchedulerView />;
      case 'guides':
        return <GuidesView />;
      case 'financials':
        return <FinancialsView />;
      case 'concierge':
        return <AIConciergeView />;
      case 'channels':
        return <ChannelsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-200">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Zap className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 transition-colors">
        {/* Brand header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white text-base">Rome With Mike</span>
                <span className="text-[9px] font-bold uppercase bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                  Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Official Operations & Calculator</p>
            </div>
          </div>

          <button
            onClick={() => setActiveMode('landing')}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            title="Return to Public Website"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Date Switcher */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Operational Date
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentAppTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentAppTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile PWA & Help Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-2">
          <button
            onClick={() => setShowPwaModal(true)}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-300 dark:border-slate-700/60 transition flex items-center justify-center gap-2"
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            <span>Install Guide PWA</span>
          </button>
        </div>
      </aside>

      {/* MAIN OPERATIONS WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Live Agency Workspace • Rome With Mike (Rome, IT)
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <ThemeToggle />

            <button
              onClick={triggerSimulatedBooking}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition"
              title="Simulate incoming OTA booking"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Simulate OTA Ping</span>
            </button>

            <button
              onClick={() => setShowNewBookingModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Direct Booking</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
};
