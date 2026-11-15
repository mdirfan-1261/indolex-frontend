
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  Gavel,
  Coins,
  Building2,
  Lock,
  Landmark,
  Briefcase,
  Users2,
} from 'lucide-react';

import ThemeToggle from './ThemeToggle';
import DemoModal from './DemoModal';
import { useAuth } from '@/context/AuthContext';

export default function Navbar({ onOpenDemo }) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const [whoWeServeDropdown, setWhoWeServeDropdown] = useState(false);
  const [lawsDropdown, setLawsDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleDemoClick = () => {
    setMobileMenuOpen(false);
    setIsDemoModalOpen(true);
    onOpenDemo?.();
  };

  // BRD Section 9: Institutional Personas
  const personas = [
    {
      title: 'Bank SARG & Credit Heads',
      desc: 'NPA portfolio oversight, SMA-0/1/2 monitoring & CRILC reporting.',
      icon: Landmark,
      href: '/who-we-serve/bank-sarg',
    },
    {
      title: 'Legal Counsels & Advocates',
      desc: 'SARFAESI 13(2) notices, DRT OA-19 petitions & NCLT filing dockets.',
      icon: Briefcase,
      href: '/who-we-serve/legal-counsels',
    },
    {
      title: 'Resolution Professionals (RP)',
      desc: 'IBC Section 7/9/10 admission, CoC voting & Resolution Plan tracking.',
      icon: Building2,
      href: '/who-we-serve/resolution-professionals',
    },
    {
      title: 'Recovery Enforcement Agents',
      desc: 'Physical possession orders u/s 14, DM/CMM dockets & e-Auctions.',
      icon: Users2,
      href: '/who-we-serve/recovery-agents',
    },
  ];

  // Statutory Recovery Acts
  const statutoryActs = [
    {
      code: 'SARFAESI Act, 2002',
      detail: 'Sec 13(2) Demand, 13(4) Symbolic & Sec 14 Physical Possession',
    },
    {
      code: 'IBC, 2016',
      detail: 'Section 7/9 CIRP filing, CoC Resolution & Liquidation audits',
    },
    {
      code: 'RDDBFI Act, 1993',
      detail: 'DRT Sec 19 Original Application & Recovery Certificate (RC)',
    },
    {
      code: 'NI Act, 1881',
      detail: 'Section 138 Cheque dishonour dockets & compounding',
    },
    {
      code: 'Commercial Courts Act',
      detail: 'Order XXXVII CPC summary suits & High Court caveats',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#071326]/95 backdrop-blur-md transition-colors duration-200">

        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">

          {/* BRAND LOGO */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-[#E05320] flex items-center justify-center text-white font-bold shadow-md shadow-[#E05320]/25 group-hover:scale-105 transition-transform">
                <Scale className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <span className="text-lg sm:text-xl font-serif text-slate-900 dark:text-white tracking-wide">
                IndoLex <span className="text-[#E05320]">Laws</span>
              </span>
            </Link>
          </div>

          {/* DESKTOP MAIN NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-medium text-slate-700 dark:text-slate-200">

            {/* SOLUTIONS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdown(true)}
              onMouseLeave={() => setSolutionsDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#E05320] dark:hover:text-[#E05320] transition-colors"
                aria-expanded={solutionsDropdown}
              >
                <span>Solutions</span>

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    solutionsDropdown
                      ? 'rotate-180 text-[#E05320]'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {solutionsDropdown && (
                <div className="absolute left-0 top-full pt-1.5 w-[360px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-2 shadow-xl">

                    <Link
                      href="/solutions/statutory-enforcement"
                      onClick={() => setSolutionsDropdown(false)}
                      className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#E05320] shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">
                          Statutory Enforcement
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          SARFAESI Sec 13(2), 13(4) & DM Sec 14 possession dockets.
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions/court-litigation"
                      onClick={() => setSolutionsDropdown(false)}
                      className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shrink-0">
                        <Gavel className="h-4 w-4" />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">
                          Judicial Litigation Docket
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          DRT OA-19 petitions, NCLT IBC CIRP & Section 138 cases.
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions/debt-resolution"
                      onClick={() => setSolutionsDropdown(false)}
                      className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Coins className="h-4 w-4" />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">
                          Corporate Debt & OTS Engine
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          RBI OTS haircut modeling, escrow milestones & MCA CHG-4 release.
                        </div>
                      </div>
                    </Link>

                  </div>
                </div>
              )}
            </div>

            {/* WHO WE SERVE DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setWhoWeServeDropdown(true)}
              onMouseLeave={() => setWhoWeServeDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#E05320] dark:hover:text-[#E05320] transition-colors"
                aria-expanded={whoWeServeDropdown}
              >
                <span>Who We Serve</span>

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    whoWeServeDropdown
                      ? 'rotate-180 text-[#E05320]'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {whoWeServeDropdown && (
                <div className="absolute left-0 top-full pt-1.5 w-[380px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-2 shadow-xl">

                    {personas.map((p) => {
                      const Icon = p.icon;

                      return (
                        <Link
                          key={p.href}
                          href={p.href}
                          onClick={() => setWhoWeServeDropdown(false)}
                          className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shrink-0 group-hover:bg-orange-50 group-hover:text-[#E05320] dark:group-hover:bg-orange-950/40 transition-colors">
                            <Icon className="h-4 w-4" />
                          </div>

                          <div>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-[#E05320] transition-colors">
                              {p.title}
                            </div>

                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {p.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                  </div>
                </div>
              )}
            </div>

            {/* STATUTORY LAWS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setLawsDropdown(true)}
              onMouseLeave={() => setLawsDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#E05320] dark:hover:text-[#E05320] transition-colors"
                aria-expanded={lawsDropdown}
              >
                <span>Statutory Laws</span>

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    lawsDropdown
                      ? 'rotate-180 text-[#E05320]'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {lawsDropdown && (
                <div className="absolute left-0 top-full pt-1.5 w-[400px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-2 shadow-xl">

                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      RBI IRAC & Recovery Frameworks
                    </div>

                    {statutoryActs.map((act) => (
                      <div
                        key={act.code}
                        className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <div className="text-xs font-semibold text-[#E05320] dark:text-[#E86835]">
                          {act.code}
                        </div>

                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {act.detail}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              )}
            </div>

            {/* ABOUT MEGA-DROPDOWN - DESKTOP ORIGINAL */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#E05320] dark:hover:text-[#E05320] transition-colors"
                aria-expanded={aboutDropdown}
              >
                <span>About</span>

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    aboutDropdown
                      ? 'rotate-180 text-[#E05320]'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {aboutDropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 w-[760px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1528] p-6 shadow-2xl">

                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">
                      About IndoLex Laws & Enterprise Governance
                    </div>

                    <div className="grid grid-cols-4 gap-6">

                      {/* Column 1: About IndoLex */}
                      <div className="space-y-3">
                        <div className="font-serif text-base font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1.5">
                          About IndoLex
                        </div>

                        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            Platform Overview
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            14 Core BRD Modules
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            SARG Leadership Desk
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: Governance */}
                      <div className="space-y-3">
                        <div className="font-serif text-base font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1.5">
                          Governance
                        </div>

                        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            RBI IRAC Compliance
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            Judicial Precedents
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            Audit & Oversight
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: Institutions */}
                      <div className="space-y-3">
                        <div className="font-serif text-base font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1.5">
                          Institutions
                        </div>

                        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            Scheduled Banks
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            ARCs & NBFCs
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            Empanelled Advocates
                          </li>
                        </ul>
                      </div>

                      {/* Column 4: Trust & Security */}
                      <div className="space-y-3">
                        <div className="font-serif text-base font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1.5">
                          Trust & Security
                        </div>

                        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            ISO 27001 Controls
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            Sec 65B Audit Trail
                          </li>
                          <li className="cursor-default hover:text-[#E05320] transition-colors">
                            Data Sovereignty
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* DESKTOP RIGHT SIDE CONTROLS */}
          <div className="hidden lg:flex items-center gap-3">

            <ThemeToggle />

            {!loading && isAuthenticated ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-sky-600 text-white hover:bg-slate-800 dark:hover:bg-sky-700 transition-all shadow-sm"
              >
                <Scale className="h-3.5 w-3.5 text-amber-400" />
                <span>Go to SARG Dashboard →</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#E05320] transition-colors"
              >
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                <span>Sign In</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleDemoClick}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E05320] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#C84518] active:scale-95 transition-all cursor-pointer"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

          </div>

          {/* MOBILE HEADER CONTROLS */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen
                ? <X className="h-5 w-5" />
                : <Menu className="h-5 w-5" />
              }
            </button>

          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071326] px-3 sm:px-4 py-3 sm:py-5 space-y-2.5 sm:space-y-4 max-h-[calc(100dvh-56px)] sm:max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain">

            {/* MOBILE SOLUTIONS */}
            <div className="space-y-0.5">

              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Solutions
              </div>

              <Link
                href="/solutions/statutory-enforcement"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 sm:py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span>Statutory Enforcement (SARFAESI)</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <Link
                href="/solutions/court-litigation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 sm:py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span>Judicial Litigation (DRT / NCLT)</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <Link
                href="/solutions/debt-resolution"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 sm:py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span>Corporate Debt & OTS Engine</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

            </div>

            {/* MOBILE WHO WE SERVE */}
            <div className="space-y-0.5 pt-2 border-t border-slate-200 dark:border-slate-800">

              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Who We Serve
              </div>

              {personas.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 sm:py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <span>{p.title}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              ))}

            </div>

            {/* MOBILE STATUTORY LAWS */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">

              <button
                type="button"
                onClick={() => setLawsDropdown(!lawsDropdown)}
                className="flex w-full items-center justify-between px-3 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400"
                aria-expanded={lawsDropdown}
              >
                <span>Statutory Laws</span>

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    lawsDropdown ? 'rotate-180 text-[#E05320]' : ''
                  }`}
                />
              </button>

              {lawsDropdown && (
                <div className="space-y-1 px-2 pb-2">
                  <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    RBI IRAC & Recovery Frameworks
                  </div>

                  {statutoryActs.map((act) => (
                    <div
                      key={act.code}
                      className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <div className="text-xs font-semibold text-[#E05320] dark:text-[#E86835]">
                        {act.code}
                      </div>

                      <div className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">
                        {act.detail}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* MOBILE ABOUT ACCORDION */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">

              <button
                type="button"
                onClick={() => setAboutDropdown(!aboutDropdown)}
                className="flex w-full items-center justify-between px-3 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400"
                aria-expanded={aboutDropdown}
              >
                <span>About</span>

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    aboutDropdown ? 'rotate-180 text-[#E05320]' : ''
                  }`}
                />
              </button>

              {aboutDropdown && (
                <div className="px-2 pb-2">

                  <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    About IndoLex Laws & Enterprise Governance
                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    {/* ABOUT INDOLEX */}
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
                        About IndoLex
                      </h4>

                      <ul className="space-y-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                        <li>Platform Overview</li>
                        <li>14 Core BRD Modules</li>
                        <li>SARG Leadership Desk</li>
                      </ul>
                    </div>

                    {/* GOVERNANCE */}
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
                        Governance
                      </h4>

                      <ul className="space-y-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                        <li>RBI IRAC Compliance</li>
                        <li>Judicial Precedents</li>
                        <li>Audit & Oversight</li>
                      </ul>
                    </div>

                    {/* INSTITUTIONS */}
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
                        Institutions
                      </h4>

                      <ul className="space-y-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                        <li>Scheduled Banks</li>
                        <li>ARCs & NBFCs</li>
                        <li>Empanelled Advocates</li>
                      </ul>
                    </div>

                    {/* TRUST & SECURITY */}
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
                        Trust & Security
                      </h4>

                      <ul className="space-y-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                        <li>ISO 27001 Controls</li>
                        <li>Sec 65B Audit Trail</li>
                        <li>Data Sovereignty</li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* MOBILE AUTH & CTA BUTTONS */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">

              {!loading && isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-sky-600 text-xs font-semibold text-white shadow-md"
                >
                  <Scale className="h-3.5 w-3.5 text-amber-400" />
                  <span>Go to SARG Dashboard →</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Sign In to SARG Portal</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleDemoClick}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#E05320] text-xs font-bold text-white shadow-md hover:bg-[#C84518] cursor-pointer"
              >
                <span>Request a Demo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </div>
        )}

      </header>

      {/* DEMO MODAL POPUP */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
