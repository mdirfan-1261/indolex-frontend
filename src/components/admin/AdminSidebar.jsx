
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, House, Users, Landmark, Building2, GitBranch,
  Network, UserCog, ShieldCheck, KeyRound, ContactRound, Building,
  UsersRound, Wallet, AlertTriangle, Scale, FileWarning,
  BriefcaseBusiness, BookOpen, Files, TrendingUp, Handshake,
  FileCheck, ClipboardList, MessageSquare, BrainCircuit,
  ChartNoAxesCombined, FileText, Settings2, Plug, Settings,
  ScrollText, ChevronDown, ChevronRight, LockKeyhole,
  PanelLeftClose, PanelLeftOpen, X
} from "lucide-react";

import adminNavGroups from "./AdminNavConfig";

const iconMap = {
  LayoutDashboard, House, Users, Landmark, Building2, GitBranch,
  Network, UserCog, ShieldCheck, KeyRound, ContactRound, Building,
  UsersRound, Wallet, AlertTriangle, Scale, FileWarning,
  BriefcaseBusiness, BookOpen, Files, TrendingUp, Handshake,
  FileCheck, ClipboardList, MessageSquare, BrainCircuit,
  ChartNoAxesCombined, FileText, Settings2, Plug, Settings, ScrollText,
};

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
  collapsed = false,
  onToggleCollapse,
  pendingCount = 0,
}) {
  const pathname = usePathname();

  const [expandedGroups, setExpandedGroups] = useState([
    "Workspace",
    "User & Access Management",
  ]);

  useEffect(() => {
    const activeGroup = adminNavGroups.find((group) =>
      group.items.some((item) =>
        pathname === item.href || pathname.startsWith(`${item.href}/`)
      )
    );

    if (activeGroup) {
      setExpandedGroups((prev) =>
        prev.includes(activeGroup.title)
          ? prev
          : [...prev, activeGroup.title]
      );
    }
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleGroup = (title) => {
    setExpandedGroups((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          border-r border-slate-800/80
          bg-[#101827] text-white
          shadow-xl shadow-slate-950/10
          transition-[width,transform] duration-300 ease-in-out
          ${collapsed ? "w-[68px]" : "w-[238px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="flex h-[58px] shrink-0 items-center justify-between border-b border-white/[0.07] px-3">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex min-w-0 items-center gap-2.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-base font-black text-white shadow-lg shadow-orange-500/20">
              I
            </div>

            {!collapsed && (
              <div className="min-w-0 leading-tight">
                <h2 className="text-[14px] font-extrabold tracking-wide">
                  INDOLEX
                </h2>
                <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[1.6px] text-slate-500">
                  Administration
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white lg:block"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen size={16} />
            ) : (
              <PanelLeftClose size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-x-hidden overflow-y-auto px-2 py-3">
          {!collapsed && (
            <p className="mb-2 px-2.5 text-[9px] font-bold uppercase tracking-[1.5px] text-slate-500">
              Main Navigation
            </p>
          )}

          <div className="space-y-1">
            {adminNavGroups.map((group) => {
              const expanded = expandedGroups.includes(group.title);
              const groupActive = group.items.some((item) =>
                isActive(item.href)
              );

              return (
                <div key={group.title}>
                  <button
                    type="button"
                    onClick={() => {
                      if (collapsed) {
                        onToggleCollapse?.();
                        setExpandedGroups((prev) =>
                          prev.includes(group.title)
                            ? prev
                            : [...prev, group.title]
                        );
                      } else {
                        toggleGroup(group.title);
                      }
                    }}
                    title={collapsed ? group.title : undefined}
                    className={`
                      flex w-full items-center justify-between rounded-lg
                      px-2.5 py-2 text-left transition-colors
                      ${
                        groupActive
                          ? "bg-white/[0.07] text-white"
                          : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
                      }
                    `}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {collapsed ? (
                        <span className="mx-auto h-1.5 w-1.5 rounded-full bg-orange-400" />
                      ) : (
                        <span className="truncate text-[9px] font-bold uppercase tracking-[1px]">
                          {group.title}
                        </span>
                      )}
                    </span>

                    {!collapsed &&
                      (expanded ? (
                        <ChevronDown size={13} />
                      ) : (
                        <ChevronRight size={13} />
                      ))}
                  </button>

                  {!collapsed && expanded && (
                    <div className="ml-2 mt-1 space-y-0.5 border-l border-white/10 pl-2">
                      {group.items.map((item) => {
                        const Icon = iconMap[item.icon] || LayoutDashboard;
                        const active = isActive(item.href);
                        const disabled = item.available === false;

                        return (
                          <Link
                            key={item.href}
                            href={disabled ? "#" : item.href}
                            onClick={(event) => {
                              if (disabled) {
                                event.preventDefault();
                                return;
                              }
                              onClose?.();
                            }}
                            title={disabled ? "Coming soon" : item.label}
                            aria-disabled={disabled}
                            className={`
                              group flex min-w-0 items-center gap-2.5
                              rounded-lg px-2.5 py-[7px]
                              text-[11px] font-medium transition-all
                              ${
                                disabled
                                  ? "cursor-not-allowed text-slate-600"
                                  : active
                                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/15"
                                    : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
                              }
                            `}
                          >
                            <Icon size={15} className="shrink-0" />

                            <span className="min-w-0 flex-1 truncate">
                              {item.label}
                            </span>

                            {item.badge === "pending" && pendingCount > 0 && (
                              <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                {pendingCount}
                              </span>
                            )}

                            {disabled && (
                              <LockKeyhole
                                size={11}
                                className="shrink-0 text-slate-600"
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/[0.07] p-2">
          <div
            className={`flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.04] ${
              collapsed ? "justify-center p-2" : "px-2.5 py-2"
            }`}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={15} />
            </div>

            {!collapsed && (
              <div className="min-w-0 leading-tight">
                <p className="text-[10px] font-semibold text-slate-200">
                  Secure Admin
                </p>
                <p className="mt-0.5 text-[8px] text-slate-500">
                  INDOLEX Platform
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
