'use client';

import { useState } from 'react';
import {
  X,
  Scale,
  Gavel,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  ArrowRight,
  Landmark,
  ShieldCheck,
  Award,
} from 'lucide-react';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://indolex-backend.onrender.com/api';

const SPECIALIZATIONS = [
  'SARFAESI & DRT Litigation',
  'Insolvency & Bankruptcy Code (NCLT)',
  'Section 138 NI Act Cheque Bounce',
  'High Court Commercial Writs & Appeals',
  'Title Search & Property Due Diligence',
];

export default function AdvocateEmpanelmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    advocateName: '',
    barCouncilEnrollmentNumber: '',
    firmName: '',
    specialization: SPECIALIZATIONS[0],
    courtPractice: '',
    phone: '',
    email: '',
    chambersAddress: '',
    leadBankEmpanelled: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedBarId, setSubmittedBarId] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (
      !formData.advocateName.trim() ||
      !formData.barCouncilEnrollmentNumber.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      setErrorMessage('Please fill in Advocate Name, Bar Council ID, Phone, and Email.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/advocates/public/empanel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (!res.ok && !data.success) {
        throw new Error(data.message || 'Empanelment application failed');
      }

      setSubmittedBarId(formData.barCouncilEnrollmentNumber.trim().toUpperCase());
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || 'Error submitting empanelment request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071326] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#E05320]/30 focus:border-[#E05320] transition-colors';
  const labelCls =
    'block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 px-3 py-4 sm:py-8 backdrop-blur-md font-sans"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden my-auto animate-in fade-in duration-200">
        
        {/* TOP ACCENT LINE */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500" />

        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Advocate Panel Network
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                  Bar Council Verified
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-serif font-normal text-slate-900 dark:text-white leading-tight">
                Empanel as Legal Recovery Counsel
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-6">
          {submitted ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-5 space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Application Under SARG Verification
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-slate-900 dark:text-white mt-1">
                  Empanelment Dossier Submitted
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Your credentials have been registered in the IndoLex National Advocate Governance Registry.
                </p>
                <div className="inline-block mt-2 font-mono text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-lg border border-blue-500/30">
                  Bar Council ID: {submittedBarId}
                </div>
              </div>

              {/* VERIFICATION DETAILS CARD */}
              <div className="text-left rounded-xl bg-slate-50 dark:bg-[#071326] p-4 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Status: <strong>Under SARG Review (Pending Bar Council Register Match)</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-[11.5px]">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Allocated Forum: <strong>{formData.courtPractice || 'High Court / DRT Benches'}</strong></span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
                  Our Institutional SARG Legal Directorate will verify your enrollment credentials with the state Bar Council register within 2 business days. You will receive an official onboarding confirmation on <strong>{formData.email}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs transition-colors cursor-pointer"
              >
                Close &amp; Return to Platform
              </button>
            </div>
          ) : (
            /* APPLICATION FORM */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ADVOCATE NAME & BAR ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Advocate / Counsel Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      name="advocateName"
                      placeholder="e.g. Adv. Rajeshwar Sharma"
                      value={formData.advocateName}
                      onChange={handleChange}
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Bar Council Enrollment Number *</label>
                  <div className="relative">
                    <Award className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      name="barCouncilEnrollmentNumber"
                      placeholder="e.g. MAH/1452/2012 or D/2018/2009"
                      value={formData.barCouncilEnrollmentNumber}
                      onChange={handleChange}
                      className={`${inputCls} pl-8 font-mono uppercase`}
                    />
                  </div>
                </div>
              </div>

              {/* LAW FIRM & SPECIALIZATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Law Firm / Chambers Name (Optional)</label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="firmName"
                      placeholder="e.g. Sharma & Associates Legal Chambers"
                      value={formData.firmName}
                      onChange={handleChange}
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Primary Legal Specialization *</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* COURTS OF PRACTICE & EXISTING BANK PANEL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Regular Courts of Practice *</label>
                  <div className="relative">
                    <Gavel className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      name="courtPractice"
                      placeholder="e.g. Delhi High Court, DRT-I, DRT-II"
                      value={formData.courtPractice}
                      onChange={handleChange}
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Existing Bank / ARC Empanelment (Optional)</label>
                  <div className="relative">
                    <Landmark className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="leadBankEmpanelled"
                      placeholder="e.g. SBI, PNB, Canara Bank or Independent"
                      value={formData.leadBankEmpanelled}
                      onChange={handleChange}
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>
              </div>

              {/* PHONE & EMAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Official Mobile / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputCls} pl-8 font-mono`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Official Institutional Email *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      name="email"
                      placeholder="advocate@barcouncil.org"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputCls} pl-8 font-mono`}
                    />
                  </div>
                </div>
              </div>

              {/* CHAMBERS ADDRESS */}
              <div>
                <label className={labelCls}>Chambers / Office Address</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="chambersAddress"
                    placeholder="e.g. Chambers No. 412, Delhi High Court Block, New Delhi - 110003"
                    value={formData.chambersAddress}
                    onChange={handleChange}
                    className={`${inputCls} pl-8`}
                  />
                </div>
              </div>

              {/* BAR COUNCIL DECLARATION */}
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 leading-tight">
                ⚖️ <strong>Bar Council Declaration:</strong> By submitting, you affirm that you are an actively enrolled advocate with the State Bar Council and possess no pending professional misconduct proceedings.
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md shadow-blue-900/30 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying Bar Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Panel Empanelment Application</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}