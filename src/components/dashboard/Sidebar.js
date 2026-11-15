
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gavel,
  BadgeDollarSign,
  Building2,
  Users,
  FileSpreadsheet,
  AlertOctagon,
  FileText,
  BookOpen,
  Send,
  HandCoins,
  Briefcase,
  CheckSquare,
  MessageSquare,
  BarChart3,
  ChevronRight,
  Lock,
  ShieldAlert,
  ArrowUpRight,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_GROUPS = [
  {
    group: 'DASHBOARDS',
    items: [
      {
        label: '1. SARG Overview',
        href: '/dashboard',
        icon: LayoutDashboard,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'bank_administrator'],
      },
      {
        label: '2. Legal Litigation',
        href: '/dashboard/legal-dashboard',
        icon: Gavel,
        roles: ['admin', 'super_admin', 'legal_counsel', 'legal_head', 'panel_advocate', 'drt_litigation_manager'],
      },
      {
        label: '3. Recovery & OTS',
        href: '/dashboard/recovery-dashboard',
        icon: BadgeDollarSign,
        roles: ['admin', 'super_admin', 'recovery_agent', 'recovery_manager', 'npa_recovery_officer', 'sarfaesi_officer', 'sarg_officer', 'bank_sarg_head'],
      },
    ],
  },
  {
    group: 'CRM & LOANS (M-01 - M-04)',
    items: [
      {
        label: 'M-01 • CRM Desk',
        href: '/dashboard/crm',
        icon: Users,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'bank_administrator'],
      },
      {
        label: 'M-02 • Borrowers',
        href: '/dashboard/borrowers',
        icon: Building2,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'bank_administrator'],
      },
      {
        label: 'M-03 • Loans',
        href: '/dashboard/loans',
        icon: FileSpreadsheet,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'bank_administrator'],
      },
      {
        label: 'M-04 • DPD & NPA',
        href: '/dashboard/defaults',
        icon: AlertOctagon,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'recovery_agent', 'recovery_manager', 'npa_recovery_officer'],
      },
    ],
  },
  {
    group: 'LEGAL & NOTICES (M-05 - M-07)',
    items: [
      {
        label: 'M-05 • Court Cases',
        href: '/dashboard/cases',
        icon: FileText,
        roles: ['admin', 'super_admin', 'legal_counsel', 'legal_head', 'panel_advocate', 'drt_litigation_manager'],
      },
      {
        label: 'M-06 • Indian Laws',
        href: '/dashboard/laws',
        icon: BookOpen,
        roles: ['admin', 'super_admin', 'legal_counsel', 'legal_head', 'panel_advocate', 'sarg_officer', 'bank_sarg_head'],
      },
      {
        label: 'M-07 • Notice Studio',
        href: '/dashboard/notices',
        icon: Send,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'legal_counsel', 'panel_advocate', 'recovery_agent', 'npa_recovery_officer'],
      },
    ],
  },
  {
    group: 'RECOVERY & PANEL (M-08 - M-10)',
    items: [
      {
        label: 'M-08 • Recovery & OTS',
        href: '/dashboard/recovery',
        icon: HandCoins,
        roles: ['admin', 'super_admin', 'recovery_agent', 'recovery_manager', 'npa_recovery_officer', 'sarg_officer', 'bank_sarg_head'],
      },
      {
        label: 'M-09 • Advocates',
        href: '/dashboard/advocates',
        icon: Briefcase,
        roles: ['admin', 'super_admin', 'legal_counsel', 'legal_head', 'panel_advocate'],
      },
      {
        label: 'M-10 • Tasks & SLA',
        href: '/dashboard/tasks',
        icon: CheckSquare,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'recovery_agent', 'npa_recovery_officer', 'legal_counsel'],
      },
    ],
  },
  {
    group: 'COMMS & REPORTS (M-11 - M-13)',
    items: [
      {
        label: 'M-11 • Comms Log',
        href: '/dashboard/communications',
        icon: MessageSquare,
        roles: ['admin', 'super_admin', 'recovery_agent', 'npa_recovery_officer', 'sarg_officer', 'bank_sarg_head'],
      },
      {
        label: 'M-13 • Reports & CRILC',
        href: '/dashboard/reports',
        icon: BarChart3,
        roles: ['admin', 'super_admin', 'sarg_officer', 'bank_sarg_head', 'bank_administrator'],
      },
    ],
  },
];

