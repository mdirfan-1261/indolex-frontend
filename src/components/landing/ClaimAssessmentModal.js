'use client';

import { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Building2,
  Landmark,
  Scale,
  CreditCard,
  FileText,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  TrendingUp,
  Lock,
} from 'lucide-react';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://indolex-backend.onrender.com/api';

const DEBT_TYPES = [
  {
    id: 'bank_npa',
    title: 'Bank / NBFC NPA Loan Default',
    sub: 'SARFAESI Act 2002 & DRT Section 19 OA',
    badge: 'Statutory 60-Day Clock',
    icon: Landmark,
    accent: 'border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300',
    recoveryRate: '88% - 94%',
    statutoryAct: 'SARFAESI Sec 13(2) & Sec 14 DM Eviction',
    timeline: '30 - 60 Days',
  },
  {
    id: 'b2b_invoices',
    title: 'B2B Commercial & Trade Invoices',
    sub: 'Order XXXVII CPC Summary Suit & Commercial Courts',
    badge: 'Direct Asset Attachment',
    icon: Building2,
    accent: 'border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300',
    recoveryRate: '82% - 91%',
    statutoryAct: 'Order 37 CPC Summary Suit & Pre-Institution Mediation',
    timeline: '45 - 90 Days',
  },
  {
    id: 'cheque_bounce',
    title: 'Dishonoured Cheque (Section 138)',
    sub: 'Negotiable Instruments Act, 1881',
    badge: 'Criminal Bailable Warrants',
    icon: CreditCard,
    accent: 'border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300',
    recoveryRate: '92% - 97%',
    statutoryAct: 'Section 138 NI Act with 20% Interim Compensation u/s 143A',
    timeline: '30 - 60 Days',
  },
  {
    id: 'msme_dues',
    title: 'MSME Delayed Payments',
    sub: 'MSMED Act, 2006 • MSME Samadhaan',
    badge: '3x RBI Compound Interest',
    icon: Scale,
    accent: 'border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400',
    recoveryRate: '85% - 93%',
    statutoryAct: 'Section 18 MSMED Facilitation Council Arbitration',
    timeline: '45 - 90 Days',
  },
  {
    id: 'nclt_insolvency',
    title: 'Corporate Insolvency (NCLT / IBC)',
    sub: 'Insolvency & Bankruptcy Code, 2016',
    badge: 'Corporate CIRP / Liquidation',
    icon: FileText,
    accent: 'border-purple-500/30 bg-purple-50/40 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300',
    recoveryRate: '75% - 86%',
    statutoryAct: 'Section 7 / 9 CIRP Petition & Moratorium Lock',
    timeline: '60 - 120 Days',
  },
];

const QUICK_AMOUNTS = [
  '₹ 25 Lakhs',
  '₹ 50 Lakhs',
  '₹ 1 Crore',
  '₹ 5 Crores',
  '₹ 10 Crores+',
];

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi (NCR)',
  'Uttar Pradesh',
  'Gujarat',
  'Karnataka',
  'Tamil Nadu',
  'West Bengal',
  'Haryana',
  'Telangana',
  'Rajasthan',
  'Madhya Pradesh',
  'Punjab',
  'Andhra Pradesh',
  'Bihar',
  'Odisha',
  'Kerala',
  'Chandigarh',
  'Uttarakhand',
  'Jharkhand',
  'Goa',
  'Other State / UT',
];

const STEPS = ['Debt Nature', 'Claim & Defaulter', 'Contact & Submit'];

