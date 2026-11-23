'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ClaimEstimator({ onOpenClaim }) {
  const [calcPrincipal, setCalcPrincipal] = useState(2000000); // 20 Lakhs
  const [calcOverdueDays, setCalcOverdueDays] = useState(90);
  const [statuteCategory, setStatuteCategory] = useState('MSME');

  const computeClaim = () => {
    const P = Number(calcPrincipal) || 0;
    const days = Number(calcOverdueDays) || 0;
    const years = days / 365;

    if (statuteCategory === 'MSME') {
      const rate = 0.195; // 3x RBI Bank Rate ~19.5% p.a. monthly compound
      const months = Math.max(1, Math.round(days / 30));
      const compound = P * Math.pow(1 + rate / 12, months);
      const interest = Math.round(compound - P);
      return {
        statute: 'Section 16, MSMED Act, 2006',
        rateDesc: '19.50% p.a. (3x RBI Bank Rate Compound Monthly)',
        interest,
        gross: P + interest,
        forum: 'State Micro & Small Enterprises Facilitation Council (MSEFC Samadhaan)',
        viability: 'Statutory Buyer Liability Applicable',
      };
    } else if (statuteCategory === 'CHEQUE') {
      const rate = 0.18;
      const interest = Math.round(P * rate * years);
      return {
        statute: 'Section 138 & 143A, Negotiable Instruments Act, 1881',
        rateDesc: '18% Commercial Interest + 20% Interim Compensation',
        interest,
        gross: P + interest,
        forum: 'Jurisdictional Magistrate Court (Criminal Liability u/s 138)',
        viability: 'Very High (Criminal Strict Liability on Drawer)',
      };
    } else {
      const rate = 0.18;
      const interest = Math.round(P * rate * years);
      return {
        statute: 'Order XXXVII CPC & Commercial Courts Act, 2015',
        rateDesc: '18.00% Commercial Default Rate (Interest Act, 1978)',
        interest,
        gross: P + interest,
        forum: 'Designated Commercial Court (Fast-Track Summary Suit)',
        viability: days > 1095 ? 'Limitation Period Review Needed' : 'Actionable Documented Debt',
      };
    }
  };

  const res = computeClaim();

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#E05320] block">
          INTERACTIVE STATUTORY TOOL
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mt-1">
          Statutory Interest &amp; Claim Viability Estimator
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Under Indian law, delayed commercial payments attract statutory interest. Calculate what is legally claimable under MSMED Act, Section 138, or Commercial Courts Act.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] shadow-md space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Statutory Regime
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'MSME', label: 'MSMED Act (3x)' },
                { id: 'CHEQUE', label: 'NI Act Sec 138' },
                { id: 'B2B', label: 'Order 37 CPC' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setStatuteCategory(btn.id)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    statuteCategory === btn.id
                      ? 'border-[#E05320] bg-orange-500/10 text-[#E05320]'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Principal Default Amount</span>
              <span className="font-mono text-[#E05320]">{formatINR(calcPrincipal)}</span>
            </div>
            <input
              type="number"
              value={calcPrincipal}
              onChange={(e) => setCalcPrincipal(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071326] text-xs font-mono font-bold"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Default Duration (Days Overdue)</span>
              <span className="font-mono text-[#E05320]">{calcOverdueDays} Days</span>
            </div>
            <input
              type="range"
              min="30"
              max="730"
              step="15"
              value={calcOverdueDays}
              onChange={(e) => setCalcOverdueDays(Number(e.target.value))}
              className="w-full accent-[#E05320] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>30D</span>
              <span>90D (NPA)</span>
              <span>180D</span>
              <span>365D (1 Year)</span>
              <span>2 Years</span>
            </div>
          </div>
        </div>

        {/* OUTPUT REPORT */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-white to-orange-50/20 dark:from-[#0A1528] dark:to-[#0A1528] shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#E05320] block">
                LEGAL ENTITLEMENT SUMMARY
              </span>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mt-0.5">
                {res.statute}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
              {res.viability}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Principal Debt</span>
              <span className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white">
                {formatINR(calcPrincipal)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Statutory Interest</span>
              <span className="text-sm sm:text-base font-mono font-bold text-[#E05320]">
                +{formatINR(res.interest)}
              </span>
              <span className="text-[9px] text-slate-400 block truncate">{res.rateDesc}</span>
            </div>

            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#E05320] font-semibold block">Total Actionable Claim</span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#E05320]">
                {formatINR(res.gross)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#071326] border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">Jurisdictional Forum:</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11.5px] leading-relaxed">
              {res.forum}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenClaim}
            className="w-full h-10 rounded-xl bg-[#E05320] hover:bg-[#C84518] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span>Submit Claim Intake for {formatINR(res.gross)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}