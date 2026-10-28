import React, { useState } from 'react';
import { useTourMan } from '../../context/TourManContext';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Printer, 
  Share2, 
  MessageSquare, 
  AlertTriangle, 
  UserCheck, 
  Plus, 
  Search,
  Filter,
  Sparkles
} from 'lucide-react';

export const LiveManifestView: React.FC = () => {
  const { 
    bookings, 
    tours, 
    guides, 
    selectedTourId, 
    setSelectedTourId, 
    checkInBooking, 
    markNoShow, 
    resetBookingStatus,
    setShowNewBookingModal,
    showToast,
    selectedDate,
    currentUser
  } = useTourMan();

  const isSingleGuide = currentUser?.role === 'guide';
  const currentGuideId = currentUser?.guideId || currentUser?.id;

  // Filter tours list for single guide so they only see their assigned tours
  const visibleTours = isSingleGuide
    ? tours.filter(t => bookings.some(b => b.tourId === t.id && b.guideId === currentGuideId))
    : tours;

  const effectiveTours = visibleTours.length > 0 ? visibleTours : tours;
  const activeTourId = effectiveTours.some(t => t.id === selectedTourId) 
    ? selectedTourId 
    : (effectiveTours[0]?.id || selectedTourId);

  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'checked_in' | 'no_show'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [whisperHeadsetsGiven, setWhisperHeadsetsGiven] = useState<number>(0);

  const currentTour = tours.find(t => t.id === activeTourId) || tours[0];

  // Filter bookings for this tour, date, and isolated to guide if single guide
  const tourBookings = bookings.filter(b => {
    if (b.tourId !== activeTourId || b.date !== selectedDate) return false;
    if (isSingleGuide && b.guideId !== currentGuideId) return false;
    return true;
  });

  const assignedGuideId = tourBookings.find(b => b.guideId)?.guideId || (isSingleGuide ? currentGuideId : undefined);
  const assignedGuide = guides.find(g => g.id === assignedGuideId) || (isSingleGuide ? {
    id: currentUser?.id || 'guide',
    name: currentUser?.displayName || 'Guide',
    role: 'Rome With Mike Certified Guide',
    email: currentUser?.email || 'guide@romewithmike.com',
    phone: currentUser?.phone || '+39 347 000 0000',
    avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Italian'],
    rating: 5.0,
    reviewCount: 120,
    totalTours: 600,
    licenseNumber: currentUser?.licenseNumber || 'RM-LIC',
    baseRatePerTour: 90,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'available' as const,
    bio: ''
  } : guides[0]);

  const filteredBookings = tourBookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.customerPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const totalPax = tourBookings.reduce((sum, b) => sum + b.pax, 0);
  const checkedInPax = tourBookings
    .filter(b => b.status === 'checked_in')
    .reduce((sum, b) => sum + b.pax, 0);
  const pendingPax = totalPax - checkedInPax;

  const handlePrint = () => {
    window.print();
  };

  const handleBroadcastWhatsApp = () => {
    showToast(`📱 WhatsApp Pin sent to ${tourBookings.length} lead travelers!`);
  };

  return (
    <div className="space-y-6">
      {/* Role Isolation Banner for Single Guides */}
      {isSingleGuide && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-800 dark:text-blue-200">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
            <div>
              <span className="font-bold">Guide Manifest Isolation Active: </span>
              <span>You are viewing departures and guest rosters strictly assigned to <strong>{currentUser?.displayName}</strong>.</span>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-blue-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 self-start sm:self-auto">
            Private Guide View
          </span>
        </div>
      )}

      {/* Tour Selector & Date Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            {isSingleGuide ? 'My Assigned Departure Manifest' : 'Active Tour Manifest (Master View)'}
          </label>
          <select
            value={activeTourId}
            onChange={e => setSelectedTourId(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            {effectiveTours.map(t => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.departureTimes.join(', ')})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={handleBroadcastWhatsApp}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-600/20 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-xs font-semibold transition flex items-center gap-1.5"
            title="Broadcast WhatsApp Pin & Landmark directions to all confirmed guests"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Broadcast</span> GPS Pin
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-medium transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Print</span> Manifest
          </button>
          <button
            onClick={() => setShowNewBookingModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Walk-in</span>
          </button>
        </div>
      </div>

      {/* High-Contrast Manifest Header Card (PWA Mobile Ready) */}
      <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/30">
                {currentTour.shortCode}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Departure: Today {currentTour.departureTimes[0]}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentTour.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-1.5">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{currentTour.meetingPoint} ({currentTour.meetingPointDetails})</span>
            </p>
          </div>

          {/* Guide badge */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center gap-3 shrink-0">
            <img
              src={assignedGuide.avatar}
              alt={assignedGuide.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">
                Assigned Tour Leader
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">{assignedGuide.name}</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {assignedGuide.languages.join(' • ')} (Lic: {assignedGuide.licenseNumber})
              </span>
            </div>
          </div>
        </div>

        {/* Headcount progress bar & Check-in Counter */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Guest Attendance
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{checkedInPax}</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold"> / {totalPax} Checked In</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${totalPax > 0 ? (checkedInPax / totalPax) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{pendingPax} pending check-in</span>
              <span>Capacity: {currentTour.maxCapacity} Pax</span>
            </div>
          </div>

          {/* Headsets tracker */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Radio Whispers / Headsets</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {checkedInPax} / {totalPax} Distributed
              </span>
            </div>
            <button
              onClick={() => showToast(`🎧 All ${checkedInPax} headsets verified on Channel 4.`)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-100"
            >
              Verify Radios
            </button>
          </div>

          {/* Meeting point map link */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">GPS Meeting Coordinates</span>
              <span className="text-xs text-slate-700 dark:text-slate-200 font-mono">41.8902° N, 12.4922° E</span>
            </div>
            <a
              href={currentTour.meetingPointMapUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-medium"
            >
              Open Maps
            </a>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: `All (${tourBookings.length})` },
            { id: 'confirmed', label: `Pending (${tourBookings.filter(b => b.status === 'confirmed').length})` },
            { id: 'checked_in', label: `Checked In (${tourBookings.filter(b => b.status === 'checked_in').length})` },
            { id: 'no_show', label: `No-Show (${tourBookings.filter(b => b.status === 'no_show').length})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === f.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search guest or ref..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* PASSENGER CHECK-IN CARDS / MANIFEST TABLE */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
            <Users className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">No guests matching filter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try switching the status filter or clearing your search.</p>
          </div>
        ) : (
          filteredBookings.map(booking => {
            const isCheckedIn = booking.status === 'checked_in';
            const isNoShow = booking.status === 'no_show';

            return (
              <div
                key={booking.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCheckedIn
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/40'
                    : isNoShow
                    ? 'bg-rose-50/90 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/30 opacity-75'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Guest Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">
                        {booking.customerName}
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {booking.reference}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          booking.source === 'getyourguide'
                            ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400'
                            : booking.source === 'viator'
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                            : booking.source === 'airbnb'
                            ? 'bg-rose-500/20 text-rose-700 dark:text-rose-400'
                            : 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                        }`}
                      >
                        {booking.source}
                      </span>
                      {isCheckedIn && (
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Checked in at {booking.checkInTime || '09:20 AM'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-semibold">
                        <Users className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        {booking.pax} Participants ({booking.adults} Adults{booking.children > 0 ? `, ${booking.children} Kids` : ''})
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${booking.customerPhone}`} className="hover:text-blue-500">
                          {booking.customerPhone}
                        </a>
                      </span>
                      <span>Lang: <strong className="text-slate-700 dark:text-slate-300">{booking.language}</strong></span>
                      <span>Total Paid: <strong className="text-emerald-600 dark:text-emerald-400">€{booking.amount}</strong></span>
                    </div>

                    {/* Special requirements / dietary flags */}
                    {booking.specialRequirements && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs font-medium mt-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Note: {booking.specialRequirements}</span>
                      </div>
                    )}
                  </div>

                  {/* Check-in Action Buttons (Large, 1-tap mobile targets) */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
                    {!isCheckedIn ? (
                      <>
                        <button
                          onClick={() => checkInBooking(booking.id)}
                          className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <UserCheck className="w-4 h-4" />
                          <span>1-Tap Check In</span>
                        </button>
                        <button
                          onClick={() => markNoShow(booking.id)}
                          className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-300 border border-slate-300 dark:border-slate-700 transition text-xs font-medium"
                          title="Mark as No-Show"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-3 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                          Verified
                        </span>
                        <button
                          onClick={() => resetBookingStatus(booking.id)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                          title="Undo / Reset Check-in"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
