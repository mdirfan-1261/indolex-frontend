'use client';

import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  Video,
  AlertCircle,
  Scale,
  Building2,
  User,
  ArrowRight,
  Loader2,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function TrackInquiryModal({ isOpen, onClose }) {
  const [refInput, setRefInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [inquiryData, setInquiryData] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!refInput.trim()) return;

    setLoading(true);
    setError('');
    setInquiryData(null);

    try {
      const res = await fetch(`${API_BASE}/crm/inquiries?ref=${encodeURIComponent(refInput.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success || !data.data || data.data.length === 0) {
        throw new Error('No inquiry found matching this Reference Number. Please check and try again.');
      }

      setInquiryData(data.data[0]);
    } catch (err) {
      setError(err.message || 'Error tracking inquiry');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'New Inbound':
        return 1;
      case 'Contacted':
        return 2;
      case 'Demo Scheduled':
        return 3;
      case 'Converted':
        return 4;
      default:
        return 1;
    }
  };

  const step = inquiryData ? getStatusStep(inquiryData.status) : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1B2E] p-6 sm:p-8 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              Track Demo & Consultation Status
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Enter your statutory inquiry reference number
            </p>
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleTrack} className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              required
              placeholder="e.g. INQ-2026-0101"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071326] px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 font-mono uppercase tracking-wider outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Track</span>}
          </button>
        </form>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Live Result Docket */}
        {inquiryData && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Status Progress Stepper */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3 text-[11px]">
                <span className="font-semibold text-slate-500">Live Stage:</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-bold text-[10px]">
                  {inquiryData.status}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1 text-center">
                <div className={`p-1.5 rounded-lg text-[9.5px] font-medium ${step >= 1 ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                  1. Registered
                </div>
                <div className={`p-1.5 rounded-lg text-[9.5px] font-medium ${step >= 2 ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                  2. Review
                </div>
                <div className={`p-1.5 rounded-lg text-[9.5px] font-medium ${step >= 3 ? 'bg-orange-500 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                  3. Scheduled
                </div>
                <div className={`p-1.5 rounded-lg text-[9.5px] font-medium ${step >= 4 ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                  4. Converted
                </div>
              </div>
            </div>

            {/* Applicant & Meeting Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-400">Applicant:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {inquiryData.firstName} {inquiryData.lastName} ({inquiryData.organization})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Official Email:</span>
                <span className="font-mono text-sky-600 dark:text-sky-400">{inquiryData.email}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Assigned Desk:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Adv. Rajeshwar Sharma (SARG Solutions)
                </span>
              </div>

              {/* Virtual Meeting Join Link */}
              <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="https://meet.google.com/ind-sarg-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/10 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Virtual Demo Meeting (Google Meet)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}