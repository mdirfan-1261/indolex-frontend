'use client';

import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function PlatformShowcase({ onOpenDemo }) {
  return (
    <section className="bg-[#FAF8F5] dark:bg-[#071326] py-12 sm:py-16 font-sans border-b border-stone-200 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT: COMPACT ARCHITECTURAL / SARG SHOWCASE (5 COLS) */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-stone-300/80 dark:border-slate-800 shadow-xl h-[330px] sm:h-[380px] flex flex-col justify-between p-6">

            {/* 100% NATURAL & BRIGHT ARCHITECTURE IMAGE (NO DARK BLEND FILTER) */}
            <img
              src="/showcase.webp"
              alt="Indian Institutional Legal Infrastructure"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* SUBTLE VIGNETTE (Sirf neeche halka sa gradient taaki text padha jaye) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* TOP BADGE */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider backdrop-blur-md shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                RBI Statutory Compliant
              </span>
              <span className="text-[10px] text-white font-mono bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                PAN-INDIA SARG
              </span>
            </div>

            {/* BOTTOM FLOATING CARD */}
            <div className="relative z-10 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-xl">
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Single Recovery Record</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">
                Zero spreadsheet fragmentation across 39 DRT & 16 NCLT benches.
              </div>
            </div>
          </div>

          {/* RIGHT: COMPACT EDITORIAL STORY (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E05320] mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E05320]" />
              <span>Statutory Precision & Speed</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-slate-900 dark:text-white leading-snug">
              Enterprise Recovery Intelligence for Banking & Legal Teams
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              IndoLex Laws equips zonal SARG officers and empanelled counsel with a centralized operating system — from early DPD alert detection to SARFAESI possession, court hearing dockets, and final OTS realization.
            </p>

            {/* 3 COMPACT FEATURE CHIPS */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-stone-200/80 dark:border-slate-800 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 dark:text-slate-200">
                  <strong className="text-slate-900 dark:text-white">SARFAESI Sec 13(2) & 13(4):</strong> One-click demand notices with automated guarantor liability schedules.
                </span>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-stone-200/80 dark:border-slate-800 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 dark:text-slate-200">
                  <strong className="text-slate-900 dark:text-white">DRT & NCLT Litigation Sync:</strong> Automated 16-digit CNR tracking, daily cause lists, and interim orders.
                </span>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-stone-200/80 dark:border-slate-800 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 dark:text-slate-200">
                  <strong className="text-slate-900 dark:text-white">Compromise & OTS Matrix:</strong> Structured NPV haircut calculations aligned with RBI Master Directions.
                </span>
              </div>
            </div>

            {/* COMPACT CTA BUTTON */}
            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#E05320]/20 hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
              >
                <span>Request Platform Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}