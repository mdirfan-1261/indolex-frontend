'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Scale, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function ServicesCta({ onOpenClaim, onOpenDefense }) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-orange-50/20 dark:from-[#060D17] dark:via-[#071326] dark:to-[#0A182F] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-[11px] font-bold text-[#E05320] uppercase tracking-wider">
          <Scale className="h-3.5 w-3.5" />
          <span>Statutory Intake &amp; Case Verification</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
          Ready to Recover What You Are Legally Owed?
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Submit your transaction dockets, pending invoices, or dishonoured cheques. Our empanelled High Court advocates and financial recovery experts will audit your legal enforceability within 48 hours.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenClaim}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#E05320] hover:bg-[#C84518] px-7 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#E05320]/25 hover:shadow-xl transition-all cursor-pointer transform active:scale-95"
          >
            <span>Initiate Claim Assessment</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenDefense}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-6 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
          >
            <ShieldCheck className="h-4 w-4 text-[#E05320]" />
            <span>Notice Defense Desk</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Confidential
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Zero Retainer on Initial Audit
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Pan-India Jurisdiction
          </span>
        </div>

      </div>
    </section>
  );
}
