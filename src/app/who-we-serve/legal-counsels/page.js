"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gavel,
  FileText,
  Calendar,
  Scale,
  Landmark,
  Building2,
  Users2,
  Quote,
  Receipt,
} from "lucide-react";

import Footer from "@/components/landing/Footer";
import DemoModal from "@/components/landing/DemoModal";
import AdvocateEmpanelmentModal from "@/components/landing/AdvocateEmpanelmentModal";

export default function LegalCounselsPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isEmpanelOpen, setIsEmpanelOpen] = useState(false);
  const [activeForum, setActiveForum] = useState("drt");

  // Legal Forums
  const forums = {
    drt: {
      name: "Debt Recovery Tribunal (DRT & DRAT)",
      act: "RDDBFI Act, 1993 & SARFAESI Act, 2002",
      powers:
        "Original Applications (OA-19), Sec 17 Securitization Appeals & Recovery Certificates (RC)",
      practicePain:
        "Frequent adjournments, missing compound interest ledgers, and defending against hostile borrower stay petitions.",
      indoLexAdvantage:
        "Pre-formatted Section 19 petition builder with automated compound interest schedules and real-time DRT cause-list alerts.",
    },
    nclt: {
      name: "National Company Law Tribunal (NCLT)",
      act: "Insolvency & Bankruptcy Code (IBC), 2016",
      powers:
        "Section 7 Financial Creditor Petitions, CoC Invalidation Defenses & Liquidation Orders",
      practicePain:
        "Meeting strict 14-day defect cure windows and filing voluminous default record proof from NeSL / CRILC.",
      indoLexAdvantage:
        "Direct ingestion of NeSL default certificates, Form 1 auto-compilation, and NCLT bench registry sync.",
    },
    highcourt: {
      name: "Commercial Courts & High Courts",
      act: "Commercial Courts Act, 2015 & CPC 1908",
      powers:
        "Summary Suits (Order XXXVII CPC), Writ Petition Defenses & Caveat Filings",
      practicePain:
        "Opposing frivolous writ petitions filed by defaulting promoters to stall physical asset auctions.",
      indoLexAdvantage:
        "Automated Caveat management across state High Courts and immediate adverse order intimation.",
    },
    niact: {
      name: "Metropolitan Magistrate Courts",
      act: "Negotiable Instruments Act, 1881",
      powers:
        "Section 138 Criminal Cheque Dishonour Complaints & Bailable Warrants",
      practicePain:
        "Tracking statutory 15-day demand notice periods and India Post delivery acknowledgments across hundreds of cheques.",
      indoLexAdvantage:
        "Automated Speed Post tracking integration with Section 65B certified proof of delivery (POD) lockers.",
    },
  };

  // Advocate Daily Court Board
  const dailyBoardItems = [
    {
      court: "DRT-I, Delhi (Bench-1)",
      item: "Item #14",
      caseNo: "OA/412/2023",
      parties:
        "Punjab National Bank vs. Horizon Infrastructure Ltd",
      stage: "Final Arguments / Recovery Certificate",
      status: "On Board (Hearing at 11:30 AM)",
    },
    {
      court: "NCLT, Mumbai Bench (Court-III)",
      item: "Item #22",
      caseNo: "CP(IB)/819/MB/2024",
      parties: "State Bank of India vs. Apex Textiles Pvt Ltd",
      stage: "Sec 7 Admission / IRP Appointment",
      status: "Cause-List Listed (Post-Lunch)",
    },
    {
      court: "Delhi High Court (Commercial Div)",
      item: "Item #08",
      caseNo: "CS(COMM)/104/2024",
      parties: "Bank of Baroda vs. Sterling Motors",
      stage: "Order XXXVII / Caveat Lodged",
      status: "Caveat Active (Notice Served)",
    },
  ];

  // Fee Billing Milestones
  const billingMilestones = [
    {
      stage: "Stage 01: Notice Drafting",
      trigger: "SARFAESI 13(2) / NI 138 Dispatched",
      status: "Instant Invoice",
    },
    {
      stage: "Stage 02: Petition Filing",
      trigger: "DRT OA / NCLT Sec 7 Diary Number",
      status: "Filing Memo Approved",
    },
    {
      stage: "Stage 03: Interim Injunction",
      trigger: "Physical Receiver / Stay Vacation Order",
      status: "Milestone Released",
    },
    {
      stage: "Stage 04: Decree Realization",
      trigger: "Recovery Certificate (RC) Issued",
      status: "Success Fee Sanctioned",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#071326] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

      {/* WRAPPED IN <main> FOR 100% ACCESSIBILITY */}
      <main className="flex-1">

        {/* 1. HERO SECTION */}
        <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden bg-white dark:bg-[#0A1528] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">

          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E05320]/5 dark:bg-[#E05320]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Institutional Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800/80 mb-8">

              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-[#E05320]" />
                Institutional Practice Profile
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-[#E05320]">
                  Empanelled Advocates &amp; Banking Law Firms
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                <Scale className="h-3.5 w-3.5" />
                <span>Pan-India e-Courts 16-Digit CNR Synced</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* LEFT CONTENT */}
              <div className="lg:col-span-7 space-y-5">

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                  Defend Creditor Rights Across Every Bench with
                  <br />
                  <span className="italic text-[#E05320] font-normal">
                    Unified Litigation Intelligence
                  </span>
                </h1>

                {/* Quote */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071326] border-l-4 border-[#E05320] text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic transition-colors">
                  <Quote className="h-4 w-4 text-[#E05320] mb-1 inline mr-1 opacity-70" />
                  "Before tribunal benches, precision wins recovery cases. A single clerical flaw in the loan ledger or a delayed caveat filing can tie up hundreds of crores in ex-parte stays. IndoLex gives our practice automated drafting accuracy and daily court diary synchronization."
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-normal">
                  IndoLex Laws equips empanelled advocates and banking litigation firms with automated statutory drafting, multi-court cause-list scrapers, Section 65B certified electronic proof, and transparent bank milestone billing.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">

                  {/* 🚀 NEW: EMPANEL AS RECOVERY COUNSEL */}
                  <button
                    type="button"
                    onClick={() => setIsEmpanelOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-900/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <Scale className="h-4 w-4 text-blue-200" />
                    <span>Empanel as Recovery Counsel</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDemoOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#E05320]/25 hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Request Practice Walkthrough</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    href="/dashboard/advocates"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                  >
                    <Scale className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Panel Workspace &rarr;</span>
                  </Link>
                </div>

                {/* Bench Coverage */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Tribunals Tracked:
                  </span>
                  <span>39 DRT &amp; DRAT Benches</span>
                  <span>•</span>
                  <span>16 NCLT Registries</span>
                  <span>•</span>
                  <span>High Court Commercial Suits</span>
                </div>
              </div>

              {/* RIGHT: COURTROOM COCKPIT WITH PRIORITY HERO IMAGE */}
              <div className="lg:col-span-5 relative">

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#071326] p-4 shadow-xl space-y-3 transition-colors">

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-[11px]">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <Gavel className="h-4 w-4 text-[#E05320]" />
                      <span>Judicial Hearing Board</span>
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                      CNR Live Sync
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-slate-200 dark:border-slate-700 group">
                    <Image
                      src="/images/advocate-chambers-hero.webp"
                      alt="Senior Indian Advocate in Courtroom Chamber with Indian Flag and Scales of Justice"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                        Active Court Dockets
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        84 Matters Listed • 17 Hearings Scheduled This Week
                      </div>
                    </div>
                  </div>

                  {/* Executive Gauges */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[10px]">

                    <div className="p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400">Tomorrow's Board</div>
                      <div className="text-xs font-bold text-[#E05320] mt-0.5">
                        5 Hearings
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">
                        DRT &amp; NCLT
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400">Pleading Clock</div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        15-Day Reply
                      </div>
                      <div className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                        On Schedule
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400">Evidence Vault</div>
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        100% Certified
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">
                        Sec 65B Ready
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ADVOCATE DAILY DIARY */}
        <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#071326] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">

              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05320] mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Live Courtroom Roster
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
                  Advocate Daily Cause-List Terminal
                </h2>
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400">
                Synchronized daily with e-Courts National Judicial Data Grid (NJDG)
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] overflow-hidden shadow-sm transition-colors">

              <div className="divide-y divide-slate-100 dark:divide-slate-800">

                {dailyBoardItems.map((item) => (
                  <div
                    key={item.caseNo}
                    className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >

                    <div className="space-y-1">

                      <div className="flex flex-wrap items-center gap-2.5">

                        <span className="px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/40 text-[#E05320] text-xs font-mono font-bold">
                          {item.item}
                        </span>

                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.court}
                        </span>

                        <span className="text-[11px] text-slate-400 font-mono">
                          ({item.caseNo})
                        </span>
                      </div>

                      <div className="text-sm font-serif text-slate-800 dark:text-slate-200">
                        {item.parties}
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Hearing Stage:{" "}
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {item.stage}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
                        {item.status}
                      </span>

                      <button
                        type="button"
                        onClick={() => setIsDemoOpen(true)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#E05320] text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        Open Case Brief
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

        {/* 3. LEGAL FORUMS */}
        <section className="py-14 sm:py-20 bg-white dark:bg-[#0A1528] transition-colors duration-200 border-b border-slate-200 dark:border-slate-800">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl mb-10">

              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05320] mb-2">
                <Gavel className="h-3.5 w-3.5" />
                Multi-Forum Litigation Strategy
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-white">
                Built for Every Banking Judicial Forum
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Select a forum below to see how IndoLex solves forum-specific procedural bottlenecks.
              </p>
            </div>

            {/* Forum Tabs */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100 dark:border-slate-800">

              {Object.entries(forums).map(([key, forum]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveForum(key)}
                  aria-pressed={activeForum === key}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeForum === key
                      ? "bg-[#E05320] text-white shadow-md shadow-[#E05320]/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {forum.name.split("(")[0]}
                </button>
              ))}

            </div>

            {/* Active Forum */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#071326] border border-slate-200 dark:border-slate-800 space-y-6 transition-colors">

              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E05320]">
                    {forums[activeForum].act}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 dark:text-white mt-0.5">
                    {forums[activeForum].name}
                  </h3>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#E05320] font-semibold border border-orange-200 dark:border-orange-900/60">
                  Primary Judicial Remedy
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">
                  Forum Powers &amp; Scope:{" "}
                </strong>
                {forums[activeForum].powers}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">

                <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                    Litigation Bottleneck in this Forum
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {forums[activeForum].practicePain}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    The IndoLex Advocate Advantage
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {forums[activeForum].indoLexAdvantage}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 4. SMART NOTICE STUDIO */}
        <section className="py-14 sm:py-20 bg-[#FAF8F5] dark:bg-[#071326] transition-colors duration-200 border-b border-slate-200 dark:border-slate-800">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Image */}
              <div className="lg:col-span-5 order-2 lg:order-1">

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200 dark:border-slate-800 shadow-xl group">

                  <Image
                    src="/images/advocate-drafting-studio.webp"
                    alt="Senior Banking Advocates Drafting Stamped Judicial Petitions and SARFAESI Notices"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-[11px]">

                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>Drafting Studio: SARFAESI Sec 13(2)</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        100% Calculated
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      Principal, contractual rate, penal interest, and security schedule auto-verified.
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">

                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05320]">
                  <FileText className="h-4 w-4" />
                  <span>Smart Notice &amp; Pleading Engine</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-white leading-tight">
                  Flawless Debt Schedules &amp; Section 65B Certified Scans
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Nothing frustrates an arguing counsel more than discovering a calculation discrepancy during cross-examination. IndoLex locks the verified loan ledger from the bank's core banking system into your petition templates, ensuring zero numerical errors.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">

                  {[
                    "SARFAESI 13(2) Demand Notices",
                    "Section 14 DM / CMM Affidavits",
                    "DRT OA-19 Recovery Petitions",
                    "NI Act 138 Complaint Dockets",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ADVOCATE BILLING */}
        <section className="py-14 sm:py-20 bg-white dark:bg-[#0A1528] transition-colors duration-200 border-b border-slate-200 dark:border-slate-800">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Content */}
              <div className="lg:col-span-7 space-y-4">

                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05320]">
                  <Receipt className="h-4 w-4" />
                  <span>Transparent Milestone Fee Billing</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-white leading-tight">
                  No More Disputed Fee Bills with Bank Recovery Desks
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Track every billable milestone automatically. When a hearing takes place or a recovery certificate (RC) is executed, the verified court record auto-populates your fee memo for instant bank zonal sanction.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">

                  {billingMilestones.map((milestone) => (
                    <div
                      key={milestone.stage}
                      className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#071326] border border-slate-200 dark:border-slate-800 space-y-0.5"
                    >
                      <div className="font-bold text-[#E05320]">
                        {milestone.stage}
                      </div>

                      <div className="text-slate-700 dark:text-slate-300 font-medium">
                        {milestone.trigger}
                      </div>

                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        {milestone.status}
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Image */}
              <div className="lg:col-span-5">

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200 dark:border-slate-800 shadow-xl group">

                  <Image
                    src="/images/advocate-evidence-vault.webp"
                    alt="Official Court Decrees, Recovery Certificates and Section 65B Electronic Proof"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-[11px]">

                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>Fee Milestone Ledger Synced</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        100% Verified
                      </span>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      Advocate appearance memo matched with daily cause-list record.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SENIOR ADVOCATE ENDORSEMENT */}
        <section className="py-12 bg-[#FAF8F5] dark:bg-[#071326] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">

            <div className="inline-flex items-center gap-1.5 text-amber-500 justify-center">
              {"★★★★★".split("").map((star, index) => (
                <span key={index} className="text-base">
                  {star}
                </span>
              ))}
            </div>

            <blockquote className="font-serif text-lg sm:text-xl text-slate-800 dark:text-slate-200 italic leading-relaxed">
              "Managing 120+ DRT matters across Delhi, Chandigarh, and Mumbai for four nationalized banks used to consume our entire associates' evenings in cause-list reconciliation. With IndoLex, our drafting time is down by 70%, hearing alerts are instantaneous, and fee approval disputes with banks have completely vanished."
            </blockquote>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Senior Partner • Premier Banking Litigation &amp; Insolvency Law Firm, New Delhi
            </div>
          </div>
        </section>

        {/* 7. OTHER INSTITUTIONAL ROLES */}
        <section className="py-12 bg-white dark:bg-[#0A1528] transition-colors duration-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex items-center justify-between mb-6">

              <h3 className="font-serif text-lg sm:text-xl font-normal text-slate-900 dark:text-white">
                Explore Other Institutional Roles
              </h3>

              <span className="text-xs text-slate-400">
                Connected Recovery Ecosystem
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <Link
                href="/who-we-serve/bank-sarg"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#071326] hover:border-[#E05320]/40 transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">

                  <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320]">
                    <Landmark className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#E05320] transition-colors">
                      Bank SARG &amp; Credit Heads
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5">
                      NPA portfolio command &amp; CRILC reporting
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#E05320] group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/who-we-serve/resolution-professionals"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#071326] hover:border-[#E05320]/40 transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">

                  <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320]">
                    <Building2 className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#E05320] transition-colors">
                      Resolution Professionals (RP)
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5">
                      IBC 2016 CIRP &amp; CoC voting suite
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#E05320] group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/who-we-serve/recovery-agents"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#071326] hover:border-[#E05320]/40 transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">

                  <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320]">
                    <Users2 className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#E05320] transition-colors">
                      Recovery Enforcement Agents
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Sec 14 DM/CMM &amp; digital panchnamas
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#E05320] group-hover:translate-x-0.5 transition-all" />
              </Link>

            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-r from-[#0A1322] via-[#0E1A2E] to-[#14233D] text-white text-center relative overflow-hidden">

          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Modernize Your Banking Litigation &amp; Advocate Practice
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Automate DRT, NCLT, and SARFAESI workflows with real-time e-Courts synchronization and seamless bank communication.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">

              <button
                type="button"
                onClick={() => setIsEmpanelOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-7 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-900/40 active:scale-95 transition-all cursor-pointer"
              >
                <Scale className="h-4 w-4 text-blue-200" />
                <span>Empanel as Recovery Counsel</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-7 py-3.5 text-xs font-bold text-white shadow-xl hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
              >
                <span>Schedule Practice Walkthrough</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>
          </div>
        </section>

      </main>

      {/* 9. FOOTER */}
      <Footer onOpenDemo={() => setIsDemoOpen(true)} />

      {/* 10. DEMO MODAL */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      {/* 11. 🚀 ADVOCATE EMPANELMENT MODAL */}
      <AdvocateEmpanelmentModal
        isOpen={isEmpanelOpen}
        onClose={() => setIsEmpanelOpen(false)}
      />

    </div>
  );
}