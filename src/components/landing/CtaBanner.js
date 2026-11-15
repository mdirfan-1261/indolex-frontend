'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CtaBanner({ onOpenDemo }) {
  return (
    <section className="bg-gradient-to-br from-[#0C172B] via-[#08101E] to-[#050C16] py-12 sm:py-16 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* SUBTLE AMBER GLOW */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-4 backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Scheduled Commercial Banks • ARCs • Law Panels</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
          Modernize Your Institution's Default Resolution & Legal Operations
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Equip your recovery officers, credit heads, and empanelled counsel with India’s synchronized statutory loan recovery platform.
        </p>

        {/* DUAL ACTION BUTTONS */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#E05320]/25 hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
          >
            <span>Schedule Institutional Briefing</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/5 px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-slate-200 hover:bg-white/10 hover:border-slate-500 transition-all"
          >
            <span>Bank SARG Login</span>
          </Link>
        </div>

        {/* 3 REGULATORY TRUST CHECKS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>RBI IRAC Master Directions Compliant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>SARFAESI Sec 13(2) & 13(4) Automation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>ISO 27001 Institutional Security</span>
          </div>
        </div>

      </div>
    </section>
  );
}