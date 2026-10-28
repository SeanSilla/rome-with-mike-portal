import React from 'react';
import { TourManProvider, useTourMan } from './context/TourManContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AppWorkspace } from './components/AppWorkspace';
import { PWAInstallModal } from './components/PWAInstallModal';
import { NewBookingModal } from './components/NewBookingModal';
import { LoginModal } from './components/LoginModal';
import { ProfileModal } from './components/ProfileModal';
import { SitePasswordGate } from './components/SitePasswordGate';

const AppContent: React.FC = () => {
  const { activeMode } = useTourMan();

  return (
    <SitePasswordGate>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
        <Navbar />

        <main className="flex-1">
          {activeMode === 'landing' ? (
            <LandingPage />
          ) : (
            <AppWorkspace />
          )}
        </main>

        {/* Global Modals */}
        <PWAInstallModal />
        <NewBookingModal />
        <LoginModal />
        <ProfileModal />
      </div>
    </SitePasswordGate>
  );
};

export default function App() {
  return (
    <TourManProvider>
      <AppContent />
    </TourManProvider>
  );
}
