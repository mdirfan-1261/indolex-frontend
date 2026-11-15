'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Gavel, 
  Building, 
  Calendar, 
  ArrowRight, 
  Scale, 
  Search, 
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  Lock,
} from 'lucide-react';
import Footer from '@/components/landing/Footer';
import DemoModal from '@/components/landing/DemoModal';
import { useAuth } from '@/context/AuthContext';

export default function CourtLitigationPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  // BRD Section 5: Judicial Forums
  const forums = [
    {
      name: 'Debt Recovery Tribunal (DRT & DRAT)',
      law: 'Recovery of Debts & Bankruptcy Act, 1993',
      badge: 'Section 19 OA',
      desc: 'Original Applications (OA) filing under Sec 19, Sec 17 securitization appeals, and Recovery Certificate (RC) execution tracking across 39 benches.',
    },
    {
      name: 'National Company Law Tribunal (NCLT)',
      law: 'Insolvency and Bankruptcy Code (IBC), 2016',
      badge: 'Section 7 CIRP',
      desc: 'Financial creditor insolvency petitions, Committee of Creditors (CoC) voting registers, claim verification, and Resolution Plan tracking across 16 tribunals.',
    },
    {
      name: 'High Courts & Commercial Courts',
      law: 'Commercial Courts Act, 2015',
      desc: 'Summary suits under Order XXXVII CPC, writ petition defense, caveat filings, and urgent stay order vacation petitions.',
    },
    {
      name: 'Metropolitan Magistrate / NI 138 Courts',
      law: 'Negotiable Instruments Act, 1881',
      desc: 'Criminal complaint dockets for cheque bounce, bailable warrant tracking, summons verification, and compounding settlement records.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#071326] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. COMPACT HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0A1322] text-white py-12 sm:py-16 border-b border-slate-800">
        
        {/* SUBTLE GLOW */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: EDITORIAL COPY (7 COLS) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-4 backdrop-blur-md">
                <Gavel className="w-3.5 h-3.5 text-amber-400" />
                <span>Judicial Litigation Management Suite</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-[1.2]">
                Centralize DRT, NCLT & Commercial Court Litigation Across All Benches
              </h1>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
                Eliminate missed court hearings and uncoordinated advocate appearances. IndoLex connects bank recovery desks with real-time CNR tracking, daily cause lists, interim stay monitors, and judicial order repositories.
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#E05320]/25 hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Request Judicial Briefing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 🔒 AUTH-AWARE DOCKET BUTTON */}
                <Link
                  href={!loading && isAuthenticated ? "/dashboard/cases" : "/login?redirect=/dashboard/cases"}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/5 px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-slate-200 hover:bg-white/10 hover:border-slate-500 transition-all"
                >
                  {!loading && isAuthenticated ? (
                    <Scale className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-amber-400" />
                  )}
                  <span>Open Live Court Docket</span>
                </Link>
              </div>

              {/* STAT STRIP */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>39 DRT / DRAT Benches</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>16 NCLT Benches</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>16-Digit CNR Synchronization</span>
                </div>
              </div>
            </div>

            {/* RIGHT: DEDICATED IMAGE SLOT (5 COLS) */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl h-[310px] sm:h-[350px] bg-gradient-to-br from-[#0B1528] to-[#070D18] p-5 flex flex-col justify-between">
              
              <img
                src="/court-litigation-hero.webp"
                alt="Indian High Court & Tribunal Proceedings"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Judicial Feed
                </span>
                <span className="text-[10px] text-slate-300 font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  PAN-INDIA
                </span>
              </div>

              <div className="relative z-10 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <Gavel className="w-3.5 h-3.5" />
                  <span>National Tribunal Docket</span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Automated hearing board alerts and interim stay orders directly in SARG.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATUTORY TRIBUNALS GRID */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-slate-900 dark:text-white">
            Comprehensive Bench Coverage
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Unified electronic filings and daily appearance logs across all judicial forums in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forums.map((forum, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0A1528] border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-[#E05320] dark:text-[#E86835] bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-900">
                    {forum.law}
                  </span>
                  {forum.badge && (
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {forum.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-normal text-slate-900 dark:text-white">
                  {forum.name}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {forum.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#E05320] dark:text-[#E86835]">
                <span>Automated Cause-List Sync</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUR ESSENTIAL PILLARS */}
      <section className="py-12 bg-stone-100/70 dark:bg-[#081220] border-y border-stone-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-xl bg-white dark:bg-[#0A1528] border border-stone-200/90 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320] shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base font-normal text-slate-900 dark:text-white">16-Digit CNR Search</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Real-time synchronization with e-Courts and tribunal registries.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#0A1528] border border-stone-200/90 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base font-normal text-slate-900 dark:text-white">Daily Cause Lists</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Automated scraping of daily tribunal hearing rosters every morning.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#0A1528] border border-stone-200/90 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320] shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base font-normal text-slate-900 dark:text-white">Advocate Diary Sync</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Instant hearing outcome recording with next date reminders.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#0A1528] border border-stone-200/90 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320] shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base font-normal text-slate-900 dark:text-white">Adverse Stay Order Alerts</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Zero-delay intimation to SARG leadership for urgent stay vacation filings.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. EXECUTIVE BRIEFING CTA */}
      <section className="py-12 bg-gradient-to-br from-[#0C172B] via-[#08101E] to-[#050C16] text-white text-center border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Transform Bank Litigation From Reactive to Proactive
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Unify your panel advocates and branch recovery officers onto a single synchronized litigation platform.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsDemoOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#E05320]/25 hover:bg-[#C84518] transition-all cursor-pointer"
            >
              <span>Schedule Platform Walkthrough</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. BRD-ALIGNED ENTERPRISE FOOTER */}
      <Footer />

      {/* 6. DEMO MODAL */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}