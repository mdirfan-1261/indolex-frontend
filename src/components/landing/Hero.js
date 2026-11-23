'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Scale, ChevronRight } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

export default function Hero({ onOpenDemo, onOpenClaim }) {
  const { isAuthenticated, loading } = useAuth();

  const handleClaimClick = () => {
    if (onOpenClaim) {
      onOpenClaim();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-claim-modal'));
    }
  };

  // Smooth scroll without changing URL hash
  const handleExploreScroll = () => {
    const el = document.getElementById('platform-solutions');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const focusRing =
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1322]';

  return (
    <section className="relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#0A1322] py-10 text-white sm:min-h-[calc(100vh-110px)] sm:py-16 lg:py-20">

      {/* OPTIMIZED HERO IMAGE */}
      <Image
        src="/indolex_hero.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="absolute inset-0 -z-20 object-cover object-[65%_center] opacity-85 sm:object-center sm:opacity-90"
      />

      {/* READABILITY OVERLAYS */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070D18]/90 via-[#070D18]/60 to-[#070D18]/25 sm:from-[#070D18]/92 sm:via-[#070D18]/50 sm:to-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1322]/80 via-transparent to-transparent" />

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">

          {/* TOP BADGE */}
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 backdrop-blur-md sm:mb-5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <span className="truncate text-[10px] font-medium tracking-wide text-amber-100 sm:text-[11.5px]">
              India&apos;s Institutional Legal &amp; NPA Resolution Platform
            </span>
          </div>

          {/* MAIN HEADING */}
          <h1 className="text-balance text-[28px] font-light leading-[1.14] tracking-tight text-white sm:text-4xl sm:leading-[1.15] lg:text-[46px]">
            Trusted Legal Intelligence That Best Unifies{' '}
            <span className="font-serif font-normal italic text-amber-100">
              Bank Recovery
            </span>{' '}
            and Corporate Law
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-3.5 max-w-xl text-[13.5px] leading-[1.65] text-slate-200 sm:mt-4 sm:text-base sm:leading-relaxed sm:text-slate-300">
            Automate SARFAESI notices, monitor DRT &amp; NCLT proceedings, and
            coordinate empanelled advocates through one synchronized,
            RBI-aligned operating system.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-3">

            {/* ASSESS RECOVERY CLAIM BUTTON (HIGH CONVERSION) */}
            <button
              type="button"
              onClick={handleClaimClick}
              className={`col-span-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-amber-300/30 bg-gradient-to-b from-amber-500 to-orange-600 px-6 text-[13px] font-semibold text-white shadow-lg shadow-orange-700/30 ring-1 ring-inset ring-white/15 transition-all hover:from-amber-400 hover:to-orange-500 active:scale-[0.99] cursor-pointer sm:col-span-1 sm:text-sm ${focusRing}`}
            >
              <span>Assess Debt Recovery Claim</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* SCHEDULE BANK BRIEFING / DEMO */}
            <button
              type="button"
              onClick={onOpenDemo}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-[12.5px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/15 active:scale-[0.99] cursor-pointer sm:px-5 sm:text-sm ${focusRing}`}
            >
              <span>Schedule Bank Briefing</span>
            </button>

            {/* DASHBOARD / EXPLORE BUTTON */}
            {!loading && isAuthenticated ? (
              <Link
                href="/dashboard"
                className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-sky-400/40 bg-sky-500/15 px-4 text-[12.5px] font-medium text-sky-100 backdrop-blur-md transition-all hover:bg-sky-500/25 hover:text-white sm:px-5 sm:text-sm ${focusRing}`}
              >
                <Scale className="h-4 w-4 shrink-0 text-sky-300" />
                <span>Enter SARG Dashboard</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleExploreScroll}
                className={`inline-flex h-11 items-center justify-center gap-1 rounded-xl px-3 text-[12.5px] font-medium text-slate-200 transition-colors hover:text-white cursor-pointer sm:px-4 sm:text-sm ${focusRing}`}
              >
                <span>Explore Platform</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}