'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  Building2,
  FileCheck2,
  Gavel,
  Landmark,
  BadgeAlert,
  Coins,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function CaseTypesGrid() {
  const [activeDomain, setActiveDomain] = useState('all');

  const domainFilters = [
    { id: 'all', label: 'All Practice Domains' },
    { id: 'trade', label: 'B2B & Supply Chain' },
    { id: 'statutory', label: 'Banking & Cheque Instruments' },
    { id: 'corporate', label: 'Corporate & Insolvency' },
    { id: 'contracts', label: 'Contracts & Infrastructure' },
  ];

  const practiceDomains = [
    {
      id: 'b2b-trade-dues',
      domain: 'trade',
      code: 'JUR-01',
      title: 'Commercial Trade Credit & B2B Invoices',
      tagline: 'Liquidated Debt Realization for Manufacturers, Wholesalers & Distributors',
      desc: 'Enforcing payment for accepted goods, delivered consignments, and reconciled GST ledgers where commercial buyers breach credit covenants.',
      statutoryAnchor: 'Order XXXVII CPC & Commercial Courts Act 2015',
      statutoryBadge: 'Summary Suit Procedure',
      accentColor: 'border-orange-500/30 text-[#E05320] bg-orange-500/10',
      timeline: '30-45 Days Pre-Litigation',
      metrics: '18% Commercial Interest',
      keyHighlights: ['GST E-Way Bill Reconciliation', 'Proof of Delivery (POD) Audit', 'Pre-Institution Commercial Mediation'],
      href: '/services/b2b-trade-dues',
      icon: FileCheck2,
    },
    {
      id: 'msme-payment-delays',
      domain: 'trade',
      code: 'JUR-02',
      title: 'MSME Statutory Interest & Delayed Dues',
      tagline: 'Facilitation Council Escalation under MSMED Act 2006',
      desc: 'Mandatory statutory enforcement for registered Micro & Small enterprises against corporate buyers defaulting beyond the 45-day statutory window.',
      statutoryAnchor: 'MSMED Act Section 16 (3x RBI Bank Rate Compound Interest)',
      statutoryBadge: '3x RBI Compound Interest',
      accentColor: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
      timeline: 'Mandatory 45-Day Cap',
      metrics: '75% Court Pre-Deposit Mandatory',
      keyHighlights: ['Udyam Registration Linked', 'Compound Monthly Rests', 'MSEFC Samadhaan Reference'],
      href: '/services/msme-payment-delays',
      icon: Coins,
    },
    {
      id: 'cheque-bounce-matters',
      domain: 'statutory',
      code: 'JUR-03',
      title: 'Banking Instrument & Cheque Dishonour',
      tagline: 'Magistrate Court Prosecution & Fast-Track Recovery',
      desc: 'Criminal-cum-civil prosecution under Section 138 of the Negotiable Instruments Act for bounced business cheques, stopped payments, and failed NACH mandates.',
      statutoryAnchor: 'Section 138 / 143A Negotiable Instruments Act 1881',
      statutoryBadge: '20% Interim Payout Order',
      accentColor: 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10',
      timeline: 'Strict 30-Day Notice Window',
      metrics: 'Up to 2x Cheque Penalty',
      keyHighlights: ['15-Day Statutory Demand Notice', 'Bank Memo Forensic Verification', 'Section 143A Interim Compensation'],
      href: '/services/cheque-bounce-matters',
      icon: BadgeAlert,
    },
    {
      id: 'corporate-institutional-dues',
      domain: 'corporate',
      code: 'JUR-04',
      title: 'Corporate Insolvency & Operational Debt',
      tagline: 'Section 8 & 9 Escalation before NCLT Benches',
      desc: 'Initiating statutory insolvency demand notices and CIRP admission petitions against defaulting corporate entities for trade liabilities exceeding ₹1 Crore.',
      statutoryAnchor: 'Insolvency & Bankruptcy Code 2016 (IBC Sec 8 & 9)',
      statutoryBadge: 'NCLT CIRP Escalation',
      accentColor: 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10',
      timeline: '10-Day Statutory Demand',
      metrics: 'Threshold > ₹1 Crore',
      keyHighlights: ['Form 3 / 4 Demand Notice', 'Zero Pre-Existing Dispute Audit', 'Company Board Compromise Track'],
      href: '/services/corporate-institutional-dues',
      icon: Landmark,
    },
    {
      id: 'consultancy-fee-recovery',
      domain: 'contracts',
      code: 'JUR-05',
      title: 'Professional Advisory & Retainer Realization',
      tagline: 'Recovery of Agency Receivables, SaaS Licenses & Consulting Fees',
      desc: 'Enforcing payment for completed professional mandates, IT services, digital deliverables, and advisory retainers where clients raise arbitrary scope excuses.',
      statutoryAnchor: 'Indian Contract Act 1872 & Commercial Mediation',
      statutoryBadge: 'Contractual Quantum Meruit',
      accentColor: 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10',
      timeline: 'Milestone-Linked Recovery',
      metrics: 'Sec 65B Electronic Proof',
      keyHighlights: ['Email & Deliverable Sign-off Audit', 'Breach of Covenant Notice', 'Commercial Summary Suit'],
      href: '/services/consultancy-fee-recovery',
      icon: Briefcase,
    },
    {
      id: 'contractor-subcontractor-dues',
      domain: 'contracts',
      code: 'JUR-06',
      title: 'Infrastructure & EPC Subcontractor Claims',
      tagline: 'Recovery of Certified Running Bills & Withheld Retention Monies',
      desc: 'Enforcing certified RA bills, Defect Liability Period (DLP) retention release, and arbitration proceedings for construction and EPC project vendors.',
      statutoryAnchor: 'Arbitration & Conciliation Act 1996 / Section 9 Injunctions',
      statutoryBadge: 'Arbitral Enforcement',
      accentColor: 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10',
      timeline: 'Post-DLP Immediate Realization',
      metrics: 'Bank Guarantee Protection',
      keyHighlights: ['Joint Measurement Verification', 'Bank Guarantee Stay Petitions', 'Fast-Track Arbitral Tribunal'],
      href: '/services/contractor-subcontractor-dues',
      icon: Building2,
    },
    {
      id: 'rent-lease-recovery',
      domain: 'corporate',
      code: 'JUR-07',
      title: 'Commercial Tenancy, Lease Arrears & Eviction',
      tagline: 'Recovery of Commercial Warehouse, Office & Retail Arrears',
      desc: 'Recovery of defaulted commercial rent, warehouse lease arrears, and execution of vacant possession against defaulting corporate tenants.',
      statutoryAnchor: 'Transfer of Property Act 1882 (Section 106 Notice)',
      statutoryBadge: 'Mesne Profits & Eviction',
      accentColor: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10',
      timeline: '15-Day Determination Notice',
      metrics: 'Asset Attachment Warrants',
      keyHighlights: ['Commercial Lease Deed Audit', 'Mesne Profits Calculation', 'Civil Court Execution Decree'],
      href: '/services/rent-lease-recovery',
      icon: Layers,
    },
    {
      id: 'commercial-advances',
      domain: 'trade',
      code: 'JUR-08',
      title: 'Commercial Advances & Business Debts',
      tagline: 'Recovery of Unreturned Supplier Advances & Inter-Corporate Deposits',
      desc: 'Recovering unreturned trade advances where vendors fail to supply goods, and enforcing promissory notes for defaulted commercial business loans.',
      statutoryAnchor: 'Order XXXVII CPC (Summary Suit on Commercial Debts)',
      statutoryBadge: 'Summary Recovery Decree',
      accentColor: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
      timeline: 'Direct Court Summary Suit',
      metrics: 'Conditional Attachment u/O 38',
      keyHighlights: ['Banking UTR Trail Verification', 'Order 38 Rule 5 Attachment', 'Account Garnishee Orders'],
      href: '/services/commercial-advances',
      icon: TrendingUp,
    },
    {
      id: 'disputed-part-acknowledged',
      domain: 'contracts',
      code: 'JUR-09',
      title: 'Disputed Claims & Debit Note Rebuttals',
      tagline: 'Strategic Realization for Contested or Part-Admitted Invoices',
      desc: 'Neutralizing frivolous quality claims and unilateral debit notes to secure immediate decree for the admitted debt while conciliating the balance.',
      statutoryAnchor: 'Order XII Rule 6 CPC (Decree on Admissions) & Mediation',
      statutoryBadge: 'Decree on Admissions',
      accentColor: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10',
      timeline: 'Immediate Admitted Payout',
      metrics: 'Doctrine of Estoppel',
      keyHighlights: ['Admitted vs Disputed Dissection', 'Order 12 Rule 6 Motion', 'Binding Escrow Conciliation'],
      href: '/services/disputed-part-acknowledged',
      icon: Scale,
    },
  ];

  const filteredDomains = activeDomain === 'all'
    ? practiceDomains
    : practiceDomains.filter((d) => d.domain === activeDomain);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#060D17] border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-64 bg-gradient-to-b from-orange-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">

        {/* HEADER */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05320]/10 border border-[#E05320]/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#E05320]">
            <Scale className="h-3.5 w-3.5" />
            <span>STATUTORY ENFORCEMENT DOMAINS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Tailored Legal Protocols For{' '}
            <span className="italic font-serif text-[#E05320]">
              Every Commercial Delinquency.
            </span>
          </h2>

          <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Commercial claims require distinct statutory mechanics. IndoLex aligns each debt portfolio with its applicable Indian statutory code — deploying fast-track Summary Suits, MSMED Facilitation Councils, or criminal NI Act dockets.
          </p>
        </div>

        {/* SEGMENTED FILTER BAR: single scrollable row on mobile, with live counts */}
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex sm:flex sm:flex-wrap items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#0A1528] border border-slate-200 dark:border-slate-800 shadow-sm w-max sm:w-fit max-w-none">
            {domainFilters.map((f) => {
              const count = f.id === 'all'
                ? practiceDomains.length
                : practiceDomains.filter((d) => d.domain === f.id).length;
              const active = activeDomain === f.id;

              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveDomain(f.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 ${
                    active
                      ? 'bg-[#E05320] text-white shadow-md shadow-[#E05320]/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-[#E05320]'
                  }`}
                >
                  {f.label}
                  <span
                    className={`px-1.5 rounded-md text-[10px] font-mono ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COMPACT DASHBOARD TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredDomains.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
              >
                {/* left accent rail */}
                <div className="absolute left-0 inset-y-0 w-[3px] bg-slate-200 dark:bg-slate-800 group-hover:bg-[#E05320] transition-colors" />

                <div className="flex-1 p-4 pl-5 space-y-2.5">
                  {/* top row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800/80 group-hover:bg-orange-500/10 text-slate-700 dark:text-slate-200 group-hover:text-[#E05320] transition-colors flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                        {item.code}
                      </span>
                    </div>
                    <span className={`shrink-0 max-w-[60%] truncate text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.accentColor}`}>
                      {item.statutoryBadge}
                    </span>
                  </div>

                  {/* title + tagline */}
                  <div className="space-y-0.5">
                    <h3 className="text-[15px] sm:text-base font-serif font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#E05320] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#E05320] leading-snug line-clamp-2">
                      {item.tagline}
                    </p>
                  </div>

                  {/* description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light line-clamp-3">
                    {item.desc}
                  </p>

                  {/* highlights */}
                  <ul className="space-y-1 pt-0.5">
                    {item.keyHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                        <CheckCircle2 className="h-3 w-3 mt-px shrink-0 text-emerald-500" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* stat strip */}
                <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                  <div className="px-4 pl-5 py-2 min-w-0">
                    <div className="flex items-center gap-1 text-[9px] font-mono uppercase text-slate-400 dark:text-slate-500">
                      <Clock className="h-3 w-3 text-[#E05320]" />
                      Timeline
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight mt-0.5">
                      {item.timeline}
                    </div>
                  </div>
                  <div className="px-3 py-2 min-w-0">
                    <div className="text-[9px] font-mono uppercase text-slate-400 dark:text-slate-500">
                      Key metric
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight mt-0.5">
                      {item.metrics}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between px-4 pl-5 py-2.5 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-[#E05320] group-hover:text-[#C84518]">
                  <span>Explore Legal Architecture</span>
                  <div className="h-6 w-6 rounded-full bg-orange-500/10 group-hover:bg-[#E05320] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}