export default function Sidebar({
  isOpen = false,
  onClose,
  collapsed = false,
  onToggleCollapse,
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const userRole = user?.role?.toLowerCase() || '';
  const isSuperAdmin = ['admin', 'super_admin'].includes(userRole);

  return (
    <aside
      id="dashboard-sidebar"
      className={`
        fixed inset-y-0 left-0 z-50 flex h-dvh
        w-[min(280px,85vw)] shrink-0 flex-col
        border-r border-[#E5EAE8] bg-[#FDFCF7]
        shadow-2xl transition-[width,transform] duration-300 ease-in-out
        dark:border-slate-800/80 dark:bg-[#071326]
        lg:sticky lg:top-0 lg:z-30 lg:h-dvh
        lg:translate-x-0 lg:shadow-none
        ${collapsed ? 'lg:w-[68px]' : 'lg:w-56'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* BRAND HEADER */}
      <div
        className={`flex h-14 shrink-0 items-center border-b border-[#E5EAE8] px-3 dark:border-slate-800/80 ${
          collapsed
            ? 'lg:justify-center'
            : 'justify-between gap-2'
        }`}
      >
        <Link
          href="/dashboard"
          onClick={onClose}
          title="IndoLex Laws"
          className="flex min-w-0 items-center gap-2.5"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#172B45] to-[#2B4A6B] text-white shadow-sm dark:from-sky-500 dark:to-sky-600">
            <Building2 className="h-4 w-4" />
          </div>

          <div className={`${collapsed ? 'lg:hidden' : ''} min-w-0 leading-tight`}>
            <span className="block text-[13px] font-bold tracking-tight text-[#172B45] dark:text-white">
              IndoLex <span className="text-[#527F94] dark:text-sky-400">Laws</span>
            </span>

            <span className="block truncate text-[9px] font-medium capitalize text-slate-400 dark:text-slate-500">
              {userRole ? userRole.replace(/_/g, ' ') : 'Loading role'}
            </span>
          </div>
        </Link>

        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:flex dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>

        {/* MOBILE CLOSE */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav
        className={`min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain py-3 [scrollbar-width:thin] ${
          collapsed ? 'px-2 lg:px-1.5' : 'px-2'
        }`}
      >
        {NAV_GROUPS.map((group) => {
          const visibleItems = group.items.filter((item) =>
            item.roles.includes(userRole)
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.group} className="space-y-1">
              <p
                className={`truncate px-2.5 pb-1 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500 ${
                  collapsed ? 'lg:hidden' : ''
                }`}
              >
                {group.group}
              </p>

              {visibleItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    title={collapsed ? item.label : undefined}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    className={`
                      group relative flex min-h-9 items-center
                      justify-between gap-2 rounded-lg px-2.5 py-2
                      text-[11.5px] font-semibold transition-colors
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-sky-500/60
                      ${collapsed ? 'lg:justify-center lg:px-0' : ''}
                      ${
                        isActive
                          ? 'bg-[#172B45]/[0.08] text-[#172B45] dark:bg-sky-400/10 dark:text-sky-300'
                          : 'text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white'
                      }
                    `}
                  >
                    {isActive && (
                      <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[#172B45] dark:bg-sky-400" />
                    )}

                    <span
                      className={`flex min-w-0 items-center ${
                        collapsed ? 'lg:justify-center' : 'gap-2'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive
                            ? 'text-[#172B45] dark:text-sky-300'
                            : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                        }`}
                        strokeWidth={isActive ? 2.2 : 1.9}
                      />

                      <span className={collapsed ? 'lg:hidden' : 'truncate'}>
                        {item.label}
                      </span>
                    </span>

                    {isActive && !collapsed && (
                      <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* SIDEBAR FOOTER */}
      <div className="shrink-0 space-y-2 border-t border-[#E5EAE8] p-2 dark:border-slate-800/80">
        {isSuperAdmin && (
          <Link
            href="/admin"
            onClick={onClose}
            title={collapsed ? 'Super Admin Portal' : undefined}
            className={`flex min-h-9 items-center justify-between gap-2 rounded-lg bg-rose-500/[0.08] px-2.5 py-2 text-[11px] font-bold text-rose-700 ring-1 ring-inset ring-rose-500/20 transition-colors hover:bg-rose-500/15 dark:text-rose-300 ${
              collapsed ? 'lg:justify-center lg:px-0' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
              <span className={collapsed ? 'lg:hidden' : ''}>
                Super Admin Portal
              </span>
            </span>

            <ArrowUpRight className={`h-3 w-3 shrink-0 ${collapsed ? 'lg:hidden' : ''}`} />
          </Link>
        )}

        <div
          title={collapsed ? `RBAC: ${userRole}` : undefined}
          className={`flex min-h-9 items-center gap-2 rounded-lg bg-slate-100/80 px-2.5 py-2 dark:bg-slate-900/70 ${
            collapsed ? 'lg:justify-center lg:px-0' : ''
          }`}
        >
          <Lock className="h-3 w-3 shrink-0 text-sky-600 dark:text-sky-400" />

          <div className={`min-w-0 truncate text-[9px] text-slate-500 dark:text-slate-400 ${collapsed ? 'lg:hidden' : ''}`}>
            RBAC:{' '}
            <span className="font-bold uppercase text-[#172B45] dark:text-white">
              {userRole || 'UNASSIGNED'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
