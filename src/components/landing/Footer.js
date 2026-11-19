'use client';

import Link from 'next/link';
import { Scale, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070E1A] text-slate-300 font-sans border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* 1. BRAND & BRD ARCHITECTURE */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#E05320] flex items-center justify-center text-white font-bold shadow-md">
                <Scale className="h-4 w-4" />
              </div>
              <span className="text-lg font-serif text-white tracking-wide">
                IndoLex <span className="text-[#E05320]">Laws</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Integrated Enterprise Legal Case Management, CRM and Corporate Bank Loan Default Management Platform. Aligned with RBI IRAC Prudential Directives and Statutory Recovery Acts.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>ISO 27001 & RBI IRAC Aligned</span>
            </div>
          </div>

          {/* 2. BRD SECTION 3: 14 CORE MODULES */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-3.5">
              Core Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/solutions/crm" className="hover:text-white transition-colors">1. Borrower & Corporate CRM</Link></li>
              <li><Link href="/solutions/loan-management" className="hover:text-white transition-colors">2. Loan & Facility Management</Link></li>
              <li><Link href="/solutions/npa-monitoring" className="hover:text-white transition-colors">3. Default & DPD Ingestion (SMA)</Link></li>
              <li><Link href="/solutions/statutory-enforcement" className="hover:text-white transition-colors">4. SARFAESI Enforcement Studio</Link></li>
              <li><Link href="/solutions/court-litigation" className="hover:text-white transition-colors">5. Judicial Case Docket (DRT/NCLT)</Link></li>
              <li><Link href="/solutions/debt-resolution" className="hover:text-white transition-colors">6. Corporate Debt & OTS Engine</Link></li>
              <li><Link href="/solutions/advocate-crm" className="hover:text-white transition-colors">7. Advocate & Law Firm Panel</Link></li>
            </ul>
          </div>

          {/* 3. BRD SECTION 5: STATUTORY LAWS */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-3.5">
              Statutory Framework
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>SARFAESI Act, 2002 (Sec 13(2), 13(4), 14)</li>
              <li>Insolvency & Bankruptcy Code, 2016 (IBC)</li>
              <li>RDDBFI (DRT / DRAT) Act, 1993</li>
              <li>Negotiable Instruments Act, 1881 (Sec 138)</li>
              <li>Companies Act, 2013 (DIN & MCA Verification)</li>
              <li>RBI IRAC Master Directions & CRILC Sync</li>
              <li>Indian Contract Act, 1872</li>
            </ul>
          </div>

          {/* 4. BRD SECTION 9 & 14: SARG DESK & ACCESS */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-3.5">
              Recovery Helpdesk & Access
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#E05320] shrink-0" />
                <span>+91 (022) 6900-LEX (539)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#E05320] shrink-0" />
                <span>sarg-desk@indolex.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#E05320] shrink-0" />
                <span>Nariman Point Financial Hub, Mumbai</span>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                >
                  <span>Root Super Admin Console →</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW (WITH DESIGNED & DEVELOPED BY TEXORA.AI) */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 IndoLex Laws Platform. Statutory Bank Default Recovery Architecture.
          </div>

          {/* DESIGNED & DEVELOPED BY TEXORA.AI */}
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <span>Designed & Developed by</span>
            <a
              href="https://texora.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors tracking-wide"
            >
              texora.ai
            </a>
          </div>

          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Statutory Terms</Link>
            <Link href="/security" className="hover:text-slate-300 transition-colors">RBI Security Controls</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}