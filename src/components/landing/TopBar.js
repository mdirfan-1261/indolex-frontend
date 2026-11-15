'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  ShieldCheck,
  Lock,
  ChevronRight,
  Search,
  MessageSquare,
} from 'lucide-react';
import TrackInquiryModal from './TrackInquiryModal';
import DemoModal from './DemoModal';

export default function TopBar() {
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Strip any residual '#' from the URL address bar immediately
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <>
      <div className="hidden lg:block relative z-[60] w-full border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#050C1A] text-slate-600 dark:text-slate-300 transition-colors duration-200">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-2 sm:px-6 lg:min-h-[38px] lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:py-1.5">

          {/* LEFT: SUPPORT & COMPLIANCE */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] font-medium sm:text-[11px] lg:justify-start">
            <a
              href="tel:+91226900539"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <PhoneCall className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" />
              <span>Bank Stressed Asset Resolution Desk</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                +91 (022) 6900-LEX
              </span>
            </a>

            <span className="hidden h-3 w-px bg-slate-300 dark:bg-slate-700 sm:block" />

            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Regulatory Compliance Framework</span>
            </span>
          </div>

          {/* RIGHT: CLEAN ACTIONS & NO '#' IN ROUTES */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] font-semibold sm:gap-x-4 sm:text-[11px] lg:justify-end">
            
            {/* 1. Track Inquiry Button (Opens Live Tracker Modal - Zero #) */}
            <button
              type="button"
              onClick={() => setIsTrackOpen(true)}
              className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors cursor-pointer font-bold"
            >
              <Search className="h-3 w-3" />
              <span>Track Request</span>
            </button>

            <span className="hidden h-3 w-px bg-slate-300 dark:bg-slate-700 sm:block" />

            {/* 2. Contact Us (Opens Demo/Contact Modal - Zero #) */}
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="text-slate-600 dark:text-slate-300 transition-colors hover:text-blue-600 dark:hover:text-white cursor-pointer"
            >
              Contact Us
            </button>

            {/* 3. Regulatory Guidelines (Direct Real Page - Zero #) */}
            <Link
              href="/solutions/statutory-enforcement"
              className="text-slate-600 dark:text-slate-300 transition-colors hover:text-blue-600 dark:hover:text-white"
            >
              Regulatory Guidelines
            </Link>

            <span className="hidden h-3 w-px bg-slate-300 dark:bg-slate-700 sm:block" />

            {/* 4. Bank SARG Login (Direct Auth Page - Zero #) */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 transition-colors hover:text-amber-700 dark:hover:text-amber-300"
            >
              <Lock className="h-3 w-3" />
              <span>Bank SARG Login</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

        </div>
      </div>

      {/* TRACK INQUIRY MODAL */}
      <TrackInquiryModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />

      {/* CONTACT / DEMO MODAL */}
      <DemoModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}