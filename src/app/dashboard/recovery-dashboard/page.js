'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  IndianRupee,
  ShieldCheck,
  Target,
  Clock,
  ArrowRight,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Percent,
  Layers
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RecoveryDashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(null); // UI-only: for FY time-left maths (set after mount to avoid hydration mismatch)

  const fetchStats = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch('http://localhost:5000/api/recovery/dashboard-stats', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setStats(json.data);
      }
    } catch (err) {
      console.error('Error fetching recovery dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const data = stats || {
    recoveryTargetInCr: '500.00',
    recoveryRealizedInCr: '0.00',
    percentageTargetMet: '0.0',
    otsPipelineInCr: '0.00',
    totalCasesResolved: 0,
  };

  /* ── UI-only derived analytics (render-time; no data logic changed) ── */
  const pct = Math.min(Math.max(Number(data.percentageTargetMet) || 0, 0), 100);
  const targetNum = Number(data.recoveryTargetInCr) || 0;
  const realizedNum = Number(data.recoveryRealizedInCr) || 0;
  const pipelineNum = Number(data.otsPipelineInCr) || 0;
  const remaining = Math.max(targetNum - realizedNum, 0);
  const BENCHMARK = 70; // matches the "Benchmark: 70% Q3" label

  // Stacked bar segments (realized | OTS pipeline | gap)
  const pipelinePct = targetNum > 0 ? Math.min((pipelineNum / targetNum) * 100, Math.max(100 - pct, 0)) : 0;
  const gapPct = Math.max(100 - pct - pipelinePct, 0);

  // Projection if the whole OTS pipeline converts
  const projectedPct = targetNum > 0 ? ((realizedNum + pipelineNum) / targetNum) * 100 : 0;
  const projectedGap = targetNum - (realizedNum + pipelineNum); // >0 shortfall, <=0 surplus

  // Financial year (Apr–Mar) time left
  let daysLeft = null;
  let monthsLeft = null;
  let runRate = null;
  if (now) {
    const fyEndYear = now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear();
    const fyEnd = new Date(fyEndYear, 2, 31);
    daysLeft = Math.max(Math.ceil((fyEnd - now) / 86400000), 0);
    monthsLeft = daysLeft / 30.4375;
    runRate = monthsLeft > 0 ? remaining / monthsLeft : remaining;
  }

  const card =
    'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';

  const kpis = [
    {
      label: 'Annual Recovery Target',
      value: `₹ ${data.recoveryTargetInCr} Cr`,
      sub: 'FY 2026-27 Board Target',
      icon: Target,
      valueClass: 'text-slate-900 dark:text-white',
      iconClass: 'text-slate-400 dark:text-slate-500',
    },
    {
      label: 'Actual Realized Collections',
      value: `₹ ${data.recoveryRealizedInCr} Cr`,
      sub: 'Direct Cash Recovered',
      icon: IndianRupee,
      valueClass: 'text-emerald-700 dark:text-emerald-400',
      iconClass: 'text-emerald-500 dark:text-emerald-400',
    },
    {
      label: 'Target Achievement',
      value: `${data.percentageTargetMet}%`,
      sub: 'Benchmark: 70% Q3',
      icon: Percent,
      valueClass: 'text-sky-700 dark:text-sky-400',
      iconClass: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'Sanctioned OTS Pipeline',
      value: `₹ ${data.otsPipelineInCr} Cr`,
      sub: 'Under Active Tranches',
      icon: Layers,
      valueClass: 'text-purple-700 dark:text-purple-400',
      iconClass: 'text-purple-500 dark:text-purple-400',
    },
    {
      label: 'Cases Resolved',
      value: `${data.totalCasesResolved ?? 0}`,
      sub: 'NPA resolutions to date',
      icon: CheckCircle2,
      valueClass: 'text-slate-900 dark:text-white',
      iconClass: 'text-emerald-500 dark:text-emerald-400',
    },
  ];

  return (
    <div className="p-3 md:p-4 space-y-3 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-medium text-emerald-700 dark:text-emerald-400">
            <span className="px-1.5 py-px rounded bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-500/30">
              BRD Section 11 (C)
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>Recovery targets & settlement cockpit</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Recovery Performance & OTS Radar
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Annual recovery targets, realized cash collections, OTS compromise pipeline and NPA resolutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/recovery"
            className="h-7 px-2.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11px] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <span>Manage OTS Files</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={fetchStats}
            disabled={loading}
            aria-label="Refresh recovery stats"
            className="h-7 w-7 grid place-items-center rounded-md bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI strip: one panel, 5 cells */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-lg:[&>*:nth-child(n+3)]:border-t">
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

      {/* Target progress (stacked: realized | OTS pipeline | gap) */}
      <div className={`${card} px-4 py-3`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-white">
              Target vs Realized Milestone Progress
            </h2>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400">
              ₹ {remaining.toFixed(2)} Cr remaining to reach the annual target
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold tabular-nums bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-500/30">
            {data.percentageTargetMet}% complete
          </span>
        </div>

        <div className="relative mt-3">
          <div className="flex h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              style={{ width: `${pct}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 transition-all duration-500"
              title={`Realized: ₹ ${data.recoveryRealizedInCr} Cr`}
            />
            <div
              style={{ width: `${pipelinePct}%` }}
              className="h-full bg-sky-300 dark:bg-sky-500/50 transition-all duration-500"
              title={`OTS pipeline: ₹ ${data.otsPipelineInCr} Cr`}
            />
          </div>
          {/* Benchmark marker */}
          <div
            className="absolute -top-1 bottom-[-4px] w-px bg-slate-400 dark:bg-slate-500"
            style={{ left: `${BENCHMARK}%` }}
            aria-hidden="true"
          />
        </div>

        <div className="relative mt-1.5 flex items-center justify-between text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
          <span>₹ 0 Cr</span>
          <span
            className="absolute -translate-x-1/2 text-slate-500 dark:text-slate-400"
            style={{ left: `${BENCHMARK}%` }}
          >
            Q3 benchmark {BENCHMARK}%
          </span>
          <span>Target: ₹ {data.recoveryTargetInCr} Cr</span>
        </div>

        {/* Legend */}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-slate-500 dark:text-slate-400 tabular-nums">
          <span className="inline-flex items-center gap-1.5">
            <i className="w-2 h-2 rounded-sm bg-emerald-500" />
            Realized <b className="font-semibold text-slate-800 dark:text-slate-100">{pct.toFixed(1)}%</b>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="w-2 h-2 rounded-sm bg-sky-300 dark:bg-sky-500/60" />
            OTS pipeline <b className="font-semibold text-slate-800 dark:text-slate-100">{pipelinePct.toFixed(1)}%</b>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="w-2 h-2 rounded-sm bg-slate-200 dark:bg-slate-700" />
            Unfunded gap <b className="font-semibold text-slate-800 dark:text-slate-100">{gapPct.toFixed(1)}%</b>
          </span>
        </div>
      </div>

      {/* Analytics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Gap to target */}
        <div className={`${card} px-3.5 py-3`}>
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Gap to annual target</h3>
            <Target className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
          </div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-rose-700 dark:text-rose-400 leading-6">
            ₹ {remaining.toFixed(2)} Cr
          </div>
          <div className="text-[10.5px] text-slate-400 dark:text-slate-500">
            {targetNum > 0 ? `${((remaining / targetNum) * 100).toFixed(1)}% of target still to collect` : 'Target not set'}
          </div>
        </div>

        {/* Required run-rate */}
        <div className={`${card} px-3.5 py-3`}>
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Required monthly run-rate</h3>
            <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-amber-700 dark:text-amber-400 leading-6">
            {runRate === null ? '…' : `₹ ${runRate.toFixed(2)} Cr / month`}
          </div>
          <div className="text-[10.5px] text-slate-400 dark:text-slate-500">
            {daysLeft === null
              ? 'Calculating FY time left…'
              : `to close the gap by 31 Mar · ${daysLeft} days (${monthsLeft.toFixed(1)} months) left`}
          </div>
        </div>

        {/* Projection */}
        <div className={`${card} px-3.5 py-3`}>
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Projected if OTS pipeline converts</h3>
            <TrendingUp className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
          </div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-sky-700 dark:text-sky-400 leading-6">
            {projectedPct.toFixed(1)}% of target
          </div>
          <div className="text-[10.5px] text-slate-400 dark:text-slate-500">
            {projectedGap > 0
              ? `Still ₹ ${projectedGap.toFixed(2)} Cr short after full conversion`
              : `Target covered, surplus ₹ ${Math.abs(projectedGap).toFixed(2)} Cr`}
          </div>
        </div>
      </div>
    </div>
  );
}