'use client';

import React, { useState } from 'react';

import ServicesHero from '@/components/services/ServicesHero';
import RecoveryProcess from '@/components/services/RecoveryProcess';
import CaseTypesGrid from '@/components/services/CaseTypesGrid';
import LegalRemediesSection from '@/components/services/LegalRemediesSection';
import ServicesBottomCta from '@/components/services/ServicesBottomCta';

import ClaimAssessmentModal from '@/components/landing/ClaimAssessmentModal';
import BankNoticeDefenseModal from '@/components/landing/BankNoticeDefenseModal';

export default function ServicesPage() {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060D17] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* 1. Hero Section (Left Headlines & Right Photographic Chambers Visual) */}
      <ServicesHero
        onOpenClaim={() => setIsClaimModalOpen(true)}
        onOpenDefense={() => setIsDefenseModalOpen(true)}
      />

      {/* 2. 6-Phase Statutory Recovery Architecture (With 6 Dedicated Real Images) */}
      <RecoveryProcess
        onOpenClaim={() => setIsClaimModalOpen(true)}
      />

      {/* 3. Statutory Practice Domains (9 Domains with Tags Linking to Full Subpages) */}
      <CaseTypesGrid />

      {/* 4. Interactive Judicial Enforcement Cockpit & Legal Dossier */}
      <LegalRemediesSection
        onOpenClaim={() => setIsClaimModalOpen(true)}
      />

      {/* 5. Enterprise Resolution & Final Intake Banner */}
      <ServicesBottomCta
        onOpenClaim={() => setIsClaimModalOpen(true)}
        onOpenDefense={() => setIsDefenseModalOpen(true)}
      />

      {/* POPUP MODALS */}
      <ClaimAssessmentModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      />
      <BankNoticeDefenseModal
        isOpen={isDefenseModalOpen}
        onClose={() => setIsDefenseModalOpen(false)}
      />

    </div>
  );
}
