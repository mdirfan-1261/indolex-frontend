'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Save,
  Shield,
  Key,
  Mail,
  CheckCircle2,
  User,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    crilcThreshold: '50000000', // ₹5 Cr
    sarfaesiNoticeExpiryDays: '60',
    sessionTimeoutMinutes: '30',
    speedPostApiKey: 'INPOST_PROD_KEY_2026_XYZ',
    smtpHost: 'smtp.office365.bank.com',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  /* ── UI-only style tokens (light + dark) ── */
  const card =
    'rounded-lg bg-white dark:bg-[#0A1526] ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
  const inputCls =
    'w-full h-8 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors';
  const labelCls = 'block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1';
  const hintCls = 'block mt-0.5 text-[10px] text-slate-400 dark:text-slate-500';

  // UI-only: live hint for the CRILC threshold, derived from the field value
  const crilcCr = Number(config.crilcThreshold);
  const crilcHint = Number.isFinite(crilcCr) && config.crilcThreshold !== ''
    ? `Currently set to ₹${(crilcCr / 10000000).toFixed(2)} Crores`
    : 'Enter an amount in rupees';

  const Section = ({ icon: Icon, title, subtitle, children }) => (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-2.5">
        <Icon size={14} className="text-slate-400 dark:text-slate-500" />
        <div>
          <h3 className="text-[13px] leading-4 font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-[10.5px] text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-3 md:p-4 space-y-3 max-w-4xl pb-8 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-500/20">
            <Settings size={16} />
          </div>
          <div className="min-w-0">
            <h1 className="text-[15px] leading-5 font-semibold tracking-tight text-slate-900 dark:text-white">
              System & Platform Configuration
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Set regulatory thresholds, API credentials and enterprise security policies.
            </p>
          </div>
        </div>
        <Link
          href="/admin/profile"
          className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 px-2.5 text-[11px] font-medium text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <User className="h-3 w-3 text-rose-500 dark:text-rose-400" />
          <span>Super Admin Profile</span>
        </Link>
      </div>

      {saved && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11.5px] font-medium ring-1 bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>System parameters updated and synchronized across all cluster instances.</span>
        </div>
      )}

      <form onSubmit={handleSave} className={`${card} overflow-hidden`}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Section icon={Shield} title="Regulatory thresholds" subtitle="RBI and SARFAESI statutory parameters">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>RBI CRILC Mandatory Reporting Threshold (₹)</label>
                <input
                  type="text"
                  value={config.crilcThreshold}
                  onChange={(e) => setConfig({ ...config, crilcThreshold: e.target.value })}
                  className={`${inputCls} tabular-nums`}
                />
                <span className={hintCls}>{crilcHint}</span>
              </div>

              <div>
                <label className={labelCls}>SARFAESI 13(2) Statutory Notice Window (Days)</label>
                <input
                  type="text"
                  value={config.sarfaesiNoticeExpiryDays}
                  onChange={(e) => setConfig({ ...config, sarfaesiNoticeExpiryDays: e.target.value })}
                  className={`${inputCls} tabular-nums`}
                />
                <span className={hintCls}>Mandatory 60 Days by law</span>
              </div>
            </div>
          </Section>

          <Section icon={Key} title="Integrations" subtitle="Third-party API credentials">
            <div className="max-w-md">
              <label className={labelCls}>India Post API Integration Key</label>
              <input
                type="password"
                value={config.speedPostApiKey}
                onChange={(e) => setConfig({ ...config, speedPostApiKey: e.target.value })}
                className={inputCls}
              />
            </div>
          </Section>

          <Section icon={Shield} title="Security policy" subtitle="Session and access controls">
            <div className="max-w-md">
              <label className={labelCls}>Security Session Timeout (Minutes)</label>
              <input
                type="text"
                value={config.sessionTimeoutMinutes}
                onChange={(e) => setConfig({ ...config, sessionTimeoutMinutes: e.target.value })}
                className={`${inputCls} tabular-nums`}
              />
            </div>
          </Section>
        </div>

        <div className="flex items-center justify-end border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 px-4 py-2.5">
          <button
            type="submit"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-rose-600 hover:bg-rose-700 px-3.5 text-[11.5px] font-medium text-white cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A1526]"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save System Parameters</span>
          </button>
        </div>
      </form>
    </div>
  );
}