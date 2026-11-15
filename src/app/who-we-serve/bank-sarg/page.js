
import Image from 'next/image';
import Link from 'next/link';

import {
  Landmark,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Users2,
  Gauge,
  Briefcase,
  Building2,
  Sparkles,
  Quote,
  Calendar,
  Gavel,
} from 'lucide-react';

import Footer from '@/components/landing/Footer';
import SARGDemoButton from '@/components/landing/SARGDemoButton';

const transformationMatrix = [
  {
    area: 'Early Warning & NPA Detection',
    before:
      'SMA accounts identified only after month-end CBS reports, causing accounts to slip past 90 days into NPA before legal intervention.',
    after:
      'Live daily DPD telemetry triggers automatic SMA-0, 1, and 2 watchlist alerts directly to SARG General Managers.',
  },
  {
    area: 'Statutory SARFAESI 13(2) Notices',
    before:
      'Branch officers take 3-4 weeks to gather loan contracts, calculate penal interest, and draft demand notices through external typists.',
    after:
      'Auto-generated 60-day statutory demand notices with dynamic interest schedules dispatched within 72 hours of NPA classification.',
  },
  {
    area: 'Empanelled Advocate Oversight',
    before:
      'Zero visibility into whether empanelled law firms attended DRT hearings or if stay orders were granted ex-parte.',
    after:
      'Automated e-Courts cause-list sync flags every matter listing, adjournment reason, and daily interim order in real time.',
  },
  {
    area: 'CRILC & Board Recovery MIS',
    before:
      'Days spent manually reconciling ₹5 Cr+ consortium accounts into complex Excel returns for RBI and the Board Recovery Committee.',
    after:
      'One-click export of audited CRILC formats, provisioning coverage matrices, and board-ready executive recovery presentations.',
  },
];

const dailyRoutine = [
  {
    time: '09:30 AM',
    phase: 'Morning Exception Feed',
    title: 'SMA-0/1/2 Watchlist & Overdue Review',
    desc:
      'Review overnight DPD movements across corporate accounts. High-risk exposures approaching the 60-day SMA-2 threshold are flagged for immediate SARG intervention.',
  },
  {
    time: '11:30 AM',
    phase: 'Statutory Sanction Desk',
    title: 'Credit Committee Notice Approvals',
    desc:
      'One-click verification and digital sign-off of SARFAESI Section 13(2) demand notices and Section 14 CMM possession affidavits generated with exact liability balances.',
  },
  {
    time: '02:30 PM',
    phase: 'Judicial Hearing Board',
    title: 'Live DRT & NCLT Advocate Appearance Audit',
    desc:
      'Monitor tribunal benches across India. Review daily appearance confirmations, interim stay vacation petitions, and recovery certificate (RC) execution milestones.',
  },
  {
    time: '05:00 PM',
    phase: 'Regulatory Intelligence',
    title: 'CRILC Exposure Return & Board MIS Export',
    desc:
      'Generate consortium exposure summaries for accounts >= ₹5 Crore. Review weekly cash recovery velocity against board-approved compromise haircut targets.',
  },
];

const impactStats = [
  {
    value: '72 Hrs',
    label: 'Average 13(2) Dispatch',
    sub: 'Down from 28 days',
  },
  {
    value: '0%',
    label: 'Limitation Defaults',
    sub: 'Strict statutory calendar',
  },
  {
    value: '65%',
    label: 'Faster OTS Sanction',
    sub: 'NPV valuation models',
  },
  {
    value: '100%',
    label: 'CRILC Audit Readiness',
    sub: 'Automated RBI returns',
  },
];

const executiveButtonClass =
  'inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#E05320]/25 hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer';

