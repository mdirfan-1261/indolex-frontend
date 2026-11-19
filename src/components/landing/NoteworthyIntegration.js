'use client';

import Link from 'next/link';
import { ArrowRight, Scale, Globe, Zap, CheckCircle2 } from 'lucide-react';

export default function NoteworthyIntegration() {
  return (
    <section className="bg-[#070E1A] py-12 sm:py-16 font-sans text-white relative overflow-hidden border-b border-slate-800">
      {/* SUBTLE AMBER GLOW ACCENT */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* COMPACT AUTHENTIC HEADER */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E05320] mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E05320]" />
            <span>Statutory System Interoperability</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-white leading-tight">
            National Judicial & Regulatory Infrastructure
          </h2>
        </div>

        {/* COMPACT HIGH-TECH INTEGRATION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-gradient-to-br from-[#0C172B] to-[#08101E] p-6 sm:p-8 rounded-2xl border border-slate-800/90 shadow-2xl items-center">

          {/* LEFT: LIVE STATUTORY BRIDGE TERMINAL (5 COLS) */}
          <div className="lg:col-span-5 bg-[#060D18] rounded-xl p-6 border border-slate-700/60 flex flex-col justify-between shadow-inner">

            {/* STATUS ROW */}
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Statutory Bridge
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                API LATENCY: 24ms
              </span>
            </div>

            {/* DUAL CONNECTIVITY NODES */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 my-2">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                  <Scale className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-semibold text-slate-200">e-Courts Portal</span>
              </div>

              <div className="flex items-center text-amber-500">
                <Zap className="h-4 w-4 animate-pulse" />
                <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-amber-500 to-sky-500" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/10">
                  <Globe className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-semibold text-slate-200">IndoLex Engine</span>
              </div>
            </div>

            {/* PAN-INDIA COVERAGE FOOTER */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">
                39 DRT Benches • 16 NCLT Benches • 25 High Courts
              </div>
            </div>
          </div>

          {/* RIGHT: COMPACT EDITORIAL STORY (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
              Direct Judicial Docket Synchronization Across All DRT & NCLT Tribunals
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Eliminate missed court dates and manual cause-list checking. IndoLex automatically pulls CNR hearing statuses, daily interim orders, and bench listings into your central SARG dashboard, with automated alerts for limitation deadlines.
            </p>

            {/* 2 COMPACT VALUE POINTS */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>16-Digit CNR Automated Case Docket Synchronization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Automated Statutory Limitation Alerts (SARFAESI & IBC Deadlines)</span>
              </div>
            </div>

            {/* ACTION LINK (DIRECT TO REAL COURT LITIGATION SOLUTION) */}
            <div className="mt-6">
              <Link
                href="/solutions/court-litigation"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#E05320] hover:text-amber-400 transition-colors"
              >
                <span>Explore Judicial Docket Synchronization</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}