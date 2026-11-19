'use client';

import { useState } from 'react';
import { PhoneCall, ShieldCheck, Lock, Search } from 'lucide-react';
import TrackInquiryModal from './TrackInquiryModal';

export default function TopBar() {
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block relative z-[60] w-full border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#050C1A] text-slate-600 dark:text-slate-300 transition-colors duration-200">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 text-[11px] font-medium">

          {/* LEFT: SARG DESK & RBI COMPLIANCE */}
          <div className="flex items-center gap-5">
            <a
              href="tel:+912269005390"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <PhoneCall className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" />
              <span>SARG Institutional Desk:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                +91 (022) 6900-5390
              </span>
            </a>

            <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>RBI IRAC &amp; SARFAESI Aligned Architecture</span>
            </span>
          </div>

          {/* RIGHT: 256-BIT SECURITY & TRACK REQUEST */}
          <div className="flex items-center gap-5 font-semibold">
            {/* Bank Security Badge */}
            <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-normal">
              <Lock className="h-3 w-3 text-emerald-500" />
              <span>256-Bit SSL Encrypted Banking Gateway</span>
            </span>

            <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

            {/* Single Non-Duplicate Action: Track Request */}
            <button
              type="button"
              onClick={() => setIsTrackOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#E05320] hover:text-[#C84518] dark:text-orange-400 dark:hover:text-orange-300 transition-colors cursor-pointer font-bold"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Track Request</span>
            </button>
          </div>

        </div>
      </div>

      {/* TRACK INQUIRY MODAL */}
      <TrackInquiryModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </>
  );
}