'use client';

import { useState } from 'react';
import Hero from '@/components/landing/Hero';
import StakeholderWorkflows from '@/components/landing/StakeholderWorkflows';
import PlatformShowcase from '@/components/landing/PlatformShowcase';
import NoteworthyIntegration from '@/components/landing/NoteworthyIntegration';
import InstitutionalTiers from '@/components/landing/InstitutionalTiers';
import CtaBanner from '@/components/landing/CtaBanner';
import Footer from '@/components/landing/Footer';
import DemoModal from '@/components/landing/DemoModal';

export default function HomePage() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <main className="flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#071326] transition-colors duration-300">
      {/* 1. HERO */}
      <Hero onOpenDemo={() => setShowDemoModal(true)} />

      {/* 2. CORE SOLUTIONS CARDS */}
      <StakeholderWorkflows />

      {/* 3. PLATFORM ARCHITECTURE SHOWCASE */}
      <PlatformShowcase onOpenDemo={() => setShowDemoModal(true)} />

      {/* 4. JUDICIAL INTEROPERABILITY (e-Courts Bridge) */}
      <NoteworthyIntegration />

      {/* 5. INSTITUTIONAL ECOSYSTEM */}
      <InstitutionalTiers />

      {/* 6. DEDICATED CTA BANNER (Separate Component) */}
      <CtaBanner onOpenDemo={() => setShowDemoModal(true)} />

      {/* 7. PURE ENTERPRISE FOOTER (Separate Component) */}
      <Footer />

      {/* 8. DEMO MODAL */}
      <DemoModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />
    </main>
  );
}