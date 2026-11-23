'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Building2,
  Clock,
  Sparkles,
  Gavel,
  ImageIcon
} from 'lucide-react';

export default function ServicesHero({ onOpenClaim, onOpenDefense }) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-6 dark:border-slate-800 dark:from-[#060D17] dark:via-[#071326] dark:to-[#0A182F] sm:py-9 lg:py-12">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute right-1/4 top-0 -mt-12 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-56 w-56 rounded-full bg-blue-500/5 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-5 sm:gap-7 lg:grid-cols-12 lg:gap-10">

          {/* LEFT COLUMN: Strategic Headlines, Actions & Proof Points (7 cols) */}
          <div className="space-y-3.5 sm:space-y-4 lg:col-span-7">

            {/* SUPER BADGE */}
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#E05320] shadow-sm sm:gap-2 sm:text-[11px]">
              <Scale className="h-3.5 w-3.5 shrink-0 text-[#E05320]" />
              <span className="truncate">Commercial Debt Resolution &amp; Enforcement</span>
            </div>

            {/* MAIN HEADLINE */}
            <div className="space-y-1.5">
              <h1 className="font-serif text-[26px] font-normal leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px]">
                Delinquent Receivables Into{' '}
                <span className="block font-serif italic text-[#E05320] sm:inline">
                  Recovered Capital.
                </span>
              </h1>
              <p className="max-w-2xl pt-1 text-[13px] font-normal leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm lg:text-[15px]">
                IndoLex Laws delivers multi-track institutional debt resolution across India. From pre-litigation forensic document audits and MSMED Samadhaan interest claims to Section 138 NI Act prosecutions and commercial decree executions.
              </p>
            </div>

            {/* ACTION CTA BUTTONS */}
            <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={onOpenClaim}
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E05320] px-5 text-xs font-semibold text-white shadow-lg shadow-[#E05320]/25 transition-all hover:bg-[#C84518] hover:shadow-xl hover:shadow-[#E05320]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320] focus-visible:ring-offset-2 active:scale-[0.98] dark:focus-visible:ring-offset-[#071326] sm:h-11 sm:px-6 sm:text-sm"
              >
                <span>Initiate Claim Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenDefense}
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-4 text-xs font-medium text-slate-800 shadow-sm transition-all hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320] focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-[#071326] sm:h-11 sm:px-5 sm:text-sm"
              >
                <ShieldCheck className="h-4 w-4 text-[#E05320]" />
                <span>Notice Defense Desk</span>
              </button>
            </div>

            {/* STATUTORY TRUST HIGHLIGHTS */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-200 pt-3.5 dark:border-slate-800/80 sm:gap-3 sm:pt-4">
              <div>
                <div className="font-serif text-lg font-bold leading-6 text-slate-900 dark:text-white sm:text-xl">
                  45 <span className="font-sans text-xs font-semibold text-[#E05320] sm:text-sm">Days</span>
                </div>
                <div className="text-[10.5px] font-medium leading-tight text-slate-500 dark:text-slate-400 sm:text-xs">
                  Average Escalation Cycle
                </div>
              </div>

              <div>
                <div className="font-serif text-lg font-bold leading-6 text-slate-900 dark:text-white sm:text-xl">
                  3x <span className="font-sans text-xs font-semibold text-emerald-500 sm:text-sm">RBI Rate</span>
                </div>
                <div className="text-[10.5px] font-medium leading-tight text-slate-500 dark:text-slate-400 sm:text-xs">
                  MSMED Sec 16 Interest
                </div>
              </div>

              <div>
                <div className="font-serif text-lg font-bold leading-6 text-slate-900 dark:text-white sm:text-xl">
                  100% <span className="font-sans text-xs font-semibold text-blue-500 sm:text-sm">Lawful</span>
                </div>
                <div className="text-[10.5px] font-medium leading-tight text-slate-500 dark:text-slate-400 sm:text-xs">
                  Zero Non-Compliant Tactics
                </div>
              </div>
            </div>

            {/* QUICK FEATURE PILLS */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Forensic Invoice Audit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Speed Post Notices
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Pan-India Court Execution
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Hero Visual (5 cols) */}
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-700/80 dark:bg-[#0A1528] sm:shadow-2xl">

              {/* HERO IMAGE CONTAINER (Points to /images/services/services-hero.webp) */}
              <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-900 sm:h-56 lg:h-64">
                {!imageError ? (
                  <img
                    src="/images/services/services-hero.webp"
                    alt="IndoLex Commercial Legal Recovery Chambers"
                    onError={() => setImageError(true)}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0A1528] to-[#071326] p-4 text-center text-white">
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl border border-[#E05320]/30 bg-[#E05320]/20 text-[#E05320] shadow-lg">
                      <Scale className="h-6 w-6" />
                    </div>
                    <span className="mb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-orange-400">
                      Hero Image Slot
                    </span>
                    <p className="max-w-xs text-[11px] leading-relaxed text-slate-300">
                      Place your generated image at:<br />
                      <code className="mt-1 inline-block rounded bg-black/40 px-2 py-0.5 font-mono text-[10.5px] text-[#E05320]">
                        /images/services/services-hero.webp
                      </code>
                    </p>
                  </div>
                )}

                {/* Subtle Luxury Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/30 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-0.5 text-[10.5px] font-bold text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700 dark:bg-[#071326]/90 dark:text-white sm:left-4 sm:top-4 sm:text-[11px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
                  <span>Statutory Escalation Chamber</span>
                </div>

                {/* Top Right Scale Icon Badge */}
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#E05320] text-white shadow-lg shadow-[#E05320]/40 sm:right-4 sm:top-4 sm:h-9 sm:w-9 sm:rounded-xl">
                  <Gavel className="h-4 w-4" />
                </div>

                {/* Bottom Overlay Text on Image */}
                <div className="absolute inset-x-3 bottom-3 text-white sm:inset-x-4 sm:bottom-4">
                  <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-orange-400 sm:text-[11px]">
                    <Sparkles className="h-3 w-3" />
                    <span>Enforceable Debt Realization Track</span>
                  </div>
                  <h3 className="font-serif text-[15px] font-bold leading-snug text-white sm:text-lg">
                    Judicial Authority &amp; Commercial Precision
                  </h3>
                </div>
              </div>

              {/* CARD DETAILS FOOTER / METRICS STRIP */}
              <div className="space-y-2.5 border-t border-slate-100 bg-white p-3.5 dark:border-slate-800 dark:bg-[#0A1528] sm:p-4">

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-orange-50 p-1.5 text-[#E05320] dark:bg-orange-950/40">
                    <FileCheck2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      B2B Trade Invoices &amp; MSME Dues
                    </div>
                    <div className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                      Applicable for claims from ₹2,00,000 to ₹50+ Crores with full interest compounding.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-blue-50 p-1.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      Pan-India Jurisdiction Network
                    </div>
                    <div className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                      High Courts, Commercial Courts, MSEFC Facilitation Councils, DRT &amp; NCLT benches.
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-slate-100 pt-2 text-[11px] dark:border-slate-800/80">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-[#E05320]" /> Real-Time Case Tracking
                  </span>
                  <span className="font-semibold text-[#E05320]">
                    Zero Upfront Retainer on Audit →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}