function SectionHeading({ eyebrow, title, description, icon: Icon }) {
  return (
    <div className="max-w-3xl mb-10">
      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05320] mb-2">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {eyebrow}
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureImage({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  sizes = '(max-width: 1024px) 100vw, 40vw',
  children,
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${aspect} border border-slate-200 dark:border-slate-800 shadow-xl group`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent opacity-80 pointer-events-none" />

      {children}
    </div>
  );
}

export default function BankSARGPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#071326] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">

      {/* 1. EXECUTIVE HERO */}
      <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden bg-white dark:bg-[#0A1528] border-b border-slate-200 dark:border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E05320]/5 dark:bg-[#E05320]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800/80 mb-8">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-[#E05320]" />
              Institutional Role Profile
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-[#E05320]">
                Head of SARG & Chief Credit Officers
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>RBI IRAC & Large Exposure Framework Aligned</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-7 space-y-5">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Command Stressed Portfolios with
                <br />
                <span className="italic text-[#E05320] font-normal">
                  Real-Time SARG Recovery Intelligence
                </span>
              </h1>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071326] border-l-4 border-[#E05320] text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                <Quote className="h-4 w-4 text-[#E05320] mb-1 inline mr-1 opacity-70" />
                "Our core mandate is straightforward: Prevent viable corporate borrowers from slipping into 90+ DPD defaults, trigger statutory recovery within hours of classification, and resolve multi-crore NPAs before they get trapped in years of litigation."
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-normal">
                IndoLex Laws equips Bank SARG heads, General Managers, and
                Credit Approval Committees with single-window control over
                stressed borrower exposures, statutory SARFAESI clocks, DRT
                cause-lists, and CRILC regulatory exports.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <SARGDemoButton className={executiveButtonClass} />

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                  <Landmark className="h-3.5 w-3.5 text-sky-500" />
                  <span>Open SARG Command Cockpit →</span>
                </Link>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Desk Coverage:
                </span>
                <span>Scheduled Commercial Banks</span>
                <span>•</span>
                <span>Large Corporate SARG</span>
                <span>•</span>
                <span>Consortium JLF Desks</span>
              </div>
            </div>

            {/* RIGHT COMMAND COCKPIT */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#071326] p-4 shadow-xl space-y-3">

                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-[11px]">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Landmark className="h-4 w-4 text-[#E05320]" />
                    <span>SARG Chief Credit Cockpit</span>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                    Live CBS Feed
                  </span>
                </div>

                <FeatureImage
                  src="/images/sarg-command-hero.webp"
                  alt="SARG command and recovery management workspace"
                  aspect="aspect-[16/10]"
                >
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                      Active Stressed Exposure
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      ₹2,418.60 Cr • 146 Corporate Accounts
                    </div>
                  </div>
                </FeatureImage>

                <div className="grid grid-cols-3 gap-2 pt-1 text-[10px]">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-400">SMA-2 Watch</div>
                    <div className="text-xs font-bold text-[#E05320] mt-0.5">
                      ₹412 Cr
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">
                      18 Key Groups
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-400">13(2) Clock</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      72 Hours
                    </div>
                    <div className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                      100% On-Time
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-400">YTD Recovery</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      ₹612.4 Cr
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">
                      +24.8% vs Target
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. IMPACT STATS */}
      <section className="py-8 border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#071326]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {impactStats.map((st) => (
              <div
                key={st.label}
                className="border-l-2 border-[#E05320] pl-4 space-y-0.5"
              >
                <div className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
                  {st.value}
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {st.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EARLY WARNING */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0A1528] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            <div className="lg:col-span-5 order-2 lg:order-1">
              <FeatureImage
                src="/images/sarg-risk-early-warning.webp"
                alt="SARG stressed asset resolution risk intelligence"
              >
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>Portfolio Risk Alert: Group Exposure</span>
                    <span className="text-[#E05320]">DPD 58 / SMA-1</span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    Prompt CAP (Corrective Action Plan) triggered before
                    60-day SMA-2 classification.
                  </div>
                </div>
              </FeatureImage>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05320]">
                <Gauge className="h-4 w-4" />
                <span>Predictive Risk Intelligence</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-white leading-tight">
                Detect Stressed Exposures Weeks Before They Turn into NPAs
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Traditional recovery teams learn about stressed corporate
                accounts after the monthly ledger closes. IndoLex continuously
                analyzes daily repayment feeds across working capital limits,
                term loans, and letter of credits (LC/BG).
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                {[
                  'Real-time SMA-0, 1, and 2 DPD Tracking',
                  'Cross-Default Consortium Alerts',
                  'Automated CRILC Format Generator',
                  'CERSAI Security Charge Validation',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#071326] border border-slate-200 dark:border-slate-800"
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

      {/* 4. BEFORE AND AFTER */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5] dark:bg-[#071326]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="The SARG Workflow Transformation"
            title="Traditional Recovery Bottlenecks vs. IndoLex Command"
            description="See how IndoLex eliminates the administrative friction that traps bank recovery teams in manual spreadsheet reconciliation."
            icon={Sparkles}
          />

          <div className="space-y-4">
            {transformationMatrix.map((item, idx) => (
              <div
                key={item.area}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-5 sm:p-6 transition-all hover:border-[#E05320]/30 shadow-xs"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-[#E05320] mb-3">
                  0{idx + 1}. {item.area}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400 mb-1">
                        Without IndoLex (Traditional Friction)
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.before}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                        With IndoLex SARG Engine
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {item.after}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ADVOCATE GOVERNANCE */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0A1528] border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05320]">
                <Gavel className="h-4 w-4" />
                <span>Empanelled Panel Oversight</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-white leading-tight">
                Hold Empanelled Advocates & Agencies Accountable to Results
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect external law firms directly to SARG case records.
                Monitor DRT, DRAT, NCLT, and High Court listings with automated
                cause-list scrapers so no hearing date goes unrepresented.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-700 dark:text-slate-300">
                {[
                  {
                    title: 'Daily Cause-List Scraper:',
                    desc: "Automatic SMS/email alerts when any bank matter is listed on tomorrow's court board.",
                  },
                  {
                    title: 'Immediate Adverse Order Escalation:',
                    desc: 'Zero-delay intimation to SARG when an interim stay is granted, enabling same-week vacation filings.',
                  },
                  {
                    title: 'Milestone Fee Approval:',
                    desc: 'Link advocate invoices directly to certified hearing attendance and recovery certificate execution.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>{item.title}</strong> {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <FeatureImage
                src="/images/sarg-advocate-governance.webp"
                alt="High Court and DRT advocate governance"
              >
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>DRT Debt Recovery Tribunal Synced</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      100% Hearing Proof
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    Section 19 Original Application (OA) orders synced with
                    CNR e-Courts repository.
                  </div>
                </div>
              </FeatureImage>
            </div>

          </div>
        </div>
      </section>

      {/* 6. DAILY ROUTINE */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5] dark:bg-[#071326]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Daily Operational Rhythm"
            title="A Day in the Life of a SARG Credit Head"
            description="How bank executives use the IndoLex workspace to govern high-exposure default management from morning bell to evening board submissions."
            icon={Calendar}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dailyRoutine.map((step) => (
              <div
                key={step.time}
                className="p-6 rounded-2xl bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800/80 shadow-xs relative group hover:border-[#E05320]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-orange-50 dark:bg-orange-950/40 text-[#E05320]">
                    {step.time}
                  </span>

                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {step.phase}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-normal text-slate-900 dark:text-white group-hover:text-[#E05320] transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL */}
      <section className="py-12 bg-white dark:bg-[#0A1528] border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">

          <div
            className="inline-flex items-center gap-1.5 text-amber-500 justify-center"
            aria-label="Five stars"
          >
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className="text-base">
                {star}
              </span>
            ))}
          </div>

          <blockquote className="font-serif text-lg sm:text-xl text-slate-800 dark:text-slate-200 italic leading-relaxed">
            "Before IndoLex, tracking our bank’s 250+ DRT cases across 14
            tribunal benches was an operational nightmare. IndoLex centralized
            our advocate cause-lists, eliminated missed SARFAESI limitations,
            and reduced our board MIS reporting cycle from 5 days to 15 minutes."
          </blockquote>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Former General Manager (Recovery & SARG) • Top-Tier Public Sector
            Bank, Mumbai
          </div>
        </div>
      </section>

      {/* 8. OTHER INSTITUTIONAL ROLES */}
      <section className="py-12 bg-[#FAF8F5] dark:bg-[#071326]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg sm:text-xl font-normal text-slate-900 dark:text-white">
              Explore Other Institutional Roles
            </h2>

            <span className="text-xs text-slate-400">
              Connected Recovery Ecosystem
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <Link
              href="/who-we-serve/legal-counsels"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] hover:border-[#E05320]/40 transition-all flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320]">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#E05320] transition-colors">
                    Legal Counsels & Advocates
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    DRT OA-19 & NCLT filing dockets
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#E05320] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/who-we-serve/resolution-professionals"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] hover:border-[#E05320]/40 transition-all flex items-center justify-between group shadow-xs"
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
                    IBC 2016 CIRP & CoC voting suite
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#E05320] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/who-we-serve/recovery-agents"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] hover:border-[#E05320]/40 transition-all flex items-center justify-between group shadow-xs"
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
                    Sec 14 DM/CMM & digital panchnamas
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#E05320] group-hover:translate-x-0.5 transition-all" />
            </Link>

          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-[#0A1322] via-[#0E1A2E] to-[#14233D] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
            Transform Your Bank's Stressed Asset Recovery Operations
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
            Schedule a private executive briefing with our banking advisory
            team to explore full CBS integration and automated CRILC workflows.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <SARGDemoButton
              className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-7 py-3.5 text-xs font-bold text-white shadow-xl hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
            />
          </div>

        </div>
      </section>

      {/* 10. FOOTER */}
      <Footer />

    </div>
  );
}
