"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lock,
  Camera,
  MapPin,
  Gavel,
  Landmark,
  Scale,
  Briefcase,
  Building2,
  FileCheck2,
  Clock,
  FileText,
  Sparkles,
  Quote,
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  KeyRound,
  Radio,
  FileSpreadsheet
} from "lucide-react";
import Footer from "@/components/landing/Footer";
import DemoModal from "@/components/landing/DemoModal";

export default function RecoveryAgentsPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState("sec13_4");

  // 1. Before vs After: Real-world Enforcement Transformation Matrix
  const transformationMatrix = [
    {
      area: "Rule 8(1) Panchnama & Movable Inventory",
      before: "Handwritten paper panchnamas and rough inventories challenged in DRT under Section 17 due to missing witness identity proof or unverified photo timestamps.",
      after: "Mobile digital panchnama with latitude-longitude watermarking, independent panchas e-signatures, and Section 65B-certified tamper-proof evidence logs."
    },
    {
      area: "Section 14 DM / CMM Warrant Execution",
      before: "Months wasted manually tracking physical possession orders across District Magistrate courts, leading to stale orders and repeat borrower resistance.",
      after: "End-to-end statutory tracker managing DM petitions, Advocate Commissioner appointments, and coordinated local police assistance requisitions."
    },
    {
      area: "Transition from Takeover to E-Auction",
      before: "Secured properties sit idle for 3-6 months awaiting valuation reports, deteriorating asset value and stretching statutory limitation windows.",
      after: "Instant assignment to IBBI Registered Valuers, automated reserve price calculation (RV vs DSV), and one-click dispatch of 30-day statutory auction notices."
    },
    {
      area: "Bank SARG Desk Sync & Agency Billing",
      before: "Recovery agencies submit monthly physical paper files; invoice processing delayed by 60+ days due to missing visit confirmation dockets.",
      after: "Live geo-fenced field check-in telemetries sync directly to bank SARG command dashboards, unlocking automated milestone-based fee disbursements."
    }
  ];

  // 2. Interactive Field Takeover Execution Docket
  const executionStages = {
    sec13_4: {
      title: "Section 13(4) Symbolic Takeover",
      badge: "SARFAESI Rule 8(1) & 8(2)",
      desc: "Instant execution protocol following expiry of the 60-day statutory notice period under Section 13(2).",
      actionItems: [
        { label: "Possession Notice Affixture", detail: "Geo-tagged photo evidence of notice affixed on the outer door of the secured asset." },
        { label: "Vernacular & English Newspaper Publication", detail: "Auto-sync scans of publications in leading English and vernacular daily newspapers within 7 days." },
        { label: "Registry & CERSAI Status Update", detail: "One-click intimation to Central Registry of Securitisation Asset Reconstruction and Security Interest." },
        { label: "Intimation to Defaulting Borrower & Guarantor", detail: "Proof of service via Speed Post / Registered Post A.D. with track-and-trace tracking." }
      ],
      complianceTag: "DRT Section 17 Proof-of-Service Compliant"
    },
    sec14: {
      title: "Section 14 DM / CMM Physical Eviction",
      badge: "Magisterial Warrant Execution",
      desc: "Securing peaceful physical custody through District Magistrate / Chief Metropolitan Magistrate warrants.",
      actionItems: [
        { label: "Nine-Point Statutory Affidavit Filing", detail: "Auto-generated 9-point affidavit affirming valid mortgage, default, and compliance with Section 13(2)." },
        { label: "Advocate Commissioner Appointment", detail: "Direct liaison portal for Court Commissioners with pre-populated property boundary schedules." },
        { label: "Local Police Assistance Liaisoning", detail: "Automated requisition notices to Superintendent of Police / Station House Officer for law enforcement presence." },
        { label: "Physical Lock & Key Handover Protocol", detail: "Digital log of lock change, premises seal barcoding, and round-the-clock physical security posting." }
      ],
      complianceTag: "Zero Contempt Risk • Supreme Court Standard"
    },
    inventory: {
      title: "Digital Panchnama & Movable Asset Tagging",
      badge: "Section 65B Electronic Admissibility",
      desc: "Exhaustive on-ground inventory documentation to withstand aggressive borrower challenges in tribunal.",
      actionItems: [
        { label: "Dual Independent Panchas (Witness) Verification", detail: "On-site capture of Aadhaar-masked witness identity, mobile numbers, and live digital signatures." },
        { label: "Itemized Movable Asset Tagging", detail: "Serial numbers, make, visual condition, and high-resolution 360-degree photo logs for all machinery." },
        { label: "Valuation Benchmark Handover", detail: "Direct digital handover docket dispatched to IBBI Registered Valuers for Realizable Value assessment." },
        { label: "Cryptographic Hash & Timestamping", detail: "SHA-256 hash generation locking panchnama files into immutable court-admissible electronic records." }
      ],
      complianceTag: "Admissible in All High Courts & DRT Benches"
    },
    auction: {
      title: "Rule 8(6) & 9(1) E-Auction Launch",
      badge: "Statutory 30-Day Public Clock",
      desc: "Fast-tracking secured asset monetization through compliant public e-auctions without procedural flaw.",
      actionItems: [
        { label: "Statutory 30-Day Borrower Notice Service", detail: "Automated delivery of 30-day redemption window notice to borrower prior to first public auction." },
        { label: "Reserve Price & EMD Fixation Matrix", detail: "Committee-approved reserve price configuration with automated 10% Earnest Money Deposit calculations." },
        { label: "Multi-Portal E-Auction Sync", detail: "Direct API feed integration with official auction portals (e-Bikray, MSTC, C1 India, Auction Tiger)." },
        { label: "Certificate of Sale Issuance", detail: "Instant drafting of Rule 9(6) Sale Certificate in favor of winning bidder upon 100% realization." }
      ],
      complianceTag: "SARFAESI Security Interest Rules Compliant"
    }
  };

  // 3. Core Field Operational Modules
  const operationalCapabilities = [
    {
      title: "Mobile Digital Panchnama Engine",
      tag: "Rule 8(1) & (2) Admissible",
      icon: Camera,
      desc: "Field-tested mobile forms featuring mandatory GPS watermarking, unalterable time-stamps, independent witness sign-offs, and Section 65B digital evidence certificates."
    },
    {
      title: "Section 14 Magisterial Command",
      tag: "DM / CMM Court Tracker",
      icon: Gavel,
      desc: "Standardized 9-point statutory affidavit templates, Advocate Commissioner coordination dockets, and automated police protection requisition letters."
    },
    {
      title: "Secured Asset Physical Custody Ledger",
      tag: "Security Agency Oversight",
      icon: KeyRound,
      desc: "Track property keys, lock barcoding, 24/7 security agency shifts, physical possession logs, and CCTV feed integrations from a unified institutional cockpit."
    },
    {
      title: "IBBI Valuer & E-Auction Desk",
      tag: "Takeover-to-Auction Fast Track",
      icon: FileSpreadsheet,
      desc: "Instantly share verified property boundary schedules with IBBI registered valuers, calculate reserve prices, and monitor statutory 30-day auction clocks."
    },
    {
      title: "Geo-Fenced Field Visit Verification",
      tag: "RBI Code of Conduct Compliant",
      icon: MapPin,
      desc: "Real-time location audit trails for recovery officer borrower visits, compromise discussions, and notice deliveries compliant with RBI Fair Practices norms."
    },
    {
      title: "Automated Milestone Fee Billing",
      tag: "Fast Agency Disbursement",
      icon: FileCheck2,
      desc: "Automatic generation of agency invoice dockets upon verified stage completion—symbolic possession, physical takeover, and successful e-auction realization."
    }
  ];

  return (
  <div className="recovery-agents-page min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#f1592a] selection:text-white transition-colors duration-300">
      <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Mission Brief */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1592a]/10 text-[#f1592a] text-xs font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-[#f1592a]" />
                Institutional Field Command • SARFAESI Section 13(4) & Section 14 Desk
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight leading-tight">
                Eliminate DRT Stay Orders with <span className="text-[#f1592a] font-normal">Tamper-Proof Panchnamas</span> & Secured Asset Telemetry
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl">
                From symbolic possession notices under Rule 8(1) to District Magistrate physical eviction drives and 30-day statutory e-auction handovers—IndoLex equips Bank Authorised Officers and empaneled enforcement agencies with Section 65B-certified mobile evidence and real-time bank desk synchronization.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1e3a8a] uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  Live Field Telemetry Benchmark
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                  <div>
                    <div className="text-xl font-bold text-slate-900 font-serif">100%</div>
                    <div className="text-[11px] text-slate-500 font-sans">Sec 65B Geo-Stamped</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 font-serif">&lt; 72 Hrs</div>
                    <div className="text-[11px] text-slate-500 font-sans">Newspaper Proof Sync</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 font-serif">Zero</div>
                    <div className="text-[11px] text-slate-500 font-sans">Panchnama Rejections</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#f1592a] font-serif">3 Weeks</div>
                    <div className="text-[11px] text-slate-500 font-sans">Takeover to Auction</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-lg bg-[#f1592a] text-white font-medium hover:bg-[#d94a1f] shadow-md hover:shadow-lg transition-all text-sm group"
                >
                  Schedule Enforcement Briefing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="#execution-docket"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 shadow-sm transition-all text-sm"
                >
                  Explore Field Execution Docket
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs text-slate-500 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  SARFAESI Rule 8(1) & (2) Admissible
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Section 65B Evidence Certified
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  RBI Fair Practices Compliant
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Indian Enforcement Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                  <Image
                    src="/images/recovery-field-command.webp"
                    alt="Indian Bank Authorised Officers & Enforcement Agency Command Team"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                </div>

                {/* Floating Bottom Telemetry Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Authorised Officer Field Docket
                    </div>
                    <div className="text-[11px] text-slate-500">
                      SARFAESI Sec 13(4) • Geo-Stamped Evidence Synced
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    100% Admissible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BEFORE VS AFTER: ENFORCEMENT TRANSFORMATION MATRIX */}
      <section className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-semibold tracking-wider uppercase mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Real-World Operational Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight">
              Transforming High-Risk Physical Takeovers into Flawless Judicial Milestones
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
              How IndoLex neutralizes borrower stay orders in Debt Recovery Tribunals and eliminates administrative delays across every stage of asset possession.
            </p>
          </div>

          <div className="space-y-4">
            {transformationMatrix.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-all"
              >
                {/* Enforcement Domain */}
                <div className="lg:col-span-3 p-5 bg-slate-50/80 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-center">
                  <span className="text-xs font-mono text-slate-400">STAGE 0{idx + 1}</span>
                  <h3 className="text-sm font-semibold text-slate-900 mt-1">{item.area}</h3>
                </div>

                {/* Legacy Paper Reality */}
                <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-slate-200 flex items-start gap-3 bg-red-50/20">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-red-600 block mb-1">
                      Legacy Paper Reality
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.before}</p>
                  </div>
                </div>

                {/* IndoLex Digitized Standard */}
                <div className="lg:col-span-5 p-5 flex items-start gap-3 bg-emerald-50/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 block mb-1">
                      IndoLex Field Telemetry Standard
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SPOTLIGHT 1: DIGITAL PANCHNAMA & SECTION 65B EVIDENCE ENGINE */}
      <section className="py-12 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Image Showcase */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/recovery-digital-panchnama.webp"
                    alt="Rule 8(1) Digital Panchnama and On-Site Inspection Recording"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Digital Panchnama: SARFAESI Rule 8(1)</div>
                    <div className="text-[11px] text-slate-500">Dual Independent Panchas • GPS Watermarked</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    Sec 65B Certified
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Architecture */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1592a]/10 text-[#f1592a] text-xs font-semibold tracking-wider uppercase">
                <Camera className="w-3.5 h-3.5" />
                Mobile-First Evidence Standard
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 tracking-tight leading-tight">
                Court-Admissible Mobile Panchnamas & Instant Newspaper Affixture Proof
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                Defaulting borrowers frequently halt recovery by alleging before DRT benches under Section 17 that physical possession was taken without independent witnesses or that movable plant machinery was looted. IndoLex eliminates this vulnerability forever with legally unassailable electronic proof.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800">
                    Mandatory Dual Panchas (Witness) Aadhaar-masked Signatures
                  </span>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800">
                    Latitude, Longitude & Timestamped Multi-Angle Photos
                  </span>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800">
                    Section 65B Cryptographic Hash Certificate Generator
                  </span>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-800">
                    Rule 8(2) 7-Day English & Vernacular Newspaper Tracker
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FIELD TAKEOVER COMMAND TERMINAL */}
      <section id="execution-docket" className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-semibold tracking-wider uppercase mb-3">
              <Gavel className="w-3.5 h-3.5" />
              Live Interactive Cockpit
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight">
              The Authorised Officer&apos;s Field Takeover Execution Terminal
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
              Navigate through the 4 critical statutory milestones of physical asset enforcement under the SARFAESI Act, 2002.
            </p>
          </div>

          {/* Milestone Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {Object.keys(executionStages).map((key) => {
              const stage = executionStages[key];
              const isActive = activeStepTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveStepTab(key)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isActive
                      ? "bg-white border-[#f1592a] shadow-md ring-1 ring-[#f1592a]/20"
                      : "bg-slate-100/80 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                    {stage.badge}
                  </span>
                  <div className={`text-xs font-bold ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Terminal Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-semibold text-[#f1592a] uppercase tracking-wider">
                  {executionStages[activeStepTab].badge}
                </span>
                <h3 className="text-xl font-serif text-slate-900 mt-1">
                  {executionStages[activeStepTab].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {executionStages[activeStepTab].desc}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start md:self-auto">
                {executionStages[activeStepTab].complianceTag}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {executionStages[activeStepTab].actionItems.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPOTLIGHT 2: IBBI VALUER & E-AUCTION 30-DAY CLOCK */}
      <section className="py-12 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-semibold tracking-wider uppercase">
                <Landmark className="w-3.5 h-3.5" />
                Asset Monetization Desk
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 tracking-tight leading-tight">
                Compress Takeover-to-Auction Timelines from 90 Days to Under 3 Weeks
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                Taking physical possession is futile if secured commercial properties sit idle while loan interest mounts. IndoLex integrates IBBI Registered Valuers directly into the post-possession workflow to immediately establish Realizable Value (RV) and Distress Sale Value (DSV), triggering the 30-day statutory auction countdown.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">IBBI Valuer Docket Auto-Assignment</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Property boundary schedules, title deed notes, and digital inspection logs dispatched instantly to empaneled valuers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Rule 8(6) Statutory 30-Day Redemption Clock</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Automated registered post generation and track-and-trace proof ensuring borrower limitation period is strictly honored.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Multi-Portal E-Auction Broadcast</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Direct integration with official e-Bikray, MSTC, and private auction portals for seamless public tender launch.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Valuer Inspection Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/recovery-auction-inspection.webp"
                    alt="IBBI Registered Valuer & Bank Recovery Head Property Inspection"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Auction Readiness: Reserve Price Fixed</div>
                    <div className="text-[11px] text-slate-500">SARFAESI Rule 8(6) & 9(1) • IBBI Valuation Synced</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    Live E-Auction Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIX PURPOSE-BUILT ENFORCEMENT MODULES */}
      <section className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1592a]/10 text-[#f1592a] text-xs font-semibold tracking-wider uppercase mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              Comprehensive Enforcement Stack
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight">
              Enterprise Enforcement Modules Built for Authorised Officers & Field Teams
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
              Engineered specifically to fulfill Indian banking recovery regulations and withstand scrutiny across every DRT bench in the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operationalCapabilities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#1e3a8a]">
                        <IconComp className="w-5 h-5 text-[#1e3a8a]" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-[#f1592a]">
                    <span>Institutional Standard</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. INSTITUTIONAL CALL TO ACTION */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#1e3a8a] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f1592a]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#f1592a]" />
                Institutional Field Deployment
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
                Equip Your Authorised Officers & Enforcement Agencies Today
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                Accelerate physical possession drives, eliminate borrower stay orders in Debt Recovery Tribunals, and monetize non-performing assets within record statutory limitation windows.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#f1592a] text-white font-medium hover:bg-[#d94a1f] shadow-lg hover:shadow-xl transition-all text-sm group"
                >
                  Request Institutional Agency Demo
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