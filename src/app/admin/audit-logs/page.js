'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FileClock,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  Activity,
  Clock3,
  X,
  Fingerprint,
  Filter,
  ArrowUpRight,
  Lock,
  RefreshCw,
  Loader2,
} from 'lucide-react';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '');

const API_BASE = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
  <div className="rounded-xl border border-slate-800 bg-[#0A1526] px-3.5 py-3">
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-xl font-bold tracking-tight text-white">
          {value}
        </p>
        <p className="mt-0.5 text-[10px] text-slate-500">{subtext}</p>
      </div>
      <div className={`rounded-lg border p-2 ${color}`}>
        <Icon size={17} />
      </div>
    </div>
  </div>
);

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ totalEvents: 0, verifiedEvents: 0, blockedEvents: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const getToken = useCallback(() => {
    if (typeof window === 'undefined') return '';
    return (
      localStorage.getItem('indolex_token') ||
      localStorage.getItem('token') ||
      ''
    );
  }, []);

  // 100% Dynamic MongoDB Live Fetch
  const fetchAuditLogs = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/admin/audit-logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      const result = await res.json().catch(() => ({}));

      if (res.ok && result.success && result.data) {
        setLogs(result.data.logs || []);
        if (result.data.stats) {
          setStats(result.data.stats);
        }
      }
    } catch (err) {
      console.error('Audit logs fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  // Relative Time Helper (e.g. 10 mins ago, 1 hour ago)
  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Just now';
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Dynamic Search & Filtering
  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const term = search.toLowerCase().trim();
      const matchesSearch =
        (log.logId || '').toLowerCase().includes(term) ||
        (log.action || '').toLowerCase().includes(term) ||
        (log.officer || '').toLowerCase().includes(term) ||
        (log.target || '').toLowerCase().includes(term) ||
        (log.ip || '').toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'ALL' || log.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [logs, search, statusFilter]);

  const verifiedCount = logs.filter((log) => log.status === 'SUCCESS').length;
  const blockedCount = logs.filter((log) => log.status === 'BLOCKED').length;

  // Live CSV Export
  const exportCSV = () => {
    const headers = [
      'Log ID',
      'Action',
      'Officer',
      'Target',
      'IP Address',
      'Timestamp',
      'Status',
    ];

    const rows = filtered.map((log) => [
      log.logId,
      log.action,
      log.officer,
      log.target,
      log.ip,
      new Date(log.createdAt).toLocaleString(),
      log.status,
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? '').replace(/"/g, '""')}"`;

    const csv = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `indolex-audit-logs-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const StatusBadge = ({ status }) => {
    const success = status === 'SUCCESS';

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[9px] font-bold tracking-wide ${
          success
            ? 'border-emerald-800/60 bg-emerald-950/40 text-emerald-400'
            : 'border-rose-800/60 bg-rose-950/40 text-rose-400'
        }`}
      >
        {success ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
        {success ? 'VERIFIED' : 'BLOCKED'}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 pb-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-400">
              <ShieldCheck size={17} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-rose-400">
              Super Admin Console
            </span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Audit Trail
          </h1>

          <p className="mt-1 text-xs text-slate-400">
            Monitor statutory actions, user activities and security events live from MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Live CBS Indicator */}
          <div className="hidden items-center gap-1.5 rounded-lg border border-emerald-800/50 bg-emerald-950/30 px-3 py-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-400">
              CBS Online
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => fetchAuditLogs(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={13} className={loading || refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>

          {/* Export CSV Button */}
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-rose-500/50 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (100% Dynamic) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={Activity}
          label="Total Events"
          value={logs.length}
          subtext="Recorded audit entries"
          color="border-blue-500/20 bg-blue-500/10 text-blue-400"
        />

        <StatCard
          icon={CheckCircle2}
          label="Verified Events"
          value={verifiedCount}
          subtext="Successfully completed"
          color="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
        />

        <StatCard
          icon={AlertTriangle}
          label="Blocked Events"
          value={blockedCount}
          subtext="Restricted security activity"
          color="border-rose-500/20 bg-rose-500/10 text-rose-400"
        />
      </div>

      {/* Audit Table Container */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0A1526] shadow-lg shadow-black/10">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-800 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-slate-800 p-2 text-slate-300">
              <FileClock size={16} />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white">
                Security Event History
              </h2>
              <p className="text-[10px] text-slate-500">
                {filtered.length} of {logs.length} events displayed
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative sm:w-72">
              <Search
                size={14}
                className="absolute left-3 top-2.5 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search logs, officer, IP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-9 pr-8 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-rose-500/70"
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="relative">
              <Filter
                size={13}
                className="pointer-events-none absolute left-2.5 top-2.5 text-slate-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-900 py-2 pl-8 pr-7 text-xs text-slate-300 outline-none focus:border-rose-500/70 sm:w-32 cursor-pointer"
              >
                <option value="ALL">All Events</option>
                <option value="SUCCESS">Verified</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b border-slate-800 bg-slate-900/60">
              <tr className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Event / Log ID</th>
                <th className="px-4 py-3">Authorized Officer</th>
                <th className="px-4 py-3">Subject / Entity</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/70">
              {loading && logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Loader2 size={20} className="animate-spin mx-auto mb-2 text-rose-500" />
                    Connecting to MongoDB Audit Vault...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No matching audit records found in database.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr
                    key={log._id || log.logId}
                    className="transition-colors hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-3">
                      <p className="max-w-[240px] text-xs font-semibold text-slate-200">
                        {log.action}
                      </p>
                      <p className="mt-1 font-mono text-[9px] text-slate-500">
                        {log.logId}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-[11px] font-medium text-slate-300">
                        {log.officer}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-[11px] text-slate-400">
                        {log.target}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-mono text-[10px] text-slate-400">
                        {log.ip}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 whitespace-nowrap text-[10px] text-slate-400">
                        <Clock3 size={11} className="text-slate-500" />
                        {formatTimeAgo(log.createdAt)}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <StatusBadge status={log.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="divide-y divide-slate-800/70 md:hidden">
          {filtered.map((log) => (
            <div key={log._id || log.logId} className="space-y-3 p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-5 text-slate-200">
                    {log.action}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-slate-500">
                    {log.logId}
                  </p>
                </div>
                <StatusBadge status={log.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-[9px] font-semibold uppercase text-slate-500 block">Officer</span>
                  <span className="text-slate-300">{log.officer}</span>
                </div>
                <div>
                  <span className="text-[9px] font-semibold uppercase text-slate-500 block">Timestamp</span>
                  <span className="text-slate-400">{formatTimeAgo(log.createdAt)}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] font-semibold uppercase text-slate-500 block">Subject / Entity</span>
                  <span className="text-slate-400 break-words">{log.target}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] font-semibold uppercase text-slate-500 block">IP Address</span>
                  <span className="font-mono text-[10px] text-slate-400">{log.ip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="flex flex-col gap-2 border-t border-slate-800 bg-slate-900/30 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Fingerprint size={12} />
            Audit records are live from MongoDB audit vault.
          </div>

          <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
            <Lock size={11} />
            Security Activity
            <ArrowUpRight size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}