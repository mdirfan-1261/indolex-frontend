'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Scale, Sparkles, CheckCircle2, Clock } from 'lucide-react';

/* UI-only helper: viewport me aate hi ek baar smoothly reveal hota hai */
function Reveal({ children, delay = 0, className = '' }) {
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
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

export default function ServicesBottomCta({ onOpenClaim, onOpenDefense }) {
  const trust = [
    { icon: CheckCircle2, color: 'text-emerald-500', label: '100% Attorney-Client Confidentiality' },
    { icon: Clock, color: 'text-[#E05320]', label: '48-Hour Evidentiary Review' },
    { icon: Scale, color: 'text-blue-500', label: 'Pan-India Jurisdiction' },
  ];

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-[#F8FAFC] dark:bg-[#060D17]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/[0.07]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-black/30 grid grid-cols-1 lg:grid-cols-12 items-stretch">

            {/* LEFT: PHOTO (5 cols) */}
            <div className="lg:col-span-5 relative h-44 sm:h-56 lg:h-auto bg-slate-100 dark:bg-slate-900 overflow-hidden">
              <img
                src="/images/services/successful-recovery.webp"
                alt="Commercial Legal Resolution & Capital Settlement"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* top status pill */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
                <span>Active Resolution Desk</span>
              </div>

              {/* bottom caption */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E05320] text-white uppercase tracking-wider">
                  Resolution Guaranteed
                </span>
                <p className="text-[11px] sm:text-xs text-slate-200 mt-1 font-light drop-shadow leading-snug">
                  Bilateral settlement &amp; enforceable court decrees across India.
                </p>
              </div>
            </div>

            {/* RIGHT: COPY + CTAs (7 cols) */}
            <div className="lg:col-span-7 p-5 sm:p-7 lg:p-9 flex flex-col justify-between gap-5">

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#E05320]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>START WITH LEGAL CLARITY</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Still waiting for a payment that should already be in your account?
                </h2>

                <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-xl">
                  Send your transaction dockets, unpaid invoices, or dishonoured cheque details. Our empanelled High Court recovery advocates evaluate statutory merits and limitation timelines before you decide how far to escalate.
                </p>
              </div>

              <div className="space-y-4">
                {/* BUTTONS: stacked on mobile, row from sm */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={onOpenClaim}
                    className="group/btn inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E05320] hover:bg-[#C84518] px-6 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#E05320]/25 hover:shadow-xl transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A1528]"
                  >
                    <span>Start Case Assessment</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenDefense}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-orange-500/40 transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#E05320]" />
                    <span>Notice Defense Desk</span>
                  </button>
                </div>

                {/* TRUST TILES */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {trust.map(({ icon: Icon, color, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-3 py-2 text-[11px] sm:text-xs font-medium leading-tight text-slate-600 dark:text-slate-300"
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}