export default function ClaimAssessmentModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingId, setTrackingId] = useState('');

  // Form State
  const [debtType, setDebtType] = useState('b2b_invoices');
  const [claimAmount, setClaimAmount] = useState('₹ 50 Lakhs');
  const [overduePeriod, setOverduePeriod] = useState('90+ Days (Statutory Default)');
  const [defaulterName, setDefaulterName] = useState('');
  const [defaulterState, setDefaulterState] = useState('Maharashtra');
  const [caseDescription, setCaseDescription] = useState('');

  // Creditor Contact
  const [claimantName, setClaimantName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Strict Phone Input Handler (Blocks words & letters completely)
  const handlePhoneChange = (e) => {
    let val = e.target.value;
    // Allow optional '+' at start, then strictly numbers only
    if (val.startsWith('+')) {
      val = '+' + val.slice(1).replace(/\D/g, '');
    } else {
      val = val.replace(/\D/g, '');
    }
    // Limit to max 13 chars (+91 + 10 digits)
    if (val.length <= 13) {
      setPhone(val);
      if (errorMessage) setErrorMessage('');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSubmitted(false);
      setLoading(false);
      setErrorMessage('');
      setDefaulterName('');
      setClaimantName('');
      setOrganization('');
      setPhone('');
      setEmail('');
      setCaseDescription('');
      return;
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedDebtConfig =
    DEBT_TYPES.find((d) => d.id === debtType) || DEBT_TYPES[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Mandatory Field Validations
    if (!claimantName.trim() || !organization.trim()) {
      setErrorMessage('Please provide your Name and Institution/Company Name.');
      return;
    }

    // 2. Strict Phone Validation (Only digits, minimum 10 digits)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number (digits only).');
      return;
    }

    // 3. Strict Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    setLoading(true);

    const generatedRef = `CLAIM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(generatedRef);

    const nameParts = claimantName.trim().split(' ');
    const firstName = nameParts[0] || 'Valued';
    const lastName = nameParts.slice(1).join(' ') || 'Creditor';

    const payload = {
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      phoneNumber: phone.trim(),
      organization: organization.trim(),
      jobTitle: 'Authorized Recovery Representative',
      country: 'India',
      organizationType:
        debtType === 'bank_npa'
          ? 'bank'
          : debtType === 'b2b_invoices'
          ? 'consultant'
          : debtType === 'cheque_bounce'
          ? 'lawfirm'
          : debtType === 'nclt_insolvency'
          ? 'arc'
          : 'other',
      notes: `[ONLINE DEBT CLAIM ASSESSMENT - ${generatedRef}]
• Debt Type: ${selectedDebtConfig.title}
• Claim Amount: ${claimAmount}
• Overdue Age: ${overduePeriod}
• Defaulter: ${defaulterName.trim()} (${defaulterState})
• Recommended Legal Route: ${selectedDebtConfig.statutoryAct}
• Estimated Timeline: ${selectedDebtConfig.timeline}
• Brief Notes: ${caseDescription.trim() || 'Direct Online Case Assessment Request'}`,
    };

    try {
      const res = await fetch(`${API_BASE}/crm/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (!res.ok && !data.success) {
        throw new Error(data.message || 'Failed to submit recovery claim. Please check server.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('[Claim Assessment Error]:', err);
      setErrorMessage(err.message || 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ───────────── STYLE TOKENS (UI only) ───────────── */
  const inputCls =
    'w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#071326] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs shadow-sm shadow-slate-900/[0.03] focus:outline-none focus:ring-2 focus:ring-[#E05320]/25 focus:border-[#E05320] transition-colors';
  const labelCls =
    'block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1';
  const primaryBtn =
    'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-gradient-to-b from-[#E8602F] to-[#D24A1A] hover:from-[#E05320] hover:to-[#C84518] text-white text-xs font-semibold cursor-pointer transition-all shadow-md shadow-[#E05320]/20 ring-1 ring-inset ring-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0A1528]';
  const ghostBtn =
    'inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320]/40';
  const stepHead = (title, subtitle, n) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">
          {title}
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
          {subtitle}
        </p>
      </div>
      <span className="shrink-0 text-[10px] font-mono tabular-nums text-slate-400 dark:text-slate-500 mt-0.5">
        {n}/3
      </span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto bg-slate-950/70 dark:bg-black/75 sm:px-4 sm:py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative flex w-full sm:max-w-xl max-h-[100dvh] sm:max-h-[92vh] flex-col rounded-t-2xl sm:rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0A1528] shadow-2xl shadow-slate-950/30 text-slate-900 dark:text-slate-100 overflow-hidden animate-in fade-in duration-200">

        {/* TOP ACCENT LINE */}
        <div className="h-[3px] shrink-0 bg-gradient-to-r from-amber-500 via-[#E05320] to-emerald-500" />

        {/* MODAL HEADER */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-[#E05320]/10 border border-[#E05320]/25 flex items-center justify-center text-[#E05320]">
              <Scale className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-semibold text-[#E05320]">
                  Confidential Recovery Evaluation
                </span>
                <span className="hidden min-[400px]:inline-flex items-center gap-1 text-[9.5px] px-1.5 py-px rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  RBI &amp; SARFAESI Compliant
                </span>
              </div>
              <h2 className="text-[14px] sm:text-[15px] font-serif font-medium text-slate-900 dark:text-white leading-tight truncate">
                Submit Bad Debt / Overdue Loan for Legal Recovery
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-7 w-7 shrink-0 grid place-items-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320]/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        {!submitted && (
          <div className="shrink-0 px-4 py-2.5 bg-slate-50/80 dark:bg-[#071326] border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="grid grid-cols-3 gap-2">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const done = step > n;
                const active = step === n;
                return (
                  <div key={label} className="min-w-0">
                    <div
                      className={`h-1 rounded-full transition-colors ${
                        step >= n
                          ? 'bg-[#E05320]'
                          : 'bg-slate-200 dark:bg-slate-700/70'
                      }`}
                    />
                    <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
                      <span
                        className={`h-4 w-4 shrink-0 rounded-full grid place-items-center text-[9px] font-bold ${
                          done
                            ? 'bg-emerald-500 text-white'
                            : active
                            ? 'bg-[#E05320] text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {done ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : n}
                      </span>
                      <span
                        className={`truncate text-[10.5px] ${
                          active
                            ? 'font-semibold text-slate-900 dark:text-white'
                            : 'font-medium text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4">
          {submitted ? (
            /* SUBMITTED DOSSIER OUTPUT */
            <div className="text-center py-2 space-y-3.5">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 mx-auto grid place-items-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                  Statutory Evaluation Generated
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-medium text-slate-900 dark:text-white mt-0.5 leading-tight">
                  Recovery Claim Successfully Lodged
                </h3>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
                  Your claim docket has been assigned to our Senior SARG Advocate &amp; Recovery Advisory Desk under Reference:
                </p>
                <div className="mt-2 inline-block px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-[11.5px] font-bold text-[#E05320] tracking-wide">
                  {trackingId || 'CLAIM-2026-8802'}
                </div>
              </div>

              {/* ESTIMATED STATUTORY FEASIBILITY SCORECARD */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#071326] text-left grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-y sm:divide-y-0 divide-slate-200 dark:divide-slate-800 overflow-hidden text-xs">
                <div className="grid grid-cols-1">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block">Identified Statutory Act</span>
                    <span className="font-semibold text-slate-900 dark:text-white block mt-0.5 leading-snug">
                      {selectedDebtConfig.statutoryAct}
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block">Estimated Resolution Window</span>
                    <span className="font-semibold text-slate-900 dark:text-white block mt-0.5">
                      {selectedDebtConfig.timeline}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block">Recovery Probability Index</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                      {selectedDebtConfig.recoveryRate} (High Feasibility)
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block">Claimant Institution</span>
                    <span className="font-semibold text-slate-900 dark:text-white block mt-0.5 break-words">
                      {organization || 'Commercial Entity'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-left text-[11.5px] leading-relaxed text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                <span>
                  Our Empanelled High Court Recovery Counsel will contact you via WhatsApp (<b>{phone || 'Provided Number'}</b>) within 2 business hours with the preliminary Demand Notice draft.
                </span>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-9 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold cursor-pointer transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320]/50"
                >
                  Close &amp; Return to Platform
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* ── STEP 1: DEBT NATURE / CLASSIFICATION ── */}
              {step === 1 && (
                <div className="space-y-3">
                  {stepHead(
                    '1. Select Default Category / Debt Nature',
                    'Choose the statutory classification of your unpaid dues:',
                    1
                  )}

                  <div className="space-y-1.5" role="radiogroup">
                    {DEBT_TYPES.map((d) => {
                      const Icon = d.icon;
                      const isSelected = debtType === d.id;
                      return (
                        <div
                          key={d.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => setDebtType(d.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setDebtType(d.id);
                            }
                          }}
                          className={`px-2.5 py-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320]/40 ${
                            isSelected
                              ? 'border-[#E05320] bg-orange-50/60 dark:bg-[#E05320]/10 ring-1 ring-[#E05320]/60 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-[#071326]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`h-8 w-8 rounded-md flex items-center justify-center border shrink-0 ${d.accent}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                                  {d.title}
                                </span>
                                <span className="hidden sm:inline-block text-[9px] px-1.5 py-px rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                                  {d.badge}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug truncate">
                                {d.sub}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-[#E05320] bg-[#E05320] text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[3.5]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* SELECTED ROUTE PREVIEW */}
                  <div className="grid grid-cols-2 gap-px rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 text-[11px]">
                    <div className="col-span-2 bg-slate-50 dark:bg-[#071326] px-2.5 py-1.5 text-slate-600 dark:text-slate-300 leading-snug">
                      <span className="text-slate-400 dark:text-slate-500">Legal route: </span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedDebtConfig.statutoryAct}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#071326] px-2.5 py-1.5 flex items-center gap-1.5">
                      <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />
                      <span className="text-slate-400 dark:text-slate-500">Recovery</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">{selectedDebtConfig.recoveryRate}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#071326] px-2.5 py-1.5 flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-[#E05320] shrink-0" />
                      <span className="text-slate-400 dark:text-slate-500">Timeline</span>
                      <span className="font-semibold text-slate-900 dark:text-white ml-auto">{selectedDebtConfig.timeline}</span>
                    </div>
                  </div>

                  <div className="pt-2.5 flex justify-end border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className={`${primaryBtn} w-full sm:w-auto`}
                    >
                      <span>Proceed to Claim Amount</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2: CLAIM FINANCIALS & DEFAULTER INFO ── */}
              {step === 2 && (
                <div className="space-y-3">
                  {stepHead(
                    '2. Claim Amount & Defaulter Details',
                    'Specify unpaid recovery value and borrower jurisdiction:',
                    2
                  )}

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs flex items-center gap-2 border border-rose-200 dark:border-rose-800">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* QUICK AMOUNT BUTTONS */}
                  <div>
                    <label className={labelCls}>Approximate Default Value Owed *</label>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {QUICK_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setClaimAmount(amt);
                            setErrorMessage('');
                          }}
                          className={`h-7 px-2.5 rounded-md text-[11px] font-medium border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320]/40 ${
                            claimAmount === amt
                              ? 'bg-[#E05320] border-[#E05320] text-white shadow-sm'
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500'
                          }`}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹ 85 Lakhs or ₹ 12.50 Crores"
                      value={claimAmount}
                      onChange={(e) => {
                        setClaimAmount(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className={inputCls}
                    />
                  </div>

                  {/* OVERDUE PERIOD */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Default Overdue Period *</label>
                      <select
                        value={overduePeriod}
                        onChange={(e) => setOverduePeriod(e.target.value)}
                        className={inputCls}
                      >
                        <option value="30 - 60 Days (Pre-NPA SMA-1)">30 - 60 Days (Pre-NPA SMA-1)</option>
                        <option value="60 - 90 Days (SMA-2 Watchlist)">60 - 90 Days (SMA-2 Watchlist)</option>
                        <option value="90+ Days (Statutory Default)">90+ Days (Statutory Default)</option>
                        <option value="180+ Days / 1 Year+ (Hard Default)">180+ Days / 1 Year+ (Hard Default)</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelCls}>Defaulter Jurisdiction (State) *</label>
                      <select
                        value={defaulterState}
                        onChange={(e) => setDefaulterState(e.target.value)}
                        className={inputCls}
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* DEFAULTER ENTITY */}
                  <div>
                    <label className={labelCls}>Defaulter Company / Entity Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Steels Infrastructure Ltd / Mr. Rajesh Sharma"
                      value={defaulterName}
                      onChange={(e) => {
                        setDefaulterName(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className={inputCls}
                    />
                  </div>

                  {/* BRIEF SUMMARY */}
                  <div>
                    <label className={labelCls}>Brief Case Summary (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 3 unpaid invoices issued in June 2025; borrower promises OTS but no cheque cleared..."
                      value={caseDescription}
                      onChange={(e) => setCaseDescription(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#071326] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs resize-none shadow-sm shadow-slate-900/[0.03] focus:outline-none focus:ring-2 focus:ring-[#E05320]/25 focus:border-[#E05320] transition-colors"
                    />
                  </div>

                  <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setStep(1);
                      }}
                      className={ghostBtn}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!claimAmount.trim()) {
                          setErrorMessage('Please specify default amount owed.');
                          return;
                        }
                        if (!defaulterName.trim()) {
                          setErrorMessage('Please enter Defaulter Company / Entity Name.');
                          return;
                        }
                        setErrorMessage('');
                        setStep(3);
                      }}
                      className={`${primaryBtn} flex-1 sm:flex-none`}
                    >
                      <span>Proceed to Contact Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: CLAIMANT / CREDITOR CONTACT & LODGE ── */}
              {step === 3 && (
                <div className="space-y-3">
                  {stepHead(
                    '3. Creditor Contact & Final Assessment Lodge',
                    'Where should our SARG Advocate share the legal recovery feasibility report?',
                    3
                  )}

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs flex items-center gap-2 border border-rose-200 dark:border-rose-800 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sunil Kumar / Adv. R. K. Singhal"
                        value={claimantName}
                        onChange={(e) => {
                          setClaimantName(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Your Institution / Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. State Bank of India / Tata Motors Ltd"
                        value={organization}
                        onChange={(e) => {
                          setOrganization(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Official Mobile / WhatsApp * (Digits Only)</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9820011223 or +919820011223"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Official Corporate Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="s.kumar@organization.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* SUMMARY MINI TICKET */}
                  <div className="rounded-lg bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 text-xs divide-y divide-slate-200/80 dark:divide-slate-800">
                    <div className="flex items-start justify-between gap-3 px-3 py-1.5 text-slate-500 dark:text-slate-400">
                      <span className="shrink-0">Selected Category</span>
                      <span className="font-semibold text-slate-900 dark:text-white text-right">
                        {selectedDebtConfig.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 px-3 py-1.5 text-slate-500 dark:text-slate-400">
                      <span className="shrink-0">Claim Value</span>
                      <span className="font-mono font-bold text-[#E05320] text-right">
                        {claimAmount}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3 px-3 py-1.5 text-slate-500 dark:text-slate-400">
                      <span className="shrink-0">Defaulter Entity</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 text-right break-words min-w-0">
                        {defaulterName} ({defaulterState})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 text-[10.5px] text-slate-400 dark:text-slate-500 leading-snug">
                    <Lock className="w-3 h-3 text-emerald-500 shrink-0 mt-px" />
                    <span>
                      256-Bit Encrypted Banking Gateway • Protected under Section 65B Electronic Evidence Act.
                    </span>
                  </div>

                  <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setStep(2);
                      }}
                      className={ghostBtn}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${primaryBtn} flex-1 sm:flex-none`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Legal Assessment...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Recovery Claim Docket</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
}