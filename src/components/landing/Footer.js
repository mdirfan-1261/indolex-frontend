'use client';

import Link from 'next/link';
import { Scale, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const headCls =
    'text-xs font-semibold tracking-wide text-slate-900 dark:text-white mb-3 flex items-center gap-2';
  const headBar = 'h-3 w-0.5 rounded-full bg-[#E05320]';
  const linkCls =
    'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:text-[#E05320]';

  return (
    <footer className="relative bg-slate-50 dark:bg-[#070E1A] text-slate-600 dark:text-slate-300 font-sans border-t border-slate-200 dark:border-slate-800/80">
      {/* TOP ACCENT HAIRLINE */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E05320]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-x-8 gap-y-8 lg:gap-x-10">

          {/* 1. BRAND & BRD ARCHITECTURE */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-b from-[#E8602F] to-[#D24A1A] ring-1 ring-inset ring-white/15 flex items-center justify-center text-white shadow-md shadow-[#E05320]/25">
                <Scale className="h-4 w-4" />
              </div>
              <span className="text-lg font-serif text-slate-900 dark:text-white tracking-wide">
                IndoLex <span className="text-[#E05320]">Laws</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              Integrated Enterprise Legal Case Management, CRM and Corporate Bank Loan Default Management Platform. Aligned with RBI IRAC Prudential Directives and Statutory Recovery Acts.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-emerald-500/25 bg-emerald-500/10 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>ISO 27001 &amp; RBI IRAC Aligned</span>
            </div>
          </div>

          {/* 2. BRD SECTION 3: 14 CORE MODULES */}
          <div>
            <h4 className={headCls}>
              <span className={headBar} />
              Core Platform Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/solutions/crm" className={linkCls}>1. Borrower &amp; Corporate CRM</Link></li>
              <li><Link href="/solutions/loan-management" className={linkCls}>2. Loan &amp; Facility Management</Link></li>
              <li><Link href="/solutions/npa-monitoring" className={linkCls}>3. Default &amp; DPD Ingestion (SMA)</Link></li>
              <li><Link href="/solutions/statutory-enforcement" className={linkCls}>4. SARFAESI Enforcement Studio</Link></li>
              <li><Link href="/solutions/court-litigation" className={linkCls}>5. Judicial Case Docket (DRT/NCLT)</Link></li>
              <li><Link href="/solutions/debt-resolution" className={linkCls}>6. Corporate Debt &amp; OTS Engine</Link></li>
              <li><Link href="/solutions/advocate-crm" className={linkCls}>7. Advocate &amp; Law Firm Panel</Link></li>
            </ul>
          </div>

          {/* 3. BRD SECTION 5: STATUTORY LAWS */}
          <div>
            <h4 className={headCls}>
              <span className={headBar} />
              Statutory Framework
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {[
                'SARFAESI Act, 2002 (Sec 13(2), 13(4), 14)',
                'Insolvency & Bankruptcy Code, 2016 (IBC)',
                'RDDBFI (DRT / DRAT) Act, 1993',
                'Negotiable Instruments Act, 1881 (Sec 138)',
                'Companies Act, 2013 (DIN & MCA Verification)',
                'RBI IRAC Master Directions & CRILC Sync',
                'Indian Contract Act, 1872',
              ].map((law) => (
                <li key={law} className="flex items-start gap-2 leading-snug">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#E05320]/70" />
                  <span>{law}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. BRD SECTION 9 & 14: SARG DESK & ACCESS */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className={headCls}>
              <span className={headBar} />
              Recovery Helpdesk &amp; Access
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#E05320] shrink-0" />
                <span>+91 (022) 6900-LEX (539)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#E05320] shrink-0" />
                <span className="break-all">sarg-desk@indolex.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#E05320] shrink-0" />
                <span>Nariman Point Financial Hub, Mumbai</span>
              </div>

              <div className="pt-3 mt-1 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row lg:flex-col gap-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center justify-between gap-2 h-8 px-3 rounded-lg border border-rose-500/25 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40"
                >
                  <span>Root Super Admin Console →</span>
                </Link>

                <Link
                  href="/who-we-serve/legal-counsels"
                  className="inline-flex items-center justify-between gap-2 h-8 px-3 rounded-lg border border-[#E05320]/25 bg-[#E05320]/5 hover:bg-[#E05320]/10 text-[#C84518] dark:text-[#f06e3e] hover:text-[#E05320] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05320]/40"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Scale className="h-3.5 w-3.5" />
                    <span>Empanel as Recovery Counsel →</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW (WITH DESIGNED & DEVELOPED BY TEXORA.AI) */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-col lg:flex-row lg:justify-between items-center text-[11px] text-slate-500 gap-2.5 lg:gap-4 text-center lg:text-left">
          <div>
            © 2026 IndoLex Laws Platform. Statutory Bank Default Recovery Architecture.
          </div>

          {/* DESIGNED & DEVELOPED BY TEXORA.AI */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <span>Designed &amp; Developed by</span>
            <a
              href="https://texora.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:underline transition-colors tracking-wide"
            >
              texora.ai
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Statutory Terms</Link>
            <Link href="/security" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">RBI Security Controls</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}