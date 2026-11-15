
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Authentication check
  useEffect(() => {
    const rawToken =
      localStorage.getItem('token') ||
      localStorage.getItem('authToken') ||
      localStorage.getItem('indolex_token');

    const isValidToken =
      typeof rawToken === 'string' &&
      rawToken !== 'undefined' &&
      rawToken !== 'null' &&
      rawToken.trim().length > 15;

    if (!isValidToken) {
      localStorage.removeItem('token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('indolex_token');
      localStorage.removeItem('indolex_user');
      localStorage.removeItem('user');

      const returnTarget = encodeURIComponent(pathname || '/dashboard');

      router.replace(`/login?redirect=${returnTarget}`);
      return;
    }

    setIsAuthenticated(true);
    setCheckingAuth(false);
  }, [pathname, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="relative flex h-dvh min-h-0 w-full overflow-hidden bg-[#F6F5F2] dark:bg-[#071326]">

      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() =>
          setSidebarCollapsed((previous) => !previous)
        }
      />

      {/* MAIN WORKSPACE */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* PAGE CONTENT */}
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain p-3 sm:p-4 lg:p-6 xl:p-7">
          <div className="mx-auto w-full max-w-[1800px]">
            {children}
          </div>
        </main>
      </div>

      {/* AUTHENTICATION SCREEN */}
      {checkingAuth && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] px-5 text-center text-slate-800 dark:bg-[#071326] dark:text-slate-100">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#E05320]" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Verifying Institutional Security Clearance
          </p>

          <p className="mt-2 text-[11px] text-slate-400">
            Redirecting to authorized officer sign-in gate
          </p>
        </div>
      )}
    </div>
  );
}
