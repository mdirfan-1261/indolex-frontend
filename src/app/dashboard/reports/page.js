'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Printer,
  Plus,
  RefreshCw,
  Search,
  CheckCircle,
  AlertCircle,
  Trash2,
  X,
  PieChart,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Eye,
  FileSpreadsheet,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 mt-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'text-[11px] font-medium text-slate-600 dark:text-slate-300';

export default function ReportsMisPage() {
  const [reports, setReports] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalBorrowers: 0,
    totalLoans: 0,
    totalExposureInCr: 0,
    totalLegalCases: 0,
    totalRecoveryActions: 0,
    totalCashRecoveredInCr: 0,
    assetBuckets: { standard: 0, sma1: 0, sma2: 0, npa: 0 },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Modals
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [viewReport, setViewReport] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    reportType: 'RBI Asset Classification & DPD Ageing MIS',
    reportingQuarter: 'Q3 FY 2026-27',
    format: 'CSV / Excel Sheet',
    executiveSummary:
      'Executive quarterly analysis of default portfolio, statutory notice compliance, and NPA recovery progress submitted for SARG Review Board.',
    status: 'Generated & Certified',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [reportsRes, analyticsRes] = await Promise.all([
        fetch(`${API_BASE}/reports`),
        fetch(`${API_BASE}/reports/analytics`),
      ]);

      const reportsData = await reportsRes.json();
      const analyticsData = await analyticsRes.json();

      if (reportsData.success) setReports(reportsData.data || []);
      if (analyticsData.success && analyticsData.analytics) {
        setAnalytics(analyticsData.analytics);
      }
    } catch (err) {
      setError(err.message || 'Error fetching MIS reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      const res = await fetch(`${API_BASE}/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to generate report');
      }

      setIsGenerateOpen(false);
      setFormData({
        reportType: 'RBI Asset Classification & DPD Ageing MIS',
        reportingQuarter: 'Q3 FY 2026-27',
        format: 'CSV / Excel Sheet',
        executiveSummary:
          'Executive quarterly analysis of default portfolio, statutory notice compliance, and NPA recovery progress submitted for SARG Review Board.',
        status: 'Generated & Certified',
      });
      fetchData();
    } catch (err) {
      alert('Error generating report: ' + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this MIS Report docket?')) return;
    try {
      const res = await fetch(`${API_BASE}/reports/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete');
      }
      fetchData();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  // 1-Click Native CSV Export Trigger
  const handleExportCSV = (report) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        ['INDOLEX LAWS - ENTERPRISE BANKING SARG MIS REPORT'],
        ['Report Code', report.reportCode],
        ['Report Type', report.reportType],
        ['Reporting Quarter', report.reportingQuarter],
        ['Total Accounts Covered', report.totalAccountsCovered],
        ['Total Portfolio Exposure (INR Cr)', report.totalExposureValueInCr],
        ['Certified By Officer', report.certifiedByOfficer],
        ['Certification Status', report.status],
        ['Date Generated', new Date(report.createdAt).toLocaleString('en-IN')],
        [''],
        ['EXECUTIVE SUMMARY & AUDITOR REMARKS:'],
        [`"${report.executiveSummary.replace(/"/g, '""')}"`],
      ]
        .map((e) => e.join(','))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${report.reportCode}_${report.reportingQuarter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReports = reports.filter((r) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      r.reportCode.toLowerCase().includes(s) ||
      r.reportType.toLowerCase().includes(s) ||
      r.reportingQuarter.toLowerCase().includes(s)
    );
  });

  /* ── UI-only derived values ── */
  const kpis = [
    {
      label: 'Total Portfolio Exposure',
      value: `₹ ${analytics.totalExposureInCr} Cr`,
      sub: `Across ${analytics.totalLoans} Corporate Accounts`,
      icon: TrendingUp,
      v: 'text-slate-900 dark:text-white',
      i: 'text-indigo-500 dark:text-indigo-400',
    },
    {
      label: 'Cash Realized via SARG',
      value: `₹ ${analytics.totalCashRecoveredInCr} Cr`,
      sub: `${analytics.totalRecoveryActions} Active Resolutions`,
      icon: ShieldCheck,
      v: 'text-emerald-700 dark:text-emerald-400',
      i: 'text-emerald-500 dark:text-emerald-400',
    },
    {
      label: 'Active Judicial Dockets',
      value: `${analytics.totalLegalCases}`,
      sub: 'DRT / NCLT / High Court Suits',
      icon: FileText,
      v: 'text-rose-700 dark:text-rose-400',
      i: 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'Certified MIS Dossiers',
      value: `${reports.length}`,
      sub: 'Board & RBI Audited',
      icon: FileSpreadsheet,
      v: 'text-purple-700 dark:text-purple-400',
      i: 'text-purple-500 dark:text-purple-400',
    },
  ];

  const b = analytics.assetBuckets || {};
  const buckets = [
    { key: 'standard', label: 'Standard (0 DPD)', sub: 'Performing Portfolio', value: b.standard || 0, dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400' },
    { key: 'sma1', label: 'SMA-1 (31-60 DPD)', sub: 'Early Stress Alert', value: b.sma1 || 0, dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400' },
    { key: 'sma2', label: 'SMA-2 (61-89 DPD)', sub: 'Mandatory CRILC Reporting', value: b.sma2 || 0, dot: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-400' },
    { key: 'npa', label: 'NPA (90+ DPD)', sub: 'Statutory SARFAESI Active', value: b.npa || 0, dot: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-400' },
  ];
  const bucketTotal = buckets.reduce((s, x) => s + x.value, 0);

  return (
    <div className="p-3 md:p-4 max-w-[1400px] mx-auto space-y-3 min-h-screen text-slate-800 dark:text-slate-100">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-gradient-to-br from-[#172B45] to-[#2B4A6B] dark:from-sky-500 dark:to-sky-600 text-white shadow-sm ring-1 ring-inset ring-white/10">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base leading-5 font-semibold tracking-tight text-slate-900 dark:text-white">
              M-13 • Reports & Executive MIS Analytics
            </h1>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 truncate">
              RBI statutory dossiers, SARG compromise recovery audits & advocate allocation metrics
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsGenerateOpen(true)}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11.5px] inline-flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
          <span>Generate & Certify Banking MIS Report</span>
        </button>
      </div>

      {/* KPI STRIP */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-md:[&>*:nth-child(n+3)]:border-t">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="px-3.5 py-2.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{k.label}</span>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${k.i}`} />
                </div>
                <div className={`mt-0.5 text-lg leading-6 font-semibold tabular-nums truncate ${k.v}`}>{k.value}</div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{k.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIVE RBI ASSET CLASSIFICATION BREAKDOWN */}
      <div className={`${card} px-4 py-3`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <PieChart className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white leading-4">
                Live RBI Asset Classification & Default Distribution
              </h3>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400">Prudential regulatory baseline</p>
            </div>
          </div>
          <span className="text-[11px] tabular-nums text-slate-500 dark:text-slate-400">{bucketTotal} accounts</span>
        </div>

        <div className="mt-2.5 flex h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {bucketTotal > 0 &&
            buckets.map((x) => (
              <div
                key={x.key}
                className={`${x.dot} h-full transition-all duration-500`}
                style={{ width: `${(x.value / bucketTotal) * 100}%` }}
                title={`${x.label}: ${x.value}`}
              />
            ))}
        </div>

        <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-2">
          {buckets.map((x) => (
            <div key={x.key} className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 dark:text-slate-400">
                <i className={`w-2 h-2 rounded-sm shrink-0 ${x.dot}`} />
                <span className="truncate">{x.label}</span>
              </div>
              <div className={`text-[15px] leading-5 font-semibold tabular-nums ${x.text}`}>{x.value} Accounts</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{x.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH & REFRESH BAR */}
      <div className={`${card} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2`}>
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by code, report type, quarter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 pl-8 pr-3 w-64 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500"
            />
          </div>
          <button
            type="button"
            onClick={fetchData}
            aria-label="Refresh"
            className="h-7 w-7 grid place-items-center rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="text-[11.5px] text-slate-500 dark:text-slate-400 px-1">
          Showing <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{filteredReports.length}</span>{' '}
          Certified Reports
        </div>
      </div>

      {/* MAIN REPORTS TABLE */}
      <div className={`${card} overflow-hidden`}>
        {loading ? (
          <div className="py-10 text-center text-slate-400 dark:text-slate-500 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-500" />
            <span>Compiling real-time MIS aggregates...</span>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-rose-600 dark:text-rose-400 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
            <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-slate-700 dark:text-slate-200 text-[13px]">No MIS Reports Generated Yet</p>
            <p className="text-[11px] text-slate-400 mt-1">Click &ldquo;+ Generate & Certify Banking MIS Report&rdquo; to create a live regulatory dossier from current loan portfolios.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11.5px] border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                  <th className="py-1.5 px-3.5 font-medium">Report Code & Type</th>
                  <th className="py-1.5 px-3 font-medium">Quarter & Period</th>
                  <th className="py-1.5 px-3 font-medium">Portfolio Scope</th>
                  <th className="py-1.5 px-3 font-medium">Certification Status</th>
                  <th className="py-1.5 px-3 font-medium">Generated Timestamp</th>
                  <th className="py-1.5 px-3.5 font-medium text-right">Actions & Exports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredReports.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5 max-w-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-semibold text-slate-900 dark:text-white">
                          {item.reportCode}
                        </span>
                        <span className="px-1.5 py-px rounded text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {item.format}
                        </span>
                      </div>
                      <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 leading-4">{item.reportType}</div>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.executiveSummary}
                      </p>
                    </td>

                    <td className="py-2 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-1.5 py-px rounded text-[10.5px] font-medium ring-1 ring-inset bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30">
                        {item.reportingQuarter}
                      </span>
                    </td>

                    <td className="py-2 px-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 dark:text-white tabular-nums leading-4">
                        ₹ {item.totalExposureValueInCr} Cr
                      </div>
                      <div className="text-[10.5px] text-slate-500 dark:text-slate-400">
                        {item.totalAccountsCovered} Loan Facilities
                      </div>
                    </td>

                    <td className="py-2 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-1.5 py-px rounded text-[10.5px] font-medium ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                        <CheckCircle className="w-3 h-3" />
                        <span>{item.status}</span>
                      </span>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                        By: {item.certifiedByOfficer}
                      </div>
                    </td>

                    <td className="py-2 px-3 text-slate-600 dark:text-slate-300 text-[11px] whitespace-nowrap">
                      <div className="tabular-nums leading-4">
                        {new Date(item.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">
                        {new Date(item.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* 1-Click CSV Download */}
                        <button
                          onClick={() => handleExportCSV(item)}
                          className="h-6 px-2 rounded-md bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium text-[11px] inline-flex items-center gap-1 cursor-pointer transition-colors"
                          title="Download CSV Spreadsheet"
                        >
                          <Download className="w-3 h-3" />
                          <span>CSV</span>
                        </button>

                        {/* View Docket Modal */}
                        <button
                          onClick={() => setViewReport(item)}
                          aria-label="View full executive dossier"
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 cursor-pointer transition-colors"
                          title="View Full Executive Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          aria-label="Delete report"
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 cursor-pointer transition-colors"
                          title="Delete Report"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW FULL DOSSIER MODAL */}
      {viewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-100 text-[11.5px] truncate">
                  {viewReport.reportCode} - Board Certified MIS
                </span>
              </div>
              <button
                onClick={() => setViewReport(null)}
                aria-label="Close"
                className="h-6 w-6 grid place-items-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs overflow-y-auto">
              <div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">Report Category</div>
                <div className="font-semibold text-slate-900 dark:text-white text-[15px] mt-0.5 leading-5">{viewReport.reportType}</div>
                <div className="text-[11.5px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                  Reporting Period: {viewReport.reportingQuarter}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg ring-1 ring-slate-100 dark:ring-slate-800">
                <div>
                  <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">
                    Portfolio Exposure Covered
                  </div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                    ₹ {viewReport.totalExposureValueInCr} Cr
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {viewReport.totalAccountsCovered} Corporate Credit Accounts
                  </div>
                </div>

                <div>
                  <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">Auditor Certification</div>
                  <span className="inline-flex items-center gap-1 px-1.5 py-px rounded text-[10.5px] font-medium ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30 mt-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>{viewReport.status}</span>
                  </span>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                    Signatory: {viewReport.certifiedByOfficer}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium mb-1">
                  Executive Findings & Regulatory Recommendations
                </div>
                <div className="p-3 bg-slate-900 dark:bg-slate-950 ring-1 ring-slate-800 text-slate-100 rounded-lg text-[11.5px] font-mono leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {viewReport.executiveSummary}
                </div>
              </div>
            </div>

            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 shrink-0">
              <button
                onClick={() => handleExportCSV(viewReport)}
                className="h-7 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11.5px] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Spreadsheet</span>
              </button>

              <button
                onClick={() => setViewReport(null)}
                className="h-7 px-3 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-medium text-[11.5px] cursor-pointer transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GENERATE NEW MIS REPORT MODAL */}
      {isGenerateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 shrink-0 grid place-items-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-[13px] leading-4">
                    Generate Banking Executive MIS Report
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Compile real-time MongoDB loan, default and recovery metrics into a certified docket
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGenerateOpen(false)}
                aria-label="Close"
                className="h-6 w-6 grid place-items-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateSubmit} className="flex flex-col min-h-0">
              <div className="p-4 space-y-3 text-xs overflow-y-auto">
                <div>
                  <label className={labelCls}>Select Report Type / Category *</label>
                  <select
                    value={formData.reportType || 'RBI Asset Classification & DPD Ageing MIS'}
                    onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
                    className={`${inputCls} font-medium`}
                  >
                    <option value="RBI Asset Classification & DPD Ageing MIS">
                      RBI Asset Classification & DPD Ageing MIS
                    </option>
                    <option value="SARG Recovery & OTS Haircut Performance MIS">
                      SARG Recovery & OTS Haircut Performance MIS
                    </option>
                    <option value="Advocate Panel & Litigation Case Allocation MIS">
                      Advocate Panel & Litigation Case Allocation MIS
                    </option>
                    <option value="SARFAESI Statutory Notice & Physical Possession MIS">
                      SARFAESI Statutory Notice & Physical Possession MIS
                    </option>
                    <option value="Corporate Borrowers High-Exposure Risk MIS">
                      Corporate Borrowers High-Exposure Risk MIS
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Reporting Quarter / FY *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Q3 FY 2026-27"
                      value={formData.reportingQuarter || ''}
                      onChange={(e) => setFormData({ ...formData, reportingQuarter: e.target.value })}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Dossier Output Format *</label>
                    <select
                      value={formData.format || 'CSV / Excel Sheet'}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className={inputCls}
                    >
                      <option value="CSV / Excel Sheet">CSV / Excel Sheet</option>
                      <option value="PDF Docket">PDF Docket</option>
                      <option value="RBI Regulatory XML/JSON">RBI Regulatory XML/JSON</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Executive Summary & Auditor Findings *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter executive notes, haircut percentage observations, or board recommendations..."
                    value={formData.executiveSummary || ''}
                    onChange={(e) => setFormData({ ...formData, executiveSummary: e.target.value })}
                    className={`${inputCls} h-auto py-2 leading-relaxed`}
                  ></textarea>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg ring-1 ring-slate-100 dark:ring-slate-800 flex items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-medium">Live Scope: All Active Corporate Loan Facilities</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">✓ Auto-Aggregates from MongoDB</span>
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 shrink-0 bg-slate-50/50 dark:bg-slate-800/30">
                <button
                  type="button"
                  onClick={() => setIsGenerateOpen(false)}
                  className="h-7 px-3 rounded-md ring-1 ring-slate-200 dark:ring-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-[11.5px] cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="h-7 px-3.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11.5px] inline-flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-60"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? 'Compiling Dossier...' : 'Generate & Certify Report'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}