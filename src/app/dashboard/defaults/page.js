'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Clock,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Building2,
  Scale,
  RefreshCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';

export default function DefaultsPage() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBucket, setSelectedBucket] = useState('ALL');

  const fetchDefaults = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');
      let url = 'http://localhost:5000/api/defaults';
      if (selectedBucket !== 'ALL') url += `?bucket=${selectedBucket}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const json = await res.json();
      if (res.ok) {
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching default records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaults();
  }, [selectedBucket]);

  const counts = data?.counts || {
    sma0: 0,
    sma1: 0,
    sma2: 0,
    npa: 0,
    totalStressed: 0,
    totalStressedExposure: '0.00',
  };

  const stressedLoans = data?.stressedLoans || [];

  const getRecommendedAction = (dpd) => {
    if (dpd >= 90) {
      return {
        text: 'Issue SARFAESI Section 13(2) Notice',
        badge: 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30 font-semibold',
        href: '/dashboard/notices',
      };
    } else if (dpd >= 61) {
      return {
        text: 'Pre-SARFAESI SARG Warning Letter',
        badge: 'bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/30 font-semibold',
        href: '/dashboard/crm',
      };
    } else if (dpd >= 31) {
      return {
        text: 'Schedule Promoter SARG Consultation',
        badge: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30 font-medium',
        href: '/dashboard/crm',
      };
    } else {
      return {
        text: 'Early Warning Telephonic Follow-Up',
        badge: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30 font-medium',
        href: '/dashboard/crm',
      };
    }
  };

  /* ── UI-only bucket definitions (value + selection key unchanged) ── */
  const buckets = [
    {
      key: 'SMA-0',
      label: 'SMA-0 (1–30 DPD)',
      value: counts.sma0,
      sub: 'Early Watchlist Defaults',
      icon: Clock,
      text: 'text-blue-700 dark:text-blue-400',
      icon_c: 'text-blue-500 dark:text-blue-400',
      sel: 'bg-blue-50/70 dark:bg-blue-500/10 ring-blue-500',
      bar: 'bg-blue-500',
    },
    {
      key: 'SMA-1',
      label: 'SMA-1 (31–60 DPD)',
      value: counts.sma1,
      sub: 'Overdue Accounts (Active SARG)',
      icon: AlertTriangle,
      text: 'text-amber-700 dark:text-amber-400',
      icon_c: 'text-amber-500 dark:text-amber-400',
      sel: 'bg-amber-50/70 dark:bg-amber-500/10 ring-amber-500',
      bar: 'bg-amber-500',
    },
    {
      key: 'SMA-2',
      label: 'SMA-2 (61–89 DPD)',
      value: counts.sma2,
      sub: 'High-Risk Pre-NPA Warning',
      icon: TrendingDown,
      text: 'text-orange-700 dark:text-orange-400',
      icon_c: 'text-orange-500 dark:text-orange-400',
      sel: 'bg-orange-50/70 dark:bg-orange-500/10 ring-orange-500',
      bar: 'bg-orange-500',
    },
    {
      key: 'NPA',
      label: 'NPA (90+ DPD)',
      value: counts.npa,
      sub: 'SARFAESI 13(2) Trigger Ready',
      icon: ShieldAlert,
      text: 'text-rose-700 dark:text-rose-400',
      icon_c: 'text-rose-500 dark:text-rose-400',
      sel: 'bg-rose-50/70 dark:bg-rose-500/10 ring-rose-500',
      bar: 'bg-rose-500',
    },
  ];

  return (
    <div className="p-3 md:p-4 space-y-3 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-medium text-sky-700 dark:text-sky-400">
            <span className="px-1.5 py-px rounded bg-sky-50 dark:bg-sky-500/10 ring-1 ring-inset ring-sky-200 dark:ring-sky-500/30">
              M-04 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 4 & 7 · Default & DPD surveillance engine</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            DPD Aging & Non-Performing Asset (NPA) Radar
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Automated Days Past Due surveillance, RBI early warning buckets (SMA-0/1/2) and statutory SARFAESI trigger alerts.
          </p>
        </div>

        <button
          onClick={fetchDefaults}
          disabled={loading}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11.5px] inline-flex items-center gap-1.5 transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Recalculate DPD</span>
        </button>
      </div>

      {/* 4 DPD ageing buckets (RBI standards): single panel, clickable cells */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-lg:[&>*:nth-child(n+3)]:border-t">
          {buckets.map((b) => {
            const Icon = b.icon;
            const active = selectedBucket === b.key;
            return (
              <button
                key={b.key}
                type="button"
                onClick={() => setSelectedBucket(b.key)}
                aria-pressed={active}
                className={`relative text-left px-3.5 py-2.5 min-w-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 ${
                  active ? `${b.sel} ring-1 ring-inset` : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{b.label}</span>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${b.icon_c}`} />
                </div>
                <div className={`mt-0.5 text-lg leading-6 font-semibold tabular-nums ${b.text}`}>{b.value}</div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{b.sub}</div>
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 ${b.bar} ${active ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter tabs + total exposure */}
      <div className={`${card} flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2`}>
        <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-slate-100 dark:bg-slate-800 w-fit max-w-full overflow-x-auto">
          {['ALL', 'SMA-0', 'SMA-1', 'SMA-2', 'NPA'].map((bucket) => (
            <button
              key={bucket}
              onClick={() => setSelectedBucket(bucket)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedBucket === bucket
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {bucket === 'ALL' ? 'All Stressed Portfolios' : bucket}
            </button>
          ))}
        </div>

        <div className="text-[11.5px] font-medium text-slate-600 dark:text-slate-300 px-1">
          Total Stressed Exposure:{' '}
          <span className="text-rose-600 dark:text-rose-400 font-semibold tabular-nums">
            ₹ {counts.totalStressedExposure} Cr
          </span>
        </div>
      </div>

      {/* Defaults Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Borrower Entity</th>
                <th className="py-1.5 px-3 font-medium">Loan Account</th>
                <th className="py-1.5 px-3 font-medium text-right">Outstanding (₹ Cr)</th>
                <th className="py-1.5 px-3 font-medium">DPD Ageing</th>
                <th className="py-1.5 px-3 font-medium">Asset Class</th>
                <th className="py-1.5 px-3 font-medium">Statutory Action Required (BRD Law)</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Scanning Core Banking CBS Defaults...</span>
                  </td>
                </tr>
              ) : stressedLoans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">
                      No Stressed Accounts in this Bucket
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      All loan accounts in this category are standard or servicing regularly.
                    </p>
                  </td>
                </tr>
              ) : (
                stressedLoans.map((loan) => {
                  const action = getRecommendedAction(loan.dpd);
                  return (
                    <tr key={loan._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                      <td className="py-2 px-3.5">
                        <div className="font-semibold text-slate-900 dark:text-white leading-4">
                          {loan.borrower?.companyName || 'Corporate Entity'}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          CIN: {loan.borrower?.cin || 'N/A'} • {loan.borrower?.promoterPhone}
                        </div>
                      </td>

                      <td className="py-2 px-3">
                        <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">
                          {loan.loanAccountNumber}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">{loan.loanType}</span>
                      </td>

                      <td className="py-2 px-3 text-right font-semibold tabular-nums text-slate-900 dark:text-white whitespace-nowrap">
                        ₹ {(loan.outstandingPrincipal / 10000000).toFixed(2)} Cr
                      </td>

                      <td className="py-2 px-3 whitespace-nowrap">
                        <div
                          className={`text-[13px] leading-4 font-semibold tabular-nums ${
                            loan.dpd >= 90
                              ? 'text-rose-600 dark:text-rose-400'
                              : loan.dpd >= 61
                              ? 'text-orange-600 dark:text-orange-400'
                              : loan.dpd >= 31
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {loan.dpd} DPD
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Days Past Due</span>
                      </td>

                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 whitespace-nowrap">
                          {loan.assetClassification}
                        </span>
                      </td>

                      <td className="py-2 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10.5px] rounded ring-1 ring-inset whitespace-nowrap ${action.badge}`}>
                          {action.text}
                        </span>
                      </td>

                      <td className="py-2 px-3.5 text-right">
                        <Link
                          href={action.href}
                          className="h-6 px-2.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11px] inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                        >
                          <span>Execute</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
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