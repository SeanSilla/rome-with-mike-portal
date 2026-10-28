import React, { useState } from 'react';
import { 
  MIKE_TOURS, 
  MIKE_GUIDES, 
  MikeTourRow, 
  processTourRow, 
  INITIAL_CALCULATOR_ROWS, 
  isExpressTour, 
  isHiddenRome, 
  getDefaultTaxiFee 
} from '../../types/calculator';
import { 
  Calculator, 
  Printer, 
  Plus, 
  Trash2, 
  User, 
  Calendar, 
  Euro, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  RefreshCw,
  Building2,
  TrendingUp
} from 'lucide-react';

export const MikeCalculatorView: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>("usr_alain_piredda");
  const [selectedMonth, setSelectedMonth] = useState<string>("2026-10");
  const [viewMode, setViewMode] = useState<'guide' | 'admin'>('guide');
  const [rows, setRows] = useState<MikeTourRow[]>(INITIAL_CALCULATOR_ROWS);

  const selectedGuide = MIKE_GUIDES.find(g => g.id === selectedGuideId) || MIKE_GUIDES[1];

  // Rows for selected guide and month
  const currentGuideRows = rows.filter(r => r.guideId === selectedGuideId && r.month === selectedMonth);

  // Computations for current guide
  const totalTours = currentGuideRows.length;
  const totalPax = currentGuideRows.reduce((sum, r) => sum + r.pax, 0);
  const totalBaseFee = currentGuideRows.reduce((sum, r) => sum + r.baseFee, 0);
  const totalTaxi = currentGuideRows.reduce((sum, r) => sum + r.taxiFee, 0);
  const totalExpenses = currentGuideRows.reduce((sum, r) => sum + r.additionalExpenses, 0);
  const totalCollected = currentGuideRows.reduce((sum, r) => sum + r.collected, 0);
  const totalNetFee = currentGuideRows.reduce((sum, r) => sum + r.feeToBePaid, 0);

  const handleUpdateRow = (id: string, field: keyof MikeTourRow, value: any) => {
    setRows(prev => prev.map(r => {
      if (r.id !== id) return r;

      const updatedRaw = { ...r, [field]: value };

      // Handle tour change side-effects
      if (field === 'tour') {
        if (!isExpressTour(value)) {
          updatedRaw.paired = '';
        } else if (!updatedRaw.paired) {
          updatedRaw.paired = 'No';
        }

        if (isHiddenRome(value)) {
          updatedRaw.taxiFee = updatedRaw.taxiFee || 3;
        } else {
          updatedRaw.taxiFee = 0;
        }
      }

      return processTourRow(updatedRaw);
    }));
  };

  const handleAddRow = () => {
    const newRow = processTourRow({
      guideId: selectedGuideId,
      month: selectedMonth,
      date: `${selectedMonth}-15`,
      tour: "Catacombs",
      pax: 4,
      paired: "",
      additionalExpenses: 0,
      collected: 0,
      notes: "New tour log"
    });
    setRows(prev => [newRow, ...prev]);
  };

  const handleDeleteRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mike Tours Calculator</h2>
            <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              Official Formula Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Rome With Mike official monthly spreadsheet calculator with live fee formulas, taxi reimbursements, and isolated guide statements.
          </p>
        </div>

        {/* View Toggle (Guide Calculator vs Master Admin Dashboard) */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center">
            <button
              onClick={() => setViewMode('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'guide'
                  ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Guide Calculator
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'admin'
                  ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Master Admin View</span>
              <span className="text-[9px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1 rounded">
                Boss
              </span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition flex items-center gap-1.5"
            title="Print Official Statement PDF"
          >
            <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {viewMode === 'guide' ? (
        <>
          {/* Guide Selector & Month Control Bar */}
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {/* Guide Dropdown */}
              <div className="w-full sm:w-64">
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Active Tour Guide
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={selectedGuideId}
                    onChange={e => setSelectedGuideId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    {MIKE_GUIDES.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.displayName} ({g.role === 'admin' ? 'Boss/Admin' : 'Guide'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Month Selector */}
              <div className="w-full sm:w-44">
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Billing Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleAddRow}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Tour Log Row</span>
            </button>
          </div>

          {/* Monthly KPI Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Tours Conducted</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{totalTours}</div>
              <span className="text-[10px] text-slate-500">In {selectedMonth}</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Total Pax</span>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{totalPax}</div>
              <span className="text-[10px] text-slate-500">Guests guided</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Taxi Reimbursed</span>
              <div className="text-xl font-black text-slate-800 dark:text-slate-200 mt-0.5">€{totalTaxi}.00</div>
              <span className="text-[10px] text-slate-500">Hidden Rome taxi</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Expenses / Receipts</span>
              <div className="text-xl font-black text-slate-800 dark:text-slate-200 mt-0.5">€{totalExpenses}.00</div>
              <span className="text-[10px] text-slate-500">Tickets / tastings</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Cash Collected</span>
              <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">-€{totalCollected}.00</div>
              <span className="text-[10px] text-slate-500">Deducted from fee</span>
            </div>

            {/* BIG NET PAYOUT HIGHLIGHT */}
            <div className="bg-gradient-to-br from-emerald-500/10 dark:from-emerald-950/60 to-white dark:to-slate-900 p-3.5 rounded-xl border-2 border-emerald-500/50 shadow-lg col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-extrabold text-emerald-600 dark:text-emerald-400 block tracking-wider">
                Net Fee To Be Paid
              </span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                €{totalNetFee.toFixed(2)}
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">Total Guide Earnings</span>
            </div>
          </div>

          {/* Interactive Calculator Table (Spreadsheet View) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Monthly Tour Log • {selectedGuide.displayName} ({selectedMonth})
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Live formula recalculation active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 min-w-[210px]">Tour Experience</th>
                    <th className="py-3 px-2 text-center">Paired?</th>
                    <th className="py-3 px-2 text-center w-16">Pax</th>
                    <th className="py-3 px-2 text-right">Base</th>
                    <th className="py-3 px-2 text-right">Add'l/Pax</th>
                    <th className="py-3 px-2 text-right w-20">Taxi (€)</th>
                    <th className="py-3 px-2 text-right w-20">Expenses (€)</th>
                    <th className="py-3 px-2 text-right w-20">Collected (€)</th>
                    <th className="py-3 px-3 text-right min-w-[110px]">Fee To Be Paid</th>
                    <th className="py-3 px-3 min-w-[160px]">Notes</th>
                    <th className="py-3 px-2 text-center w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                  {currentGuideRows.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-12 text-center text-slate-500">
                        No tour entries recorded for this month yet. Click "+ Add Tour Log Row" above to get started.
                      </td>
                    </tr>
                  ) : (
                    currentGuideRows.map(row => {
                      const isExpress = isExpressTour(row.tour);
                      const isHidden = isHiddenRome(row.tour);

                      return (
                        <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          {/* Date */}
                          <td className="py-2.5 px-3">
                            <input
                              type="date"
                              value={row.date}
                              onChange={e => handleUpdateRow(row.id, 'date', e.target.value)}
                              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                            />
                          </td>

                          {/* Tour Selector */}
                          <td className="py-2.5 px-3">
                            <select
                              value={row.tour}
                              onChange={e => handleUpdateRow(row.id, 'tour', e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            >
                              {MIKE_TOURS.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </td>

                          {/* Paired (Express only) */}
                          <td className="py-2.5 px-2 text-center">
                            {isExpress ? (
                              <select
                                value={row.paired || 'No'}
                                onChange={e => handleUpdateRow(row.id, 'paired', e.target.value)}
                                className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
                              >
                                <option value="No">No</option>
                                <option value="Yes">Yes (€5/pax)</option>
                              </select>
                            ) : (
                              <span className="text-slate-400 dark:text-slate-600 text-xs">—</span>
                            )}
                          </td>

                          {/* Pax */}
                          <td className="py-2.5 px-2 text-center">
                            <input
                              type="number"
                              min={0}
                              value={row.pax}
                              onChange={e => handleUpdateRow(row.id, 'pax', parseInt(e.target.value) || 0)}
                              className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-center text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                          </td>

                          {/* Base Fee */}
                          <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300">
                            €{row.baseFee}
                          </td>

                          {/* Per Add'l Pax */}
                          <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300">
                            €{row.perAddlPax}
                          </td>

                          {/* Taxi Fee */}
                          <td className="py-2.5 px-2 text-right">
                            <input
                              type="number"
                              step="0.5"
                              value={row.taxiFee}
                              onChange={e => handleUpdateRow(row.id, 'taxiFee', parseFloat(e.target.value) || 0)}
                              className={`w-16 bg-slate-50 dark:bg-slate-800 border rounded-lg px-2 py-1 text-xs text-right font-mono focus:outline-none ${
                                isHidden ? 'border-amber-400 text-amber-600 dark:text-amber-300' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-400'
                              }`}
                            />
                          </td>

                          {/* Additional Expenses */}
                          <td className="py-2.5 px-2 text-right">
                            <input
                              type="number"
                              step="0.5"
                              value={row.additionalExpenses}
                              onChange={e => handleUpdateRow(row.id, 'additionalExpenses', parseFloat(e.target.value) || 0)}
                              className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-right font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                          </td>

                          {/* Collected Cash */}
                          <td className="py-2.5 px-2 text-right">
                            <input
                              type="number"
                              step="0.5"
                              value={row.collected}
                              onChange={e => handleUpdateRow(row.id, 'collected', parseFloat(e.target.value) || 0)}
                              className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-right font-mono text-rose-600 dark:text-rose-300 focus:outline-none focus:border-blue-500"
                            />
                          </td>

                          {/* Fee To Be Paid */}
                          <td className="py-2.5 px-3 text-right">
                            <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                              €{row.feeToBePaid.toFixed(2)}
                            </span>
                          </td>

                          {/* Notes */}
                          <td className="py-2.5 px-3">
                            <input
                              type="text"
                              placeholder="Notes..."
                              value={row.notes || ''}
                              onChange={e => handleUpdateRow(row.id, 'notes', e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/80 rounded-lg px-2 py-1 text-xs text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500"
                            />
                          </td>

                          {/* Delete */}
                          <td className="py-2.5 px-2 text-center">
                            <button
                              onClick={() => handleDeleteRow(row.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                              title="Delete row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
              <div className="space-y-1 sm:space-y-0 sm:space-x-4">
                <span>Catacombs / Hidden Rome: €45 + €10/pax (&gt;2)</span>
                <span>Express: €35 (or €5/pax paired)</span>
                <span>PVT Tours: Flat €125</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                Total Month Net Payout: <span className="text-emerald-600 dark:text-emerald-400">€{totalNetFee.toFixed(2)} EUR</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* MASTER ADMIN SUBMISSIONS DASHBOARD */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                <span>Master Submissions Dashboard • Mighty Mike (The Boss)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Overview of all Rome With Mike guide monthly spreadsheets, total pax, expenses, and net compensations.
              </p>
            </div>
            <span className="text-xs font-mono bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-500/30 font-bold">
              Cycle: {selectedMonth}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Guide Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-center">Tours Logged</th>
                  <th className="py-3 px-4 text-center">Total Pax</th>
                  <th className="py-3 px-4 text-right">Taxi Reimbursed</th>
                  <th className="py-3 px-4 text-right">Expenses</th>
                  <th className="py-3 px-4 text-right">Collected</th>
                  <th className="py-3 px-4 text-right">Net Fee Due</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                {MIKE_GUIDES.filter(g => g.role === 'guide').map(guide => {
                  const gRows = rows.filter(r => r.guideId === guide.id && r.month === selectedMonth);
                  const gTours = gRows.length;
                  const gPax = gRows.reduce((s, r) => s + r.pax, 0);
                  const gTaxi = gRows.reduce((s, r) => s + r.taxiFee, 0);
                  const gExp = gRows.reduce((s, r) => s + r.additionalExpenses, 0);
                  const gCol = gRows.reduce((s, r) => s + r.collected, 0);
                  const gNet = gRows.reduce((s, r) => s + r.feeToBePaid, 0);

                  return (
                    <tr key={guide.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-600/30 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-[10px]">
                          {guide.displayName.substring(0, 2).toUpperCase()}
                        </div>
                        <span>{guide.displayName}</span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                        {guide.role === 'admin' ? 'Super Admin' : 'Certified Guide'}
                      </td>

                      <td className="py-3.5 px-4 text-center font-bold text-slate-900 dark:text-white">
                        {gTours}
                      </td>

                      <td className="py-3.5 px-4 text-center text-blue-600 dark:text-blue-400 font-bold">
                        {gPax}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                        €{gTaxi}.00
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                        €{gExp}.00
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-rose-600 dark:text-rose-400">
                        €{gCol}.00
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span className="font-mono font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                          €{gNet.toFixed(2)}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          gTours > 0 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}>
                          {gTours > 0 ? 'Submitted' : 'Pending'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedGuideId(guide.id);
                            setViewMode('guide');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-100 dark:hover:bg-blue-600/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 text-xs font-semibold transition"
                        >
                          Inspect Spreadsheet →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
