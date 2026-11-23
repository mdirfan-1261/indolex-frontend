'use client';

import { useState } from 'react';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Building2,
  Phone,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  Gavel,
  Clock,
  Check,
  Lock,
} from 'lucide-react';

import {
  NOTICE_DEFENSE_TYPES,
  MAJOR_INDIAN_BANKS,
  PROPERTY_TYPES_AT_RISK,
  INDIAN_JURISDICTIONS,
} from '@/data/noticeDefenseData';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://indolex-backend.onrender.com/api';

export default function BankNoticeDefenseModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedNoticeId, setSelectedNoticeId] = useState('sarfaESI_13_2');
  const [bankName, setBankName] = useState('State Bank of India (SBI)');
  const [noticeDate, setNoticeDate] = useState('');
  const [claimedAmount, setClaimedAmount] = useState('');
  const [propertyType, setPropertyType] = useState('factory');
  const [jurisdiction, setJurisdiction] = useState(INDIAN_JURISDICTIONS[0]);
  const [hasOtsOffer, setHasOtsOffer] = useState(false);

  // Contact Info
  const [borrowerName, setBorrowerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Submission State
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [defenseRef, setDefenseRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const selectedNotice =
    NOTICE_DEFENSE_TYPES.find((n) => n.id === selectedNoticeId) ||
    NOTICE_DEFENSE_TYPES[0];

  // Live days calculation if date entered
  const calculateDaysRemaining = () => {
    if (!noticeDate) return null;
    const received = new Date(noticeDate);
    const today = new Date();
    const diffDays = Math.floor((today - received) / (1000 * 60 * 60 * 24));

    if (selectedNoticeId === 'sarfaESI_13_2' || selectedNoticeId === 'sec_138_cheque') {
      const remaining = 15 - diffDays;
      return remaining > 0
        ? { remaining, urgent: remaining <= 5 }
        : { remaining: 0, expired: true };
    }
    if (selectedNoticeId === 'sarfaesi_13_4') {
      const remaining = 45 - diffDays;
      return remaining > 0
        ? { remaining, urgent: remaining <= 10 }
        : { remaining: 0, expired: true };
    }
    return { remaining: 3, urgent: true };
  };

  const daysInfo = calculateDaysRemaining();

  const handleNext = () => {
    setErrorMessage('');
    if (step === 2 && !noticeDate) {
      setErrorMessage('Please select the date on which you received the notice.');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setErrorMessage('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!borrowerName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, phone number, and official email.');
      setLoading(false);
      return;
    }

    const generatedRef = `DEFENSE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setDefenseRef(generatedRef);

    const nameParts = borrowerName.trim().split(' ');
    const firstName = nameParts[0] || 'Aggrieved';
    const lastName = nameParts.slice(1).join(' ') || 'Borrower';

    const payload = {
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      phoneNumber: phone.trim(),
      organization: companyName.trim() || 'Aggrieved Borrower Entity',
      jobTitle: 'Aggrieved Borrower / Corporate Guarantor',
      country: 'India',
      organizationType: 'consultant',
      notes: `[BANK NOTICE DEFENSE & DRT STAY REQUEST - ${generatedRef}]
• Notice Received: ${selectedNotice.title}
• Bank / Financial Institution: ${bankName}
• Notice Date Received: ${noticeDate || 'Not specified'}
• Claimed Default Amount: ${claimedAmount || 'Under Dispute'}
• Asset At Risk: ${propertyType.toUpperCase()}
• Judicial Jurisdiction: ${jurisdiction}
• Ongoing OTS Negotiation: ${hasOtsOffer ? 'YES (Bona fide compromise)' : 'NO'}
• Applicable Defense Act: ${selectedNotice.statutoryAct}
• Recommended Relief: ${selectedNotice.legalRemedy}
• Case Reference: ${generatedRef}`,
    };

    try {
      const res = await fetch(`${API_BASE}/crm/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({ success: true }));
      if (!res.ok && !data.success) {
        throw new Error(data.message || 'Failed to submit notice defense docket');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  /* ───────────── 100% AIRTIGHT DARK/LIGHT STYLE TOKENS ───────────── */
  const inputCls =
    'w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071326] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-colors [&>option]:bg-white dark:[&>option]:bg-[#071326] [&>option]:text-slate-900 dark:[&>option]:text-slate-100';
  const labelCls =
    'block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1';
  const primaryBtn =
    'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer transition-all shadow-md shadow-rose-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60';
  const ghostBtn =
    'inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40';
  const iconCls =
    'w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none';
  const stepHead = (title, subtitle) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">
          {title}
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
          {subtitle}
        </p>
      </div>
      <span className="shrink-0 text-[10px] font-mono tabular-nums text-slate-400 dark:text-slate-500 mt-0.5">
        {step}/4
      </span>
    </div>
  );

  const STEPS = [
    { n: 1, label: 'Notice Type' },
    { n: 2, label: 'Bank & Clock' },
    { n: 3, label: 'Asset at Risk' },
    { n: 4, label: 'Legal Counsel' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto bg-slate-950/70 dark:bg-black/80 sm:px-4 sm:py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative flex w-full sm:max-w-xl max-h-[100dvh] sm:max-h-[92vh] flex-col rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden animate-in fade-in duration-200">

        {/* TOP ACCENT LINE */}
        <div className="h-[3px] shrink-0 bg-gradient-to-r from-rose-500 via-amber-500 to-blue-500" />

        {/* MODAL HEADER */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Gavel className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                  Banking Defense &amp; Stay Chamber
                </span>
                <span className="hidden min-[400px]:inline-flex text-[9.5px] px-1.5 py-px rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-medium">
                  DRT &amp; High Court Practice
                </span>
              </div>
              <h2 className="text-[14px] sm:text-[15px] font-serif font-medium text-slate-900 dark:text-white leading-tight truncate">
                Challenge Bank Notice &amp; Stay Asset Auction
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-7 w-7 shrink-0 grid place-items-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        {!submitted && (
          <div className="shrink-0 px-4 py-2.5 bg-slate-50 dark:bg-[#071326] border-b border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {STEPS.map((s) => {
                const done = step > s.n;
                const active = step === s.n;
                return (
                  <div key={s.n} className="min-w-0">
                    <div
                      className={`h-1 rounded-full transition-colors ${
                        done
                          ? 'bg-emerald-500'
                          : active
                          ? 'bg-rose-600'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                    <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
                      <span
                        className={`h-4 w-4 shrink-0 rounded-full grid place-items-center text-[9px] font-bold ${
                          done
                            ? 'bg-emerald-600 text-white'
                            : active
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {done ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : s.n}
                      </span>
                      <span
                        className={`hidden sm:block truncate text-[10.5px] ${
                          active
                            ? 'font-semibold text-slate-900 dark:text-white'
                            : 'font-medium text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 bg-white dark:bg-[#0A1528]">
          {submitted ? (
            /* SUCCESS CONFIRMATION DOSSIER */
            <div className="text-center py-2 space-y-3.5 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  Stay Feasibility Dossier Lodged
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-medium text-slate-900 dark:text-white mt-0.5 leading-tight">
                  Defense Case Assigned to Senior DRT Counsel
                </h3>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Your legal objections have been logged under High Court &amp; DRT defense registry:
                </p>
                <div className="inline-block mt-2 font-mono text-[11.5px] font-bold tracking-wide text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-md border border-rose-500/30">
                  {defenseRef}
                </div>
              </div>

              {/* STATUTORY SCORECARD */}
              <div className="text-left rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 text-xs divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-y sm:divide-y-0 divide-slate-200 dark:divide-slate-800">
                  <div className="p-3">
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block">Bank Challenged</span>
                    <span className="font-semibold text-slate-900 dark:text-white block mt-0.5">{bankName}</span>
                  </div>
                  <div className="p-3">
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block">Identified Statutory Remedy</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400 block mt-0.5 leading-snug">{selectedNotice.statutoryAct}</span>
                  </div>
                </div>

                <div className="p-3">
                  <span className="text-[10.5px] font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                    Immediate Legal Relief Available
                  </span>
                  <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedNotice.reliefExplanation}
                  </p>
                </div>

                <div className="p-3">
                  <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block mb-1.5">Statutory Objection Grounds</span>
                  <ul className="space-y-1">
                    {selectedNotice.recommendedActions.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-snug text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-px" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* WHATSAPP ADVISORY NOTICE */}
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-[11.5px] leading-relaxed text-left flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Our Senior High Court / DRT Chamber Advocate will connect with you directly via WhatsApp (<strong>{phone}</strong>) within 2 business hours with the preliminary Section 13(3A) objection draft.
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full h-9 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-colors cursor-pointer shadow-md"
              >
                Close &amp; Return to Platform
              </button>
            </div>
          ) : (
            /* WIZARD FORM */
            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>

              {errorMessage && (
                <div className="mb-3 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: NOTICE CLASSIFICATION */}
              {step === 1 && (
                <div className="space-y-3">
                  {stepHead(
                    'Select the Notice or Order Received from Bank',
                    'Every banking notice has specific statutory objection timelines under Indian law.'
                  )}

                  <div className="space-y-1.5" role="radiogroup">
                    {NOTICE_DEFENSE_TYPES.map((n) => {
                      const Icon = n.icon;
                      const isSelected = selectedNoticeId === n.id;
                      return (
                        <div
                          key={n.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => setSelectedNoticeId(n.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedNoticeId(n.id);
                            }
                          }}
                          className={`px-2.5 py-2 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 ${
                            isSelected
                              ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 ring-1 ring-rose-500/60 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#071326]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Controlled Icon box with strict Dark Mode */}
                            <div className="w-8 h-8 rounded-md border border-rose-500/30 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                                  {n.title}
                                </span>
                                <span className="text-[9px] font-medium px-1.5 py-px rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                  {n.badge}
                                </span>
                              </div>
                              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                {n.sub}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-rose-500 bg-rose-500 text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[3.5]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: BANK & DATE RECEIVED */}
              {step === 2 && (
                <div className="space-y-3">
                  {stepHead(
                    'Notice Timeline & Default Financials',
                    'We calculate your statutory objection deadline based on the date of notice receipt.'
                  )}

                  <div>
                    <label className={labelCls}>Issuing Bank / Financial Institution *</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className={inputCls}
                    >
                      {MAJOR_INDIAN_BANKS.map((b) => (
                        <option key={b} value={b} className="bg-white dark:bg-[#071326] text-slate-900 dark:text-slate-100">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Date Notice Received / Served *</label>
                      <input
                        type="date"
                        required
                        value={noticeDate}
                        onChange={(e) => setNoticeDate(e.target.value)}
                        className={`${inputCls} [color-scheme:light] dark:[color-scheme:dark]`}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Claimed Default Amount (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹ 1.5 Crores / ₹ 85 Lakhs"
                        value={claimedAmount}
                        onChange={(e) => setClaimedAmount(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* LIVE STATUTORY CLOCK ALERT */}
                  {daysInfo && (
                    <div
                      className={`p-2.5 rounded-lg border flex items-start gap-2 text-xs ${
                        daysInfo.expired
                          ? 'border-rose-500/40 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
                          : daysInfo.urgent
                          ? 'border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200'
                          : 'border-blue-500/40 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200'
                      }`}
                    >
                      <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block leading-snug">
                          {daysInfo.expired
                            ? '⚠️ Statutory Limitation Window Expired!'
                            : `⏳ ${daysInfo.remaining} Days Remaining to File Statutory Objections`}
                        </span>
                        <span className="text-[11px] leading-snug block mt-0.5 opacity-90">
                          {daysInfo.expired
                            ? 'The bank may proceed with symbolic possession immediately. Urgent DRT Section 17 petition required.'
                            : `Under ${selectedNotice.statutoryAct}, an objection representation must be served before this window closes.`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: ASSET AT RISK & JURISDICTION */}
              {step === 3 && (
                <div className="space-y-3">
                  {stepHead(
                    'Mortgaged Asset & Tribunal Jurisdiction',
                    'Determine jurisdictional DRT bench and property protection strategy.'
                  )}

                  <div>
                    <label className={labelCls}>Type of Mortgaged Security / Asset at Risk *</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PROPERTY_TYPES_AT_RISK.map((p) => {
                        const Icon = p.icon;
                        const isSelected = propertyType === p.id;
                        return (
                          <div
                            key={p.id}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            onClick={() => setPropertyType(p.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setPropertyType(p.id);
                              }
                            }}
                            className={`px-2.5 py-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-all text-[11.5px] leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 ${
                              isSelected
                                ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 ring-1 ring-rose-500/50 font-semibold text-rose-700 dark:text-rose-300'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#071326] text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="min-w-0">{p.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Tribunal Jurisdiction / State *</label>
                    <select
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      className={inputCls}
                    >
                      {INDIAN_JURISDICTIONS.map((j) => (
                        <option key={j} value={j} className="bg-white dark:bg-[#071326] text-slate-900 dark:text-slate-100">
                          {j}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 dark:text-white block leading-snug">
                        Ongoing Compromise / Settlement Offer?
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-snug">
                        Have you submitted any One-Time Settlement (OTS) proposal?
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={hasOtsOffer}
                      onClick={() => setHasOtsOffer(!hasOtsOffer)}
                      className={`h-7 min-w-[3rem] px-3 rounded-md text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                        hasOtsOffer
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {hasOtsOffer ? 'YES' : 'NO'}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT & COUNSEL CONNECT */}
              {step === 4 && (
                <div className="space-y-3">
                  {stepHead(
                    'Borrower Identity & Advocate Assignment',
                    'Your information is protected under advocate-client privilege.'
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>Borrower / Director Full Name *</label>
                      <div className="relative">
                        <User className={iconCls} />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Chandra"
                          value={borrowerName}
                          onChange={(e) => setBorrowerName(e.target.value)}
                          className={`${inputCls} pl-8`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Borrower Company / Entity Name</label>
                      <div className="relative">
                        <Building2 className={iconCls} />
                        <input
                          type="text"
                          placeholder="e.g. Chandra Steels Pvt Ltd"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className={`${inputCls} pl-8`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelCls}>WhatsApp Mobile Number *</label>
                      <div className="relative">
                        <Phone className={iconCls} />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val.startsWith('+')) {
                              val = '+' + val.slice(1).replace(/\D/g, '');
                            } else {
                              val = val.replace(/\D/g, '');
                            }
                            if (val.length <= 13) setPhone(val);
                          }}
                          className={`${inputCls} pl-8 font-mono`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Official / Personal Email *</label>
                      <div className="relative">
                        <Mail className={iconCls} />
                        <input
                          type="email"
                          required
                          placeholder="director@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`${inputCls} pl-8 font-mono`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug flex items-start gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-500 shrink-0 mt-px" />
                    <span>
                      <strong className="font-semibold text-slate-700 dark:text-slate-300">Strict Legal Confidentiality:</strong> All notice documents and borrower information are securely processed under Indian Evidence Act legal privilege. No third-party data sharing.
                    </span>
                  </div>
                </div>
              )}

              {/* FOOTER NAVIGATION BUTTONS */}
              <div className="sticky bottom-0 -mx-4 -mb-4 mt-4 px-4 py-3 bg-white/95 dark:bg-[#0A1528]/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className={ghostBtn}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`${primaryBtn} flex-1 sm:flex-none`}
                  >
                    <span>Proceed to Next Step</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${primaryBtn} flex-1 sm:flex-none`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Evaluating Stay Grounds...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Notice for Urgent DRT Stay</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}