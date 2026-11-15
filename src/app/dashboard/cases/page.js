'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Scale,
  Plus,
  Search,
  Filter,
  Calendar,
  Building2,
  Clock,
  UserCheck,
  Edit3,
  Trash2,
  CheckCircle2,
  Loader2,
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';

export default function LegalCasesPage() {
  const { token } = useAuth();
  const [cases, setCases] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    caseNumber: '',
    cnrNumber: '',
    courtType: 'Debt Recovery Tribunal (DRT)',
    courtBench: 'DRT-II Mumbai',
    borrower: '',
    loanAccount: '',
    claimAmount: '',
    caseStatus: 'Admitted & Summons Issued',
    assignedAdvocate: 'Adv. Rajeshwar Sharma (Chambers of Law)',
    advocatePhone: '+91 98200 44556',
    nextHearingDate: '',
    hearingPurpose: 'Arguments on Interim Injunction',
    presidingJudge: "Hon'ble Presiding Officer",
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // 1. Fetch Cases, Borrowers & Loans from MongoDB
  const fetchData = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      let url = 'http://localhost:5000/api/legal';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCourt !== 'ALL') params.append('courtType', selectedCourt);
      if (params.toString()) url += `?${params.toString()}`;

      const resCases = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataCases = await resCases.json();
      if (resCases.ok && dataCases.cases) {
        setCases(dataCases.cases);
      }

      // Fetch Borrowers
      const resBorrowers = await fetch('http://localhost:5000/api/borrowers', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataBorrowers = await resBorrowers.json();
      if (resBorrowers.ok && dataBorrowers.borrowers) {
        setBorrowers(dataBorrowers.borrowers);
        if (dataBorrowers.borrowers.length > 0 && !formData.borrower) {
          setFormData((prev) => ({ ...prev, borrower: dataBorrowers.borrowers[0]._id }));
        }
      }

      // Fetch Loans
      const resLoans = await fetch('http://localhost:5000/api/loans', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataLoans = await resLoans.json();
      if (resLoans.ok && dataLoans.loans) {
        setLoans(dataLoans.loans);
        if (dataLoans.loans.length > 0 && !formData.loanAccount) {
          setFormData((prev) => ({ ...prev, loanAccount: dataLoans.loans[0]._id }));
        }
      }
    } catch (err) {
      console.error('Error fetching legal cases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCourt]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // 2. Register New Court Case
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      if (!formData.borrower) throw new Error('Please select a Corporate Borrower');
      if (!formData.loanAccount) throw new Error('Please select a Loan Account');

      const payload = {
        ...formData,
        claimAmount: Number(formData.claimAmount) * 10000000, // Cr to ₹
      };

      const res = await fetch('http://localhost:5000/api/legal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Case registration failed');

      setIsCreateOpen(false);
      showToast('Court Case registered and advocate assigned successfully!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 3. Open Edit
  const handleOpenEdit = (c) => {
    setEditingCase(c);
    setFormData({
      caseNumber: c.caseNumber || '',
      cnrNumber: c.cnrNumber || '',
      courtType: c.courtType || 'Debt Recovery Tribunal (DRT)',
      courtBench: c.courtBench || '',
      borrower: c.borrower?._id || c.borrower || '',
      loanAccount: c.loanAccount?._id || c.loanAccount || '',
      claimAmount: c.claimAmount ? (c.claimAmount / 10000000).toFixed(2) : '',
      caseStatus: c.caseStatus || 'Admitted & Summons Issued',
      assignedAdvocate: c.assignedAdvocate || '',
      advocatePhone: c.advocatePhone || '',
      nextHearingDate: c.nextHearingDate ? c.nextHearingDate.split('T')[0] : '',
      hearingPurpose: c.hearingPurpose || '',
      presidingJudge: c.presidingJudge || '',
    });
    setIsEditOpen(true);
  };

  // 4. Update Case
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingCase) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const payload = {
        ...formData,
        claimAmount: Number(formData.claimAmount) * 10000000,
      };

      const res = await fetch(`http://localhost:5000/api/legal/${editingCase._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      setIsEditOpen(false);
      setEditingCase(null);
      showToast('Case details and next hearing date updated!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5. Delete Case
  const handleDelete = async (id, num) => {
    if (!confirm(`Are you sure you want to delete Case "${num}"?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/legal/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setCases((prev) => prev.filter((c) => c._id !== id));
      showToast('Case record removed.');
    } catch (err) {
      alert(err.message);
    }
  };

  const kpis = [
    {
      label: 'Total Active Suits',
      value: `${cases.length} Cases`,
      icon: Scale,
      v: 'text-slate-900 dark:text-white',
      i: 'text-slate-400 dark:text-slate-500',
    },
    {
      label: 'DRT & DRAT Petitions',
      value: `${cases.filter((c) => c.courtType.includes('DRT')).length} Suits`,
      icon: Building2,
      v: 'text-sky-700 dark:text-sky-400',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'NCLT IBC Insolvency',
      value: `${cases.filter((c) => c.courtType.includes('NCLT')).length} CIRP Files`,
      icon: ShieldCheck,
      v: 'text-purple-700 dark:text-purple-400',
      i: 'text-purple-500 dark:text-purple-400',
    },
    {
      label: 'Total Suit Claim Amount',
      value: `₹ ${(cases.reduce((a, b) => a + (b.claimAmount || 0), 0) / 10000000).toFixed(2)} Cr`,
      icon: AlertTriangle,
      v: 'text-emerald-700 dark:text-emerald-400',
      i: 'text-emerald-500 dark:text-emerald-400',
    },
  ];

  return (
    <div className="p-3 md:p-4 space-y-3 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Toast */}
      {toast.show && (
        <div
          role="status"
          className="fixed top-4 right-4 z-[60] px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 ring-1 ring-emerald-200 dark:ring-emerald-800 text-emerald-800 dark:text-emerald-200 text-[11.5px] font-medium shadow-lg flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-medium text-sky-700 dark:text-sky-400">
            <span className="px-1.5 py-px rounded bg-sky-50 dark:bg-sky-500/10 ring-1 ring-inset ring-sky-200 dark:ring-sky-500/30">
              M-05 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 5 · Legal management & court litigation</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Judicial Cases & Tribunal Proceedings
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Active litigation across DRT, NCLT Insolvency (IBC), High Court and Section 14 CMM possession petitions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/legal-dashboard"
            className="h-8 px-3 rounded-md bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Open Causelist Calendar</span>
          </Link>

          <button
            onClick={() => {
              setFormData({
                caseNumber: `OA/${Math.floor(100 + Math.random() * 900)}/2026`,
                cnrNumber: `MHMB0200${Math.floor(1000 + Math.random() * 9000)}2026`,
                courtType: 'Debt Recovery Tribunal (DRT)',
                courtBench: 'DRT-II Mumbai',
                borrower: borrowers[0]?._id || '',
                loanAccount: loans[0]?._id || '',
                claimAmount: '',
                caseStatus: 'Admitted & Summons Issued',
                assignedAdvocate: 'Adv. Rajeshwar Sharma (Chambers of Law)',
                advocatePhone: '+91 98200 44556',
                nextHearingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                hearingPurpose: 'Arguments on Bank Interim Attachment Application',
                presidingJudge: "Hon'ble Presiding Officer",
              });
              setIsCreateOpen(true);
            }}
            className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>File New Court Case</span>
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-lg:[&>*:nth-child(n+3)]:border-t">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="px-3.5 py-2.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{k.label}</span>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${k.i}`} />
                </div>
                <div className={`mt-0.5 text-lg leading-6 font-semibold tabular-nums truncate ${k.v}`}>{k.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cases Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Case No / Court</th>
                <th className="py-1.5 px-3 font-medium">Borrower Entity</th>
                <th className="py-1.5 px-3 font-medium text-right">Claim (₹ Cr)</th>
                <th className="py-1.5 px-3 font-medium">Next Hearing Date</th>
                <th className="py-1.5 px-3 font-medium">Hearing Purpose</th>
                <th className="py-1.5 px-3 font-medium">Assigned Panel Advocate</th>
                <th className="py-1.5 px-3 font-medium">Case Status</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading Judicial Court Cases...</span>
                  </td>
                </tr>
              ) : cases.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">No Active Court Cases Found</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ File New Court Case" to register your first DRT or NCLT suit.
                    </p>
                  </td>
                </tr>
              ) : (
                cases.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">{c.caseNumber}</div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{c.courtBench}</span>
                      {c.cnrNumber && (
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">CNR: {c.cnrNumber}</div>
                      )}
                    </td>

                    <td className="py-2 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 leading-4">
                        {c.borrower?.companyName || 'Corporate Entity'}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        {c.loanAccount?.loanAccountNumber}
                      </div>
                    </td>

                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-slate-900 dark:text-white whitespace-nowrap">
                      ₹ {(c.claimAmount / 10000000).toFixed(2)} Cr
                    </td>

                    <td className="py-2 px-3 whitespace-nowrap">
                      <div className="font-semibold text-rose-600 dark:text-rose-400 tabular-nums">
                        {c.nextHearingDate
                          ? new Date(c.nextHearingDate).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Not Scheduled'}
                      </div>
                    </td>

                    <td className="py-2 px-3 max-w-[200px] truncate text-slate-600 dark:text-slate-400">
                      {c.hearingPurpose}
                    </td>

                    <td className="py-2 px-3">
                      <div className="font-medium text-slate-900 dark:text-white leading-4">{c.assignedAdvocate}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{c.advocatePhone}</div>
                    </td>

                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset whitespace-nowrap bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30">
                        {c.caseStatus}
                      </span>
                    </td>

                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          aria-label={`Update ${c.caseNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Update Hearing"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id, c.caseNumber)}
                          aria-label={`Delete ${c.caseNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Delete Case"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreateOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <h2 className="text-[13px] font-semibold text-slate-900 dark:text-white">
                {isCreateOpen ? 'Register Court Litigation Case' : 'Update Court Hearing & Status'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setIsEditOpen(false);
                }}
                aria-label="Close"
                className="h-6 w-6 grid place-items-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={isCreateOpen ? handleCreate : handleUpdate} className="flex flex-col min-h-0 text-xs">
              <div className="p-4 space-y-3 overflow-y-auto">
                {formError && (
                  <div className="p-2.5 rounded-md bg-rose-50 dark:bg-rose-500/10 ring-1 ring-rose-200 dark:ring-rose-500/30 text-rose-700 dark:text-rose-300 text-[11.5px] font-medium">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Case Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OA/452/2026"
                      value={formData.caseNumber || ''}
                      onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>eCourts CNR Number</label>
                    <input
                      type="text"
                      placeholder="e.g. MHMB020012342026"
                      value={formData.cnrNumber || ''}
                      onChange={(e) => setFormData({ ...formData, cnrNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Court / Tribunal Type</label>
                    <select
                      value={formData.courtType || ''}
                      onChange={(e) => setFormData({ ...formData, courtType: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Debt Recovery Tribunal (DRT)">Debt Recovery Tribunal (DRT)</option>
                      <option value="National Company Law Tribunal (NCLT - IBC)">National Company Law Tribunal (NCLT - IBC)</option>
                      <option value="CMM / DM Court (SARFAESI Section 14)">CMM / DM Court (SARFAESI Section 14)</option>
                      <option value="Magistrate Court (Section 138 NI Act)">Magistrate Court (Section 138 NI Act)</option>
                      <option value="High Court (Commercial Division)">High Court (Commercial Division)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Court Bench Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DRT-II Mumbai"
                      value={formData.courtBench || ''}
                      onChange={(e) => setFormData({ ...formData, courtBench: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Select Corporate Borrower *</label>
                    <select
                      value={formData.borrower || ''}
                      onChange={(e) => setFormData({ ...formData, borrower: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">-- Select Corporate Borrower --</option>
                      {borrowers.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Select Loan Account *</label>
                    <select
                      value={formData.loanAccount || ''}
                      onChange={(e) => setFormData({ ...formData, loanAccount: e.target.value })}
                      className={`${inputCls} font-mono`}
                    >
                      <option value="">-- Select Loan Account --</option>
                      {loans.map((l) => (
                        <option key={l._id} value={l._id}>
                          {l.loanAccountNumber} (₹ {(l.outstandingPrincipal / 10000000).toFixed(2)} Cr)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Claim Suit Value (₹ Cr) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 45.20"
                      value={formData.claimAmount || ''}
                      onChange={(e) => setFormData({ ...formData, claimAmount: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Next Court Hearing Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.nextHearingDate || ''}
                      onChange={(e) => setFormData({ ...formData, nextHearingDate: e.target.value })}
                      className={`${inputCls} font-medium dark:[color-scheme:dark]`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Assigned Panel Advocate</label>
                    <input
                      type="text"
                      value={formData.assignedAdvocate || ''}
                      onChange={(e) => setFormData({ ...formData, assignedAdvocate: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Advocate Phone</label>
                    <input
                      type="text"
                      value={formData.advocatePhone || ''}
                      onChange={(e) => setFormData({ ...formData, advocatePhone: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Hearing Purpose / Daily Order Agenda</label>
                  <input
                    type="text"
                    placeholder="e.g. Final Arguments on Bank Interim Injunction"
                    value={formData.hearingPurpose || ''}
                    onChange={(e) => setFormData({ ...formData, hearingPurpose: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 shrink-0 bg-slate-50/50 dark:bg-slate-800/30">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setIsEditOpen(false);
                  }}
                  className="h-7 px-3 rounded-md ring-1 ring-slate-200 dark:ring-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-[11.5px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="h-7 px-3.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11.5px] inline-flex items-center gap-1.5 transition-colors disabled:opacity-60"
                >
                  {formSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isCreateOpen ? 'Register Suit' : 'Update Case'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}