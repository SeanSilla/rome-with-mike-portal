import React, { useState } from 'react';
import { useTourMan } from '../../context/TourManContext';
import { Booking } from '../../types';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  Euro,
  FileSpreadsheet
} from 'lucide-react';

export const BookingsView: React.FC = () => {
  const { 
    bookings, 
    tours, 
    guides, 
    setShowNewBookingModal, 
    checkInBooking, 
    markNoShow,
    showToast 
  } = useTourMan();

  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [tourFilter, setTourFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) ||
                          b.reference.toLowerCase().includes(search.toLowerCase()) ||
                          b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
                          b.customerPhone.includes(search);
    const matchesChannel = channelFilter === 'all' || b.source === channelFilter;
    const matchesTour = tourFilter === 'all' || b.tourId === tourFilter;
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesChannel && matchesTour && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['Reference', 'Channel', 'Guest Name', 'Tour Title', 'Date', 'Time', 'Pax', 'Amount EUR', 'Status'];
    const rows = filteredBookings.map(b => [
      b.reference,
      b.source,
      `"${b.customerName}"`,
      `"${b.tourTitle}"`,
      b.date,
      b.time,
      b.pax,
      b.amount,
      b.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TourMan_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📊 Bookings exported to CSV successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Centralized Bookings Pipeline</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time multi-channel reservations consolidated from all OTAs and your direct engine.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowNewBookingModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Booking</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Search Guest / Ref
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Name, email, phone, reference..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Channel Source
          </label>
          <select
            value={channelFilter}
            onChange={e => setChannelFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Channels ({bookings.length})</option>
            <option value="getyourguide">GetYourGuide</option>
            <option value="viator">Viator / TripAdvisor</option>
            <option value="airbnb">Airbnb Experiences</option>
            <option value="guruwalk">GuruWalk</option>
            <option value="expedia">Expedia</option>
            <option value="bokun">Bókun</option>
            <option value="direct">Direct Website (0% Fee)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Tour Experience
          </label>
          <select
            value={tourFilter}
            onChange={e => setTourFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Tours</option>
            {tours.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked_in">Checked In</option>
            <option value="no_show">No-Show</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 uppercase font-semibold tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Ref & Channel</th>
                <th className="py-3 px-4">Lead Guest</th>
                <th className="py-3 px-4">Tour Experience</th>
                <th className="py-3 px-4">Departure</th>
                <th className="py-3 px-4">Pax</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
              {filteredBookings.map(b => {
                const assignedGuide = guides.find(g => g.id === b.guideId);
                return (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-900 dark:text-white">{b.reference}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            b.source === 'getyourguide'
                              ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400'
                              : b.source === 'viator'
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                              : b.source === 'airbnb'
                              ? 'bg-rose-500/20 text-rose-700 dark:text-rose-400'
                              : 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                          }`}
                        >
                          {b.source}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{b.customerName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{b.customerPhone}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-slate-800 dark:text-slate-200 truncate">{b.tourTitle}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Guide: <strong className="text-slate-700 dark:text-slate-300">{assignedGuide?.name || 'Unassigned'}</strong>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono text-slate-700 dark:text-slate-200">{b.date}</div>
                      <div className="text-blue-600 dark:text-blue-400 font-semibold">{b.time}</div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {b.pax} <span className="font-normal text-slate-500 dark:text-slate-400 text-[11px]">Pax</span>
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                      €{b.amount}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          b.status === 'checked_in'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                            : b.status === 'no_show'
                            ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                            : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                        }`}
                      >
                        {b.status === 'checked_in' && <CheckCircle2 className="w-3 h-3" />}
                        {b.status === 'no_show' && <XCircle className="w-3 h-3" />}
                        {b.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {b.status !== 'checked_in' && (
                          <button
                            onClick={() => checkInBooking(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition shadow"
                          >
                            Check In
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal / Drawer */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded border border-blue-500/20 dark:border-blue-500/30">
                {selectedBooking.reference}
              </span>
              <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                Via {selectedBooking.source}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {selectedBooking.customerName}
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-6">{selectedBooking.tourTitle}</p>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs mb-6">
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Date & Time:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedBooking.date} at {selectedBooking.time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Participants:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedBooking.pax} Guests ({selectedBooking.adults} Adults)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Guest Email:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{selectedBooking.customerEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Guest Phone:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{selectedBooking.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Selected Language:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedBooking.language}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">Gross Settlement:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">€{selectedBooking.amount}.00 EUR</span>
              </div>
              {selectedBooking.specialRequirements && (
                <div className="py-1">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold block mb-0.5">Special Dietary / Notes:</span>
                  <p className="text-slate-700 dark:text-slate-300">{selectedBooking.specialRequirements}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {selectedBooking.status !== 'checked_in' ? (
                <button
                  onClick={() => {
                    checkInBooking(selectedBooking.id);
                    setSelectedBooking(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30"
                >
                  Confirm Check In
                </button>
              ) : (
                <button
                  onClick={() => {
                    markNoShow(selectedBooking.id);
                    setSelectedBooking(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow"
                >
                  Mark as No-Show
                </button>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
