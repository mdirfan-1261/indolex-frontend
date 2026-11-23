'use client';

import React from 'react';
import { Landmark, Scale, Shield, Building2, Gavel, CheckCircle2 } from 'lucide-react';

export default function LegalForumsStrip() {
  const forums = [
    {
      name: 'MSEFC Samadhaan',
      role: 'Micro & Small Enterprises Facilitation Council',
      statute: 'MSMED Act Sec 18',
      desc: 'Mandatory conciliation & arbitration for delayed payments with 3x RBI compound interest.',
      icon: Scale,
    },
    {
      name: 'Negotiable Instruments Court',
      role: 'Metropolitan / Judicial Magistrate Court',
      statute: 'Sec 138 / 143A NI Act',
      desc: 'Criminal prosecution for cheque dishonour with 20% interim compensation power.',
      icon: Gavel,
    },
    {
      name: 'Commercial Courts',
      role: 'Designated Commercial Division & Benches',
      statute: 'Commercial Courts Act 2015',
      desc: 'Summary suits under Order XXXVII CPC for speedy recovery of liquidated debts.',
      icon: Building2,
    },
    {
      name: 'National Company Law Tribunal',
      role: 'NCLT Benches (Corporate Debtors)',
      statute: 'IBC 2016 Sec 8 & 9',
      desc: 'Operational creditor insolvency admission for corporate defaults exceeding ₹1 Crore.',
      icon: Landmark,
    },
  ];

  return (
    <section className="py-16 bg-slate-100/60 dark:bg-[#071326]/40 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#E05320] block">
            STATUTORY FORUMS &amp; JURISDICTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white">
            Where Your Rights Are Lawfully Enforced
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Every recovery case is strategically filed before the designated Indian statutory forum with absolute jurisdiction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {forums.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320] flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {f.name}
                  </h3>
                  <div className="text-[11px] text-[#E05320] font-mono font-medium mt-0.5">
                    {f.statute}
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
