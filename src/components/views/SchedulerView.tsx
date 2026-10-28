import React from 'react';
import { useTourMan } from '../../context/TourManContext';
import { 
  Calendar, 
  Clock, 
  Users, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';

export const SchedulerView: React.FC = () => {
  const { 
    tours, 
    guides, 
    bookings, 
    assignGuideToTour, 
    autoAssignAllGuides, 
    showToast,
    selectedDate,
    currentUser
  } = useTourMan();

  const isSingleGuide = currentUser?.role === 'guide';
  const currentGuideId = currentUser?.guideId || currentUser?.id;

  const handleAutoAssign = () => {
    autoAssignAllGuides();
  };

  const visibleTours = isSingleGuide
    ? tours.filter(tour => bookings.some(b => b.tourId === tour.id && b.guideId === currentGuideId))
    : tours;

  return (
    <div className="space-y-6">
      {/* Role Isolation Banner for Single Guide */}
      {isSingleGuide && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-800 dark:text-blue-200">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
            <div>
              <span className="font-bold">My Personal Tour Schedule: </span>
              <span>Showing shifts and tour departures confirmed for <strong>{currentUser?.displayName}</strong>.</span>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-blue-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 self-start sm:self-auto">
            Single Guide Roster
          </span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isSingleGuide ? 'My Tour Roster & Shift Assignments' : 'Smart Guide Scheduler'}
            </h2>
            <span className="text-[10px] font-bold uppercase bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 dark:border-blue-500/30">
              {isSingleGuide ? 'Confirmed Shifts' : 'AI Match Score Active'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isSingleGuide 
              ? 'View your assigned departure times, meeting point locations, and guest numbers.'
              : 'Automatically pair certified guides to tour departures based on spoken languages, museum licenses, and workload limits.'}
          </p>
        </div>

        {!isSingleGuide && (
          <button
            onClick={handleAutoAssign}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>1-Click Smart Auto-Assign</span>
          </button>
        )}
      </div>

      {/* Guide Availability Strip (Master Admin Only) */}
      {!isSingleGuide && (
        <div className="bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Guides On-Duty Today ({guides.length} Certified Guides)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {guides.map(guide => {
              const assignedToursCount = bookings.filter(b => b.guideId === guide.id && b.date === selectedDate).length;
              return (
                <div
                  key={guide.id}
                  className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3"
                >
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">{guide.name}</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 block truncate font-medium">
                      {guide.languages.join(', ')}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {assignedToursCount} assigned tours
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tour Departures & Assignment Grid */}
      <div className="space-y-4">
        {visibleTours.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Assigned Tours for this Date</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              You do not have any scheduled departures assigned for {selectedDate}. Check other dates or contact Master Admin Mike.
            </p>
          </div>
        ) : (
          visibleTours.map(tour => {
            const tourBookings = bookings.filter(b => b.tourId === tour.id && b.date === selectedDate);
            const totalPax = tourBookings.reduce((sum, b) => sum + b.pax, 0);
            const assignedTourGuideId = tourBookings.find(b => b.guideId)?.guideId || (isSingleGuide ? currentGuideId : undefined);
            const assignedGuide = guides.find(g => g.id === assignedTourGuideId);

            return (
              <div
                key={tour.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left: Tour Meta */}
                  <div className="flex items-center gap-4">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                          {tour.departureTimes[0]}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{tour.duration}</span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">
                          {totalPax} Guests Booked
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{tour.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{tour.meetingPoint}</span>
                      </p>
                    </div>
                  </div>

                  {/* Center / Right: Guide Matching & Assignment */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    {/* Language Compatibility Pill */}
                    <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Required Languages</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{tour.languages.join(' • ')}</span>
                    </div>

                    {/* Guide Selection or Locked Guide Status */}
                    {isSingleGuide ? (
                      <div className="w-full sm:w-60">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">
                          Assigned Leader
                        </label>
                        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="truncate">{currentUser?.displayName} (You)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full sm:w-60">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">
                          Assigned Guide
                        </label>
                        <select
                          value={assignedTourGuideId || ''}
                          onChange={e => assignGuideToTour(tour.id, tour.departureTimes[0], e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-500"
                        >
                          <option value="">-- Assign a Guide --</option>
                          {guides.map(g => (
                            <option key={g.id} value={g.id}>
                              {g.name} ({g.languages.slice(0, 2).join('/')}) - €{g.baseRatePerTour}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Status Indicator */}
                    <div className="shrink-0 pt-3 sm:pt-0">
                      {assignedGuide || isSingleGuide ? (
                        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-2 rounded-xl text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Staffed & Confirmed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-2 rounded-xl text-xs font-bold">
                          <AlertCircle className="w-4 h-4" />
                          <span>Needs Guide Assignment</span>
                        </div>
                      )}
                    </div>
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
