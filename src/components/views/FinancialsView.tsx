import React, { useState } from 'react';
import { useTourMan } from '../../context/TourManContext';
import { 
  Euro, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  PieChart, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const FinancialsView: React.FC = () => {
  const { bookings, guides, tours, showToast } = useTourMan();

  // Financial calculations
  const totalGMV = bookings.reduce((sum, b) => sum + b.amount, 0);
  const totalDirectSales = bookings
    .filter(b => b.source === 'direct')
    .reduce((sum, b) => sum + b.amount, 0);
  
  // Traditional 2.5% booking fee comparison
  const commissionsSaved = Math.round(totalGMV * 0.025);
  const totalGuidePayouts = guides.reduce((sum, g) => {
    const toursCount = bookings.filter(b => b.guideId === g.id).length;
    return sum + (toursCount * g.baseRatePerTour);
  }, 0);
  const netAgencyProfit = totalGMV - totalGuidePayouts;

  const [payoutStatus, setPayoutStatus] = useState<Record<string, 'pending' | 'paid'>>({
    'guide-1': 'paid',
    'guide-2': 'paid',
    'guide-3': 'pending',
    'guide-4': 'pending',
    'guide-5': 'pending'
  });

  const togglePayout = (guideId: string) => {
    setPayoutStatus(prev => ({
      ...prev,
      [guideId]: prev[guideId] === 'paid' ? 'pending' : 'paid'
    }));
    showToast(`💶 Payout status updated for guide.`);
  };

  const handleExportStatement = () => {
    showToast(`📄 Financial summary PDF statement generated!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Financials & Commission Clarity</h2>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              0% Take Rate • Flat Subscription
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track gross merchandise value, automated guide settlements, and commission savings.
          </p>
        </div>

        <button
          onClick={handleExportStatement}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-slate-400" />
          <span>Download Statement</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Total Gross Bookings (GMV)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            €{totalGMV.toLocaleString()}
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
            Across {bookings.length} reservations
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Net Agency Revenue
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            €{netAgencyProfit.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            After certified guide payouts
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Guide Payouts Total
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            €{totalGuidePayouts.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Calculated per tour & license
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Commissions Saved
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            €{commissionsSaved.toLocaleString()}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            Saved vs standard 2.5% booking platforms
          </p>
        </div>
      </div>

      {/* Guide Payouts Ledger Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Certified Guide Payouts Ledger</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Track compensations calculated automatically by scheduled departures</p>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Monthly Cycle: October 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Guide Name</th>
                <th className="py-3 px-4">License #</th>
                <th className="py-3 px-4">Base Rate / Tour</th>
                <th className="py-3 px-4">Tours Assigned</th>
                <th className="py-3 px-4">Gross Payout Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {guides.map(guide => {
                const assignedToursCount = bookings.filter(b => b.guideId === guide.id).length;
                const totalDue = assignedToursCount * guide.baseRatePerTour;
                const isPaid = payoutStatus[guide.id] === 'paid';

                return (
                  <tr key={guide.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={guide.avatar}
                          alt={guide.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-bold text-slate-900 dark:text-white">{guide.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {guide.licenseNumber}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200">
                      €{guide.baseRatePerTour}.00
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      {assignedToursCount} Tours
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      €{totalDue}.00
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isPaid
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {isPaid ? 'Settled / Paid' : 'Pending Settlement'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => togglePayout(guide.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                          isPaid
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                        }`}
                      >
                        {isPaid ? 'Mark Pending' : 'Mark as Paid'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
