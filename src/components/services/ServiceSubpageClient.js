'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import ClaimAssessmentModal from '@/components/landing/ClaimAssessmentModal';
import BankNoticeDefenseModal from '@/components/landing/BankNoticeDefenseModal';

export default function ServiceSubpageClient({ serviceBadge }) {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);

  return (
    <>
      {/* HERO BUTTONS */}
      <div className="pt-2 flex flex-wrap items-center gap-3.5">
        <button
          type="button"
          onClick={() => setIsClaimModalOpen(true)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E05320] hover:bg-[#C84518] px-6 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#E05320]/25 transition-all cursor-pointer transform active:scale-95"
        >
          <span>Initiate Legal Assessment</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setIsDefenseModalOpen(true)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          <ShieldCheck className="h-4 w-4 text-[#E05320]" />
          <span>Notice Defense Desk</span>
        </button>
      </div>

      {/* BOTTOM CTA BUTTON */}
      <div id="subpage-audit-trigger" className="hidden">
        <button
          type="button"
          id="open-subpage-claim"
          onClick={() => setIsClaimModalOpen(true)}
        />
      </div>

      {/* POPUP MODALS */}
      <ClaimAssessmentModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      />
      <BankNoticeDefenseModal
        isOpen={isDefenseModalOpen}
        onClose={() => setIsDefenseModalOpen(false)}
      />
    </>
  );
}

export function SubpageBottomTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E05320] hover:bg-[#C84518] px-8 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#E05320]/25 transition-all cursor-pointer transform active:scale-95"
      >
        <span>Submit Case for Legal Audit</span>
        <ArrowRight className="h-4 w-4" />
      </button>

      <ClaimAssessmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
