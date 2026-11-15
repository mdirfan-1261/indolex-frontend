"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Users2,
  Scale,
  Server,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
  Lock,
  Layers,
  Sparkles,
  Clock,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Landmark,
  Zap,
  CircleDot,
  Inbox,
  Mail,
  UserCheck,
  AlertCircle,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return { "Content-Type": "application/json" };
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("indolex_token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

/* ── UI-only style tokens ── */
const card =
  "rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]";

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Live Database States
  const [stats, setStats] = useState({
    totalExposureCr: "₹0.00 Cr",
    totalLoans: 0,
    totalBorrowers: 0,
    totalUsers: 0,
    activeOfficers: 0,
    pendingCount: 0,
    totalCases: 0,
    totalInquiries: 0,
  });

  const [pendingOfficer, setPendingOfficer] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loans, setLoans] = useState([]);
  const [isApproving, setIsApproving] = useState(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " IST"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // 🚀 Fetch Live Data from Backend
  const fetchOverviewData = async () => {
    try {
      setSyncing(true);
      const res = await fetch(`${API_BASE}/admin/overview`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (data.success && data.data) {
        setStats(data.data.stats || stats);
        setPendingOfficer(data.data.pendingOfficer || null);
        setInquiries(data.data.recentInquiries || []);
        setLoans(data.data.recentLoans || []);
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  // 🚀 Live 1-Click Approve Officer in MongoDB
  const handleApproveOfficer = async (userId) => {
    if (!userId) return;
    try {
      setIsApproving(true);
      const res = await fetch(`${API_BASE}/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: "active" }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Approval failed");
      }

      showToast(`Officer approved & activated in MongoDB! Login is now ALLOWED.`);
      fetchOverviewData();
    } catch (err) {
      alert("Approval error: " + err.message);
    } finally {
      setIsApproving(false);
    }
  };

  const kpis = [
    {
      title: "Stressed Exposure",
      value: stats.totalExposureCr,
      subtitle: `${stats.totalLoans} Credit Facilities · ${stats.totalBorrowers} Borrowers`,
      icon: Building2,
      color: "blue",
      progress: "84%",
    },
    {
      title: "Verified Officers",
      value: String(stats.activeOfficers || 0),
      suffix: "Active",
      subtitle: stats.pendingCount > 0 ? `${stats.pendingCount} Action Required` : "100% Cleared",
      icon: Users2,
      color: "violet",
      progress: "90%",
    },
    {
      title: "Litigation Cases",
      value: String(stats.totalCases || 0),
      suffix: "Cases",
      subtitle: "DRT & NCLT Tribunals",
      icon: Scale,
      color: "amber",
      progress: "60%",
    },
    {
      title: "Inbound Inquiries",
      value: String(stats.totalInquiries || 0),
      subtitle: "Landing Page Demo Leads",
      icon: Inbox,
      color: "emerald",
      progress: "95%",
    },
  ];

  const colorMap = {
    blue: { icon: "text-blue-500 dark:text-blue-400", bar: "bg-blue-500 dark:bg-blue-400" },
    violet: { icon: "text-violet-500 dark:text-violet-400", bar: "bg-violet-500 dark:bg-violet-400" },
    amber: { icon: "text-amber-500 dark:text-amber-400", bar: "bg-amber-500 dark:bg-amber-400" },
    emerald: { icon: "text-emerald-500 dark:text-emerald-400", bar: "bg-emerald-500 dark:bg-emerald-400" },
  };

  return (
    <div className="w-full min-w-0 max-w-none p-3 md:p-4 space-y-3 text-slate-800 dark:text-slate-100">
      {/* 1. TOP HEADER */}
      <div className={`${card} relative overflow-hidden`}>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-sky-50/80 dark:from-sky-500/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#172B45] to-[#2B4A6B] dark:from-sky-500 dark:to-sky-600 text-white shadow-sm ring-1 ring-inset ring-white/10">
              <Sparkles size={15} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[15px] leading-5 font-semibold tracking-tight text-slate-900 dark:text-white">
                  Admin Operations Cockpit
                </h1>
                <span className="rounded px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wider ring-1 ring-inset bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30">
                  Root L5
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Live surveillance across PSU/Private Banks, SARG desks & inbound leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md bg-slate-50 dark:bg-slate-800/60 ring-1 ring-slate-200 dark:ring-slate-700 px-2.5 py-1 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10.5px] font-medium tabular-nums text-slate-600 dark:text-slate-300">
                {currentTime || "Live IST"}
              </span>
              <span className="h-3 w-px bg-slate-300 dark:bg-slate-600" />
              <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400">BKC Node</span>
            </div>

            <button
              onClick={fetchOverviewData}
              disabled={syncing}
              className="inline-flex h-7 items-center gap-1.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 px-2.5 text-[11px] font-medium text-white dark:text-slate-900 transition-colors disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <RefreshCw size={12} className={syncing ? "animate-spin" : ""} />
              <span>{syncing ? "Syncing..." : "Sync Feeds"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11.5px] font-medium ring-1 bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800 animate-in fade-in"
        >
          <CheckCircle2 size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. DYNAMIC KPI STRIP */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 xl:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-xl:[&>*:nth-child(n+3)]:border-t">
          {kpis.map((item) => {
            const Icon = item.icon;
            const colors = colorMap[item.color];

            return (
              <div key={item.title} className="px-3.5 py-2.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{item.title}</span>
                  <Icon size={14} className={`shrink-0 ${colors.icon}`} />
                </div>

                <div className="mt-0.5 flex flex-wrap items-baseline gap-1.5">
                  <span className="text-lg leading-6 font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                  {item.suffix && (
                    <span className="text-[10.5px] font-medium text-slate-400 dark:text-slate-500">{item.suffix}</span>
                  )}
                </div>

                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{item.subtitle}</div>

                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className={`h-full rounded-full ${colors.bar}`} style={{ width: item.progress }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. REAL PENDING OFFICER APPROVAL (FROM MONGODB) */}
      <div
        className={`rounded-lg px-3.5 py-2.5 ring-1 transition-colors ${
          pendingOfficer
            ? "bg-amber-50/60 ring-amber-200 dark:bg-amber-500/5 dark:ring-amber-500/30"
            : "bg-emerald-50/60 ring-emerald-200 dark:bg-emerald-500/5 dark:ring-emerald-500/30"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold text-white ${
                pendingOfficer ? "bg-amber-600" : "bg-emerald-600"
              }`}
            >
              {pendingOfficer ? (pendingOfficer.name || "PO").slice(0, 2).toUpperCase() : "✓"}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[13px] leading-4 font-semibold text-slate-900 dark:text-white">
                  {pendingOfficer ? pendingOfficer.name : "All Officers Verified & Cleared"}
                </h3>
                <span
                  className={`rounded px-1.5 py-px text-[10px] font-medium ring-1 ring-inset ${
                    pendingOfficer
                      ? "bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30"
                      : "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
                  }`}
                >
                  {pendingOfficer ? "Approval Pending" : "100% Active"}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {pendingOfficer
                  ? `${pendingOfficer.organization || "Institutional Tenant"} · ${pendingOfficer.email}`
                  : "No pending officer authorizations waiting in queue."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {pendingOfficer ? (
              <button
                onClick={() => handleApproveOfficer(pendingOfficer._id)}
                disabled={isApproving}
                className="inline-flex h-7 items-center gap-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 px-3 text-[11px] font-medium text-white transition-colors disabled:opacity-60 cursor-pointer"
              >
                {isApproving ? <RefreshCw size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                <span>{isApproving ? "Approving..." : "Approve & Activate"}</span>
              </button>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 size={13} /> Clear
              </span>
            )}

            <Link
              href="/admin/users"
              className="inline-flex h-7 items-center gap-1 rounded-md bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 px-2.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              All Users ({stats.totalUsers}) <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. REAL INBOUND INQUIRIES & DEMO LEADS (FROM LANDING PAGE) */}
      <section className={`${card} min-w-0 overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 px-3.5 py-2">
          <div className="flex items-center gap-2">
            <Inbox size={14} className="text-orange-500 dark:text-orange-400" />
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-white">
              Live Inbound Demo & Access Inquiries
            </h2>
            <span className="rounded px-1.5 py-px text-[10px] font-medium tabular-nums ring-1 ring-inset bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/30">
              {inquiries.length} leads
            </span>
          </div>

          <Link
            href="/dashboard/crm"
            className="flex items-center gap-1 text-[11px] font-medium text-sky-700 dark:text-sky-400 hover:underline"
          >
            <span>Open M-01 CRM Desk</span>
            <ChevronRight size={12} />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
            No inbound demo inquiries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11.5px] border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                  <th className="py-1.5 px-3.5 font-medium">Ref & Time</th>
                  <th className="py-1.5 px-3 font-medium">Applicant Name</th>
                  <th className="py-1.5 px-3 font-medium">Organization</th>
                  <th className="py-1.5 px-3 font-medium">Contact</th>
                  <th className="py-1.5 px-3 font-medium">Lead Status</th>
                  <th className="py-1.5 px-3.5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5 font-mono font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                      {inq.inquiryRef}
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-semibold text-slate-900 dark:text-white leading-4 block">
                        {inq.firstName} {inq.lastName}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">{inq.jobTitle}</span>
                    </td>
                    <td className="py-2 px-3 font-medium text-slate-700 dark:text-slate-300">{inq.organization}</td>
                    <td className="py-2 px-3 font-mono text-[11px] text-sky-700 dark:text-sky-400">{inq.email}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-1.5 py-px rounded text-[10.5px] font-medium ring-1 ring-inset whitespace-nowrap bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/30">
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-2 px-3.5 text-right">
                      <Link
                        href="/dashboard/crm"
                        className="inline-flex h-6 items-center rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-2.5 text-[11px] font-medium text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        Open Lead
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 5. REAL CORPORATE LOANS (FROM MONGODB) */}
      <section className={`${card} px-3.5 py-3`}>
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Landmark size={14} className="text-slate-500 dark:text-slate-400" />
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-white">Live Stressed Loan Accounts</h2>
            <span className="rounded px-1.5 py-px text-[10px] font-medium tabular-nums bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {stats.totalLoans} accounts
            </span>
          </div>

          <Link
            href="/dashboard/loans"
            className="flex items-center gap-1 text-[11px] font-medium text-sky-700 dark:text-sky-400 hover:underline"
          >
            <span>All Loans</span>
            <ChevronRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="rounded-lg bg-slate-50/70 dark:bg-slate-800/40 ring-1 ring-slate-200/80 dark:ring-slate-700/70 px-3 py-2 transition-colors hover:ring-slate-300 dark:hover:ring-slate-600"
            >
              <div className="flex items-center justify-between text-[11.5px] font-mono font-semibold text-slate-900 dark:text-white">
                <span className="truncate">{loan.accountNumber}</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              </div>
              <p className="truncate text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {loan.borrower?.companyName || "Corporate Borrower"}
              </p>
              <div className="mt-1.5 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-700/70 pt-1.5 text-[11.5px]">
                <span className="font-semibold tabular-nums text-rose-600 dark:text-rose-400">
                  ₹{(Number(loan.sanctionedAmount || loan.outstandingAmount || 0) / 10000000).toFixed(2)} Cr
                </span>
                <span className="font-mono text-[10px] tabular-nums text-slate-500 dark:text-slate-400">
                  {loan.dpd !== undefined ? `${loan.dpd} DPD` : "Standard"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER STATUS */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 ring-1 ring-slate-200 dark:ring-slate-800 px-3 py-1.5">
        <div className="flex items-center gap-2 text-[10.5px] text-slate-500 dark:text-slate-400">
          <ShieldCheck size={12} className="text-emerald-600 dark:text-emerald-400" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Enterprise Security Node</span>
          <span>·</span>
          <span>Admin Root Operations Active</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>MongoDB Live Synced</span>
        </div>
      </div>
    </div>
  );
}