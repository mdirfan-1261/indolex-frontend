'use client';

import Link from 'next/link';
import { ArrowRight, FileText, Gavel, Handshake, CheckCircle2 } from 'lucide-react';

const SOLUTIONS = [
  {
    badge: 'SARFAESI Act 2002',
    icon: FileText,
    title: 'Statutory Enforcement Studio',
    tagline: 'Sec 13(2) Notices & Possession Orders',
    description:
      'Automate 60-day statutory demand notices, guarantor asset schedules, Section 14 CMM possession orders, and NI Act 138 cheque bounce dockets.',
    features: [
      'Automated Sec 13(2) & 13(4) Dockets',
      'Sec 14 CMM / DM Eviction Petitions',
      'Speed Post Real-Time Tracking Sync',
    ],
    href: '/solutions/statutory-enforcement',
    ctaText: 'Open Enforcement Studio',
  },
  {
    badge: 'DRT & NCLT Tribunals',
    icon: Gavel,
    title: 'Judicial Litigation Docket',
    tagline: '16-Digit CNR Sync & OA-19 Petitions',
    description:
      'Synchronize court calendars across 39 DRT Benches and 16 NCLT Benches. Track daily hearing lists, OA-19 filings, and interim bench orders.',
    features: [
      '16-Digit CNR Automated Case Sync',
      'DRT OA-19 & NCLT Sec 7 Petitions',
      'Daily Cause Lists & Order Preservation',
    ],
    href: '/solutions/court-litigation',
    ctaText: 'Open Litigation Docket',
  },
  {
    badge: 'RBI IRAC Compliant',
    icon: Handshake,
    title: 'Corporate Debt & OTS Engine',
    tagline: 'NPV Haircut Modeling & No Dues (NDC)',
    description:
      'Evaluate compromise settlement proposals with structured NPV haircut calculators, tranche-based recovery monitoring, and digital NDC issuance.',
    features: [
      'Multi-Tier OTS Approval Hierarchy',
      'Compromise & Haircut Value Modeling',
      'Digital No Dues Certificate (NDC) Hub',
    ],
    href: '/solutions/debt-resolution',
    ctaText: 'Open Settlement Engine',
  },
];

export default function StakeholderWorkflows() {
  return (
    <section
      id="platform-solutions"
      className="bg-[#FAF8F5] dark:bg-[#071326] py-12 sm:py-16 font-sans border-b border-stone-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* COMPACT SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2.5">
            Institutional Recovery Suites
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-slate-900 dark:text-white font-serif">
            Core Banking Default & Litigation Solutions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
            Specialized statutory modules mapped directly to Indian banking recovery frameworks.
          </p>
        </div>

        {/* 3 COMPACT PREMIUM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {SOLUTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#091424] p-5 sm:p-6 border border-stone-200/90 dark:border-slate-800 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:-translate-y-0.5"
              >
                <div>
                  {/* TOP ROW: BADGE & ICON */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* TITLE & TAGLINE */}
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 tracking-wide">
                    {item.tagline}
                  </div>

                  {/* COMPACT DESCRIPTION */}
                  <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* 3 COMPACT FEATURE CHIPS */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM ACTION LINK */}
                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:gap-2.5 transition-all"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}