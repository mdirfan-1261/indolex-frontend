'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/landing/Hero';
import NoticeDefenseBanner from '@/components/landing/NoticeDefenseBanner';
import StakeholderWorkflows from '@/components/landing/StakeholderWorkflows';
import PlatformShowcase from '@/components/landing/PlatformShowcase';
import NoteworthyIntegration from '@/components/landing/NoteworthyIntegration';
import InstitutionalTiers from '@/components/landing/InstitutionalTiers';
import CtaBanner from '@/components/landing/CtaBanner';
import Footer from '@/components/landing/Footer';
import DemoModal from '@/components/landing/DemoModal';
import BankNoticeDefenseModal from '@/components/landing/BankNoticeDefenseModal';

export default function HomePage() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showDefenseModal, setShowDefenseModal] = useState(false);

  // Listen for custom trigger from any banner or button
  useEffect(() => {
    const handleOpenDefense = () => setShowDefenseModal(true);
    window.addEventListener('open-notice-defense-modal', handleOpenDefense);
    return () => window.removeEventListener('open-notice-defense-modal', handleOpenDefense);
  }, []);

  return (
    <main className="flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#071326] transition-colors duration-300">
      {/* 1. HERO */}
      <Hero
        onOpenDemo={() => setShowDemoModal(true)}
        onOpenClaim={() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('open-claim-modal'));
          }
        }}
      />

      {/* 1.5 BANK NOTICE DEFENSE & DRT STAY BANNER (NEW: Advocate Vishnu Practice) */}
      <NoticeDefenseBanner onOpenDefense={() => setShowDefenseModal(true)} />

      {/* 2. CORE SOLUTIONS CARDS */}
      <StakeholderWorkflows />

      {/* 3. PLATFORM ARCHITECTURE SHOWCASE */}
      <PlatformShowcase onOpenDemo={() => setShowDemoModal(true)} />

      {/* 4. JUDICIAL INTEROPERABILITY (e-Courts Bridge) */}
      <NoteworthyIntegration />

      {/* 5. INSTITUTIONAL ECOSYSTEM */}
      <InstitutionalTiers />

      {/* 6. DEDICATED CTA BANNER */}
      <CtaBanner onOpenDemo={() => setShowDemoModal(true)} />

      {/* 7. PURE ENTERPRISE FOOTER */}
      <Footer />

      {/* 8. DEMO MODAL */}
      <DemoModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />

      {/* 9. BANK NOTICE DEFENSE & DRT STAY MODAL */}
      <BankNoticeDefenseModal
        isOpen={showDefenseModal}
        onClose={() => setShowDefenseModal(false)}
      />
    </main>
  );
}