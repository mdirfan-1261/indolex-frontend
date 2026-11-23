'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
  FileSpreadsheet,
} from 'lucide-react';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://indolex-backend.onrender.com'
).replace(/\/+$/, '');

const API_BASE = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

/* ───────────── UI-only components (module level) ───────────── */

const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm shadow-slate-900/[0.03] dark:border-slate-800 dark:bg-[#0A1526] dark:shadow-none sm:px-3.5 sm:py-3">
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-lg font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white sm:mt-1 sm:text-xl">
          {value}
        </p>
        <p className="mt-0.5 hidden text-[10px] text-slate-400 dark:text-slate-500 sm:block">
          {subtext}
        </p>
      </div>
      <div className={`hidden shrink-0 rounded-lg border p-2 min-[420px]:block ${color}`}>
        <Icon size={16} />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const success = status === 'SUCCESS';

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9.5px] font-semibold tracking-wide ${
        success
          ? 'border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-400'
          : 'border-rose-500/30 bg-rose-50 text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-400'
      }`}
    >
      {success ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
      {success ? 'VERIFIED' : 'BLOCKED'}
    </span>
  );
};

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ totalEvents: 0, verifiedEvents: 0, blockedEvents: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [exporting, setExporting] = useState(false);

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
      (() => {
        const d = new Date(log.createdAt);
        return log.createdAt && !isNaN(d) ? d.toISOString() : '';
      })(),
      log.status,
    ]);

    // Neutralise spreadsheet formulas (CSV injection): values starting with
    // = + - @ (or tab / CR) get a leading apostrophe so Excel treats them as text.
    const escapeCSV = (value) => {
      let str = String(value ?? '');
      if (/^[=+\-@\t\r]/.test(str)) str = `'${str}`;
      return `"${str.replace(/"/g, '""')}"`;
    };

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

  // Premium Excel Export (.xlsx) - styled report with summary sheet
  const exportExcel = async () => {
    if (filtered.length === 0 || exporting) return;
    setExporting(true);

    try {
      const ExcelJS = (await import('exceljs')).default;

      const NAVY = 'FF0A1526';
      const ORANGE = 'FFE05320';
      const ZEBRA = 'FFF5F7FA';
      const LINE = 'FFE2E8F0';
      const FONT = 'Calibri';

      const wb = new ExcelJS.Workbook();
      wb.creator = 'IndoLex Laws';
      wb.created = new Date();

      /* ───── Sheet 1: Audit Trail ───── */
      const ws = wb.addWorksheet('Audit Trail', {
        views: [{ state: 'frozen', ySplit: 4, showGridLines: false }],
        pageSetup: {
          orientation: 'landscape',
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
        },
      });

      ws.columns = [
        { key: 'sn', width: 6 },
        { key: 'logId', width: 24 },
        { key: 'action', width: 34 },
        { key: 'officer', width: 26 },
        { key: 'target', width: 50 },
        { key: 'ip', width: 16 },
        { key: 'time', width: 22 },
        { key: 'status', width: 14 },
      ];

      // Title block
      ws.mergeCells('A1:H1');
      ws.getCell('A1').value = 'IndoLex Laws - Audit Trail';
      ws.getCell('A1').font = { name: FONT, size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
      ws.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
      ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
      ws.getRow(1).height = 30;

      const filterNote = [
        search.trim() ? `Search: "${search.trim()}"` : null,
        statusFilter !== 'ALL' ? `Status: ${statusFilter === 'SUCCESS' ? 'Verified' : 'Blocked'}` : null,
      ]
        .filter(Boolean)
        .join('  |  ');

      ws.mergeCells('A2:H2');
      ws.getCell('A2').value =
        `Generated ${new Date().toLocaleString()}  |  ${filtered.length} of ${logs.length} records` +
        (filterNote ? `  |  ${filterNote}` : '');
      ws.getCell('A2').font = { name: FONT, size: 10, color: { argb: 'FF64748B' } };
      ws.getCell('A2').alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
      ws.getRow(2).height = 20;

      ws.getRow(3).height = 6;

      // Header row (row 4)
      const headerRow = ws.getRow(4);
      headerRow.values = ['#', 'Log ID', 'Action', 'Officer', 'Target', 'IP Address', 'Timestamp', 'Status'];
      headerRow.height = 24;
      headerRow.eachCell((cell, col) => {
        cell.font = { name: FONT, size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
        cell.alignment = {
          vertical: 'middle',
          horizontal: col === 1 || col === 8 ? 'center' : 'left',
          indent: col === 1 || col === 8 ? 0 : 1,
        };
        cell.border = { bottom: { style: 'medium', color: { argb: ORANGE } } };
      });

      // Data rows
      filtered.forEach((log, i) => {
        const d = new Date(log.createdAt);
        const validDate = log.createdAt && !isNaN(d);
        const success = log.status === 'SUCCESS';

        const row = ws.addRow({
          sn: i + 1,
          logId: log.logId || '',
          action: log.action || '',
          officer: log.officer || '',
          target: log.target || '',
          ip: log.ip || '',
          time: validDate ? d : '',
          status: success ? 'VERIFIED' : 'BLOCKED',
        });

        row.height = 20;

        row.eachCell({ includeEmpty: true }, (cell, col) => {
          cell.font = { name: FONT, size: 10, color: { argb: 'FF1E293B' } };
          cell.alignment = {
            vertical: 'middle',
            horizontal: col === 1 || col === 8 ? 'center' : 'left',
            indent: col === 1 || col === 8 ? 0 : 1,
          };
          cell.border = { bottom: { style: 'thin', color: { argb: LINE } } };
          if (i % 2 === 1) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ZEBRA } };
          }
        });

        row.getCell('sn').font = { name: FONT, size: 9, color: { argb: 'FF94A3B8' } };
        row.getCell('logId').font = { name: 'Consolas', size: 9, color: { argb: 'FF64748B' } };
        row.getCell('ip').font = { name: 'Consolas', size: 9, color: { argb: 'FF475569' } };
        row.getCell('action').font = { name: FONT, size: 10, bold: true, color: { argb: 'FF0F172A' } };
        row.getCell('time').numFmt = 'dd-mmm-yyyy hh:mm:ss';

        const st = row.getCell('status');
        st.font = {
          name: FONT,
          size: 9,
          bold: true,
          color: { argb: success ? 'FF047857' : 'FFBE123C' },
        };
        st.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: success ? 'FFD1FAE5' : 'FFFFE4E6' },
        };
      });

      const lastRow = 4 + filtered.length;
      ws.autoFilter = {
        from: { row: 4, column: 1 },
        to: { row: lastRow, column: 8 },
      };

      /* ───── Sheet 2: Summary (live formulas) ───── */
      const sm = wb.addWorksheet('Summary', { views: [{ showGridLines: false }] });
      sm.columns = [{ width: 28 }, { width: 14 }];

      sm.mergeCells('A1:B1');
      sm.getCell('A1').value = 'Audit Summary';
      sm.getCell('A1').font = { name: FONT, size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
      sm.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
      sm.getCell('A1').alignment = { vertical: 'middle', indent: 1 };
      sm.getRow(1).height = 28;

      const verifiedN = filtered.filter((l) => l.status === 'SUCCESS').length;
      const blockedN = filtered.filter((l) => l.status === 'BLOCKED').length;
      const rng = `'Audit Trail'!H5:H${Math.max(lastRow, 5)}`;

      const summaryRows = [
        ['Total Events', { formula: `COUNTA(${rng})`, result: filtered.length }],
        ['Verified Events', { formula: `COUNTIF(${rng},"VERIFIED")`, result: verifiedN }],
        ['Blocked Events', { formula: `COUNTIF(${rng},"BLOCKED")`, result: blockedN }],
      ];

      summaryRows.forEach(([label, val], idx) => {
        const r = sm.getRow(3 + idx);
        r.height = 22;
        r.getCell(1).value = label;
        r.getCell(2).value = val;
        r.getCell(1).font = { name: FONT, size: 11, color: { argb: 'FF475569' } };
        r.getCell(2).font = { name: FONT, size: 12, bold: true, color: { argb: 'FF0F172A' } };
        r.getCell(2).alignment = { horizontal: 'right' };
        r.getCell(1).alignment = { vertical: 'middle', indent: 1 };
        r.getCell(1).border = { bottom: { style: 'thin', color: { argb: LINE } } };
        r.getCell(2).border = { bottom: { style: 'thin', color: { argb: LINE } } };
      });

      /* ───── Download ───── */
      const buffer = await wb.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `indolex-audit-logs-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Excel export error:', err);
    } finally {
      setExporting(false);
    }
  };

  /* ───────────── STYLE TOKENS (UI only) ───────────── */
  const btnCls =
    'inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm shadow-slate-900/[0.03] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-700 sm:flex-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40';
  const fieldCls =
    'h-8 w-full rounded-lg border border-slate-200 bg-white text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-500/70 focus:ring-2 focus:ring-rose-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500';
  const thCls = 'px-3.5 py-2 text-[10px] font-semibold text-slate-500 dark:text-slate-500';

  return (
    <div className="mx-auto max-w-7xl space-y-3 pb-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-1.5">
            <div className="rounded-md border border-rose-500/20 bg-rose-500/10 p-1 text-rose-600 dark:text-rose-400">
              <ShieldCheck size={14} />
            </div>
            <span className="text-[10.5px] font-semibold text-rose-600 dark:text-rose-400">
              Super Admin Console
            </span>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[22px]">
            Audit Trail
          </h1>

          <p className="mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-400">
            Monitor statutory actions, user activities and security events live from MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Live CBS Indicator */}
          <div className="hidden h-8 items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-50 px-2.5 dark:border-emerald-800/50 dark:bg-emerald-950/30 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span className="text-[10.5px] font-medium text-emerald-700 dark:text-emerald-400">
              CBS Online
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => fetchAuditLogs(true)}
            disabled={loading || refreshing}
            className={btnCls}
          >
            <RefreshCw size={13} className={loading || refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>

          {/* Export Excel Button */}
          <button
            onClick={exportExcel}
            disabled={filtered.length === 0 || exporting}
            className={`${btnCls} hover:border-emerald-500/40`}
          >
            {exporting ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <FileSpreadsheet size={13} className="text-emerald-600 dark:text-emerald-400" />
            )}
            {exporting ? 'Exporting...' : 'Export Excel'}
          </button>

          {/* Export CSV Button (secondary) */}
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className={`${btnCls} hidden hover:border-rose-500/40 sm:inline-flex`}
          >
            <Download size={13} />
            CSV
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (100% Dynamic) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <StatCard
          icon={Activity}
          label="Total Events"
          value={logs.length}
          subtext="Recorded audit entries"
          color="border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />

        <StatCard
          icon={CheckCircle2}
          label="Verified Events"
          value={verifiedCount}
          subtext="Successfully completed"
          color="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          icon={AlertTriangle}
          label="Blocked Events"
          value={blockedCount}
          subtext="Restricted security activity"
          color="border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* Audit Table Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.04] dark:border-slate-800 dark:bg-[#0A1526] dark:shadow-lg dark:shadow-black/10">
        {/* Toolbar */}
        <div className="flex flex-col gap-2.5 border-b border-slate-200 p-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-slate-100 p-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FileClock size={15} />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-slate-900 dark:text-white">
                Security Event History
              </h2>
              <p className="text-[10px] tabular-nums text-slate-500">
                {filtered.length} of {logs.length} events displayed
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative sm:w-64">
              <Search
                size={13}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type="text"
                placeholder="Search logs, officer, IP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${fieldCls} pl-8 pr-8`}
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="relative">
              <Filter
                size={12}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`${fieldCls} appearance-none pl-7 pr-7 cursor-pointer sm:w-32`}
              >
                <option value="ALL">All Events</option>
                <option value="SUCCESS">Verified</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden max-h-[60vh] overflow-auto md:block">
          <table className="w-full min-w-[780px] text-left">
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#0C192D]">
              <tr>
                <th className={thCls}>Event / Log ID</th>
                <th className={thCls}>Authorized Officer</th>
                <th className={thCls}>Subject / Entity</th>
                <th className={thCls}>IP Address</th>
                <th className={thCls}>Timestamp</th>
                <th className={`${thCls} text-right`}>Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
              {loading && logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-xs text-slate-500 dark:text-slate-400">
                    <Loader2 size={18} className="mx-auto mb-2 animate-spin text-rose-500" />
                    Connecting to MongoDB Audit Vault...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-xs text-slate-500 dark:text-slate-400">
                    No matching audit records found in database.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr
                    key={log._id || log.logId}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-3.5 py-2">
                      <p className="max-w-[260px] text-xs font-medium text-slate-900 dark:text-slate-200">
                        {log.action}
                      </p>
                      <p className="mt-0.5 font-mono text-[9.5px] text-slate-400 dark:text-slate-500">
                        {log.logId}
                      </p>
                    </td>

                    <td className="px-3.5 py-2">
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        {log.officer}
                      </span>
                    </td>

                    <td className="px-3.5 py-2">
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        {log.target}
                      </span>
                    </td>

                    <td className="px-3.5 py-2">
                      <span className="font-mono text-[10.5px] text-slate-600 dark:text-slate-400">
                        {log.ip}
                      </span>
                    </td>

                    <td className="px-3.5 py-2">
                      <div className="flex items-center gap-1.5 whitespace-nowrap text-[10.5px] text-slate-600 dark:text-slate-400">
                        <Clock3 size={11} className="text-slate-400 dark:text-slate-500" />
                        {formatTimeAgo(log.createdAt)}
                      </div>
                    </td>

                    <td className="px-3.5 py-2 text-right">
                      <StatusBadge status={log.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/70 md:hidden">
          {loading && logs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              <Loader2 size={18} className="mx-auto mb-2 animate-spin text-rose-500" />
              Connecting to MongoDB Audit Vault...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              No matching audit records found in database.
            </div>
          ) : (
            filtered.map((log) => (
              <div key={log._id || log.logId} className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-snug text-slate-900 dark:text-slate-200">
                      {log.action}
                    </p>
                    <p className="mt-0.5 break-all font-mono text-[9.5px] text-slate-400 dark:text-slate-500">
                      {log.logId}
                    </p>
                  </div>
                  <StatusBadge status={log.status} />
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                  <div className="min-w-0">
                    <span className="block text-[9.5px] text-slate-400 dark:text-slate-500">Officer</span>
                    <span className="block truncate text-slate-700 dark:text-slate-300">{log.officer}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9.5px] text-slate-400 dark:text-slate-500">Timestamp</span>
                    <span className="block truncate text-slate-600 dark:text-slate-400">{formatTimeAgo(log.createdAt)}</span>
                  </div>
                  <div className="col-span-2 min-w-0">
                    <span className="block text-[9.5px] text-slate-400 dark:text-slate-500">Subject / Entity</span>
                    <span className="block break-words text-slate-600 dark:text-slate-400">{log.target}</span>
                  </div>
                  <div className="col-span-2 min-w-0">
                    <span className="block text-[9.5px] text-slate-400 dark:text-slate-500">IP Address</span>
                    <span className="block font-mono text-[10.5px] text-slate-600 dark:text-slate-400">{log.ip}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table Footer */}
        <div className="flex flex-col gap-1.5 border-t border-slate-200 bg-slate-50 px-3.5 py-2 dark:border-slate-800 dark:bg-slate-900/30 sm:flex-row sm:items-center sm:justify-between">
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