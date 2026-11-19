"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lock,
  Vote,
  ClipboardList,
  Clock,
  FileCheck2,
  Scale,
  Landmark,
  Briefcase,
  Users2,
  Layers,
  FileSpreadsheet,
  AlertCircle,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Radio,
  FileText
} from "lucide-react";
import Footer from "@/components/landing/Footer";
import DemoModal from "@/components/landing/DemoModal";

export default function ResolutionProfessionalsPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState("stage1");

  // 1. Before vs After: CIRP Governance Transformation Matrix
  const transformationMatrix = [
    {
      area: "Claims Collation & Verification",
      before: "Processing hundreds of Form B, C, and D physical claims across banks, vendors, and homebuyers in unlinked Excel sheets causes disputed voting shares and NCLT stay orders.",
      after: "Automated digital claim intake portal cross-verifies financial proofs, computing principal, interest, and secured vs unsecured ratios with instant admission receipts."
    },
    {
      area: "CoC Quorum & Live E-Voting",
      before: "Recalculating voting share percentages manually before crucial CoC meetings risks clerical errors and challenges by dissenting financial creditors.",
      after: "Dynamic algorithmic voting engine instantly updates voting shares upon any claim admission, enforcing the mandatory 66% statutory approval threshold."
    },
    {
      area: "330-Day CIRP Regulatory Radar",
      before: "Missing statutory limitation deadlines for Form G, Information Memorandum, or RFRP attracts IBBI show-cause notices and unintended liquidation.",
      after: "Day-by-day statutory countdown with automated generation of Section 12 NCLT time-exclusion dockets, ensuring zero regulatory compliance breaches."
    },
    {
      area: "Resolution Plan Evaluation & Sec 29A",
      before: "Manual comparison of heterogeneous resolution applicant bids across upfront cash, deferred debt, and equity takes weeks of contentious debate.",
      after: "Automated Net Present Value (NPV) modeling, Section 29A promoter disqualification screening, and audit-ready scorecards presented directly to the CoC."
    }
  ];

  // 2. Interactive CIRP 4-Stage Execution Terminal
  const cirpStages = {
    stage1: {
      title: "Admission & Claims Collation",
      badge: "Days 01 — 30 • Form A",
      desc: "Immediate statutory actions following Section 7, 9, or 10 admission by the Adjudicating Authority (NCLT).",
      actionItems: [
        { label: "Form A Public Announcement", detail: "Automated publication dispatch to IBBI portal and national daily newspapers within 72 hours." },
        { label: "Digital Claim Ingestion (Forms B, C, D, E)", detail: "Online portal for Financial Creditors, Operational Vendors, Workmen, and Statutory Authorities." },
        { label: "Constitution of CoC", detail: "Verification of debt and formal constitution of the Committee of Creditors within 30 days." },
        { label: "First CoC Meeting Notice", detail: "Statutory notice circulation and voting on continuation or replacement of IRP under Section 22." }
      ],
      complianceTag: "IBBI CIRP Regulation 6 & 17 Compliant"
    },
    stage2: {
      title: "Information Memorandum & Form G",
      badge: "Days 30 — 90 • Asset Discovery",
      desc: "Corporate debtor asset discovery and invitation for Expression of Interest (EOI).",
      actionItems: [
        { label: "Virtual Data Room (VDR) Configuration", detail: "Encrypted data room for corporate debtor contracts, land titles, and audited ledgers." },
        { label: "Valuation Benchmark Mandate", detail: "Appointment of two IBBI Registered Valuers for Fair Value and Liquidation Value calculation." },
        { label: "Form G (EOI) Global Issuance", detail: "Broadcasting Expression of Interest inviting Prospective Resolution Applicants under Regulation 36A." },
        { label: "Eligible PRA Registry", detail: "Scrutiny of net worth criteria and publication of the provisional and final PRA lists." }
      ],
      complianceTag: "Regulation 36A Strict 75-Day Clock"
    },
    stage3: {
      title: "RFRP & Plan Due Diligence",
      badge: "Days 90 — 180 • Sec 29A Diligence",
      desc: "Circulation of Request for Resolution Plans and mandatory Section 29A background screening.",
      actionItems: [
        { label: "RFRP & Evaluation Matrix Release", detail: "Circulation of CoC-approved quantitative and qualitative scoring methodology to PRAs." },
        { label: "Section 29A Promoter Screening", detail: "Automated background check for NPA default aging, willful defaulters, and connected entities." },
        { label: "Section 30(2) Feasibility Audit", detail: "Verifying priority payment to operational creditors and mandatory CIRP cost coverage." },
        { label: "PUFE Transaction Ledger Sync", detail: "Forensic audit collation of Preferential, Undervalued, and Fraudulent transactions (Sec 43, 45, 66)." }
      ],
      complianceTag: "Mandatory Section 29A Clearance"
    },
    stage4: {
      title: "CoC E-Voting & NCLT Approval",
      badge: "Days 180 — 330 • 66% Consensus",
      desc: "Securing commercial consensus and judicial approval within the statutory outer limit.",
      actionItems: [
        { label: "Electronic CoC Voting Docket", detail: "Tamper-proof digital ballot circulation with live threshold calculation (66% for plan approval)." },
        { label: "Section 31 NCLT Plan Sanction Application", detail: "Automated drafting of Form H compliance certificate and plan sanction petition for NCLT." },
        { label: "Section 12 Time-Exclusion Dockets", detail: "Automated grounds generation for excluding litigation stay periods from the 330-day ceiling." },
        { label: "Section 33 Liquidation Trigger", detail: "Instant liquidation protocol and liquidator appointment docket if no compliant plan is approved." }
      ],
      complianceTag: "Section 30(4) 66% CoC Voting Threshold"
    }
  };

  // 3. Six Enterprise Modules for Insolvency Practitioners
  const capabilities = [
    {
      title: "Automated Claims Collation & Register",
      tag: "Form B, C, D Ingestion",
      icon: ClipboardList,
      desc: "Intelligent digital intake of secured financial debts, operational dues, and statutory claims with automated security interest verification and admission certificates."
    },
    {
      title: "Dynamic CoC Voting Governance Engine",
      tag: "Statutory 66% Calculator",
      icon: Vote,
      desc: "Instantly recompute voting shares upon claim updates, generate compliant meeting agendas, and broadcast immutable e-voting dockets with complete audit trails."
    },
    {
      title: "330-Day CIRP Milestone Countdown",
      tag: "Statutory Limitation Desk",
      icon: Clock,
      desc: "Real-time compliance radar for Form G, Information Memorandum, and RFRP disclosures, with automated drafting of Section 12 NCLT time-exclusion applications."
    },
    {
      title: "Resolution Plan Comparative Scorecard",
      tag: "RFRP Evaluation Matrix",
      icon: FileSpreadsheet,
      desc: "Algorithmic comparison of submitted resolution plans against Liquidation Value (LV) benchmarks, Net Present Value (NPV) modeling, and equity dilution matrices."
    },
    {
      title: "Section 29A Due Diligence Suite",
      tag: "Promoter Disqualification Check",
      icon: ShieldCheck,
      desc: "Multi-layered background cross-referencing of resolution applicants against RBI willful defaulter registers, CIBIL commercial records, and connected party lists."
    },
    {
      title: "PUFE Forensic Transaction Ledger",
      tag: "Avoidance Applications",
      icon: AlertCircle,
      desc: "Structured evidence dossiers for Preferential (Sec 43), Undervalued (Sec 45), Extortionate (Sec 50), and Fraudulent (Sec 66) transactions for NCLT clawback filings."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#071326] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-[#f1592a] selection:text-white">
      {/* 1. HERO COCKPIT (CLEAN STANDARD: TEXT ON LEFT, IMAGE ON RIGHT) */}
      <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden bg-white dark:bg-[#0A1528] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] dark:bg-[radial-gradient(#f1592a_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Mission Brief */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1592a]/10 dark:bg-[#f1592a]/20 border border-[#f1592a]/20 text-[#f1592a] text-xs font-semibold tracking-wider uppercase">
                <Building2 className="w-4 h-4 text-[#f1592a]" />
                Institutional Insolvency Suite • For IRP, RP & Liquidators
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
                Corporate Insolvency & <span className="text-[#f1592a] font-normal">CIRP Governance</span> for Resolution Professionals
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl font-normal">
                Seamlessly govern the entire Corporate Insolvency Resolution Process under IBC 2016—from NCLT Section 7/9 admission and claims collation to dynamic Committee of Creditors (CoC) voting matrices, Section 29A diligence, and NCLT plan sanctions.
              </p>

              {/* Live CIRP Milestone Telemetry */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1e3a8a] dark:text-blue-400 uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  Active CIRP Engagement Benchmark
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                  <div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white font-serif">₹1,420 Cr</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Admitted Debt Verified</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white font-serif">100%</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">E-Voting Audit Trail</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white font-serif">Day 142</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Of 330 Statutory Limit</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#f1592a] font-serif">Zero</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">IBBI Compliance Lapses</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-lg bg-[#f1592a] text-white font-medium hover:bg-[#d94a1f] shadow-md hover:shadow-lg transition-all text-sm group"
                >
                  Schedule Insolvency Suite Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="#cirp-timeline"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all text-sm"
                >
                  Explore 330-Day CIRP Tracker
                </Link>
              </div>

              {/* Regulatory Assurance Strip */}
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  IBC 2016 & IBBI Regulations
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Section 29A Screening Engine
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  66% CoC Voting Automation
                </div>
              </div>
            </div>

            {/* Right Column: CoC Boardroom Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-900 group">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                  <Image
                    src="/images/cirp-coc-governance.webp"
                    alt="Indian Insolvency Resolution Professional & Committee of Creditors Boardroom"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                </div>

                {/* Floating Bottom Telemetry Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Committee of Creditors (CoC) Desk
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Voting Quorum: 74.2% • 66% Approval Benchmark
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                    IBC 2016 Compliant
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BEFORE VS AFTER: CIRP GOVERNANCE TRANSFORMATION MATRIX */}
      <section className="py-12 sm:py-14 bg-[#FAF8F5] dark:bg-[#071326] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/10 dark:bg-[#1e3a8a]/20 text-[#1e3a8a] dark:text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Insolvency Process Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white tracking-tight">
              Transforming High-Stakes CIRP Friction into Seamless Institutional Governance
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-sans font-normal">
              How IndoLex insulates Insolvency Resolution Professionals against voting disputes, creditor challenges, and regulatory timeline penalties under the IBC.
            </p>
          </div>

          <div className="space-y-4">
            {transformationMatrix.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#0A1528] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* CIRP Stage Domain */}
                <div className="lg:col-span-3 p-5 bg-slate-50/80 dark:bg-slate-900/60 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                  <span className="text-xs font-mono text-slate-400">CIRP DOMAIN 0{idx + 1}</span>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-1">{item.area}</h3>
                </div>

                {/* Legacy Bottlenecks */}
                <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex items-start gap-3 bg-red-50/20 dark:bg-red-950/20">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-1">
                      Legacy Manual Practice
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.before}</p>
                  </div>
                </div>

                {/* IndoLex Standard */}
                <div className="lg:col-span-5 p-5 flex items-start gap-3 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
                      IndoLex Digital CIRP Engine
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SPOTLIGHT 1: RESOLUTION PLAN SCORING & FORENSIC AUDIT */}
      <section className="py-12 sm:py-14 bg-white dark:bg-[#0A1528] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Visual Image Showcase */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/cirp-plan-evaluation.webp"
                    alt="Indian Resolution Professional & Forensic Transaction Auditor War Room"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">RFRP Evaluation Matrix Active</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">3 Resolution Plans Scored • Section 30(2) Compliant</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                    Form H Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Architecture */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1592a]/10 dark:bg-[#f1592a]/20 border border-[#f1592a]/20 text-[#f1592a] text-xs font-semibold tracking-wider uppercase">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Plan Evaluation & Forensics
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
                Algorithmic RFRP Scoring, NPV Waterfalls & Section 29A Screening
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-normal">
                Comparing resolution applicant proposals with disparate payment schedules, deferred instruments, and equity dilution is the most contentious phase of CIRP. IndoLex automates the entire comparative evaluation matrix, allowing CoC members to vote on transparent commercial metrics with complete Section 29A statutory clearance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Net Present Value (NPV) Discounting Engine
                  </span>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Section 29A Promoter Disqualification Check
                  </span>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Section 30(2) Operational Creditor Priority Check
                  </span>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    PUFE Transaction Dossier Generation (Sec 43, 45, 66)
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 330-DAY CIRP TIMELINE & COC TERMINAL */}
      <section id="cirp-timeline" className="py-12 sm:py-14 bg-[#FAF8F5] dark:bg-[#071326] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/10 dark:bg-[#1e3a8a]/20 text-[#1e3a8a] dark:text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Clock className="w-3.5 h-3.5" />
              Statutory 330-Day Milestone Tracker
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white tracking-tight">
              The Resolution Professional&apos;s CIRP Milestone Cockpit
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-sans font-normal">
              Navigate through the four statutory milestone windows of Corporate Insolvency under IBC 2016 regulations.
            </p>
          </div>

          {/* Timeline Stages Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {Object.keys(cirpStages).map((key) => {
              const stage = cirpStages[key];
              const isActive = activeStepTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveStepTab(key)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isActive
                      ? "bg-white dark:bg-slate-800 border-[#f1592a] shadow-md ring-1 ring-[#f1592a]/20"
                      : "bg-slate-100/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/80"
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    {stage.badge}
                  </span>
                  <div className={`text-xs font-bold ${isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Terminal Card */}
          <div className="bg-white dark:bg-[#0A1528] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <span className="text-xs font-semibold text-[#f1592a] uppercase tracking-wider">
                  {cirpStages[activeStepTab].badge}
                </span>
                <h3 className="text-xl font-serif text-slate-900 dark:text-white mt-1">
                  {cirpStages[activeStepTab].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {cirpStages[activeStepTab].desc}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold self-start md:self-auto">
                {cirpStages[activeStepTab].complianceTag}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {cirpStages[activeStepTab].actionItems.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#1e3a8a]/10 dark:bg-[#1e3a8a]/20 text-[#1e3a8a] dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIX ENTERPRISE MODULES FOR INSOLVENCY PRACTITIONERS */}
      <section className="py-12 sm:py-14 bg-white dark:bg-[#0A1528] border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1592a]/10 dark:bg-[#f1592a]/20 border border-[#f1592a]/20 text-[#f1592a] text-xs font-semibold tracking-wider uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Comprehensive CIRP Governance Stack
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white tracking-tight">
              Enterprise Technology Designed for Insolvency Resolution Professionals
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-sans font-normal">
              Engineered strictly in accordance with Insolvency and Bankruptcy Board of India (IBBI) CIRP regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] dark:bg-[#071326] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#1e3a8a] dark:text-blue-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{item.desc}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-medium text-[#f1592a]">
                    <span>IBBI Standard</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONAL CALL TO ACTION */}
      <section className="py-12 sm:py-14 bg-white dark:bg-[#0A1528] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#1e3a8a] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f1592a]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#f1592a]" />
                Institutional CIRP Deployment
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
                Accelerate CIRP Timelines & Protect Creditor Value
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
                Equip your insolvency practice with automated claim registers, dynamic CoC e-voting matrices, and seamless NCLT plan approval dockets under IBC 2016.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#f1592a] text-white font-medium hover:bg-[#d94a1f] shadow-lg hover:shadow-xl transition-all text-sm group"
                >
                  Schedule Insolvency Practice Walkthrough
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/who-we-serve/bank-sarg"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/20 transition-all text-sm"
                >
                  View Bank SARG Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & DEMO MODAL */}
      <Footer />
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}