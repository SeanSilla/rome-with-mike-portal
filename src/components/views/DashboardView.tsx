import React from 'react';
import { useTourMan } from '../../context/TourManContext';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Euro, 
  Zap, 
  MapPin, 
  ArrowUpRight, 
  Compass, 
  Smartphone,
  AlertCircle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    bookings, 
    tours, 
    guides, 
    setCurrentAppTab, 
    setSelectedTourId, 
    checkInBooking,
    triggerSimulatedBooking,
    selectedDate
  } = useTourMan();

  // Metrics calculations
  const todayBookings = bookings.filter(b => b.date === selectedDate);
  const totalPaxToday = todayBookings.reduce((sum, b) => sum + b.pax, 0);
  const checkedInPax = todayBookings
    .filter(b => b.status === 'checked_in')
    .reduce((sum, b) => sum + b.pax, 0);
  const totalRevenueToday = todayBookings.reduce((sum, b) => sum + b.amount, 0);
  const checkInRate = totalPaxToday > 0 ? Math.round((checkedInPax / totalPaxToday) * 100) : 0;

  // Active tour departures today
  const departures = tours.map(tour => {
    const tourBookings = todayBookings.filter(b => b.tourId === tour.id);
    const tourPax = tourBookings.reduce((sum, b) => sum + b.pax, 0);
    const checkedPax = tourBookings
      .filter(b => b.status === 'checked_in')
      .reduce((sum, b) => sum + b.pax, 0);
    const assignedGuideId = tourBookings.find(b => b.guideId)?.guideId;
    const assignedGuide = guides.find(g => g.id === assignedGuideId);

    return {
      tour,
      bookings: tourBookings,
      tourPax,
      checkedPax,
      assignedGuide,
      time: tour.departureTimes[0] || '10:00 AM'
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Alert / Action Bar */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-slate-900 p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-500/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Operations Center • Rome With Mike
            </h2>
            <span className="text-[11px] font-mono bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-500/20 dark:border-blue-500/30">
              Live Real-Time Sync
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Monitoring live passenger check-ins, guide dispatches, and incoming OTA reservations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={triggerSimulatedBooking}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Simulate Incoming OTA Booking</span>
          </button>
          <button
            onClick={() => {
              setSelectedTourId('tour-1');
              setCurrentAppTab('manifest');
            }}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Open PWA Manifest</span>
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Booked Today */}
        <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Guests Booked</span>
            <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalPaxToday} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Pax</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{todayBookings.length} reservations</span> across 5 tours
          </div>
        </div>

        {/* Checked In */}
        <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Attendance Check-in</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {checkedInPax} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ {totalPaxToday} Pax</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${checkInRate}%` }}
            />
          </div>
        </div>

        {/* Expected Revenue */}
        <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Gross Booking Value</span>
            <Euro className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            €{totalRevenueToday.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
            <span>0% commission deducted</span>
          </div>
        </div>

        {/* Active Guides */}
        <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Certified Guides</span>
            <Compass className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {guides.length} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">On Roster</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% license compliant</span> (Rome City)
          </div>
        </div>
      </div>

      {/* TODAY'S LIVE DEPARTURES BOARD */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Today's Tour Departures</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Real-time status of each tour departure and assigned guide</p>
          </div>
          <button
            onClick={() => setCurrentAppTab('scheduler')}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
          >
            Manage Guide Schedule →
          </button>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800/80">
          {departures.map(({ tour, bookings: tourB, tourPax, checkedPax, assignedGuide, time }) => {
            const isFullyStaffed = !!assignedGuide;
            const progress = tourPax > 0 ? Math.round((checkedPax / tourPax) * 100) : 0;

            return (
              <div
                key={tour.id}
                className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                {/* Left: Tour info */}
                <div className="flex items-center gap-3.5 min-w-[280px]">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        {time}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{tour.duration}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {tour.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate max-w-xs">{tour.meetingPoint}</span>
                    </p>
                  </div>
                </div>

                {/* Center: Guide assignment */}
                <div className="flex items-center gap-3 min-w-[220px]">
                  {assignedGuide ? (
                    <div className="flex items-center gap-2.5">
                      <img
                        src={assignedGuide.avatar}
                        alt={assignedGuide.name}
                        className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <span>{assignedGuide.name}</span>
                          <span className="text-[10px] text-amber-500 dark:text-amber-400">★ {assignedGuide.rating}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {assignedGuide.languages.join(', ')}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Unassigned Guide</span>
                    </div>
                  )}
                </div>

                {/* Center: Passenger Progress Bar */}
                <div className="w-full lg:w-48 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Pax Checked In</span>
                    <span className="font-bold text-slate-900 dark:text-white">{checkedPax} / {tourPax}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 text-right">
                    Max Capacity: {tour.maxCapacity}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedTourId(tour.id);
                      setCurrentAppTab('manifest');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow flex items-center gap-1"
                  >
                    <span>Open Manifest</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOWER GRID: CHANNEL BREAKDOWN & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OTA Channel Volume */}
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Bookings by Sales Channel</h3>
          <div className="space-y-3">
            {[
              { name: 'GetYourGuide', count: 44, pct: 36, color: 'bg-orange-500' },
              { name: 'Viator / TripAdvisor', count: 38, pct: 31, color: 'bg-emerald-500' },
              { name: 'Rome With Mike Direct Engine', count: 22, pct: 18, color: 'bg-amber-500' },
              { name: 'Airbnb Experiences', count: 12, pct: 10, color: 'bg-rose-500' },
              { name: 'GuruWalk / Others', count: 6, pct: 5, color: 'bg-amber-500' }
            ].map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.count} bookings ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
            Zero commission charged on all direct bookings
          </div>
        </div>

        {/* Live Operational Activity Log */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live Activity Feed</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Auto-updating</span>
          </div>

          <div className="space-y-3">
            {todayBookings.slice(0, 5).map(booking => (
              <div
                key={booking.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    {booking.source.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{booking.customerName}</span>
                    <span className="text-slate-500 dark:text-slate-400"> ({booking.pax} Pax) • {booking.tourTitle}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{booking.time}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      booking.status === 'checked_in'
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                        : booking.status === 'no_show'
                        ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20'
                        : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                    }`}
                  >
                    {booking.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
