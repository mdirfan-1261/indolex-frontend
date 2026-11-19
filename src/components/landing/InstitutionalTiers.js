'use client';

import Link from 'next/link';
import {
  Building2,
  Landmark,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const INSTITUTIONS = [
  {
    tag: 'PSU SARG Recovery Desk',
    title: 'Public Sector Commercial Banks',
    badge: 'Core Banking Integration',
    description:
      'Centralized oversight across nationwide zonal branches with automated SMA-0/1/2 tracking, CRILC regulatory reporting, and statutory audit locks.',
    metric: 'Pan-India Multi-Branch SARG',
    href: '/who-we-serve/bank-sarg',
    accentColor: 'blue',
    icon: Landmark,
  },
  {
    tag: 'Private Lenders & HFCs',
    title: 'Private & Regional Banks',
    badge: 'Rapid SARFAESI Inflow',
    description:
      'Accelerate recovery velocity on stressed loan portfolios with automated Sec 13(2) notices, Section 14 CMM orders, and digital OTS compromise calculators.',
    metric: 'Fast-Track Capital Recovery',
    href: '/who-we-serve/recovery-agents',
    accentColor: 'amber',
    icon: Building2,
  },
  {
    tag: 'Distressed Debt Portfolios',
    title: 'Asset Reconstruction (ARCs)',
    badge: 'Portfolio Restructuring',
    description:
      'Aggregate non-performing loan books, manage Security Receipts (SR) lifecycle, coordinate physical asset repossessions, and orchestrate e-auctions.',
    metric: 'Sec 14 & Auction Management',
    href: '/who-we-serve/resolution-professionals',
    accentColor: 'emerald',
    icon: ShieldCheck,
  },
  {
    tag: 'Judicial Advocacy Hub',
    title: 'High Court & DRT Law Panels',
    badge: '16-Digit CNR Sync',
    description:
      'Unified litigation dockets across 39 DRT and 16 NCLT benches with automated daily cause lists, legal notice generation, and speed post tracking.',
    metric: 'Pan-India Court Diary',
    href: '/who-we-serve/legal-counsels',
    accentColor: 'rose',
    icon: Briefcase,
  },
];

export default function InstitutionalTiers() {
  return (
    <section className="bg-[#FAF8F5] dark:bg-[#071326] py-12 sm:py-16 font-sans border-b border-stone-200 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* COMPACT SECTION HEADER (100% ORIGINAL & RECOVERY ALIGNED) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E05320] mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E05320]" />
              <span>Multi-Stakeholder Architecture</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
              Institutional Recovery Ecosystem Across Financial Desks
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
            Purpose-built governance modules engineered around the statutory and operational mandates of India's banking recovery ecosystem.
          </p>
        </div>

        {/* 4 BESPOKE INSTITUTIONAL CARDS (100% CLICKABLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INSTITUTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-[#0A1528] p-5 sm:p-6 border border-stone-200/90 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-400 dark:hover:border-slate-700 cursor-pointer"
              >
                {/* TOP ACCENT LINE */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#E05320] group-hover:w-full transition-all duration-500 rounded-t-xl" />

                <div>
                  {/* TAG & ICON */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {item.tag}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#E05320] flex items-center justify-center border border-slate-200/60 dark:border-slate-700/80 group-hover:bg-[#E05320] group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="font-serif text-lg font-normal text-slate-900 dark:text-white group-hover:text-[#E05320] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* BADGE */}
                  <div className="mt-1.5 inline-block text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    {item.badge}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* BOTTOM METRIC & ACTION */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                    {item.metric}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E05320] group-hover:gap-2 transition-all shrink-0">
                    <span>View Suite</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}