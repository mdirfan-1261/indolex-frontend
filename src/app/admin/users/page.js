"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Users2,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  UserCheck,
  Building2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Clock3,
  UserX,
  Mail,
  ChevronRight,
  Filter,
  Landmark,
  ArrowUpRight,
  RotateCw,
  Trash2,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_BASE = API_URL.endsWith("/api")
  ? API_URL
  : `${API_URL}/api`;

/* ── UI-only style tokens ── */
const card =
  "rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { id, name, email }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const getToken = useCallback(() => {
    if (typeof window === "undefined") return "";
    return (
      localStorage.getItem("indolex_token") ||
      localStorage.getItem("token") ||
      ""
    );
  }, []);

  // FETCH USERS (100% Dynamic MongoDB)
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const res = await fetch(`${API_BASE}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.success === false) {
        throw new Error(result.message || `Unable to fetch users (${res.status})`);
      }

      const fetchedUsers = result.data?.users;

      if (!Array.isArray(fetchedUsers)) {
        throw new Error("Invalid users response received from server.");
      }

      setUsers(fetchedUsers);
    } catch (err) {
      console.error("Admin users fetch error:", err);
      setError(err.message || "Something went wrong while loading users.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // UPDATE USER STATUS (Approve / Suspend)
  const updateUserStatus = async (userId, status, officerName) => {
    if (actionId) return;
    setActionId(userId);

    try {
      const token = getToken();
      if (!token) throw new Error("Session expired. Please login again.");

      const res = await fetch(
        `${API_BASE}/admin/users/${encodeURIComponent(userId)}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.success === false) {
        throw new Error(result.message || `Failed to update user status (${res.status})`);
      }

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? {
                ...user,
                status,
                isActive: status === "active",
              }
            : user
        )
      );

      showToast(
        status === "active"
          ? `${officerName} approved and activated successfully.`
          : `${officerName} account access suspended.`,
        "success"
      );
    } catch (err) {
      console.error("User status update error:", err);
      showToast(err.message || "Unable to update account status.", "error");
    } finally {
      setActionId(null);
    }
  };

  // 🗑️ DELETE USER PERMANENTLY FROM MONGODB
  const handleDeleteUser = async () => {
    if (!deleteConfirm || actionId) return;

    const { id, name } = deleteConfirm;
    setActionId(id);

    try {
      const token = getToken();
      if (!token) throw new Error("Session expired. Please login again.");

      const res = await fetch(
        `${API_BASE}/admin/users/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.success === false) {
        throw new Error(result.message || `Failed to delete officer (${res.status})`);
      }

      // Remove directly from state
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setDeleteConfirm(null);
      showToast(`${name} has been permanently deleted from database.`, "success");
    } catch (err) {
      console.error("User deletion error:", err);
      showToast(err.message || "Unable to delete officer.", "error");
    } finally {
      setActionId(null);
    }
  };

  // FILTER AND SEARCH
  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return users.filter((user) => {
      const name = (user.fullName || user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const role = (user.role || "").toLowerCase();
      const institution = (
        user.institutionName ||
        user.organization ||
        ""
      ).toLowerCase();

      const matchesSearch =
        name.includes(query) ||
        email.includes(query) ||
        role.includes(query) ||
        institution.includes(query);

      const status = (user.status || "pending").toLowerCase();

      if (filter === "pending") {
        return matchesSearch && (status === "pending" || status === "suspended");
      }

      if (filter === "active") {
        return matchesSearch && status === "active";
      }

      return matchesSearch;
    });
  }, [users, search, filter]);

  const pendingCount = users.filter((user) =>
    ["pending", "suspended"].includes((user.status || "pending").toLowerCase())
  ).length;

  const activeCount = users.filter(
    (user) => (user.status || "").toLowerCase() === "active"
  ).length;

  const suspendedCount = users.filter(
    (user) => (user.status || "").toLowerCase() === "suspended"
  ).length;

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users2,
      color: "blue",
    },
    {
      label: "Pending Approval",
      value: pendingCount,
      icon: Clock3,
      color: "amber",
    },
    {
      label: "Active Officers",
      value: activeCount,
      icon: UserCheck,
      color: "emerald",
    },
    {
      label: "Suspended",
      value: suspendedCount,
      icon: UserX,
      color: "rose",
    },
  ];

  const colorStyles = {
    blue: { icon: "text-blue-500 dark:text-blue-400", value: "text-slate-900 dark:text-white" },
    amber: { icon: "text-amber-500 dark:text-amber-400", value: "text-amber-700 dark:text-amber-400" },
    emerald: { icon: "text-emerald-500 dark:text-emerald-400", value: "text-emerald-700 dark:text-emerald-400" },
    rose: { icon: "text-rose-500 dark:text-rose-400", value: "text-rose-700 dark:text-rose-400" },
  };

  const isProtectedUser = (user) => user.role === "super_admin";

  const renderActions = (user, name) => {
    const status = (user.status || "pending").toLowerCase();
    const busy = actionId === user._id;

    if (isProtectedUser(user)) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
          <ShieldCheck size={12} />
          Master Root
        </span>
      );
    }

    return (
      <div className="flex items-center justify-end gap-1">
        {status === "active" ? (
          <button
            type="button"
            onClick={() => updateUserStatus(user._id, "suspended", name)}
            disabled={!!actionId}
            className="inline-flex h-6 items-center gap-1 rounded-md bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 px-2 text-[11px] font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-amber-50 hover:text-amber-700 hover:ring-amber-300 dark:hover:bg-amber-500/10 dark:hover:text-amber-300 dark:hover:ring-amber-500/40 disabled:opacity-50 cursor-pointer"
          >
            {busy ? <Loader2 size={11} className="animate-spin" /> : <UserX size={11} />}
            Suspend
          </button>
        ) : (
          <button
            type="button"
            onClick={() => updateUserStatus(user._id, "active", name)}
            disabled={!!actionId}
            className="inline-flex h-6 items-center gap-1 rounded-md bg-emerald-600 hover:bg-emerald-700 px-2 text-[11px] font-medium text-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            {busy ? <Loader2 size={11} className="animate-spin" /> : <UserCheck size={11} />}
            Approve
          </button>
        )}

        {/* 🗑️ DELETE BUTTON */}
        <button
          type="button"
          onClick={() =>
            setDeleteConfirm({
              id: user._id,
              name,
              email: user.email,
            })
          }
          disabled={!!actionId}
          title="Delete Officer Permanently"
          aria-label={`Delete ${name}`}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-500 dark:text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 disabled:opacity-50 cursor-pointer"
        >
          <Trash2 size={13} />
        </button>
      </div>
    );
  };

  return (
    <div className="p-3 md:p-4 space-y-3 text-slate-800 dark:text-slate-100">
      {/* CONFIRMATION MODAL FOR PERMANENT DELETE */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-4 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Trash2 size={16} />
              </div>
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white">
                Confirm Permanent Deletion
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
              Are you sure you want to permanently delete officer{" "}
              <strong className="text-slate-900 dark:text-white">{deleteConfirm.name}</strong> (
              <span className="font-mono text-slate-700 dark:text-slate-200">{deleteConfirm.email}</span>
              ) from the MongoDB database? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                disabled={!!actionId}
                className="h-7 rounded-md ring-1 ring-slate-200 dark:ring-slate-700 px-3 text-[11.5px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={!!actionId}
                className="inline-flex h-7 items-center gap-1.5 rounded-md bg-rose-600 hover:bg-rose-700 px-3 text-[11.5px] font-medium text-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                {actionId === deleteConfirm.id ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Trash2 size={12} />
                )}
                {actionId === deleteConfirm.id ? "Deleting..." : "Yes, Delete Officer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST MESSAGE */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-lg px-3 py-2 text-[11.5px] font-medium shadow-xl ring-1 animate-in slide-in-from-bottom-2 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-950 text-emerald-200 ring-emerald-800"
              : "bg-rose-950 text-rose-200 ring-rose-800"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {toast.message}
        </div>
      )}

      {/* PAGE HEADER */}
      <div className={`${card} flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Users2 size={16} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[15px] leading-5 font-semibold tracking-tight text-slate-900 dark:text-white">
                User Approvals
              </h1>
              <span className="rounded px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide ring-1 ring-inset bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30">
                Admin
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Manage officer access, verification and account status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live API
          </span>

          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex h-7 items-center gap-1.5 rounded-md bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 px-2.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI STATS STRIP */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-sm:[&>*:nth-child(n+3)]:border-t">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            const c = colorStyles[s.color];
            return (
              <div key={idx} className="px-3.5 py-2.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    {s.label}
                  </span>
                  <Icon size={14} className={`shrink-0 ${c.icon}`} />
                </div>
                <div className={`mt-0.5 text-lg leading-6 font-semibold tabular-nums ${c.value}`}>
                  {s.value}
                </div>
                <p className="text-[10.5px] text-slate-400 dark:text-slate-500">Account overview</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* USERS TABLE CONTAINER */}
      <div className={`${card} overflow-hidden`}>
        {/* Table Filters Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-slate-900 dark:text-white">
              Registered Officers
            </span>
            <span className="rounded px-1.5 py-px text-[10px] font-medium tabular-nums bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {filteredUsers.length} records
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick status tabs */}
            <div className="flex items-center gap-0.5 rounded-md bg-slate-100 dark:bg-slate-800 p-0.5 text-[11px] font-medium">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded px-2.5 py-1 transition-colors ${
                  filter === "all"
                    ? "bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All {users.length}
              </button>
              <button
                type="button"
                onClick={() => setFilter("pending")}
                className={`rounded px-2.5 py-1 transition-colors ${
                  filter === "pending"
                    ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Pending {pendingCount}
              </button>
              <button
                type="button"
                onClick={() => setFilter("active")}
                className={`rounded px-2.5 py-1 transition-colors ${
                  filter === "active"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Active {activeCount}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search officers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 w-48 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 pl-7 pr-3 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Error banner (value already tracked by existing `error` state) */}
        {error && (
          <div className="flex items-center gap-2 border-b border-rose-100 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 px-3 py-2 text-[11.5px] font-medium text-rose-700 dark:text-rose-300">
            <AlertCircle size={13} />
            <span>{error}</span>
          </div>
        )}

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-3.5 py-1.5 font-medium">Officer Details</th>
                <th className="px-3 py-1.5 font-medium">Role</th>
                <th className="px-3 py-1.5 font-medium">Institution</th>
                <th className="px-3 py-1.5 font-medium text-center">Status</th>
                <th className="px-3.5 py-1.5 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 size={18} className="animate-spin mx-auto mb-1.5 text-sky-500" />
                    Fetching registered officers from MongoDB...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 dark:text-slate-500">
                    No officer accounts matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const officerName = u.fullName || u.name || "Authorized Officer";
                  const initial = officerName.charAt(0).toUpperCase();
                  const roleFormatted = (u.role || "bank_sarg_head")
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase());
                  const instFormatted = u.institutionName || u.organization || "State Bank of India (SBI)";
                  const isActive = (u.status || "pending").toLowerCase() === "active";

                  return (
                    <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3.5 py-2">
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 dark:text-white leading-4">
                              {officerName}
                            </div>
                            <div className="flex items-center gap-1 text-[10.5px] text-slate-500 dark:text-slate-400 font-mono">
                              <Mail size={10} className="text-slate-400 dark:text-slate-500 shrink-0" />
                              <span className="truncate">{u.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-2 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                        {roleFormatted}
                      </td>

                      <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Landmark size={12} className="text-slate-400 dark:text-slate-500 shrink-0" />
                          <span>{instFormatted}</span>
                        </div>
                      </td>

                      <td className="px-3 py-2 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-1.5 py-px text-[10.5px] font-medium ring-1 ring-inset ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
                              : "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {isActive ? "Active" : "Pending"}
                        </span>
                      </td>

                      <td className="px-3.5 py-2 text-right">
                        {renderActions(u, officerName)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}