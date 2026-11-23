'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Scale,
  Building2,
  Landmark,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Gavel,
  Clock,
  Sparkles,
  FileText,
} from 'lucide-react';

import ClaimAssessmentModal from '@/components/landing/ClaimAssessmentModal';
import BankNoticeDefenseModal from '@/components/landing/BankNoticeDefenseModal';
import DemoModal from '@/components/landing/DemoModal';
import Footer from '@/components/landing/Footer';

/* UI-only helper: smooth reveal once element enters viewport */
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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

export default function AboutPage() {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);
  const [storyImgError, setStoryImgError] = useState(false);

  // 3 Core Distinctions
  const pillars = [
    {
      num: '01',
      title: 'Statutory Infallibility',
      law: 'SARFAESI 2002 \u2022 IBC 2016 \u2022 Sec 138 NI Act',
      desc: 'Every legal demand notice, possession application, and petition is drafted against codified statutory provisions to ensure zero procedural loopholes or dismissal risks in DRT or NCLT.',
    },
    {
      num: '02',
      title: 'Courtroom-Admissible Evidence',
      law: 'Section 65B Indian Evidence Act / BSA 2023',
      desc: 'Automated India Post API speed post delivery logs cryptographically signed with SHA-256 hashes, generating instant Section 65B electronic certificates accepted across High Courts.',
    },
    {
      num: '03',
      title: 'Algorithmic OTS & Consensual Resolution',
      law: 'RBI Prudential Master Directions',
      desc: 'Transparent Net Present Value (NPV) compromise modeling comparing settlement payouts against distressed liquidation timelines, protecting bank recovery officers from audit scrutiny.',
    },
  ];

  // Verified Scale Highlights
  const keyMetrics = [
    { value: '\u20B94,850+ Cr', label: 'Stressed Assets Monitored', sub: 'Across Scheduled Banks & NBFCs' },
    { value: '120+', label: 'Empanelled Banking Desks', sub: 'Zonal & Circle Recovery Offices' },
    { value: '39 DRTs & 15 NCLTs', label: 'Judicial Sync', sub: 'Live e-Courts Cause-Lists' },
    { value: '48 Hours', label: 'Evidentiary Audit', sub: 'Statutory Notice Dispatch Time' },
  ];

  // Sovereign Locations
  const nodalCentres = [
    { city: 'Mumbai (Headquarters)', address: 'SARG Operations Directorate, Nariman Point Financial Hub', phone: '+91 (022) 6900-539' },
    { city: 'New Delhi', address: 'Judicial Liaison & DRAT Chambers, Barakhamba Road', phone: '+91 (011) 4100-LEX' },
    { city: 'Bengaluru', address: 'Commercial Recovery & IT Asset Wing, MG Road', phone: '+91 (080) 2500-LEX' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#060D17] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

      {/* HANGING FRAME ANIMATION */}
      <style jsx global>{`
        @keyframes hangingSway {
          0%, 100% {
            transform: rotate(-1.5deg) translateY(0px);
          }
          50% {
            transform: rotate(1.5deg) translateY(6px);
          }
        }
        .animate-hanging-frame {
          transform-origin: top center;
          animation: hangingSway 7s ease-in-out infinite;
        }
        .animate-hanging-frame:hover {
          animation-play-state: paused;
          transform: rotate(0deg) translateY(0px);
          transition: transform 0.4s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-hanging-frame {
            animation: none;
          }
        }
      `}</style>

      {/* ==================== 1. HERO (Image on Right) ==================== */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pb-20 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="pointer-events-none absolute top-0 right-1/4 w-80 h-80 bg-[#E05320]/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

            {/* Left Column: Mission & Statement */}
            <Reveal className="lg:col-span-7">
              <div className="space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E05320]" />
                  <span>IndoLex Laws &bull; Institutional Profile</span>
                </div>

                <h1 className="text-[1.65rem] sm:text-4xl lg:text-[2.75rem] font-serif font-bold text-slate-900 dark:text-white leading-[1.18] tracking-tight">
                  Pioneering Sovereign{' '}
                  <span className="bg-gradient-to-r from-[#E05320] via-amber-600 to-[#C84518] bg-clip-text text-transparent">
                    Banking Recovery Architecture
                  </span>{' '}
                  Across India.
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  IndoLex Laws was founded with a single uncompromising mission: to bridge the critical divide between Indian statutory recovery laws (SARFAESI Act, IBC 2016, DRT, and Section 138 NI Act) and enterprise execution technology.
                </p>

                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  We empower Scheduled Commercial Banks, Asset Reconstruction Companies (ARCs), and High Court legal panels to recover delinquent portfolios swiftly, transparently, and with total evidentiary infallibility before tribunals.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsClaimModalOpen(true)}
                    className="group inline-flex h-11 items-center justify-center gap-2 px-6 rounded-xl bg-[#E05320] hover:bg-[#C84518] text-white text-sm font-semibold shadow-lg shadow-[#E05320]/25 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                  >
                    <span>Initiate Case Assessment</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <Link
                    href="/services"
                    className="inline-flex h-11 items-center justify-center gap-2 px-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-orange-500/40 text-slate-800 dark:text-slate-100 text-sm font-semibold transition-all shadow-sm"
                  >
                    <span>Explore 9 Practice Domains</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </div>

                {/* Trust chips */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                  {['RBI IRAC Directives Aligned', 'ISO 27001 Controls', 'Section 65B Audit Trail'].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 px-2.5 py-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: "Latka Jaisa" Hanging Frame with IMAGE 1 */}
            <Reveal className="lg:col-span-5" delay={150}>
              <div className="relative flex justify-center pt-12">
                <div className="relative w-full max-w-[21rem] sm:max-w-md">

                  {/* Wall pin + cord */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-lg ring-2 ring-amber-300/60 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-950/80 shadow-inner" />
                    </div>
                    <div className="w-1 h-10 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-700 shadow-md" />
                  </div>

                  {/* Frame */}
                  <div className="animate-hanging-frame relative rounded-2xl p-1.5 bg-gradient-to-b from-amber-400/50 via-slate-300/40 dark:via-slate-700/50 to-amber-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.85)] border border-amber-500/30">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400 border-2 border-amber-700 shadow-sm z-20" />

                    <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#0E1E36] via-[#091527] to-[#040A14] text-white p-4 sm:p-5 border border-white/10">
                      
                      {/* Metallic Corner Studs */}
                      <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow z-10" />
                      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow z-10" />
                      <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow z-10" />
                      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow z-10" />

                      {/* IMAGE 1: HERO HANGING PHOTOGRAPH */}
                      <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/15 bg-gradient-to-br from-slate-900 via-[#0B1728] to-slate-950 shadow-inner group">
                        {!heroImgError ? (
                          <>
                            <Image
                              src="/images/about/about-hero.png"
                              alt="IndoLex Laws SARG Executive Recovery Chambers, Nariman Point, Mumbai"
                              fill
                              sizes="(max-width: 768px) 100vw, 450px"
                              priority
                              onError={() => setHeroImgError(true)}
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E36] via-transparent to-transparent opacity-60 pointer-events-none" />
                          </>
                        ) : (
                          /* Fallback Seal */
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E05320] via-amber-600 to-[#C84518] p-0.5 shadow-lg shadow-[#E05320]/25">
                              <div className="w-full h-full rounded-2xl bg-[#091527] flex items-center justify-center">
                                <Scale className="h-8 w-8 text-amber-400" />
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-serif font-bold text-white tracking-wide">
                                SARG Executive Chambers
                              </div>
                              <div className="text-[10px] font-mono tracking-widest uppercase text-amber-400/90 mt-0.5">
                                Nariman Point, Mumbai
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Subtle Engraved Brass Plaque */}
                      <div className="mt-2.5 pt-2 border-t border-amber-500/25 flex items-center justify-between text-[11px] text-amber-200/90">
                        <span className="font-serif font-semibold tracking-wide">
                          IndoLex Laws Chambers
                        </span>
                        <span className="text-[10px] font-mono text-amber-400/80">
                          Nariman Point &bull; Mumbai
                        </span>
                      </div>

                    </div>
                  </div>

                  <div className="mx-auto mt-3 w-40 h-2.5 rounded-full bg-black/20 dark:bg-black/60 blur-md" />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ==================== 2. KEY METRICS ==================== */}
      <section className="py-8 sm:py-10 bg-white dark:bg-[#0A1528] border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {keyMetrics.map((item, idx) => (
              <Reveal key={idx} delay={idx * 90} className="h-full">
                <div className="group h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#071326] p-3.5 sm:p-4 border-l-2 border-l-[#E05320] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-500/40">
                  <div className="text-lg sm:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {item.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {item.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {item.sub}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. EDITORIAL SPLIT (Image on Left) ==================== */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-[#071326] border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left: IMAGE 2 - Grounded Executive Editorial Photograph */}
            <Reveal className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-900 group">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                  {!storyImgError ? (
                    <>
                      <Image
                        src="/images/about/about-resolution.jpeg"
                        alt="IndoLex High-Stakes Banking Recovery & Tribunal Resolution Session"
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        onError={() => setStoryImgError(true)}
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    /* Fallback Card if image 2 is pending upload */
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0A1528] to-[#040A14] text-white text-center space-y-3">
                      <div className="h-14 w-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                        <Gavel className="h-7 w-7" />
                      </div>
                      <div className="text-sm font-serif font-bold text-white">
                        Tribunal &amp; SARFAESI Enforcement
                      </div>
                      <div className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        NCLT IBC Insolvency &amp; DRT Original Application (OA-19) Resolution Directorate.
                      </div>
                    </div>
                  )}
                </div>

                {/* Grounded Editorial Caption Plaque */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-0.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Statutory Evidence Desk</span>
                  </div>
                  <div className="text-sm font-serif font-semibold text-white">
                    Corporate Debt Realization &amp; Courtroom Integrity
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Ensuring zero limitation lapses across 39 DRT and 15 NCLT benches nationwide.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Institutional Story Narrative */}
            <Reveal className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E05320]/10 text-[#E05320] text-xs font-bold uppercase tracking-wider">
                <Gavel className="h-3.5 w-3.5" />
                <span>The Recovery Imperative</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Resolving India&apos;s &#8377;8.5 Lakh Crore Stressed Asset Bottleneck
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                For years, corporate default recovery in Indian banking remained trapped in physical paper files, lost postal acknowledgment cards, and missed statutory limitation clocks. A single clerical defect in a SARFAESI Section 13(2) notice could stall physical possession for up to two years before tribunals.
              </p>

              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                IndoLex was conceived by senior banking recovery heads and High Court litigators to replace fragmented spreadsheets with an automated, court-admissible judicial pipeline. We give creditors total control from the first default trigger to final recovery decree execution.
              </p>

              <div className="pt-2 border-l-2 border-[#E05320] pl-4 space-y-1">
                <div className="text-xs sm:text-sm font-serif italic text-slate-800 dark:text-slate-200">
                  &ldquo;Speed in statutory recovery is built upon evidentiary infallibility before the Bench.&rdquo;
                </div>
                <div className="text-[11px] text-[#E05320] font-semibold">
                  &mdash; SARG Legal Directorate &amp; Advisory Council
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ==================== 4. 3 ARCHITECTURAL PILLARS ==================== */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

          <Reveal>
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#E05320]/10 text-[#E05320] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Building2 className="h-3.5 w-3.5" />
                <span>Core Architecture</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Built Specifically for Corporate Debt Resolution &amp; Banking Litigators
              </h2>

              <p className="text-[13px] sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Traditional debt recovery in India suffers not from a lack of laws, but from clerical and procedural breakdown. IndoLex solves this through three non-negotiable architectural tenets:
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {pillars.map((p, idx) => (
              <Reveal key={idx} delay={idx * 110} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-5 sm:p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10 hover:border-[#E05320]/50">
                  <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#E05320] via-orange-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="pointer-events-none absolute -right-1 -top-3 select-none text-6xl font-serif font-bold text-slate-900/[0.04] dark:text-white/[0.05]">
                    {p.num}
                  </div>

                  <div className="relative">
                    <div className="text-[10px] sm:text-xs font-mono font-bold text-[#E05320] mb-2">
                      ARCHITECTURAL PILLAR {p.num}
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                      {p.title}
                    </h3>

                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3">
                      {p.law}
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="relative mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Statutory Standard Verified</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 5. NODAL HUBS ==================== */}
      <section className="py-10 sm:py-14 bg-white dark:bg-[#0A1528] border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal>
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
                Nodal Recovery Chambers Across India
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400">
                Coordinating on-ground physical possession warrants and DRT appearances in all major financial zones.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {nodalCentres.map((node, idx) => (
              <Reveal key={idx} delay={idx * 100} className="h-full">
                <div className="group h-full p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-500/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E05320]">
                    <div className="h-7 w-7 shrink-0 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span>{node.city}</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {node.address}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {node.phone}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 6. CTA BANNER ==================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-[#0A1528] via-[#071326] to-[#040A14] text-white">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-[#E05320]/15 blur-3xl" />

        <Reveal>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5 relative z-10">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05320]/20 text-[#E05320] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#E05320]/30">
              <Landmark className="h-3.5 w-3.5" />
              <span>Institutional Consultation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white max-w-2xl mx-auto leading-tight">
              Deploy IndoLex Laws Across Your Stressed Portfolio
            </h2>

            <p className="text-[13px] sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Connect directly with our banking advisory team to schedule a platform walkthrough or initiate an audit of your defaulted accounts.
            </p>

            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-md sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={() => setIsClaimModalOpen(true)}
                className="group inline-flex h-11 items-center justify-center gap-2 px-6 rounded-xl bg-[#E05320] hover:bg-[#C84518] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#E05320]/25 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
              >
                <span>Submit Case For Review</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 px-6 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:border-orange-500/40 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
              >
                <span>Book SARG Walkthrough</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>

          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* POPUP MODALS */}
      <ClaimAssessmentModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      />
      <BankNoticeDefenseModal
        isOpen={isDefenseModalOpen}
        onClose={() => setIsDefenseModalOpen(false)}
      />
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

    </div>
  );
}
