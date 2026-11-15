'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Scale,
  Calendar,
  Clock,
  UserCheck,
  Building2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Loader2,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LegalDashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch('https://indolex-backend.onrender.com/api/legal/dashboard-stats', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setStats(json.data);
      }
    } catch (err) {
      console.error('Error fetching legal dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const data = stats || {
    totalCases: 0,
    drtCases: 0,
    ncltCases: 0,
    sec138Cases: 0,
    upcomingHearingsCount: 0,
    upcomingCauselist: [],
  };

  /* ── UI-only derived values (render-time; no data logic changed) ── */
  const causelist = Array.isArray(data.upcomingCauselist) ? data.upcomingCauselist : [];

  const mix = [
    { label: 'DRT / DRAT', value: Number(data.drtCases) || 0, bar: 'bg-sky-500', dot: 'bg-sky-500' },
    { label: 'NCLT', value: Number(data.ncltCases) || 0, bar: 'bg-purple-500', dot: 'bg-purple-500' },
    { label: 'Sec 138', value: Number(data.sec138Cases) || 0, bar: 'bg-amber-500', dot: 'bg-amber-500' },
  ];
  const mixTotal = mix.reduce((s, m) => s + m.value, 0);

  const daysLeft = (d) => {
    if (!d) return null;
    const t = new Date(d);
    if (isNaN(t.getTime())) return null;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    t.setHours(0, 0, 0, 0);
    return Math.round((t - start) / 86400000);
  };

  const card =
    'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';

  const kpis = [
    {
      label: 'Total Active Litigation',
      value: `${data.totalCases} Cases`,
      sub: 'Under Active Adjudication',
      icon: Scale,
      valueClass: 'text-slate-900 dark:text-white',
      iconClass: 'text-slate-400 dark:text-slate-500',
    },
    {
      label: 'DRT / DRAT Suits',
      value: `${data.drtCases} Suits`,
      sub: 'Recovery of Debts Act 1993',
      icon: Building2,
      valueClass: 'text-sky-700 dark:text-sky-400',
      iconClass: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'NCLT (IBC Section 7/9)',
      value: `${data.ncltCases} Files`,
      sub: 'Insolvency Petitions',
      icon: ShieldCheck,
      valueClass: 'text-purple-700 dark:text-purple-400',
      iconClass: 'text-purple-500 dark:text-purple-400',
    },
    {
      label: 'Hearings This Fortnight',
      value: `${data.upcomingHearingsCount} Hearings`,
      sub: 'Next 14 Days Live Causelist',
      icon: Calendar,
      valueClass: 'text-rose-700 dark:text-rose-400',
      iconClass: 'text-rose-500 dark:text-rose-400',
    },
  ];

  return (
    <div className="p-3 md:p-4 space-y-3 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-medium text-sky-700 dark:text-sky-400">
            <span className="px-1.5 py-px rounded bg-sky-50 dark:bg-sky-500/10 ring-1 ring-inset ring-sky-200 dark:ring-sky-500/30">
              BRD Section 11 (B)
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>Judicial litigation & panel advocate cockpit</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Legal & Court Hearing Dashboard
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            DRT & NCLT hearing causelist, upcoming court appearances and panel advocate assignments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/cases"
            className="h-7 px-2.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11px] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <span>Manage All Cases</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={fetchStats}
            disabled={loading}
            aria-label="Refresh legal stats"
            className="h-7 w-7 grid place-items-center rounded-md bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI strip: one panel, 4 cells */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-lg:[&>*:nth-child(n+3)]:border-t">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="px-3.5 py-2.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{k.label}</span>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${k.iconClass}`} />
                </div>
                <div className={`mt-0.5 text-lg leading-6 font-semibold tabular-nums truncate ${k.valueClass}`}>
                  {loading && !stats ? '...' : k.value}
                </div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{k.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case mix */}
      <div className={`${card} px-4 py-3`}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-white">Case Mix by Forum</h2>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400">Distribution across DRT, NCLT and Sec 138 matters</p>
          </div>
          <span className="text-[11px] tabular-nums text-slate-500 dark:text-slate-400">{mixTotal} classified</span>
        </div>

        <div className="mt-2.5 flex h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {mixTotal > 0 &&
            mix.map((m) => (
              <div
                key={m.label}
                className={`${m.bar} h-full transition-all duration-500`}
                style={{ width: `${(m.value / mixTotal) * 100}%` }}
                title={`${m.label}: ${m.value}`}
              />
            ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[10.5px] text-slate-500 dark:text-slate-400 tabular-nums">
          {mix.map((m) => (
            <span key={m.label} className="inline-flex items-center gap-1.5">
              <i className={`w-2 h-2 rounded-sm ${m.dot}`} />
              {m.label}
              <b className="font-semibold text-slate-800 dark:text-slate-100">{m.value}</b>
              <span className="text-slate-400 dark:text-slate-500">
                {mixTotal > 0 ? `${Math.round((m.value / mixTotal) * 100)}%` : '0%'}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* LIVE CAUSELIST TABLE (Upcoming Hearings) */}
      <div className={`${card} overflow-hidden`}>
        <div className="px-4 py-2.5 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800">
          <div className="min-w-0">
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-white">
              Live Judicial Causelist
            </h2>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400">
              Upcoming court appearances · bench dates, judges and attending advocates
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-inset ring-sky-200 dark:ring-sky-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            eCourts Synced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11.5px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-4 font-medium">Date</th>
                <th className="py-1.5 px-3 font-medium">Case No</th>
                <th className="py-1.5 px-3 font-medium">Court / Bench</th>
                <th className="py-1.5 px-3 font-medium">Corporate Borrower</th>
                <th className="py-1.5 px-3 font-medium">Hearing Purpose</th>
                <th className="py-1.5 px-4 font-medium">Panel Advocate Attending</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {causelist.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-400 dark:text-slate-500">
                    No hearings scheduled in the next 14 days. Click "Manage All Cases" to add or update dates.
                  </td>
                </tr>
              ) : (
                causelist.map((item, idx) => {
                  const dl = daysLeft(item.nextHearingDate);
                  const urgent = dl !== null && dl <= 2;
                  return (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-1.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-rose-600 dark:text-rose-400 tabular-nums leading-4">
                          {item.nextHearingDate
                            ? new Date(item.nextHearingDate).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'TBD'}
                        </div>
                        {dl !== null && (
                          <div
                            className={`text-[10px] tabular-nums ${
                              urgent ? 'text-rose-500 dark:text-rose-400 font-medium' : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {dl < 0 ? `${Math.abs(dl)}d ago` : dl === 0 ? 'Today' : dl === 1 ? 'Tomorrow' : `in ${dl} days`}
                          </div>
                        )}
                      </td>
                      <td className="py-1.5 px-3 font-mono font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {item.caseNumber}
                      </td>
                      <td className="py-1.5 px-3 text-slate-700 dark:text-slate-300">{item.courtBench}</td>
                      <td className="py-1.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {item.borrower?.companyName || 'Corporate Entity'}
                      </td>
                      <td className="py-1.5 px-3 text-slate-600 dark:text-slate-400">{item.hearingPurpose}</td>
                      <td className="py-1.5 px-4 font-medium text-slate-900 dark:text-white">{item.assignedAdvocate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}