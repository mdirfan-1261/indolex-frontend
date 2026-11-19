"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Coins,
  TrendingDown,
  FileSpreadsheet,
  ArrowRight,
  Calculator,
  Handshake,
  CheckCircle2,
  ShieldCheck,
  Percent,
  FileCheck2,
  Lock
} from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import Footer from "@/components/landing/Footer";
import DemoModal from "@/components/landing/DemoModal";

export default function DebtResolutionPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  // BRD Section 3 & 4: 4 Core Compromise & Resolution Pillars
  const pillars = [
    {
      title: "One-Time Settlement (OTS) Financial Modeling",
      badge: "RBI OTS Guidelines",
      icon: Calculator,
      desc: "Simulate Net Present Value (NPV) recovery versus distress asset valuations to justify haircut sanctions to internal audit boards and competent authority."
    },
    {
      title: "Bilateral & Consortium Compromise Workflows",
      badge: "Inter-Creditor Agreements",
      icon: Handshake,
      desc: "Manage voting share calculations, lead bank resolutions, and dissenting creditor mandates under June 7, 2019 RBI Prudential Restructuring Framework."
    },
    {
      title: "Promoter Contribution & Escrow Tracking",
      badge: "Escrow Compliance",
      icon: TrendingDown,
      desc: "Milestone-linked tranche payment monitors with auto-forfeiture clauses in case of borrower payment default during 30 to 90-day settlement tenures."
    },
    {
      title: "No Dues Certificate (NDC) & Release of Charges",
      badge: "MCA CHG-4 Filing",
      icon: FileSpreadsheet,
      desc: "Post-settlement automation for release of title deeds, ROC satisfaction of charge filing, and CIBIL/CRILC commercial credit score normalization."
    }
  ];

  // Key Resolution Metrics & Capabilities
  const capabilities = [
    {
      title: "NPV vs. Distress Valuation Engine",
      desc: "Automated cash flow discounting using RBI benchmark lending rates to compare immediate compromise against 3-year DRT litigation outcomes."
    },
    {
      title: "Staged Escrow Milestone Control",
      desc: "Upfront 10-15% token deposit verification with tripartite escrow account audits before issuance of conditional consent orders."
    },
    {
      title: "Consortium Dissenting Share Handling",
      desc: "Algorithmic liquidation value calculation for dissenting banks to ensure seamless ICA compliance without legal impediments."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#071326] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">

      {/* WRAPPED IN <main> FOR 100% ACCESSIBILITY */}
      <main className="flex-1">

        {/* 1. COMPACT HERO SECTION WITH DEDICATED IMAGE SLOT */}
        <section className="relative py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0A1528] transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* LEFT COLUMN: HERO CONTENT */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                  <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>RBI Master Restructuring Framework &amp; Compromise Engine</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  Corporate Debt Settlement &amp; <br className="hidden sm:inline" />
                  <span className="italic text-[#E05320]">One-Time Settlement (OTS)</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                  Structured compromise workflows for Scheduled Commercial Banks, ARCs, and NBFCs. Calculate haircut justifications, track tranche escrows, and execute ROC MCA CHG-4 satisfaction of charges with zero regulatory delay.
                </p>

                {/* ACTION BUTTONS (DYNAMIC AUTH LINK) */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDemoOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Request Resolution Demo</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    href={!loading && isAuthenticated ? "/dashboard/recovery" : "/login?redirect=/dashboard/recovery"}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-5 py-3 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
                  >
                    {!loading && isAuthenticated ? (
                      <Coins className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    <span>Open Recovery &amp; OTS Desk &rarr;</span>
                  </Link>
                </div>

                {/* REGULATORY BULLETS */}
                <div className="pt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>RBI June 7 Circular Aligned</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Audited Haircut Benchmarks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileCheck2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>MCA CHG-4 Direct Docketing</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: HERO IMAGE SLOT WITH TELEMETRY CARD */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-[#071326] to-[#0A1528] aspect-[4/3] shadow-xl group">

                  {/* HERO IMAGE WITH PRIORITY TAG */}
                  <Image
                    src="/debt-resolution-hero.webp"
                    alt="Corporate Debt Resolution Boardroom"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Ambient glow & vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent opacity-80" />

                  {/* FLOATING TELEMETRY CARD */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 shadow-lg">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        OTS Valuation Telemetry
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">CRILC Synced</span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                      <div>
                        <div className="text-slate-400">Total Liability</div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">₹142.80 Cr</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Sanctioned OTS</div>
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">₹98.50 Cr</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Haircut Margin</div>
                        <div className="font-semibold text-[#E05320] mt-0.5">31.02%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. CORE PILLARS OF RESOLUTION (4-CARD GRID) */}
        <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#071326] transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-2xl mb-8 sm:mb-10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#E05320] mb-1.5">
                Statutory Resolution Framework
              </h2>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
                End-to-End Compromise Lifecycle
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Aligning bilateral proposals and consortium consensus with RBI prudential directives and board-approved settlement policies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800/80 hover:border-[#E05320]/40 transition-all shadow-sm group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#E05320]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl font-normal text-slate-900 dark:text-white group-hover:text-[#E05320] transition-colors">
                      {item.title}
                    </h4>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 3. HIGHLIGHT STRIP: 3 AUDIT-READY CAPABILITIES */}
        <section className="py-12 border-t border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. EXECUTIVE BRIEFING CTA BANNER */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[#0A1322] via-[#0E1A2E] to-[#14233D] text-white text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Streamline Corporate Settlement Approvals for Your Recovery Board
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Automate haircut sanctions, manage tranche escrow security, and execute ROC satisfaction of charge with full audit compliance.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
              >
                <span>Schedule Resolution Briefing</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 5. BRD MODULAR FOOTER */}
      <Footer onOpenDemo={() => setIsDemoOpen(true)} />

      {/* 6. DEMO MODAL POPUP */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}