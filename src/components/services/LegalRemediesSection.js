'use client';

import React, { useState } from 'react';
import {
  Scale,
  Gavel,
  ShieldCheck,
  Building2,
  Landmark,
  BadgeAlert,
  Coins,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
  FileCheck2,
  Zap,
  AlertCircle
} from 'lucide-react';

export default function LegalRemediesSection({ onOpenClaim }) {
  const [activeRemedy, setActiveRemedy] = useState('order-37');

  const remedies = [
    {
      id: 'order-37',
      code: 'INST-01',
      title: 'Order XXXVII CPC Summary Suit',
      category: 'B2B Commercial Invoices',
      forum: 'Designated Commercial Court',
      statute: 'Code of Civil Procedure 1908 • Order 37',
      speed: '45-60 Days Fast-Track',
      leverage: 'Summary Judgment Without Prolonged Trial',
      powerBadge: 'Leave to Defend Filter',
      courtPowers: 'Debtor has no automatic right to defend. Unless they prove a bona fide defense to the Court within 10 days, an immediate recovery decree is passed.',
      interestRate: 'Up to 18% Commercial Interest',
      limitation: '3 Years from date of invoice default',
      exhibits: ['Purchase Orders & Signed Contracts', 'GST Tax Invoices & E-Way Bills', 'Proof of Delivery (POD) Challans', 'Ledger Balance Confirmation'],
      icon: Gavel,
      color: 'text-[#E05320]',
    },
    {
      id: 'msmed-18',
      code: 'INST-02',
      title: 'MSMED Act Section 18 Samadhaan',
      category: 'MSME Registered Enterprises',
      forum: 'Micro & Small Enterprises Facilitation Council (MSEFC)',
      statute: 'MSMED Act 2006 • Section 15 to 19',
      speed: 'Mandatory 90-Day Legal SLA',
      leverage: 'Overrides Ordinary Commercial Arbitration Clauses',
      powerBadge: '3x RBI Compound Interest',
      courtPowers: 'Statutory mandate overrides contractual credit periods over 45 days. Buyer faces mandatory 75% pre-deposit before any court can entertain an appeal.',
      interestRate: 'Compound Interest with Monthly Rests at 3x RBI Bank Rate (~19.5% p.a.)',
      limitation: 'Applicable to supplies made while holding valid Udyam Registration',
      exhibits: ['Udyam Registration Certificate', 'GST Invoices citing Udyam Number', 'Certified Delivery / Work Completion Sign-off', 'Interest Calculation Schedule'],
      icon: Coins,
      color: 'text-emerald-500',
    },
    {
      id: 'ni-act-138',
      code: 'INST-03',
      title: 'Section 138 NI Act Dishonour Prosecution',
      category: 'Cheque & NACH Mandate Defaults',
      forum: 'Metropolitan / Judicial Magistrate Court',
      statute: 'Negotiable Instruments Act 1881 • Sec 138/143A',
      speed: '30-Day Strict Notice Limitation',
      leverage: 'Direct Criminal & Civil Liability on Directors',
      powerBadge: '20% Interim Compensation',
      courtPowers: 'Magistrate Court possesses statutory power under Section 143A to order the drawer to deposit up to 20% of the cheque amount as interim compensation.',
      interestRate: 'Up to Twice the Cheque Amount in Fines + Penal Conviction',
      limitation: 'Strict 30 days from bank return memo receipt; 15-day cure notice',
      exhibits: ['Original Dishonoured Cheque', 'Bank Return Memo (Insufficient Funds / Stopped)', 'Speed Post Notice Tracking Receipt', 'Underlying Invoice / Contract'],
      icon: BadgeAlert,
      color: 'text-rose-500',
    },
    {
      id: 'ibc-sec-9',
      code: 'INST-04',
      title: 'Insolvency & Bankruptcy CIRP Admission',
      category: 'Corporate Debts Above ₹1 Crore',
      forum: 'National Company Law Tribunal (NCLT Benches)',
      statute: 'Insolvency & Bankruptcy Code 2016 • Sec 8 & 9',
      speed: '10-Day Statutory Demand Window',
      leverage: 'Risk of Board Suspension & Company Takeover by IRP',
      powerBadge: 'NCLT CIRP Escalation',
      courtPowers: 'Serving a statutory Form 3 demand notice followed by Section 9 petition. Threat of moratorium and management takeover compels corporate boards into settlement.',
      interestRate: 'Principal Realization + Contractual Interest',
      limitation: 'Statutory default threshold exceeding ₹1 Crore with zero prior dispute',
      exhibits: ['Section 8 Form 3 Demand Notice', 'Registered Office Delivery Proof', 'Bank Statement Proving Non-Payment', 'Unpaid Invoices > ₹1 Crore'],
      icon: Landmark,
      color: 'text-purple-500',
    },
    {
      id: 'arbitration-sec-9',
      code: 'INST-05',
      title: 'Commercial Arbitration & Sec 9 Injunction',
      category: 'Contractual & Infrastructure Claims',
      forum: 'High Court Commercial Division & Arbitral Tribunal',
      statute: 'Arbitration & Conciliation Act 1996 • Sec 9 & 11',
      speed: 'Urgent Interim Orders within 7-14 Days',
      leverage: 'Freezes Debtor Assets Before Award is Passed',
      powerBadge: 'Asset Injunction',
      courtPowers: 'Court passes urgent interim protection orders restraining debtor from disposing of movable/immovable assets or encashing performance bank guarantees.',
      interestRate: 'Commercial Interest as per Contract or Arbitral Award',
      limitation: 'In accordance with contractual dispute resolution covenants',
      exhibits: ['Signed Agreement with Valid Arbitration Clause', 'Notice Invoking Arbitration (Sec 21)', 'Certified Running Account Bills', 'Bank Guarantee Records'],
      icon: Building2,
      color: 'text-blue-500',
    },
    {
      id: 'order-21-cpc',
      code: 'INST-06',
      title: 'Order XXI CPC Decree Execution & Garnishee',
      forum: 'Civil Execution Court',
      category: 'Decree Enforcement & Recovery Realization',
      statute: 'Order XXI Rules 43, 46 & 54 CPC',
      speed: 'Direct Enforcement via Court Bailiffs',
      leverage: 'Freezes Debtor Bank Accounts & Attaches Receivables',
      powerBadge: 'Account Garnishee Orders',
      courtPowers: 'Execution Court issues Garnishee orders against debtor bank accounts, directing clearing banks to transfer seized funds directly to the decree holder.',
      interestRate: 'Full Realization of Award Amount + Accrued Post-Decree Interest',
      limitation: 'Executable within 12 years of final decree or arbitral award',
      exhibits: ['Certified Copy of Court Decree / Arbitral Award', 'Debtor Bank Account Details & Branch IFSC', 'Schedule of Movable / Immovable Properties', 'Execution Petition (Form 6)'],
      icon: ShieldCheck,
      color: 'text-amber-500',
    },
  ];

  const current = remedies.find((r) => r.id === activeRemedy) || remedies[0];
  const CurrentIcon = current.icon;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-slate-50/50 dark:from-[#060D17] dark:via-[#071326] dark:to-[#0A1528] border-b border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

        {/* SECTION HEADER: DISTINCTIVE & AUTHORITATIVE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[11px] font-bold uppercase tracking-wider text-[#E05320]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>JUDICIAL ENFORCEMENT COCKPIT</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Statutory Jurisdiction Engine.{' '}
              <span className="italic font-serif text-[#E05320] block sm:inline">
                Real Legal Teeth.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              Select any statutory instrument below to inspect its judicial forum, court enforcement powers, interest compounding provisions, and mandatory evidentiary exhibits.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>6 STATUTORY VEHICLES ACTIVE</span>
          </div>
        </div>

        {/* SPLIT INTERACTIVE COCKPIT DOSSIER (COMPLETELY NEW & UNIQUE UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT COLUMN: 6 Sleek Interactive Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold px-1">
              Select Statutory Vehicle:
            </div>

            <div className="space-y-2">
              {remedies.map((rem) => {
                const Icon = rem.icon;
                const isSelected = activeRemedy === rem.id;

                return (
                  <button
                    key={rem.id}
                    type="button"
                    onClick={() => setActiveRemedy(rem.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between border relative overflow-hidden ${
                      isSelected
                        ? 'bg-white dark:bg-[#0A1528] border-[#E05320] shadow-lg shadow-orange-500/10 dark:shadow-none'
                        : 'bg-white/60 dark:bg-[#071326]/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-[#0A1528]/80'
                    }`}
                  >
                    {/* Active Left Indicator Bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E05320]" />
                    )}

                    <div className="flex items-center gap-3 pl-1">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#E05320]/10 text-[#E05320] border-[#E05320]/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            {rem.code}
                          </span>
                          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            {rem.category}
                          </span>
                        </div>
                        <h4 className={`text-xs sm:text-sm font-serif font-bold ${
                          isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {rem.title}
                        </h4>
                      </div>
                    </div>

                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#E05320] translate-x-0.5' : 'text-slate-400 opacity-60'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: The Statutory Enforcement Dossier (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
              
              {/* Top Subtle Amber Background Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/5 blur-3xl pointer-events-none" />

              {/* DOSSIER HEADER */}
              <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-5 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#E05320]" />
                    <span className="text-[11px] font-mono font-bold text-[#E05320] uppercase tracking-wider">
                      {current.code} • ENFORCEMENT DOSSIER
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-orange-500/10 text-[#E05320] border border-orange-500/20">
                    {current.powerBadge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
                    {current.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {current.statute}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Judicial Forum:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right font-serif">{current.forum}</span>
                </div>
              </div>

              {/* STATUTORY POWERS & SPEED GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                
                {/* COURT ARSENAL */}
                <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E05320] font-mono">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Court Enforcement Powers</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                    {current.courtPowers}
                  </p>
                </div>

                {/* INTEREST & PENALTY */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    <Coins className="h-3.5 w-3.5" />
                    <span>Interest &amp; Penal Accruals</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                    {current.interestRate}
                  </p>
                </div>

              </div>

              {/* TIMELINE & LIMITATION */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono relative z-10">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Clock className="h-3.5 w-3.5 text-[#E05320]" />
                  <span>{current.speed}</span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {current.limitation}
                </span>
              </div>

              {/* MANDATORY EVIDENCE EXHIBITS */}
              <div className="space-y-2.5 relative z-10">
                <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileCheck2 className="h-4 w-4 text-emerald-500" />
                  <span>Mandatory Evidentiary Exhibits Required for Filing:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.exhibits.map((ex, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="leading-tight">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOSSIER ACTION BUTTON */}
              <div className="pt-2 relative z-10">
                <button
                  type="button"
                  onClick={onOpenClaim}
                  className="w-full inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#E05320] hover:bg-[#C84518] px-6 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#E05320]/25 hover:shadow-xl transition-all cursor-pointer transform active:scale-95"
                >
                  <span>Deploy {current.title} Protocol</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM COMPACT REASSURANCE STRIP */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>High Court Empanelled Advocates Governance</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
            <span>Sec 65B Electronic Records Certification</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-orange-500" />
            <span>100% Attorney-Client Confidential Privilege</span>
          </div>
        </div>

      </div>
    </section>
  );
}
