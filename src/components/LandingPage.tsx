import React, { useState } from 'react';
import { useTourMan } from '../context/TourManContext';
import { RAW_EMAIL_SAMPLES } from '../mockData/mockData';
import { 
  Compass, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Smartphone, 
  Users, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  FileText, 
  DollarSign, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Check, 
  AlertCircle,
  Play
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    setActiveMode, 
    setCurrentAppTab, 
    parseAndImportEmail, 
    setShowPwaModal,
    triggerSimulatedBooking,
    bookings,
    tours
  } = useTourMan();

  // Email parser simulator state
  const [emailSource, setEmailSource] = useState<'getyourguide' | 'viator' | 'airbnb'>('getyourguide');
  const [emailContent, setEmailContent] = useState(RAW_EMAIL_SAMPLES.getyourguide);
  const [parseResult, setParseResult] = useState<any>(null);

  // ROI Calculator state
  const [monthlyBookings, setMonthlyBookings] = useState(450);
  const [avgTicketPrice, setAvgTicketPrice] = useState(75);

  // Pricing toggle
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleLoadSample = (source: 'getyourguide' | 'viator' | 'airbnb') => {
    setEmailSource(source);
    setEmailContent(RAW_EMAIL_SAMPLES[source]);
    setParseResult(null);
  };

  const handleTestParse = () => {
    const res = parseAndImportEmail(emailContent);
    setParseResult(res);
  };

  // Calculations for ROI
  const monthlyRevenue = monthlyBookings * avgTicketPrice;
  const legacyCommissionCost = monthlyRevenue * 0.025; // typical 2.5% booking software take rate
  const tourManCost = billingCycle === 'yearly' ? 71 : 89; // Pro plan
  const monthlySavings = Math.max(0, legacyCommissionCost - tourManCost);
  const yearlySavings = monthlySavings * 12;
  const hoursSavedPerMonth = Math.round(monthlyBookings * 0.12); // ~7 mins per booking in manual copy-paste

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-emerald-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-medium mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-pulse" />
              <span>Rome With Mike • Operations, Manifests & Guide Payout Portal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6">
              Rome With Mike tours, guides, & payouts.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 dark:from-amber-400 dark:via-orange-300 dark:to-emerald-400">
                Zero spreadsheets.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 mb-9 leading-relaxed font-normal">
              The official portal for <strong>Rome With Mike</strong>. Automatically parses bookings from <strong>Viator</strong>, <strong>GetYourGuide</strong>, and <strong>Airbnb</strong> into live manifests, runs 1-tap mobile check-ins, and includes the integrated <strong>Mike Tours Calculator</strong> for accurate guide fees and monthly statements.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => {
                  setActiveMode('app');
                  setCurrentAppTab('dashboard');
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
              >
                <span>Launch App Workspace</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setActiveMode('app');
                  setCurrentAppTab('mike-calculator');
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-xl shadow-amber-500/30 transition flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>Mike Tours Calculator</span>
              </button>

              <button
                onClick={() => setShowPwaModal(true)}
                className="w-full sm:w-auto px-5 py-4 rounded-xl text-base font-medium bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>PWA Mobile</span>
              </button>
            </div>

            {/* Social proof metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 max-w-4xl mx-auto">
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1,400,000+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Guests Checked In</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">0% Cut</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">No Per-Booking Fees</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">8+ OTAs</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instant Email Parsing</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">4.98 / 5.0</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Guide Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Interactive Live Preview Mockup Card */}
          <div className="mt-14 max-w-5xl mx-auto bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Live Operations Screen
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300">
                      LIVE DISPATCH
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Departure: Today 09:30 AM • Colosseum Underground VIP</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={triggerSimulatedBooking}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/30 transition flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>Simulate OTA Ping</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMode('app');
                    setCurrentAppTab('manifest');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1"
                >
                  <span>Open Full Manifest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Manifest Peek Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Assigned Certified Guide</div>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Marco"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Marco Rossi</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Archaeology • EN / IT / FR</div>
                  </div>
                </div>
                <div className="mt-3 text-xs bg-white dark:bg-slate-900/60 p-2 rounded-lg text-slate-700 dark:text-slate-300 flex items-center justify-between border border-slate-200 dark:border-transparent">
                  <span>Headset Pack:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">24 Units Tested ✓</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Passenger Attendance</div>
                <div className="flex items-baseline justify-between mt-1 mb-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {bookings.filter(b => b.tourId === 'tour-1' && b.status === 'checked_in').reduce((s, b) => s + b.pax, 0)}
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-normal"> / 24 Guests</span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    On Schedule
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (bookings.filter(b => b.tourId === 'tour-1' && b.status === 'checked_in').reduce((s, b) => s + b.pax, 0) / 24) * 100)}%`
                    }}
                  />
                </div>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Meeting Point:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Arch of Constantine</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Multi-Channel Ingestion</div>
                <div className="space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span> GetYourGuide
                    </span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">4 Bookings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Viator / TripAdv.
                    </span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">3 Bookings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span> Airbnb Exp.
                    </span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">2 Bookings</span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/40 text-[11px] text-blue-600 dark:text-blue-300 text-center font-medium">
                  Auto-parsed without manual data entry
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE EMAIL PARSER SANDBOX */}
      <section id="email-parser" className="py-20 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              Interactive Demo
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Try TourMan's Instant OTA Email Parser
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-3">
              Every time GetYourGuide, Viator, or Airbnb sells a ticket, they send an email. TourMan parses that email in milliseconds and adds the guest straight to your live manifest. Try it yourself right now:
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Tabs */}
            <div className="bg-slate-50 dark:bg-slate-950/80 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mr-1">Load Sample:</span>
                <button
                  onClick={() => handleLoadSample('getyourguide')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    emailSource === 'getyourguide'
                      ? 'bg-orange-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent'
                  }`}
                >
                  GetYourGuide
                </button>
                <button
                  onClick={() => handleLoadSample('viator')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    emailSource === 'viator'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent'
                  }`}
                >
                  Viator / TripAdvisor
                </button>
                <button
                  onClick={() => handleLoadSample('airbnb')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    emailSource === 'airbnb'
                      ? 'bg-rose-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent'
                  }`}
                >
                  Airbnb Experiences
                </button>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Forward to: <span className="text-blue-600 dark:text-blue-400 font-semibold">sync@roma-imperial.tourman.app</span>
              </div>
            </div>

            {/* Input Textarea */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-900">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Raw Inbound Confirmation Email:
              </label>
              <textarea
                rows={9}
                value={emailContent}
                onChange={e => setEmailContent(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition leading-relaxed"
                placeholder="Paste any booking email confirmation here..."
              />

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ⚡ TourMan extracts Lead Name, Date, Time, Pax, Channel, Language & Special Requests automatically.
                </p>
                <button
                  onClick={handleTestParse}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Parse & Sync to Live Manifest</span>
                </button>
              </div>

              {/* Result display */}
              {parseResult && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Successfully Parsed and Ingested into Live TourMan Database!</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">Lead Guest</span>
                      <strong className="text-slate-900 dark:text-white text-sm">{parseResult.booking?.customerName}</strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">Reference & OTA</span>
                      <strong className="text-blue-600 dark:text-blue-400 text-sm">
                        {parseResult.booking?.reference} ({parseResult.booking?.source.toUpperCase()})
                      </strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">Tour & Time</span>
                      <strong className="text-slate-900 dark:text-white text-sm">
                        {parseResult.booking?.time} • {parseResult.booking?.pax} Pax
                      </strong>
                    </div>
                    <div className="bg-white dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">Booking Value</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-sm">
                        €{parseResult.booking?.amount}.00 EUR
                      </strong>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      Assigned Guide: <strong className="text-slate-900 dark:text-white">Marco Rossi</strong> (Colosseum lead)
                    </span>
                    <button
                      onClick={() => {
                        setActiveMode('app');
                        setCurrentAppTab('bookings');
                      }}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 underline font-semibold flex items-center gap-1"
                    >
                      View in Live App Bookings Table →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MIKE TOURS CALCULATOR INTEGRATION SHOWCASE */}
      <section className="py-20 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-50/90 via-white to-amber-50/60 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 rounded-3xl border-2 border-amber-500/30 dark:border-amber-500/40 p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Now Fully Integrated
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Official Mike Tours Calculator
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                  We've integrated the complete spreadsheet calculator built specifically for <strong>Rome With Mike</strong>. Every guide logs their tours, and fees calculate in real-time according to the exact company formula:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-slate-700 dark:text-slate-300">
                  <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200/80 dark:border-slate-800 shadow-xs">
                    <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">Catacombs & Hidden Rome:</strong>
                    <span>€45 base + €10 per additional pax (&gt;2) + €3 taxi reimbursement</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200/80 dark:border-slate-800 shadow-xs">
                    <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">Bones & Catacombs Express:</strong>
                    <span>€35 base (or €5/pax paired) + €5/pax (&gt;2)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200/80 dark:border-slate-800 shadow-xs">
                    <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">Private (PVT) Tours:</strong>
                    <span>Flat €125 (Ostia, Catacombs, Landmarks, Food Tour) • €190 Ghost Tour</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200/80 dark:border-slate-800 shadow-xs">
                    <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">Divan/Mike Combo Tour:</strong>
                    <span>€22.50 base + Pax × €10</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center w-full lg:w-80 shrink-0 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-orange-500/30">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Mighty Mike Master Control</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                  Inspect any guide's monthly submission or generate official printable statements in 1 tap.
                </p>

                <button
                  onClick={() => {
                    setActiveMode('app');
                    setCurrentAppTab('mike-calculator');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs transition shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                >
                  <span>Open Mike Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PLATFORM CAPABILITIES */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built specifically for how tour operators actually work
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4">
            Generic hotel software and generic spreadsheets weren't made for city tours, museum guides, and multi-channel OTAs. TourMan was.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Automated Ingestion</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Forward booking confirmation emails to your dedicated TourMan address. Our parser extracts guest names, phone numbers, pax, and special dietary requests with 99.9% accuracy.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Viator, GYG, Airbnb, GuruWalk, Expedia
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Detects modifications & cancellations
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Guide Matching</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Match certified local guides to tours based on language proficiency, Vatican/archaeological licenses, and weekly availability in a single click.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                1-click auto-assign algorithm
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Prevent schedule conflicts & double bookings
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">PWA Mobile Check-in</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              No App Store downloads required. Guides add TourMan directly to their iPhone or Android home screens. Fast, responsive, and stays accessible even when venue Wi-Fi drops.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                1-tap guest attendance check-in
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Works offline in subterranean Roman ruins
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-amber-600/10 dark:bg-amber-600/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI WhatsApp Concierge</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Answer anxious guests automatically. The AI Concierge knows each tour's exact meeting point, landmark photo, dress code, and weather guidance in 30+ languages.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Meeting point Google Maps pins sent instantly
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Broadcast announcements to the whole group
              </li>
            </ul>
          </div>

          {/* Card 5 */}
          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 transition shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-teal-600/10 dark:bg-teal-600/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Zero-Commission Financials</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Keep 100% of your earnings. We charge a predictable flat subscription. Automatically calculate guide payout rates, track tips, and export clean accounting sheets.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Save €3,000 to €20,000/yr vs commission engines
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Automated guide payout ledgers
              </li>
            </ul>
          </div>

          {/* Card 6 */}
          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Digital Manifest & Headsets</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Real-time headcount counters, dietary restrictions (vegetarian, gluten-free, kosher), and radio whisper headset serial tracking for Colosseum & Vatican checkpoints.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                1-click PDF manifest export for ticket checks
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Custom dietary & mobility flags
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROI & SAVINGS CALCULATOR */}
      <section id="roi-calculator" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Calculate Your Real-World Cash Savings
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Traditional tour management platforms charge between 2% and 4% on every single booking. See how much TourMan's flat-fee pricing saves your business every year:
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">Monthly Guest Bookings</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{monthlyBookings.toLocaleString()} bookings</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="50"
                  value={monthlyBookings}
                  onChange={e => setMonthlyBookings(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>50</span>
                  <span>1,000</span>
                  <span>2,500+</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">Average Ticket Price (€)</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">€{avgTicketPrice} per guest</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="5"
                  value={avgTicketPrice}
                  onChange={e => setAvgTicketPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>€25</span>
                  <span>€100</span>
                  <span>€200</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div>Monthly Gross Booking Value: <strong className="text-slate-900 dark:text-white">€{monthlyRevenue.toLocaleString()} EUR</strong></div>
                <div>Typical 2.5% Commission Cut: <strong className="text-rose-600 dark:text-rose-400">€{Math.round(legacyCommissionCost).toLocaleString()} EUR / mo</strong></div>
                <div>TourMan Pro Flat Fee: <strong className="text-blue-600 dark:text-blue-400">€{tourManCost} EUR / mo</strong></div>
              </div>
            </div>

            {/* Savings Callout Display */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/60 dark:to-slate-900 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-6 text-center flex flex-col justify-center items-center shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full mb-3">
                Estimated Net Cash Saved
              </span>

              <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-1">
                €{Math.round(yearlySavings).toLocaleString()}
                <span className="text-base font-normal text-slate-500 dark:text-slate-400"> / year</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 mb-6 max-w-xs">
                Plus save approximately <strong className="text-blue-600 dark:text-blue-300">{hoursSavedPerMonth} hours</strong> of tedious manual spreadsheet work every single month!
              </p>

              <button
                onClick={() => {
                  setActiveMode('app');
                  setCurrentAppTab('financials');
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
              >
                <span>View Full Financial Ledger</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OTA INTEGRATIONS SHOWCASE */}
      <section id="ota-sync" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">
          Sync Seamlessly Across All Major Booking Channels & Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-5xl mx-auto">
          {[
            { name: 'GetYourGuide', status: 'Email Sync', color: 'border-orange-500/30 dark:border-orange-500/40 text-orange-600 dark:text-orange-400' },
            { name: 'Viator', status: 'Email Sync', color: 'border-emerald-500/30 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400' },
            { name: 'Airbnb Exp.', status: 'iCal + Email', color: 'border-rose-500/30 dark:border-rose-500/40 text-rose-600 dark:text-rose-400' },
            { name: 'GuruWalk', status: 'Email Sync', color: 'border-amber-500/30 dark:border-amber-500/40 text-amber-600 dark:text-amber-400' },
            { name: 'Expedia', status: 'Direct API', color: 'border-blue-500/30 dark:border-blue-500/40 text-blue-600 dark:text-blue-400' },
            { name: 'Bókun', status: 'Webhook', color: 'border-purple-500/30 dark:border-purple-500/40 text-purple-600 dark:text-purple-400' },
            { name: 'WhatsApp', status: 'AI Concierge', color: 'border-green-500/30 dark:border-green-500/40 text-green-600 dark:text-green-400' },
            { name: 'Stripe Direct', status: 'Payment Sync', color: 'border-indigo-500/30 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-400' }
          ].map(ch => (
            <div key={ch.name} className={`bg-white dark:bg-slate-900/80 p-3 rounded-xl border ${ch.color} flex flex-col items-center justify-center shadow-xs`}>
              <span className="font-bold text-xs text-slate-900 dark:text-white block">{ch.name}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{ch.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="py-24 bg-slate-100/50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Simple, transparent pricing. 0% take rate.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-4">
              All plans include unlimited bookings, 60-day free trial, and email parsing support.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 mt-8 shadow-xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  billingCycle === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Yearly Billing</span>
                <span className="text-[10px] font-bold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Starter</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">For independent local guides & small walking tours</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">€{billingCycle === 'yearly' ? '39' : '49'}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Up to 3 active tour experiences</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Up to 3 guide accounts</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Automated email parsing (Viator & GYG)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> PWA Mobile Manifest & 1-tap check-in</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Basic financial summaries</li>
                </ul>
              </div>
              <button
                onClick={() => { setActiveMode('app'); setCurrentAppTab('dashboard'); }}
                className="w-full mt-8 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium text-xs transition"
              >
                Start 60-Day Free Trial
              </button>
            </div>

            {/* Pro - Featured */}
            <div className="bg-gradient-to-b from-blue-50/80 via-white to-blue-50/40 dark:from-blue-900/40 dark:via-slate-900 dark:to-slate-900 rounded-2xl p-8 border-2 border-blue-500 relative shadow-xl flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
                Most Popular for Tour Operators
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Professional</h3>
                <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">For growing tour agencies & multi-guide operations</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">€{billingCycle === 'yearly' ? '71' : '89'}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Unlimited tour experiences</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Up to 15 certified guide accounts</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> All OTAs (Viator, GYG, Airbnb, GuruWalk, Expedia)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> 1-Click Smart Guide Auto-Assignment</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> AI WhatsApp Concierge & Auto-responder</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Detailed Guide Payout & Tips Ledger</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Priority WhatsApp & phone onboarding</li>
                </ul>
              </div>
              <button
                onClick={() => { setActiveMode('app'); setCurrentAppTab('dashboard'); }}
                className="w-full mt-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30"
              >
                Start 60-Day Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">For multi-city operators & large destination DMCs</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">€{billingCycle === 'yearly' ? '119' : '149'}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Unlimited guides & tours</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Multi-city branch workspaces (Rome, Florence, Venice)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Dedicated custom email parser models</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Direct ERP & Accounting webhook integration</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Dedicated account manager in Italy</li>
                </ul>
              </div>
              <button
                onClick={() => { setActiveMode('app'); setCurrentAppTab('dashboard'); }}
                className="w-full mt-8 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium text-xs transition"
              >
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATOR TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Operator Stories</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Loved by Italian & European tour managers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-amber-500 dark:text-amber-400 text-sm mb-3">★★★★★</div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic mb-4">
              "We run 12 Colosseum tours every day. Before TourMan, two staff members spent 3 hours every morning printing spreadsheets and manually messaging guides on WhatsApp. Now everything syncs automatically."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600/10 dark:bg-blue-600/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-xs">
                MB
              </div>
              <div>
                <strong className="text-xs text-slate-900 dark:text-white block">Marco Bertolini</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Founder, Roma Imperial Experiences (Rome)</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-amber-500 dark:text-amber-400 text-sm mb-3">★★★★★</div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic mb-4">
              "The PWA is brilliant because our guides didn't have to download anything from the Apple App Store. They just saved the link to their home screens, and check-ins at the Vatican gate are instant."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600/10 dark:bg-emerald-600/30 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                CL
              </div>
              <div>
                <strong className="text-xs text-slate-900 dark:text-white block">Camille Lefevre</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Operations Lead, Paris Secrets & Louvre VIP</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-amber-500 dark:text-amber-400 text-sm mb-3">★★★★★</div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic mb-4">
              "Saving 2.5% on commission made us switch from our old booking system immediately. We saved €14,000 in our very first year with TourMan."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-600/10 dark:bg-purple-600/30 flex items-center justify-center font-bold text-purple-600 dark:text-purple-400 text-xs">
                JM
              </div>
              <div>
                <strong className="text-xs text-slate-900 dark:text-white block">Javier Morales</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Director, Tapas & Gaudí Walks (Barcelona)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Everything you need to know about TourMan and setting up your agency.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does automated booking email forwarding work?',
                a: 'When you create a TourMan account, you receive a dedicated forwarding email address (e.g., sync@yourcompany.tourman.app). You set up a simple auto-forward rule in Gmail or Outlook for notifications from GetYourGuide, Viator, Airbnb, etc. Our backend parses the guest details, dates, and times within milliseconds.'
              },
              {
                q: 'Do guides need to install an app from the App Store or Google Play?',
                a: 'No! TourMan is built as a Progressive Web App (PWA). Your guides simply navigate to tourman.app on Safari or Chrome and tap "Add to Home Screen". It acts like a native application, gives full-screen offline access, and requires zero app store updates.'
              },
              {
                q: 'Does TourMan charge per-booking transaction commissions?',
                a: 'Never. Unlike other booking software that charges 1.5% to 3% on every guest ticket, TourMan operates solely on a flat subscription fee. You keep 100% of your ticket sales and gross merchandise value.'
              },
              {
                q: 'Can I assign guides automatically based on language and credentials?',
                a: 'Yes. With 1 click, TourMan matches your certified guides to tour departures based on their spoken languages (English, Italian, Spanish, French, German), municipal tour guide badges, and weekly availability.'
              },
              {
                q: 'What happens if a guest cancels or reschedules on Viator or GetYourGuide?',
                a: 'When the OTA sends the cancellation or amendment email, TourMan automatically parses the reference code and updates the manifest status accordingly, freeing up capacity for new bookings.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span>{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-slate-500 dark:text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-slate-900 dark:text-white text-base">Rome With Mike</span>
            <span className="text-slate-500 dark:text-slate-400">• Via Cavour 147, 00184 Roma, Italy</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition">Features</a>
            <button 
              onClick={() => { setActiveMode('app'); setCurrentAppTab('mike-calculator'); }}
              className="hover:text-amber-700 dark:hover:text-white text-amber-600 dark:text-amber-400 font-semibold transition"
            >
              Mike Calculator
            </button>
            <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition">Pricing</a>
            <button onClick={() => setShowPwaModal(true)} className="hover:text-slate-900 dark:hover:text-white transition">Install PWA</button>
            <button 
              onClick={() => { setActiveMode('app'); setCurrentAppTab('dashboard'); }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-semibold transition"
            >
              Open Live App →
            </button>
          </div>

          <div>
            © 2026 Rome With Mike Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
