
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Landmark,
  ChevronRight,
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

export default function Hero({ onOpenDemo }) {
  const { isAuthenticated, loading } = useAuth();

  // Smooth scroll without changing URL hash
  const handleExploreScroll = () => {
    const el = document.getElementById('platform-solutions');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-[#0A1322] py-7 text-white sm:min-h-[calc(100vh-110px)] sm:py-14 lg:py-16">

      {/* BACKGROUND IMAGE */}
            {/* OPTIMIZED HERO IMAGE */}
      <Image
        src="/indolex_hero.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={80}
        className="absolute inset-0 -z-20 object-cover object-[65%_center] opacity-85 sm:object-center sm:opacity-90"
      />

      {/* MOBILE IMAGE OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-[#07101F]/10 sm:hidden" />

      {/* BACKGROUND GRADIENT OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070D18]/80 via-[#070D18]/55 to-[#070D18]/25 sm:from-[#070D18]/90 sm:via-[#070D18]/45 sm:to-black/20" />

      {/* BOTTOM GRADIENT */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-[#0A1322]/75 to-transparent sm:h-20 sm:from-[#0A1322]/90" />

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">

          {/* TOP BADGE */}
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 backdrop-blur-md sm:mb-5 sm:px-3.5">

            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-amber-400" />

            <span className="text-[9px] font-semibold uppercase tracking-wide text-amber-100 sm:text-[11px]">
              India's Institutional Legal & NPA Resolution Platform
            </span>
          </div>

          {/* MAIN HEADING */}
          <h1 className="text-[28px] font-light leading-[1.13] tracking-tight text-white sm:text-4xl sm:leading-[1.2] lg:text-[44px]">
            Trusted Legal Intelligence That Best Unifies{' '}
            <span className="font-serif font-normal italic text-amber-100/95">
              Bank Recovery
            </span>{' '}
            and Corporate Law
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-3 max-w-xl text-[13px] font-normal leading-[1.65] text-slate-100 sm:mt-4 sm:text-base sm:leading-relaxed sm:text-slate-300">
            Automate SARFAESI notices, monitor DRT & NCLT proceedings, and
            coordinate empanelled advocates through one synchronized,
            RBI-aligned operating system.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3.5">

            {/* REQUEST DEMO */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#E05320] px-4 py-2.5 text-[11px] font-semibold text-white shadow-md shadow-[#E05320]/25 transition-all hover:bg-[#C84518] hover:shadow-[#E05320]/40 active:scale-[0.99] sm:min-h-11 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            {/* DASHBOARD / EXPLORE BUTTON */}
            {!loading && isAuthenticated ? (
              <Link
                href="/dashboard"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-sky-400/40 bg-sky-500/20 px-3.5 py-2.5 text-[11px] font-semibold text-sky-100 backdrop-blur-sm transition-all hover:bg-sky-500/30 hover:text-white sm:min-h-11 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <Scale className="h-3.5 w-3.5 shrink-0 text-sky-300 sm:h-4 sm:w-4" />

                <span>Enter SARG Dashboard</span>

                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleExploreScroll}
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-400/60 bg-slate-950/20 px-3.5 py-2.5 text-[11px] font-medium text-white backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white/10 sm:min-h-11 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
              >
                <span>Explore Platform</span>

                <ChevronRight className="h-3.5 w-3.5 text-slate-200 sm:h-4 sm:w-4" />
              </button>
            )}

          </div>

          {/* TRUST BADGES */}
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-white/20 pt-4 text-[10px] text-slate-200 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:pt-6 sm:text-xs sm:text-slate-400">

            <div className="flex min-w-0 items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />

              <span className="leading-tight">
                SARFAESI 13(2) & 13(4) Aligned
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 shrink-0 text-amber-400 sm:h-4 sm:w-4" />

              <span className="leading-tight">
                DRT & NCLT Judicial Docket
              </span>
            </div>

            <div className="col-span-2 flex min-w-0 items-center gap-1.5 sm:col-span-1">
              <Landmark className="h-3.5 w-3.5 shrink-0 text-sky-400 sm:h-4 sm:w-4" />

              <span className="leading-tight">
                PSU & Private Banks
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
