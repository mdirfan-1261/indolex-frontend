import { ShieldAlert, Gavel, Scale, FileWarning, Landmark, Building2, Home, AlertOctagon } from 'lucide-react';

export const NOTICE_DEFENSE_TYPES = [
  {
    id: 'sarfaesi_13_2',
    title: 'SARFAESI Section 13(2) Demand Notice',
    sub: 'Statutory 60-Day Pre-Possession Notice from Bank',
    badge: '15-Day Objection Window',
    icon: ShieldAlert,
    accent: 'border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300',
    statutoryAct: 'Section 13(3A) SARFAESI Act, 2002',
    legalRemedy: 'Formal Legal Objections & Stance Filing',
    timeline: 'Within 15 Days of Receipt',
    stayFeasibility: 'High (Statutory Duty on Bank)',
    reliefExplanation:
      'Under Section 13(3A), the Bank is legally bound to consider and decide your objections within 15 days. Bank cannot take symbolic possession without communicating reasons for rejecting objections.',
    recommendedActions: [
      'Dispute arbitrary NPA classification under RBI IRAC prudential norms',
      'Challenge illegal compounding of penal interest & unverified charges',
      'Demand inspection of primary/collateral security accounts and statement of accounts',
    ],
  },
  {
    id: 'sarfaesi_13_4',
    title: 'Sec 13(4) Possession / Auction Sale Notice',
    sub: 'Symbolic Seizure & e-Auction Tender Notification',
    badge: '45-Day DRT Appeal Window',
    icon: AlertOctagon,
    accent: 'border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300',
    statutoryAct: 'Section 17 Securitisation Application (SA) before DRT',
    legalRemedy: 'Interim Stay on Auction & Possession',
    timeline: 'Within 45 Days of Notice',
    stayFeasibility: 'Urgent (DRT Presiding Officer Bench)',
    reliefExplanation:
      'Direct statutory appeal before jurisdictional Debts Recovery Tribunal (DRT). DRT has statutory authority to grant interim stay on property auction and restore symbolic possession.',
    recommendedActions: [
      'Challenge auction reserve price undervaluation without registered valuer report',
      'Establish lack of mandatory 30-day individual sale notice under Security Interest Rules',
      'Move urgent interim stay application to prevent third-party rights creation',
    ],
  },
  {
    id: 'sec_14_dm',
    title: 'Section 14 DM / CMM Physical Eviction Order',
    sub: 'Magistrate Warrant for Police Physical Takeover',
    badge: 'Emergency High Court Writ / DRT Stay',
    icon: Gavel,
    accent: 'border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300',
    statutoryAct: 'Article 226 High Court Writ / DRT Emergency Stay',
    legalRemedy: 'Emergency Stay on Physical Dispossession',
    timeline: 'Immediate (Within 48-72 Hours)',
    stayFeasibility: 'Critical Emergency (High Court Bench)',
    reliefExplanation:
      'High Court Article 226 Writ Petition or urgent DRT mention to halt police eviction where the Bank failed to satisfy the mandatory 9-point affidavit requirement under Section 14 proviso.',
    recommendedActions: [
      'Challenge non-compliance of mandatory 9-point affidavit by Authorized Officer',
      'Show ongoing OTS compromise / bona fide repayment willingness',
      'Seek status quo order to protect running factory operations and residential premises',
    ],
  },
  {
    id: 'sec_138_cheque',
    title: 'Section 138 NI Act Cheque Bounce Notice',
    sub: 'Criminal Legal Demand Notice for Dishonoured Cheque',
    badge: '15-Day Statutory Reply Clock',
    icon: Scale,
    accent: 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300',
    statutoryAct: 'Section 138 & 143A Negotiable Instruments Act',
    legalRemedy: 'Point-by-Point Statutory Rebuttal',
    timeline: 'Within 15 Days of Receipt',
    stayFeasibility: 'Standard Defense (Pre-Litigation Rebuttal)',
    reliefExplanation:
      'Comprehensive legal reply denying legally enforceable debt, proving misuse of blank security cheques, or establishing stop-payment grounds to prevent filing of criminal complaint.',
    recommendedActions: [
      'Establish cheque was given as advance security and not for existing debt',
      'Rebut statutory presumption under Section 139 of Negotiable Instruments Act',
      'Avoid 20% interim compensation order under Section 143A',
    ],
  },
];

export const MAJOR_INDIAN_BANKS = [
  'State Bank of India (SBI)',
  'Punjab National Bank (PNB)',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'HDFC Bank Ltd',
  'ICICI Bank Ltd',
  'Axis Bank Ltd',
  'Kotak Mahindra Bank',
  'Federal Bank',
  'IDBI Bank',
  'Asset Reconstruction Company (ARC)',
  'Non-Banking Financial Company (NBFC)',
  'Cooperative / Scheduled Bank',
  'Other Financial Institution',
];

export const PROPERTY_TYPES_AT_RISK = [
  { id: 'factory', label: 'Industrial Factory / Manufacturing Unit', icon: Building2 },
  { id: 'commercial', label: 'Commercial Office / Showroom / Shop', icon: Landmark },
  { id: 'residential', label: 'Residential House / Flat / Bungalow', icon: Home },
  { id: 'plot', label: 'Commercial Land / Non-Agricultural Plot', icon: Building2 },
];

export const INDIAN_JURISDICTIONS = [
  'Delhi (NCR) - DRT I / II / III',
  'Maharashtra (Mumbai) - DRT I / II / III',
  'Uttar Pradesh (Lucknow / Allahabad DRT)',
  'Gujarat (Ahmedabad DRT I / II)',
  'Karnataka (Bengaluru DRT I / II)',
  'Tamil Nadu (Chennai DRT I / II / III)',
  'West Bengal (Kolkata DRT I / II / III)',
  'Rajasthan (Jaipur DRT)',
  'Punjab & Haryana (Chandigarh DRT I / II)',
  'Telangana (Hyderabad DRT I / II)',
  'Other Jurisdictional Bench',
];