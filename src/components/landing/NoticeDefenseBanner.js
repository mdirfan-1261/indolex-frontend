'use client';

import { ShieldAlert, ArrowRight, Gavel, Scale, AlertOctagon } from 'lucide-react';

export default function NoticeDefenseBanner({ onOpenDefense }) {
  const handleClick = () => {
    if (onOpenDefense) {
      onOpenDefense();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-notice-defense-modal'));
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#140808] via-[#1A0B10] to-[#0A1222] border-y border-rose-900/40 py-5 sm:py-6 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden font-sans">
      
      {/* BACKGROUND SUBTLE ROSE GLOW */}
      <div className="absolute -left-12 -top-12 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
        
        {/* LEFT: URGENT STATUTORY BADGE & HEADING */}
        <div className="flex items-start gap-3 sm:gap-3.5 max-w-3xl">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Borrower &amp; Guarantor Legal Defense
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">•</span>
              <span className="text-[10px] text-slate-300 font-mono">
                Statutory 15-Day Section 13(3A) Limitation Clock
              </span>
            </div>

            <h3 className="font-serif text-base sm:text-lg font-normal text-white leading-snug">
              Received a Bank SARFAESI 13(2) Notice or Property Auction Threat?
            </h3>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed font-normal">
              Exercise statutory defense rights under Section 13(3A) and file DRT Section 17 appeals to stay coercive physical possession before auction.
            </p>

            {/* QUICK STATUTORY CHIPS */}
            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[10.5px] text-slate-400">
              <span className="flex items-center gap-1 text-amber-300">
                <Scale className="w-3 h-3 text-amber-400" />
                <span>Sec 13(3A) Formal Objections</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-sky-300">
                <Gavel className="w-3 h-3 text-sky-400" />
                <span>DRT Section 17 Stay on Auction</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-rose-300">
                <AlertOctagon className="w-3 h-3 text-rose-400" />
                <span>Sec 14 DM Eviction Writ</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTION BUTTON */}
        <div className="shrink-0 pt-2 lg:pt-0">
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-rose-900/40 active:scale-95 transition-all cursor-pointer border border-rose-400/30 w-full sm:w-auto"
          >
            <span>Challenge Notice &amp; Get DRT Stay</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}