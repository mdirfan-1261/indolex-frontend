"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  Download,
  Calendar,
  Send,
  Gavel,
  Landmark,
  FileCheck2,
  Lock
} from "lucide-react";
import Footer from "@/components/landing/Footer";
import DemoModal from "@/components/landing/DemoModal";

export default function StatutoryEnforcementPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // BRD Section 4 & 5: 4-Stage Statutory Limitation Timeline
  const timelineStages = [
    {
      step: "01",
      title: "NPA Classification",
      act: "RBI IRAC Norms",
      desc: "90+ DPD overdue trigger with automated SMA-0/1/2 classification and CRILC reporting lock."
    },
    {
      step: "02",
      title: "Section 13(2) Demand Notice",
      act: "SARFAESI Act, 2002",
      desc: "Instant 60-day statutory demand with itemized principal, penal interest, and secured asset schedules."
    },
    {
      step: "03",
      title: "Section 13(3A) Objections",
      act: "15-Day Statutory Window",
      desc: "Mandatory statutory speaking order generation to counter borrower objections and avoid stay orders."
    },
    {
      step: "04",
      title: "Section 13(4) & Sec 14 DM Orders",
      act: "Physical Possession",
      desc: "Panchnama drafting, inventory valuation registers, and DM/CMM assistance petitions for asset takeover."
    }
  ];

  // BRD Section 3: Core Enforcement Capabilities
  const capabilities = [
    {
      title: "Automated SARFAESI Sec 13(2) Notice Engine",
      desc: "Instant creation of 60-day statutory demand notices with precision calculation of contractual interest, penal levies, and security interest schedules.",
      tag: "Section 13(2)",
      icon: FileText
    },
    {
      title: "Section 13(4) Possession & Eviction Panchnama",
      desc: "Standardized templates for symbolic and physical possession intimation, public panchnama drafting, and inventory registers under Security Interest Rules 2002.",
      tag: "Section 13(4)",
      icon: Scale
    },
    {
      title: "Section 14 DM / CMM Affidavit Petitions",
      desc: "Pre-formatted 9-point affidavit filing packs for District Magistrate / Chief Metropolitan Magistrate assistance to take physical control of secured properties.",
      tag: "Section 14 DM/CMM",
      icon: Landmark
    },
    {
      title: "Negotiable Instruments Act Sec 138 Workflow",
      desc: "Automated statutory 15-day cheque bounce notice dispatch tracking with Speed-Post API integration and evidence locker for criminal trials.",
      tag: "NI Act 138",
      icon: Gavel
    }
  ];

  // 3-Column Statutory Assurance Highlights
  const assurances = [
    {
      title: "India Post Speed-Post Tracking API",
      desc: "Automated tracking number ingestion with delivery confirmation certs admissible under Indian Evidence Act Sec 65B."
    },
    {
      title: "Limitation Calendar & Alert Engine",
      desc: "Strict countdown for Section 13(3A) representation replies and 30-day public auction notice requirements."
    },
    {
      title: "DM / CMM Court Docket Standardizer",
      desc: "Zero-rejection petition sets aligned with specific state High Court practice directions and rules."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#071326] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. COMPACT HERO SECTION WITH IMAGE SLOT */}
      <section className="relative py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0A1528] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: HERO CONTENT */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-[#E05320] text-xs font-semibold">
                <Scale className="w-3.5 h-3.5 text-[#E05320]" />
                <span>Statutory Recovery & Enforcement Suite</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Automate Statutory SARFAESI & <br className="hidden sm:inline" />
                <span className="italic text-[#E05320]">Asset Enforcement Lifecycles</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                Eliminate drafting delays and procedural vulnerabilities. IndoLex Laws automates SARFAESI Act 2002 demand notices, Section 13(3A) objection handling, possession panchnamas, and Section 14 DM/CMM dockets with built-in RBI IRAC compliance.
              </p>

              {/* ACTION BUTTONS */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Request Enforcement Demo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                                <Link
                  href="/dashboard/notices"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-5 py-3 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                  <FileText className="h-3.5 w-3.5 text-orange-500" />
                  <span>Open SARG Notice Studio →</span>
                </Link>
              </div>

              {/* STATUTORY COMPLIANCE TAGS */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>SARFAESI Act 2002 Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>60-Day Statutory Limitation Watch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Sec 65B Admissible Evidence Dossier</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO IMAGE SLOT WITH STATUTORY TELEMETRY */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-[#071326] to-[#0A1528] aspect-[4/3] shadow-xl group">
                
                {/* Fallback image */}
                <Image
                  src="/statutory-enforcement-hero.webp"
                  alt="SARFAESI Statutory Enforcement Docket"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent opacity-80" />

                {/* FLOATING TELEMETRY CARD */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 shadow-lg">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#E05320] animate-pulse" />
                      SARFAESI Sec 13(2) Notice Tracker
                    </span>
                    <span className="text-[#E05320] font-bold">Day 41 of 60</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                    <div>
                      <div className="text-slate-400">Notice Dispatched</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Speed Post EDI</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Service Status</div>
                      <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Delivered (POD)</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Sec 14 Readiness</div>
                      <div className="font-semibold text-[#E05320] mt-0.5">Affidavit Ready</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATUTORY TIMELINE GOVERNANCE (4-STEP HORIZONTAL PIPELINE) */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#071326] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-8 sm:mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#E05320] mb-1.5">
              Strict Statutory Timeline Governance
            </h2>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
              Zero-Defect Statutory Recovery Pipeline
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Never let a matter get contested or stayed in DRT due to procedural limitation defaults or postal delivery lapses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {timelineStages.map((stage, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800/80 hover:border-[#E05320]/40 transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-8 w-8 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320] flex items-center justify-center font-bold text-xs">
                    {stage.step}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {stage.act}
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-normal text-slate-900 dark:text-white group-hover:text-[#E05320] transition-colors">
                  {stage.title}
                </h4>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CORE ENFORCEMENT CAPABILITIES (4-CARD GRID) */}
      <section className="py-12 sm:py-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-8 sm:mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#E05320] mb-1.5">
              Core Enforcement Capabilities
            </h2>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
              Engineered for SARG, Recovery Officers & Empanelled Advocates
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Standardized statutory document drafting and compliance tracking under RBI master directions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#071326] border border-slate-200 dark:border-slate-800/80 hover:border-[#E05320]/40 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#E05320]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
                      {item.tag}
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

      {/* 4. HIGHLIGHT STRIP: 3 ASSURANCES */}
      <section className="py-12 border-t border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#071326] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {assurances.map((assure, idx) => (
              <div key={idx} className="flex gap-3.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                    {assure.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {assure.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXECUTIVE CONSULTATION BANNER */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#0A1322] via-[#0E1A2E] to-[#14233D] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Ready to Accelerate Statutory Recovery Compliance?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
            Request an enterprise briefing for your bank's Stressed Asset Recovery Group (SARG), legal team, or enforcement panel.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsDemoOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
            >
              <span>Schedule Statutory Consultation</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. GLOBAL BRD FOOTER */}
      <Footer onOpenDemo={() => setIsDemoOpen(true)} />

      {/* 7. DEMO MODAL POPUP */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}