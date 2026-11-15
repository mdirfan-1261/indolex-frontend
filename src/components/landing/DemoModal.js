
'use client';

import { useState, useEffect } from 'react';
import { X, Scale, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = 'https://indolex-backend.onrender.com/api';

export default function DemoModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    organization: '',
    phoneNumber: '',
    country: 'India',
    organizationType: 'bank',
  });

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setLoading(false);
      setErrorMessage('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        organization: '',
        phoneNumber: '',
        country: 'India',
        organizationType: 'bank',
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${API_BASE}/crm/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit demo request. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || 'Connection error with IndoLex Server.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1728] px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20';

  const labelClass =
    'mb-1 block text-[11px] font-semibold text-slate-700 dark:text-slate-300';

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 px-3 py-5 backdrop-blur-md sm:py-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FBF9F5] dark:bg-[#0D1B2E] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[88vh] overflow-y-auto p-5 sm:p-6">
          <div className="mb-5 text-center">
            <div className="mb-2 inline-flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white">
                <Scale className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                INDOLEX LAWS
              </span>
            </div>

            <h2 className="mt-1 font-serif text-xl font-normal text-slate-900 dark:text-white sm:text-2xl">
              Book a demo with IndoLex Laws
            </h2>

            <p className="mx-auto mt-1.5 max-w-md text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              Connect with our legal-tech team for SARFAESI 2002 automation, DRT/NCLT litigation, and RBI IRAC compliant debt recovery.
            </p>
          </div>

          {submitted ? (
            <div className="py-7 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Demo Session Requested!
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Thank you, <strong>{formData.firstName}</strong>. Your institutional request has been registered in our CRM. Our Solution Architect will contact your institution within 24 hours.
              </p>

              <button
                onClick={onClose}
                className="mt-5 cursor-pointer rounded-lg bg-orange-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-700"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              {errorMessage && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-2.5 text-xs text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    First Name <span className="text-orange-600">*</span>
                  </label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter first name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Last Name <span className="text-orange-600">*</span>
                  </label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter last name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Email Address <span className="text-orange-600">*</span>
                </label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="nodal.officer@bank.com"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Job Title <span className="text-orange-600">*</span>
                  </label>
                  <input
                    required
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g. Chief Legal Officer / AGM"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Firm or Organization <span className="text-orange-600">*</span>
                  </label>
                  <input
                    required
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g. State Bank of India / HDFC"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Country <span className="text-orange-600">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Organization Type <span className="text-orange-600">*</span>
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="bank">Scheduled Commercial Bank</option>
                    <option value="nbfc">NBFC / Financial Institution</option>
                    <option value="lawfirm">Law Firm / Advocates</option>
                    <option value="arc">Asset Reconstruction Co. (ARC)</option>
                    <option value="consultant">Corporate Debt Consultant</option>
                  </select>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#EA580C] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-orange-900/20 transition-all duration-200 hover:scale-[1.01] hover:bg-[#C2410C] disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Schedule Your Demo</span>
                  )}
                </button>
              </div>

              <p className="pt-1 text-center text-[10px] text-slate-500">
                By submitting this form, you agree to IndoLex Laws processing your corporate information for institutional presentation.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
