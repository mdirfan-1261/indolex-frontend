
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';

const DemoModal = dynamic(
  () => import('@/components/landing/DemoModal'),
  { ssr: false }
);

export default function SARGDemoButton({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <span>Schedule SARG Executive Briefing</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <DemoModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
