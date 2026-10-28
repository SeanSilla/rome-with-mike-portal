import React, { useState } from 'react';
import { useTourMan } from '../context/TourManContext';
import { X, Calendar, Clock, User, Phone, Mail, Users, Euro, ShieldCheck } from 'lucide-react';

export const NewBookingModal: React.FC = () => {
  const { 
    showNewBookingModal, 
    setShowNewBookingModal, 
    tours, 
    guides, 
    addBooking, 
    selectedDate 
  } = useTourMan();

  const [tourId, setTourId] = useState(tours[0]?.id || 'tour-1');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [time, setTime] = useState(tours[0]?.departureTimes[0] || '10:00 AM');
  const [date, setDate] = useState(selectedDate);
  const [pax, setPax] = useState(2);
  const [language, setLanguage] = useState('English');
  const [guideId, setGuideId] = useState(guides[0]?.id || 'guide-1');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [source, setSource] = useState<'direct' | 'viator' | 'getyourguide' | 'airbnb'>('direct');

  if (!showNewBookingModal) return null;

  const selectedTour = tours.find(t => t.id === tourId) || tours[0];
  const calculatedAmount = pax * (selectedTour?.pricePerPerson || 70);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    addBooking({
      reference: `MAN-${Math.floor(100000 + Math.random() * 900000)}`,
      source,
      customerName,
      customerEmail: customerEmail || 'guest@example.com',
      customerPhone: customerPhone || '+39 06 1234 5678',
      tourId,
      tourTitle: selectedTour.title,
      date,
      time,
      pax,
      adults: pax,
      children: 0,
      language,
      amount: calculatedAmount,
      currency: 'EUR',
      status: 'confirmed',
      paymentStatus: 'paid',
      specialRequirements: specialRequirements || undefined,
      guideId
    });

    setShowNewBookingModal(false);
    // Reset form
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setSpecialRequirements('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowNewBookingModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <span>+ Add Reservation</span>
          <span className="text-xs bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 dark:border-blue-500/30 font-semibold">
            Direct / Manual
          </span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Record a direct guest booking, phone inquiry, or agency walk-in.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Tour */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Select Tour Experience
            </label>
            <select
              value={tourId}
              onChange={e => {
                setTourId(e.target.value);
                const tour = tours.find(t => t.id === e.target.value);
                if (tour && tour.departureTimes[0]) {
                  setTime(tour.departureTimes[0]);
                }
              }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
            >
              {tours.map(tour => (
                <option key={tour.id} value={tour.id}>
                  {tour.title} (€{tour.pricePerPerson}/pax)
                </option>
              ))}
            </select>
          </div>

          {/* Lead Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Lead Guest Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Rossi"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Channel / Source
              </label>
              <select
                value={source}
                onChange={e => setSource(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="direct">Direct Website (0% Fee)</option>
                <option value="viator">Viator / TripAdvisor</option>
                <option value="getyourguide">GetYourGuide</option>
                <option value="airbnb">Airbnb Experiences</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="guest@example.com"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Mobile Phone / WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+39 340 000 0000"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Date, Time, Pax */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Departure Time</label>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                {selectedTour.departureTimes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Guests (Pax)</label>
              <input
                type="number"
                min={1}
                max={selectedTour.maxCapacity}
                value={pax}
                onChange={e => setPax(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Language & Guide Assignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Language</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Italian">Italian (Italiano)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Assign Guide</label>
              <select
                value={guideId}
                onChange={e => setGuideId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                {guides.map(guide => (
                  <option key={guide.id} value={guide.id}>
                    {guide.name} ({guide.languages.join(', ')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Special Requirements / Dietary Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Vegetarian, Wheelchair access, Anniversary couple"
              value={specialRequirements}
              onChange={e => setSpecialRequirements(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Pricing summary banner */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-blue-700 dark:text-blue-200 font-medium">Total Calculated Booking Value:</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">€{calculatedAmount}.00</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowNewBookingModal(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-lg shadow-blue-600/30"
            >
              Confirm & Sync Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
