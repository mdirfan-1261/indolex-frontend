'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FileCheck2,
  SendHorizontal,
  Gavel,
  Handshake,
  Landmark,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

/* UI-only helper: card viewport me aate hi smoothly reveal hota hai (once) */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={`h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 ${
        shown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'
      }`}
    >
      {children}
    </div>
  );
}

export default function RecoveryProcess({ onOpenClaim }) {
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (stepNum) => {
    setFailedImages((prev) => ({ ...prev, [stepNum]: true }));
  };

  const steps = [
    {
      step: '01',
      code: 'STAGE 01',
      phase: 'Evidentiary Audit',
      title: 'Forensic Claim Scrutiny & Ledger Reconciliation',
      desc: 'Independent legal audit of your contractual transaction trail: verifying purchase orders, delivery challans (POD), GST-2A tax credits, e-way bills, and debt acknowledgments.',
      statute: 'Sec 65B Indian Evidence Act & Commercial Contracts',
      badgeColor: 'border-orange-500/30 text-[#E05320] bg-orange-500/10',
      image: '/images/services/step-01.webp',
      icon: FileCheck2,
      deliverable: 'Evidentiary Audit Docket',
    },
    {
      step: '02',
      code: 'STAGE 02',
      phase: 'Institutional Intimation',
      title: 'Structured Pre-Litigation Legal Intimation Trail',
      desc: 'Transforming informal chasing into an institutional, documented legal demand track with registered intimations, debt verification notices, and statutory interest sheets.',
      statute: 'Pre-Litigation Verification & Evidentiary Log Trail',
      badgeColor: 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10',
      image: '/images/services/step-02.webp',
      icon: SendHorizontal,
      deliverable: 'Documented Demand Intimations',
    },
    {
      step: '03',
      code: 'STAGE 03',
      phase: 'Statutory Notice',
      title: 'High Court Advocate Legal Demand Notice',
      desc: 'Drafting and formal service of a statutory demand notice via Registered Speed Post & electronic transmission, establishing criminal and civil liability within statutory deadlines.',
      statute: 'Sec 138 NI Act, Sec 8 IBC & Order XXXVII CPC',
      badgeColor: 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10',
      image: '/images/services/step-03.webp',
      icon: Gavel,
      deliverable: '15-Day Registered Notice Docket',
    },
    {
      step: '04',
      code: 'STAGE 04',
      phase: 'Bilateral OTS',
      title: 'Commercial Conciliation & Binding OTS Deeds',
      desc: 'Where commercially advantageous, our legal negotiators chair bilateral settlement sessions to execute enforceable compromise deeds, escrow milestones, and installment guarantees.',
      statute: 'Arbitration & Conciliation Act / Binding Compromise Deed',
      badgeColor: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
      image: '/images/services/step-04.webp',
      icon: Handshake,
      deliverable: 'Enforceable Settlement Deed',
    },
    {
      step: '05',
      code: 'STAGE 05',
      phase: 'Judicial Escalation',
      title: 'Statutory Court Petition & Summary Suit Filing',
      desc: 'If the debtor evades payment, the claim immediately escalates to the designated statutory forum: MSEFC Samadhaan, Commercial Court Summary Suits, or Section 138 Magistrate Court.',
      statute: 'MSEFC Sec 18 / Commercial Courts Act 2015',
      badgeColor: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10',
      image: '/images/services/step-05.webp',
      icon: Landmark,
      deliverable: 'Court Petition & Interim Motions',
    },
    {
      step: '06',
      code: 'STAGE 06',
      phase: 'Decree Execution',
      title: 'Court Decree Execution & Asset Attachment',
      desc: 'Persistent on-ground execution of court recovery decrees: serving warrants of attachment, bank account garnishee orders, and asset realization until 100% financial recovery.',
      statute: 'Order XXI CPC (Execution of Decrees & Warrants)',
      badgeColor: 'border-slate-500/30 text-slate-700 dark:text-slate-300 bg-slate-500/10',
      image: '/images/services/step-06.webp',
      icon: ShieldCheck,
      deliverable: 'Garnishee Order & Asset Attachment',
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#071326] border-b border-slate-200/80 dark:border-slate-800/80">
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/[0.07]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* HEADER SECTION */}
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#E05320]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>INDOLEX STATUTORY RESOLUTION PROTOCOL</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Four-Phase Recovery Architecture.{' '}
              <span className="italic font-serif text-[#E05320] block sm:inline">
                Zero Unlawful Escalation.
              </span>
            </h2>

            <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl">
              Recovering commercial capital is an exact science of forensic evidence audit, statutory legal notices, and court decree execution. IndoLex enforces compliance strictly through constitutional Indian statutory remedies.
            </p>
          </div>
        </Reveal>

        {/* 6-STEP PROCESS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const hasError = failedImages[s.step];

            return (
              <Reveal key={s.step} delay={(i % 3) * 110}>
                <div className="group relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0A1528] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/50 flex flex-col">
                  {/* accent line that sweeps in on hover */}
                  <div className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#E05320] via-orange-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                  {/* CARD TOP: IMAGE */}
                  <div className="relative h-32 sm:h-36 w-full bg-slate-900 overflow-hidden border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
                    {!hasError ? (
                      <img
                        src={s.image}
                        alt={s.title}
                        onError={() => handleImageError(s.step)}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-[#071326] via-[#0A1528] to-[#0D1F3C] text-white">
                        <div className="h-10 w-10 rounded-xl bg-[#E05320]/20 text-[#E05320] border border-[#E05320]/30 flex items-center justify-center mb-1.5 shadow-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-orange-400">
                          {s.phase}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Upload: {s.image}
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

                    {/* Top-left code badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#071326]/85 backdrop-blur-md border border-white/20 text-orange-300">
                      {s.code}
                    </div>

                    {/* Top-right phase pill */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 dark:bg-[#0A1528]/95 backdrop-blur-md shadow border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E05320] animate-pulse motion-reduce:animate-none" />
                      <span>PHASE {s.step}</span>
                    </div>

                    {/* Bottom sub-label */}
                    <div className="absolute bottom-2 left-3 right-3 text-white flex items-center justify-between gap-2 pointer-events-none">
                      <span className="truncate text-[11px] font-medium text-slate-100 drop-shadow-sm">
                        {s.deliverable}
                      </span>
                      <span className="text-orange-300 text-[10px] font-mono shrink-0">
                        {s.step}/06
                      </span>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase truncate">
                          {s.phase}
                        </span>
                        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.badgeColor}`}>
                          Enforceable Track
                        </span>
                      </div>

                      <h3 className="text-base sm:text-[17px] font-serif font-bold text-slate-900 dark:text-white leading-snug transition-colors group-hover:text-[#E05320]">
                        {s.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        {s.desc}
                      </p>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/80 space-y-2">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-px" />
                        <span className="font-mono text-[10px] sm:text-[11px] leading-tight text-slate-600 dark:text-slate-300">
                          {s.statute}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={onOpenClaim}
                        className="w-full flex items-center justify-between text-xs font-semibold text-[#E05320] hover:text-[#C84518] pt-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 rounded-md"
                      >
                        <span>Deploy This Track</span>
                        <div className="h-6 w-6 rounded-full bg-orange-500/10 text-[#E05320] group-hover:bg-[#E05320] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}