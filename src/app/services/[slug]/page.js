import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Scale,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Gavel,
  Clock,
  Sparkles,
  FileCheck2,
  Zap,
  ShieldAlert,
  FileText,
} from 'lucide-react';

import ServiceSubpageClient, { SubpageBottomTrigger } from '@/components/services/ServiceSubpageClient';
import SubpageHeroVisual from '@/components/services/SubpageHeroVisual';
import Reveal from '@/components/services/Reveal';

/* ---- UI-only helpers (no hooks, safe in a server component) ---- */
function SectionHead({ icon: Icon, label, title, desc, tone }) {
  return (
    <div className="max-w-3xl space-y-2">
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${tone}`}>
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
        {title}
      </h2>
      {desc && (
        <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

const cardBase =
  'group relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/40';

const SERVICES_DATA = {
  'b2b-trade-dues': {
    num: '01',
    code: 'JUR-01',
    heroImage: '/images/services/domains/b2b-trade-dues.webp',
    title: 'Commercial Trade Credit & B2B Invoices',
    subtitle: 'Liquidated Debt Realization for Manufacturers, Wholesalers & Commercial Suppliers',
    badge: 'B2B Trade Receivables',
    summary: 'When commercial buyers accept goods and GST tax invoices but evade payment beyond agreed credit terms, IndoLex activates multi-track statutory recovery — moving from forensic ledger reconciliation to Summary Suits under Order XXXVII CPC.',
    metrics: [
      { label: 'Statutory SLA', value: '45-60 Days' },
      { label: 'Commercial Interest', value: 'Up to 18% p.a.' },
      { label: 'Court Route', value: 'Order 37 CPC' },
    ],
    stallingTactics: [
      {
        tactic: 'Debtor repeatedly promises payment "next week" to exhaust limitation',
        counter: 'Immediate 15-day formal advocate statutory demand notice fixing liability and running commercial interest.'
      },
      {
        tactic: 'Unilateral debit notes or quality objections raised months after delivery',
        counter: 'Invoking Doctrine of Estoppel under Sale of Goods Act citing verified GST-2B filing and signed POD challans.'
      },
      {
        tactic: 'Goods accepted and sold downstream while vendor payment is withheld',
        counter: 'Summary suit filing where defendant must obtain leave to defend by establishing bona fide merits.'
      },
      {
        tactic: 'Debtor ignoring emails and calls after credit period expiry',
        counter: 'Serving registered speed post notice with tracking receipts establishing formal pre-litigation trail.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Purchase Orders & Supply Agreements', desc: 'Signed POs, contracts, or email purchase confirmations establishing agreed commercial terms.', status: 'Essential' },
      { title: 'GST Tax Invoices & E-Way Bills', desc: 'Valid tax invoices showing GSTIN and transporter e-way bills verifying consignment movement.', status: 'Mandatory' },
      { title: 'Delivery Challans (Proof of Delivery)', desc: 'Stamped or signed consignee delivery receipts (POD) confirming physical receipt of goods.', status: 'Critical' },
      { title: 'Reconciled Ledger & Balance Confirmation', desc: 'Bank statement and mutual ledger accounts reflecting unpaid outstanding balances.', status: 'Essential' },
    ],
    statutoryRemedies: [
      {
        statute: 'Order XXXVII CPC (Summary Suit)',
        forum: 'Designated Commercial Court',
        desc: 'Fast-track judicial decree where debtor has no automatic right to defend, compelling early compromise or summary judgment.',
        badge: 'Fast-Track Decree'
      },
      {
        statute: 'Commercial Courts Act 2015',
        forum: 'Commercial Division',
        desc: 'Specialized adjudication with strict procedural compliance, zero frivolous adjournments, and pre-institution mediation.',
        badge: 'Specialized Benches'
      },
      {
        statute: 'Section 34 CPC (Commercial Interest)',
        forum: 'Civil Execution Court',
        desc: 'Claiming commercial interest up to 18% per annum from invoice due date until final realization of decree.',
        badge: '18% Accrued Interest'
      }
    ],
    phases: [
      { phase: '01', title: 'Forensic Audit & Reconciliation', desc: 'Auditing invoices, GST-2B filings, transporter lorry receipts, and electronic trail.' },
      { phase: '02', title: 'Advocate Legal Notice', desc: '15-day statutory demand served via Registered Speed Post & electronic transmission.' },
      { phase: '03', title: 'Bilateral Conciliation', desc: 'Structured settlement drafting with binding installment guarantees or escrow terms.' },
      { phase: '04', title: 'Commercial Court Decree', desc: 'Filing Order 37 summary suit followed by warrant of attachment on debtor bank accounts.' }
    ]
  },

  'msme-payment-delays': {
    num: '02',
    code: 'JUR-02',
    heroImage: '/images/services/domains/msme-payment-delays.webp',
    title: 'MSME Statutory Interest & Delayed Dues',
    subtitle: 'Statutory Recovery under MSMED Act 2006 with 3x RBI Bank Rate Compounded Interest',
    badge: 'MSMED Act Sec 16 & 18',
    summary: 'Micro and Small enterprises are legally protected by mandatory statutory provisions requiring buyers to clear invoices within 45 days. Delayed payments automatically attract compound interest at three times the RBI bank rate with monthly rests.',
    metrics: [
      { label: 'Payment Deadline', value: 'Strict 45 Days' },
      { label: 'Interest Multiplier', value: '3x RBI Rate' },
      { label: 'Appeal Shield', value: '75% Pre-Deposit' },
    ],
    stallingTactics: [
      {
        tactic: 'Corporate buyer stipulating 90-180 days credit in vendor registration contracts',
        counter: 'Section 15 MSMED Act strictly caps credit at 45 days, completely overriding contrary contractual clauses.'
      },
      {
        tactic: 'Buyer refusing to pay interest on overdue payments citing company policy',
        counter: 'Section 16 MSMED Act creates a non-negotiable statutory liability: compound interest with monthly rests is mandatory.'
      },
      {
        tactic: 'Buyer filing lengthy appeals to delay payment after adverse order',
        counter: 'Section 19 mandates that debtor must deposit 75% of the decreed amount in court before any appeal is heard.'
      },
      {
        tactic: 'Corporate debtor ignoring Samadhaan notice thinking it is non-binding',
        counter: 'MSEFC awards have the exact legal force of an Arbitral Tribunal Award executable as a civil court decree.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Udyam Registration Certificate', desc: 'Valid Udyam certificate showing micro or small enterprise status prior to supply date.', status: 'Mandatory' },
      { title: 'GST Invoices citing Udyam Number', desc: 'Tax invoices explicitly referencing MSME Udyam registration credentials.', status: 'Essential' },
      { title: 'Work Completion / Delivery Challan', desc: 'Proof of acceptance of goods or service delivery sign-off by buyer.', status: 'Critical' },
      { title: 'MSME Samadhaan Interest Schedule', desc: 'Dynamic interest calculation compounded monthly at 3x RBI Bank Rate (~19.5% p.a.).', status: 'Essential' },
    ],
    statutoryRemedies: [
      {
        statute: 'Section 15 MSMED Act',
        forum: 'Statutory Mandate',
        desc: 'Buyer must make payment on or before agreed date, which cannot legally exceed 45 days from delivery.',
        badge: 'Mandatory 45 Days'
      },
      {
        statute: 'Section 16 MSMED Act',
        forum: 'Statutory Interest',
        desc: 'Compound interest with monthly rests at 3 times the RBI Bank Rate (currently ~19.5% per annum).',
        badge: '3x RBI Compound'
      },
      {
        statute: 'Section 19 MSMED Act',
        forum: 'Appellate Shield',
        desc: 'Buyer cannot obtain a stay or appeal without first depositing 75% of the award amount into court custody.',
        badge: '75% Court Deposit'
      }
    ],
    phases: [
      { phase: '01', title: 'Udyam Eligibility Audit', desc: 'Validating supplier registration dates against tax invoice dates and credit windows.' },
      { phase: '02', title: 'Statutory Demand Notice', desc: 'Serving formal legal notice demanding principal plus compounded Section 16 interest.' },
      { phase: '03', title: 'MSEFC Reference Filing', desc: 'Filing statutory claim petition on the MSME Samadhaan portal and Facilitation Council.' },
      { phase: '04', title: 'Award & Execution', desc: 'Enforcing the arbitral award as a Civil Court decree through warrants of attachment.' }
    ]
  },

  'cheque-bounce-matters': {
    num: '03',
    code: 'JUR-03',
    heroImage: '/images/services/domains/cheque-bounce-matters.webp',
    title: 'Banking Instrument & Cheque Dishonour',
    subtitle: 'Criminal Prosecution & Fast-Track Recovery under Section 138 Negotiable Instruments Act',
    badge: 'Section 138 NI Act',
    summary: 'When a bank cheque or NACH mandate is dishonoured for insufficient funds or stopped payment, Indian law empowers the creditor to initiate criminal prosecution with court powers to award 20% interim compensation under Section 143A.',
    metrics: [
      { label: 'Notice Window', value: 'Strict 30 Days' },
      { label: 'Interim Compensation', value: '20% u/s 143A' },
      { label: 'Penal Liability', value: 'Up to 2x Amount' },
    ],
    stallingTactics: [
      {
        tactic: 'Drawer offers replacement cheques repeatedly to waste the strict 30-day statutory notice limitation',
        counter: 'Immediately issuing statutory 15-day demand notice within 30 days of first bank return memo.'
      },
      {
        tactic: 'Drawer marks "Payment Stopped by Drawer" claiming goods were defective',
        counter: 'Supreme Court jurisprudence holds that stop-payment instructions attract full criminal liability under Section 138.'
      },
      {
        tactic: 'Drawer changes registered address to evade court summons and warrants',
        counter: 'Serving notices at MCA registered office, personal addresses, and email with postal delivery certificates.'
      },
      {
        tactic: 'Prolonging trial by seeking repeated adjournments before Magistrate',
        counter: 'Filing Section 143A motion compelling drawer to deposit 20% of cheque amount as interim compensation.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Original Dishonoured Cheque', desc: 'Original physical cheque leaf with signature of drawer.', status: 'Mandatory' },
      { title: 'Bank Return Memo (Clearing Advice)', desc: 'Official bank slip citing "Funds Insufficient" or "Payment Stopped".', status: 'Critical' },
      { title: 'Underlying Commercial Invoices / Contracts', desc: 'Documents proving legally enforceable debt or liability for which cheque was drawn.', status: 'Essential' },
      { title: 'Speed Post Tracking & Delivery Receipt', desc: 'Postal certificate proving service of 15-day statutory demand notice on drawer.', status: 'Mandatory' },
    ],
    statutoryRemedies: [
      {
        statute: 'Section 138 NI Act (Penal Conviction)',
        forum: 'Metropolitan Magistrate Court',
        desc: 'Criminal offense punishable with imprisonment up to 2 years and monetary fine up to twice the cheque face value.',
        badge: 'Criminal Liability'
      },
      {
        statute: 'Section 143A NI Act (Interim Deposit)',
        forum: 'Trial Magistrate Court',
        desc: 'Court order directing drawer to deposit 20% of the cheque amount to the complainant pending final trial.',
        badge: '20% Interim Payout'
      },
      {
        statute: 'Section 148 NI Act (Appellate Deposit)',
        forum: 'Sessions Court / High Court',
        desc: 'Appellate court must mandate a minimum 20% deposit of fine/compensation before staying any conviction.',
        badge: 'Appellate Shield'
      }
    ],
    phases: [
      { phase: '01', title: 'Bank Memo Scrutiny', desc: 'Auditing 30-day limitation window from bank return memo receipt date.' },
      { phase: '02', title: '15-Day Statutory Notice', desc: 'Serving formal advocate demand notice via Speed Post and electronic transmission.' },
      { phase: '03', title: 'Complaint Filing', desc: 'Filing criminal complaint under Section 138 before Judicial Magistrate within 30 days.' },
      { phase: '04', title: 'Summons & 143A Motion', desc: 'Securing court summons and moving Section 143A application for 20% interim deposit.' }
    ]
  },

  'corporate-institutional-dues': {
    num: '04',
    code: 'JUR-04',
    heroImage: '/images/services/domains/corporate-institutional-dues.webp',
    title: 'Corporate Insolvency & Operational Debt',
    subtitle: 'Section 8 & 9 Escalation before NCLT Benches for Defaults Above ₹1 Crore',
    badge: 'IBC 2016 Insolvency',
    summary: 'For substantial commercial defaults exceeding ₹1 Crore due from corporate entities, the Insolvency and Bankruptcy Code (IBC 2016) provides an expedited statutory mechanism through Section 8 Demand Notices and Section 9 CIRP petitions before NCLT benches.',
    metrics: [
      { label: 'Debt Threshold', value: '> ₹1 Crore' },
      { label: 'Demand Window', value: 'Strict 10 Days' },
      { label: 'Forum', value: 'NCLT Benches' },
    ],
    stallingTactics: [
      {
        tactic: 'Corporate debtor claims internal audit delay while siphoning funds to group companies',
        counter: 'Serving statutory Section 8 Demand Notice triggering strict 10-day payment countdown.'
      },
      {
        tactic: 'Fabricating belated disputes after receiving statutory demand notice',
        counter: 'Supreme Court Mobilox doctrine: Only pre-existing bona fide disputes raised BEFORE the demand notice are maintainable.'
      },
      {
        tactic: 'Corporate management ignoring civil suits knowing trial takes years',
        counter: 'NCLT admission threatens complete suspension of Board of Directors and company takeover by IRP.'
      },
      {
        tactic: 'Company offering token installments without contractual security',
        counter: 'Executing court-recorded compromise terms before NCLT with strict default revocation clauses.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Invoices Exceeding ₹1 Crore', desc: 'Tax invoices and debit notes establishing liquidated debt meeting statutory IBC threshold.', status: 'Mandatory' },
      { title: 'Bank Statement / Banker Certificate', desc: 'Bank statement proving non-payment of invoices by corporate debtor.', status: 'Critical' },
      { title: 'Form 3 / Form 4 Demand Notice', desc: 'Statutory 10-day demand notice under Section 8 served at MCA registered office.', status: 'Essential' },
      { title: 'Postal & Electronic Delivery Proof', desc: 'Proof showing delivery of demand notice to directors and registered office.', status: 'Mandatory' },
    ],
    statutoryRemedies: [
      {
        statute: 'Section 8 IBC (Statutory Demand)',
        forum: 'Corporate Intimation',
        desc: '10-day statutory notice requiring corporate debtor to either pay unpaid debt or prove pre-existing dispute.',
        badge: '10-Day Demand'
      },
      {
        statute: 'Section 9 IBC (CIRP Admission)',
        forum: 'NCLT Benches',
        desc: 'Petition before National Company Law Tribunal for initiation of Corporate Insolvency Resolution Process.',
        badge: 'NCLT CIRP'
      },
      {
        statute: 'Mobilox / Kirusa Precedent',
        forum: 'Supreme Court Doctrine',
        desc: 'Bona fide debt without pre-existing dispute leads to admission, compelling immediate board settlement.',
        badge: 'Board Takeover'
      }
    ],
    phases: [
      { phase: '01', title: 'Threshold & Dispute Audit', desc: 'Verifying default exceeds ₹1 Crore with zero pre-existing dispute on record.' },
      { phase: '02', title: 'Section 8 Form 3 Notice', desc: 'Serving 10-day statutory demand to corporate debtor registered office.' },
      { phase: '03', title: 'Section 9 NCLT Filing', desc: 'Filing insolvency petition before the designated NCLT bench with affidavit of service.' },
      { phase: '04', title: 'Pre-Admission Settlement', desc: 'Executing formal court-recorded One-Time Settlement deed prior to CIRP admission.' }
    ]
  },

  'consultancy-fee-recovery': {
    num: '05',
    code: 'JUR-05',
    heroImage: '/images/services/domains/consultancy-fee-recovery.webp',
    title: 'Professional Advisory & Retainer Realization',
    subtitle: 'Enforcing Agency Receivables, SaaS Licenses, Advisory Retainers & Consulting Fees',
    badge: 'Professional Receivables',
    summary: 'Consulting firms, technology agencies, SaaS providers, and advisory firms frequently face unpaid milestone retainers. We enforce payment using contractual covenants, electronic deliverable approvals, and commercial lawsuits.',
    metrics: [
      { label: 'Statutory Vehicle', value: 'Order 37 CPC' },
      { label: 'Electronic Proof', value: 'Sec 65B Certified' },
      { label: 'Legal Basis', value: 'Quantum Meruit' },
    ],
    stallingTactics: [
      {
        tactic: 'Client accepts deliverables and uses work but withholds final payment',
        counter: 'Establishing contractual acceptance under Section 70 Indian Contract Act (Quantum Meruit obligation).'
      },
      {
        tactic: 'Raising arbitrary scope disputes months after deliverable handover',
        counter: 'Compiling email sign-offs, timestamped commits, and milestone approvals under Sec 65B Evidence Act.'
      },
      {
        tactic: 'Client terminating contract unilaterally to avoid milestone payout',
        counter: 'Claiming full contract value, accrued interest, and damages for wrongful contractual termination.'
      },
      {
        tactic: 'Debtor claiming verbal variations to avoid agreed invoice amounts',
        counter: 'Enforcing parol evidence rule: Written contracts and approved emails override uncorroborated verbal claims.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Master Services Agreement (MSA) / SOW', desc: 'Signed contracts, proposals, or Statements of Work detailing payment milestones.', status: 'Mandatory' },
      { title: 'Electronic Sign-offs & Email Approvals', desc: 'Email correspondence acknowledging receipt and satisfaction with deliverables.', status: 'Critical' },
      { title: 'Professional Fee Invoices', desc: 'Original fee invoices, GST challans, and timesheets showing work performance.', status: 'Essential' },
      { title: 'Sec 65B Electronic Certificate', desc: 'Statutory electronic evidence certificate for digital communications and deliverables.', status: 'Mandatory' },
    ],
    statutoryRemedies: [
      {
        statute: 'Indian Contract Act 1872',
        forum: 'Commercial Court',
        desc: 'Action for damages, unpaid contractual dues, and quantum meruit compensation for work completed.',
        badge: 'Quantum Meruit'
      },
      {
        statute: 'Commercial Summary Suit (Order 37)',
        forum: 'Designated Commercial Court',
        desc: 'Expedited summary decree where fee liability is established under written contract or email acknowledgments.',
        badge: 'Summary Decree'
      },
      {
        statute: 'Pre-Institution Mediation',
        forum: 'Legal Services Authority',
        desc: 'Mandatory fast-track confidential mediation under Commercial Courts Act 2015 to settle disputes quickly.',
        badge: 'Mediation Settlement'
      }
    ],
    phases: [
      { phase: '01', title: 'Electronic Evidence Audit', desc: 'Collating email approvals, deliverables, and certifying under Sec 65B Evidence Act.' },
      { phase: '02', title: 'Breach of Covenant Notice', desc: 'Serving formal advocate demand citing breach of contract, interest, and legal consequences.' },
      { phase: '03', title: 'Commercial Mediation', desc: 'Structured conciliation to execute binding settlement or structured milestone payouts.' },
      { phase: '04', title: 'Commercial Suit Filing', desc: 'Filing summary lawsuit before the Commercial Court for decree and asset attachment.' }
    ]
  },

  'contractor-subcontractor-dues': {
    num: '06',
    code: 'JUR-06',
    heroImage: '/images/services/domains/contractor-subcontractor-dues.webp',
    title: 'Infrastructure & EPC Subcontractor Claims',
    subtitle: 'Enforcing Certified Running Bills, Retention Monies & Arbitral Project Claims',
    badge: 'EPC & Infrastructure Claims',
    summary: 'Infrastructure and construction subcontractors regularly suffer from withheld retention monies and arbitrary deductions on certified running account (RA) bills. IndoLex provides aggressive statutory escalation and arbitration management.',
    metrics: [
      { label: 'Legal Basis', value: 'Certified RA Bills' },
      { label: 'Arbitral Forum', value: 'Fast-Track Tribunal' },
      { label: 'Interim Protection', value: 'Sec 9 Injunction' },
    ],
    stallingTactics: [
      {
        tactic: 'Certified running bills unpaid citing delayed payments from the project owner/client',
        counter: 'Pay-if-paid clauses are heavily restricted: Principal contractor remains strictly liable for certified work.'
      },
      {
        tactic: 'Retention money withheld long after Defect Liability Period (DLP) expiration',
        counter: 'Serving formal demand with DLP completion certificates demanding immediate release plus commercial interest.'
      },
      {
        tactic: 'Threatening to invoke performance bank guarantees to force fee waivers',
        counter: 'Filing Section 9 petitions before High Court commercial division for urgent interim injunction against PBG encashment.'
      },
      {
        tactic: 'Levying arbitrary back-charges and liquidated damages without contractual basis',
        counter: 'Invoking dispute resolution clause, appointment of arbitrator, and claim for full certified sums.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Subcontract Agreement & GCC/SCC', desc: 'Executed contract agreement, scope of work, and agreed payment terms.', status: 'Mandatory' },
      { title: 'Certified Running Account (RA) Bills', desc: 'Joint measurement sheets and engineer-certified RA bills.', status: 'Critical' },
      { title: 'Completion & DLP Expiration Certificate', desc: 'Handover sign-off and Defect Liability Period expiration documentation.', status: 'Essential' },
      { title: 'Bank Guarantee Covenants & Letters', desc: 'Records of performance bank guarantees and correspondence regarding validity.', status: 'Critical' },
    ],
    statutoryRemedies: [
      {
        statute: 'Arbitration & Conciliation Act 1996',
        forum: 'Arbitral Tribunal',
        desc: 'Speedy dispute adjudication before an independent arbitrator under fast-track procedure.',
        badge: 'Arbitral Decree'
      },
      {
        statute: 'Section 9 Interim Injunctions',
        forum: 'High Court Commercial Bench',
        desc: 'Urgent court orders restraining fraudulent bank guarantee encashment or alienation of machinery.',
        badge: 'PBG Injunction'
      },
      {
        statute: 'MSMED Act Sec 18 (For MSME Contractors)',
        forum: 'MSEFC Facilitation Council',
        desc: 'MSME registered contractors can override arbitration clauses and claim 3x RBI interest before MSEFC.',
        badge: 'MSME Override'
      }
    ],
    phases: [
      { phase: '01', title: 'Measurement & Billing Audit', desc: 'Reconciling certified bills, DLP expiration dates, and deductions.' },
      { phase: '02', title: 'Notice of Dispute', desc: 'Serving contractual notice of dispute under GCC clauses demanding immediate payment.' },
      { phase: '03', title: 'Arbitration / Sec 9 Filing', desc: 'Filing Section 9 injunction petition and initiating arbitrator appointment.' },
      { phase: '04', title: 'Award Execution', desc: 'Executing arbitral award through civil attachment warrants against principal contractor.' }
    ]
  },

  'rent-lease-recovery': {
    num: '07',
    code: 'JUR-07',
    heroImage: '/images/services/domains/rent-lease-recovery.jpg',
    title: 'Commercial Tenancy, Lease Arrears & Eviction',
    subtitle: 'Recovery of Outstanding Commercial Rent, Warehouse Lease Arrears & Asset Possession',
    badge: 'Commercial Tenancy & Leases',
    summary: 'Commercial landlords, industrial park owners, and asset managers facing defaulting tenants require rapid legal intervention to recover rental arrears, forfeit deposits, and reclaim possession from commercial overstaying.',
    metrics: [
      { label: 'Notice Period', value: '15-Day Sec 106' },
      { label: 'Compensation', value: 'Mesne Profits' },
      { label: 'Execution', value: 'Bailiff Possession' },
    ],
    stallingTactics: [
      {
        tactic: 'Tenant continues occupying commercial premises without paying monthly lease rentals',
        counter: 'Serving statutory Section 106 notice determining tenancy and claiming market mesne profits.'
      },
      {
        tactic: 'Tenant claims security deposit covers arrears and refuses to pay current rent',
        counter: 'Security deposit is for restoration/damages: Lease covenants mandate continuous monthly rental transfers.'
      },
      {
        tactic: 'Tenant vacated premises without clearing utility bills and maintenance dues',
        counter: 'Filing Order XXXVII summary suit for liquidated arrears backed by registered lease deed.'
      },
      {
        tactic: 'Unauthorized subletting or commercial alteration of property',
        counter: 'Injunction petition before commercial court to restrain unauthorized commercial usage.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Registered Lease Agreement / Leave & Licence', desc: 'Executed lease deed showing rental covenants, lock-in period, and default clauses.', status: 'Mandatory' },
      { title: 'Monthly Rent Invoices & GST Receipts', desc: 'Tax invoices and bank statements establishing default in rental transfers.', status: 'Critical' },
      { title: 'Utility & Maintenance Dues Records', desc: 'Unpaid electricity, water, common area maintenance (CAM) bills.', status: 'Essential' },
      { title: 'Section 106 Determination Notice', desc: 'Statutory 15-day notice determining tenancy served via Registered Speed Post.', status: 'Mandatory' },
    ],
    statutoryRemedies: [
      {
        statute: 'Transfer of Property Act Sec 106',
        forum: 'Statutory Determination',
        desc: '15-day notice determining commercial tenancy, making subsequent occupation illegal.',
        badge: '15-Day Determination'
      },
      {
        statute: 'Summary Suit for Arrears (Order 37)',
        forum: 'Commercial Court',
        desc: 'Expedited decree for liquidated rent arrears backed by registered lease agreement.',
        badge: 'Summary Decree'
      },
      {
        statute: 'Mesne Profits & Damages',
        forum: 'Civil Court',
        desc: 'Claiming market damages and penal mesne profits for unauthorized post-notice occupation.',
        badge: 'Mesne Profits'
      }
    ],
    phases: [
      { phase: '01', title: 'Lease & Arrears Audit', desc: 'Verifying lock-in clauses, deposit adjustment rules, and default amounts.' },
      { phase: '02', title: 'Section 106 Notice', desc: 'Serving notice to quit and handover vacant possession via Speed Post.' },
      { phase: '03', title: 'Commercial Eviction Suit', desc: 'Filing dual suit for vacant possession and decree for liquidated arrears.' },
      { phase: '04', title: 'Bailiff Execution', desc: 'Executing warrant of possession through court bailiff and asset attachment.' }
    ]
  },

  'commercial-advances': {
    num: '08',
    code: 'JUR-08',
    heroImage: '/images/services/domains/commercial-advances.jpg',
    title: 'Commercial Advances & Business Debts',
    subtitle: 'Recovery of Unreturned Supplier Advances, ICDs & Commercial Loans',
    badge: 'Commercial Advances',
    summary: 'When commercial advance payments are transferred to vendors who fail to deliver, or when inter-corporate deposits (ICD) are defaulted, IndoLex utilizes enforceable summary instruments and asset attachment orders.',
    metrics: [
      { label: 'Court Route', value: 'Order 37 CPC' },
      { label: 'Asset Protection', value: 'Order 38 Rule 5' },
      { label: 'Banking Trail', value: 'UTR Verified' },
    ],
    stallingTactics: [
      {
        tactic: 'Supplier receives 50% advance for machinery or raw materials but never delivers',
        counter: 'Serving immediate demand for restitution plus commercial interest for breach of contract.'
      },
      {
        tactic: 'Debtor claims advance was non-refundable without contractual backing',
        counter: 'Indian Contract Act mandates restitution: Retaining advance without supplying consideration is unlawful enrichment.'
      },
      {
        tactic: 'Debtor attempting to transfer company assets or bank funds to evade recovery',
        counter: 'Moving application under Order 38 Rule 5 CPC for attachment before judgment to freeze debtor assets.'
      },
      {
        tactic: 'Dishonouring promissory notes or inter-corporate deposit maturity dates',
        counter: 'Summary suit under Order XXXVII CPC for instant decree on negotiable promissory instruments.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Bank Transaction Proof / UTR Slips', desc: 'Banking statements and UTR remittance advice proving transfer of advance funds.', status: 'Mandatory' },
      { title: 'Purchase Order / Advance Agreement', desc: 'Contracts stipulating delivery timelines and refund obligations upon non-performance.', status: 'Critical' },
      { title: 'Promissory Note / Loan Agreement', desc: 'Executed promissory notes, personal guarantees, or debt acknowledgment letters.', status: 'Essential' },
      { title: 'Cancellation Notice & Demand Letters', desc: 'Formal written demand demanding immediate refund of advance with interest.', status: 'Mandatory' },
    ],
    statutoryRemedies: [
      {
        statute: 'Order XXXVII CPC (Summary Suit)',
        forum: 'Designated Commercial Court',
        desc: 'Fast-track suit on promissory notes, loan agreements, and written advance refund liabilities.',
        badge: 'Summary Recovery'
      },
      {
        statute: 'Order 38 Rule 5 (Attachment Before Judgment)',
        forum: 'Commercial Court',
        desc: 'Urgent court orders freezing debtor bank accounts and properties while trial is pending.',
        badge: 'Asset Freeze'
      },
      {
        statute: 'Criminal Breach of Trust (Sec 406/420)',
        forum: 'Magistrate Court',
        desc: 'Criminal prosecution where advance was induced through fraudulent representations without intent to supply.',
        badge: 'Criminal Liability'
      }
    ],
    phases: [
      { phase: '01', title: 'Banking Trail Verification', desc: 'Establishing undisputed banking proof of advance remittance.' },
      { phase: '02', title: 'Statutory Restitution Demand', desc: 'Serving formal legal notice demanding immediate refund plus 18% commercial interest.' },
      { phase: '03', title: 'Summary Suit Filing', desc: 'Filing suit under Order 37 CPC with application for conditional attachment.' },
      { phase: '04', title: 'Garnishee Enforcement', desc: 'Enforcing decree through bank account garnishee orders and asset liquidation.' }
    ]
  },

  'disputed-part-acknowledged': {
    num: '09',
    code: 'JUR-09',
    heroImage: '/images/services/domains/disputed-part-acknowledged.jpg',
    title: 'Disputed Claims & Debit Note Rebuttals',
    subtitle: 'Strategic Resolution for Contested Invoices & Unilateral Quality Deductions',
    badge: 'Bilateral Conciliation',
    summary: 'Debtors frequently pay a portion of an invoice and hold the remainder under the guise of quality defects, delay penalties, or missing reconciliations. We dissect the dispute to recover the admitted liability immediately while securing enforceable terms for the balance.',
    metrics: [
      { label: 'Instant Decree', value: 'Order 12 Rule 6' },
      { label: 'Legal Doctrine', value: 'Estoppel' },
      { label: 'Conciliation', value: 'Escrow Terms' },
    ],
    stallingTactics: [
      {
        tactic: 'Debtor pays 60-70% of bill and withholds balance claiming vague quality defects',
        counter: 'Securing immediate summary judgment on the admitted 60-70% under Order XII Rule 6 CPC.'
      },
      {
        tactic: 'Unilateral debit notes raised months after goods were accepted and consumed',
        counter: 'Doctrine of Estoppel: Debtor who accepts goods without inspection objection waives right to reject.'
      },
      {
        tactic: 'Debtor claiming delay penalties when delay was caused by debtor own defaults',
        counter: 'Establishing reciprocal promises under Section 54 Contract Act: Party in breach cannot claim liquidated damages.'
      },
      {
        tactic: 'Debtor refusing to meet for mutual ledger reconciliation',
        counter: 'Serving forensic reconciliation statement backed by statutory legal notice requiring formal dispute proof within 10 days.'
      }
    ],
    exhibitsNeeded: [
      { title: 'Ledger Showing Admitted vs Disputed Dues', desc: 'Detailed statement of accounts highlighting payments received and balance withheld.', status: 'Mandatory' },
      { title: 'Debit Notes & Correspondence', desc: 'Copies of debit notes raised by debtor and written counter-rebuttals.', status: 'Critical' },
      { title: 'Quality Clearance / Inspection Sign-offs', desc: 'Inspection reports, test certificates, and delivery acceptance sign-offs.', status: 'Essential' },
      { title: 'Statutory Legal Notice on Admissions', desc: 'Advocate demand notice demanding immediate release of admitted balance.', status: 'Mandatory' },
    ],
    statutoryRemedies: [
      {
        statute: 'Order XII Rule 6 CPC (Decree on Admissions)',
        forum: 'Commercial Court',
        desc: 'Court can pass immediate decree for the admitted portion of debt without proceeding to trial.',
        badge: 'Instant Decree'
      },
      {
        statute: 'Doctrine of Estoppel & Waiver',
        forum: 'Indian Evidence Act',
        desc: 'Debtor who uses goods without timely objection is legally barred from claiming quality defects.',
        badge: 'Legal Estoppel'
      },
      {
        statute: 'Structured Escrow Conciliation',
        forum: 'Mediation Bench',
        desc: 'Binding compromise agreement resolving dispute and releasing funds through escrow accounts.',
        badge: 'Escrow Release'
      }
    ],
    phases: [
      { phase: '01', title: 'Forensic Dispute Dissection', desc: 'Separating admitted liability from spurious deduction items.' },
      { phase: '02', title: 'Immediate Admitted Demand', desc: 'Securing immediate payout for admitted amount while reserving rights for balance.' },
      { phase: '03', title: 'Commercial Conciliation', desc: 'Structured technical and commercial review to nullify unfair debit notes.' },
      { phase: '04', title: 'Decree on Admissions', desc: 'Moving under Order XII Rule 6 CPC for instant court decree on admitted debts.' }
    ]
  }
};

export const instant = false;

export function generateStaticParams() {
  return [
    { slug: 'b2b-trade-dues' },
    { slug: 'msme-payment-delays' },
    { slug: 'cheque-bounce-matters' },
    { slug: 'corporate-institutional-dues' },
    { slug: 'consultancy-fee-recovery' },
    { slug: 'contractor-subcontractor-dues' },
    { slug: 'rent-lease-recovery' },
    { slug: 'commercial-advances' },
    { slug: 'disputed-part-acknowledged' },
  ];
}

export default async function ServiceSubpage({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060D17] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

      {/* STICKY BREADCRUMB */}
      <div className="sticky top-14 sm:top-16 z-30 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#071326]/90 backdrop-blur-md py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 text-xs">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#E05320] font-medium transition-colors min-w-0"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              <span className="sm:hidden">All Domains</span>
              <span className="hidden sm:inline">Back to All Practice Domains</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 shrink-0">
            <span className="text-[#E05320] font-bold">{service.code}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">DOMAIN {service.num} OF 09</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#071326] py-8 sm:py-12 lg:py-14">
        <div className="pointer-events-none absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

            {/* LEFT (7 cols) */}
            <Reveal className="lg:col-span-7">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-[10px] sm:text-[11px] font-bold text-[#E05320] uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{service.badge}</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                    {service.title}
                  </h1>
                  <p className="text-[13px] sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-light">
                  {service.summary}
                </p>

                {/* METRIC TILES */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xl">
                  {service.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A1528] px-3 py-2.5"
                    >
                      <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider leading-tight">
                        {m.label}
                      </div>
                      <div className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white mt-0.5 leading-tight">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CLIENT ACTION BUTTONS */}
                <ServiceSubpageClient serviceBadge={service.badge} />
              </div>
            </Reveal>

            {/* RIGHT (5 cols) */}
            <Reveal className="lg:col-span-5" delay={120}>
              <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0A1528] overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-black/30">
                <SubpageHeroVisual
                  imageSrc={service.heroImage}
                  title={service.title}
                  code={service.code}
                />
                <div className="px-4 py-2.5 bg-white dark:bg-[#0A1528] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> High Court Panel
                  </span>
                  <span className="text-[#E05320] font-semibold">100% Lawful Recovery →</span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* CORE SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 sm:space-y-14">

        {/* 1. STALLING TACTICS */}
        <div className="space-y-5">
          <Reveal>
            <SectionHead
              icon={ShieldAlert}
              label="TACTICAL LEGAL ANALYSIS"
              tone="bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
              title="Common Debtor Stalling Excuses vs. Statutory Legal Rebuttal"
              desc="Commercial debtors routinely employ predictable delay tactics. IndoLex neutralizes them with established Indian judicial precedents and statutory limitation locks."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {service.stallingTactics.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 2) * 100} className="h-full">
                <div className={`${cardBase} p-4 sm:p-5 space-y-3`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span>Debtor Delay Tactic #{idx + 1}</span>
                    </div>
                    <p className="text-[13px] sm:text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      “{item.tactic}”
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                    <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#E05320] uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5" />
                      <span>IndoLex Statutory Rebuttal</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {item.counter}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 2. EXHIBITS */}
        <div className="space-y-5">
          <Reveal>
            <SectionHead
              icon={FileCheck2}
              label="EVIDENTIARY AUDIT DOCKET"
              tone="bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              title="Essential Evidentiary Exhibits Required for Statutory Enforcement"
              desc="Every court petition requires rigorous documentation. Our legal audit verifies these four core transactional exhibits before serving demand notices."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {service.exhibitsNeeded.map((ex, idx) => (
              <Reveal key={idx} delay={(idx % 4) * 90} className="h-full">
                <div className={`${cardBase} p-4 flex flex-col justify-between gap-3 hover:border-emerald-500/40`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {ex.status}
                      </span>
                    </div>

                    <h3 className="text-[13px] font-serif font-bold text-slate-900 dark:text-white leading-snug">
                      {ex.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {ex.desc}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>Sec 65B Audit Exhibit</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3. REMEDIES */}
        <div className="space-y-5">
          <Reveal>
            <SectionHead
              icon={Gavel}
              label="JUDICIAL FORUMS & REMEDIES"
              tone="bg-orange-500/10 border-orange-500/20 text-[#E05320]"
              title="Applicable Statutory Laws & Court Powers"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {service.statutoryRemedies.map((rem, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 100} className="h-full">
                <div className={`${cardBase} p-4 sm:p-5 flex flex-col justify-between gap-3 overflow-hidden`}>
                  <div className="absolute left-0 inset-y-0 w-[3px] bg-slate-200 dark:bg-slate-800 group-hover:bg-[#E05320] transition-colors" />

                  <div className="space-y-2.5 pl-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase truncate">
                        {rem.forum}
                      </span>
                      <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-[#E05320] border border-orange-500/20">
                        {rem.badge}
                      </span>
                    </div>

                    <h3 className="text-[15px] sm:text-base font-serif font-bold text-slate-900 dark:text-white leading-snug">
                      {rem.statute}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {rem.desc}
                    </p>
                  </div>

                  <div className="pl-1 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-[#E05320] font-semibold flex items-center justify-between">
                    <span>Enforceable Jurisdiction</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 4. PHASE ROADMAP */}
        <div className="space-y-5">
          <Reveal>
            <SectionHead
              icon={Clock}
              label="STEP-BY-STEP PROTOCOL"
              tone="bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
              title="IndoLex 4-Phase Recovery Execution Framework"
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {service.phases.map((ph, idx) => (
              <Reveal key={ph.phase} delay={idx * 110} className="h-full">
                <div className={`${cardBase} p-4 space-y-2.5`}>
                  {/* connector between cards on desktop */}
                  {idx < service.phases.length - 1 && (
                    <div className="hidden lg:block absolute top-[2.1rem] -right-4 w-4 h-px bg-gradient-to-r from-[#E05320]/60 to-transparent" />
                  )}

                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#E05320] text-white flex items-center justify-center text-xs font-mono font-bold shadow-md shadow-[#E05320]/25">
                      {ph.phase}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Phase {ph.phase}
                    </span>
                  </div>

                  <h3 className="text-[13px] font-serif font-bold text-slate-900 dark:text-white leading-snug">
                    {ph.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {ph.desc}
                  </p>
                  <div className="pt-1 text-[10px] font-mono text-slate-400">
                    Deliverable: Verified Milestone
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* BOTTOM CONVERSION BANNER */}
        <Reveal>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-[#071326] via-[#0A1528] to-[#0D1F3C] text-white p-6 sm:p-9 text-center shadow-xl relative overflow-hidden">
            <div className="pointer-events-none absolute -top-10 right-1/4 w-72 h-72 bg-orange-500/15 blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-orange-400">
                <Scale className="h-3.5 w-3.5" />
                <span>48-HOUR EVIDENTIARY AUDIT</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                Ready to Recover Your {service.badge}?
              </h2>

              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light max-w-xl mx-auto">
                Upload your transaction invoices, contract agreements, or dishonoured cheque return memos. Our empanelled High Court advocates will audit your statutory enforceability within 48 hours.
              </p>

              <div className="pt-1 flex justify-center">
                <SubpageBottomTrigger />
              </div>

              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] sm:text-xs text-slate-300 font-medium">
                <span className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> 100% Attorney-Client Privilege
                </span>
                <span className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <Clock className="h-4 w-4 text-orange-400 shrink-0" /> 48-Hour Evidentiary Review
                </span>
                <span className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <Scale className="h-4 w-4 text-blue-400 shrink-0" /> Pan-India Jurisdiction
                </span>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}