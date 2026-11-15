'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Plus,
  Search,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit3,
  Loader2,
  X,
  Building2,
  Percent,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';

// UI-only: pick chip colour from the status text (does not change stored data)
const statusChip = (status = '') => {
  if (status.includes('Closed') || status.includes('Realized'))
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30';
  if (status.includes('Sanctioned'))
    return 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30';
  if (status.includes('Token'))
    return 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30';
  return 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700';
};

export default function RecoveryDeskPage() {
  const { token } = useAuth();
  const [recoveries, setRecoveries] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRecovery, setEditingRecovery] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    recoveryRefNumber: '',
    actionType: 'One Time Settlement (OTS)',
    borrower: '',
    loanAccount: '',
    ledgerOutstandingAmount: '',
    settlementAmountApproved: '',
    recoveryAmountRealized: '',
    approvalAuthority: 'SARG Settlement Committee (Scale IV/V)',
    status: 'Proposal Received & Under Review',
    actionNotes: 'Borrower promoter agreed for 3 equal monthly tranches.',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // 1. Fetch Recoveries, Borrowers & Loans
  const fetchData = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      let url = 'http://localhost:5000/api/recovery';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedAction !== 'ALL') params.append('actionType', selectedAction);
      if (params.toString()) url += `?${params.toString()}`;

      const resRec = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataRec = await resRec.json();
      if (resRec.ok && dataRec.recoveries) {
        setRecoveries(dataRec.recoveries);
      }

      // Fetch Borrowers
      const resBorrowers = await fetch('http://localhost:5000/api/borrowers', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataBorrowers = await resBorrowers.json();
      if (resBorrowers.ok && dataBorrowers.borrowers) {
        setBorrowers(dataBorrowers.borrowers);
        if (dataBorrowers.borrowers.length > 0 && !formData.borrower) {
          setFormData((prev) => ({ ...prev, borrower: dataBorrowers.borrowers[0]._id || '' }));
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
          setFormData((prev) => ({ ...prev, loanAccount: dataLoans.loans[0]._id || '' }));
        }
      }
    } catch (err) {
      console.error('Error fetching recovery data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedAction]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // 2. Submit New Recovery
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
        ledgerOutstandingAmount: Number(formData.ledgerOutstandingAmount) * 10000000,
        settlementAmountApproved: Number(formData.settlementAmountApproved) * 10000000,
        recoveryAmountRealized: Number(formData.recoveryAmountRealized || 0) * 10000000,
      };

      const res = await fetch('http://localhost:5000/api/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Creation failed');

      setIsCreateOpen(false);
      showToast('Recovery / OTS Compromise logged successfully!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 3. Open Edit
  const handleOpenEdit = (r) => {
    setEditingRecovery(r);
    setFormData({
      recoveryRefNumber: r.recoveryRefNumber || '',
      actionType: r.actionType || 'One Time Settlement (OTS)',
      borrower: r.borrower?._id || r.borrower || '',
      loanAccount: r.loanAccount?._id || r.loanAccount || '',
      ledgerOutstandingAmount: r.ledgerOutstandingAmount ? (r.ledgerOutstandingAmount / 10000000).toFixed(2) : '',
      settlementAmountApproved: r.settlementAmountApproved ? (r.settlementAmountApproved / 10000000).toFixed(2) : '',
      recoveryAmountRealized: r.recoveryAmountRealized ? (r.recoveryAmountRealized / 10000000).toFixed(2) : '',
      approvalAuthority: r.approvalAuthority || 'SARG Settlement Committee (Scale IV/V)',
      status: r.status || 'Proposal Received & Under Review',
      actionNotes: r.actionNotes || '',
    });
    setIsEditOpen(true);
  };

  // 4. Update Recovery
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingRecovery) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const payload = {
        ...formData,
        ledgerOutstandingAmount: Number(formData.ledgerOutstandingAmount) * 10000000,
        settlementAmountApproved: Number(formData.settlementAmountApproved) * 10000000,
        recoveryAmountRealized: Number(formData.recoveryAmountRealized || 0) * 10000000,
      };

      const res = await fetch(`http://localhost:5000/api/recovery/${editingRecovery._id}`, {
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
      setEditingRecovery(null);
      showToast('Recovery status & payments updated!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5. Delete Recovery
  const handleDelete = async (id, num) => {
    if (!confirm(`Are you sure you want to delete Recovery "${num}"?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/recovery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setRecoveries((prev) => prev.filter((r) => r._id !== id));
      showToast('Record deleted.');
    } catch (err) {
      alert(err.message);
    }
  };

  const kpis = [
    {
      label: 'Active Recovery Files',
      value: `${recoveries.length} Records`,
      icon: Building2,
      v: 'text-slate-900 dark:text-white',
      i: 'text-slate-400 dark:text-slate-500',
    },
    {
      label: 'Sanctioned OTS Value',
      value: `₹ ${(recoveries.reduce((a, b) => a + (b.settlementAmountApproved || 0), 0) / 10000000).toFixed(2)} Cr`,
      icon: ShieldCheck,
      v: 'text-sky-700 dark:text-sky-400',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'Cash Recovered',
      value: `₹ ${(recoveries.reduce((a, b) => a + (b.recoveryAmountRealized || 0), 0) / 10000000).toFixed(2)} Cr`,
      icon: IndianRupee,
      v: 'text-emerald-700 dark:text-emerald-400',
      i: 'text-emerald-500 dark:text-emerald-400',
    },
    {
      label: 'Settled & Closed',
      value: `${recoveries.filter((r) => r.status.includes('Closed')).length} Accounts`,
      icon: CheckCircle2,
      v: 'text-slate-900 dark:text-white',
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
              M-08 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 8 · Recovery & OTS compromise desk</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Recovery Realization & OTS Settlements
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            One Time Settlement (OTS) compromises, cash tranches, Section 13(4) physical possession and E-Auctions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/recovery-dashboard"
            className="h-8 px-3 rounded-md bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Recovery KPI Dashboard</span>
          </Link>

          <button
            onClick={() => {
              setFormData({
                recoveryRefNumber: `SBI/SARG/OTS/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
                actionType: 'One Time Settlement (OTS)',
                borrower: borrowers[0]?._id || '',
                loanAccount: loans[0]?._id || '',
                ledgerOutstandingAmount: '',
                settlementAmountApproved: '',
                recoveryAmountRealized: '',
                approvalAuthority: 'SARG Settlement Committee (Scale IV/V)',
                status: 'Proposal Received & Under Review',
                actionNotes: 'Borrower agreed to pay 15% upfront and balance within 90 days.',
              });
              setIsCreateOpen(true);
            }}
            className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log OTS / Recovery Action</span>
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

      {/* Recovery Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Ref Number / Type</th>
                <th className="py-1.5 px-3 font-medium">Borrower Entity</th>
                <th className="py-1.5 px-3 font-medium text-right">Book Dues</th>
                <th className="py-1.5 px-3 font-medium text-right">Sanctioned OTS</th>
                <th className="py-1.5 px-3 font-medium text-right">Cash Realized</th>
                <th className="py-1.5 px-3 font-medium text-right">Haircut %</th>
                <th className="py-1.5 px-3 font-medium">Settlement Status</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading Recovery & OTS Records...</span>
                  </td>
                </tr>
              ) : recoveries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">No Recovery Actions Logged Yet</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ Log OTS / Recovery Action" to record your first compromise proposal.
                    </p>
                  </td>
                </tr>
              ) : (
                recoveries.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">
                        {r.recoveryRefNumber}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{r.actionType}</span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 leading-4">
                        {r.borrower?.companyName || 'Corporate Entity'}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        {r.loanAccount?.loanAccountNumber}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right font-medium tabular-nums text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      ₹ {(r.ledgerOutstandingAmount / 10000000).toFixed(2)} Cr
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-sky-700 dark:text-sky-400 whitespace-nowrap">
                      ₹ {(r.settlementAmountApproved / 10000000).toFixed(2)} Cr
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                      ₹ {(r.recoveryAmountRealized / 10000000).toFixed(2)} Cr
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-amber-700 dark:text-amber-400">
                      {r.compromiseHaircutPercentage || 0}%
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset whitespace-nowrap ${statusChip(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(r)}
                          aria-label={`Update ${r.recoveryRefNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Update Tranche"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(r._id, r.recoveryRefNumber)}
                          aria-label={`Delete ${r.recoveryRefNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Delete Record"
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
                {isCreateOpen ? 'Log OTS Settlement / Action' : 'Update Settlement Status & Cash Realized'}
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
                    <label className={labelCls}>Recovery Ref Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.recoveryRefNumber || ''}
                      onChange={(e) => setFormData({ ...formData, recoveryRefNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Recovery Action Type</label>
                    <select
                      value={formData.actionType || ''}
                      onChange={(e) => setFormData({ ...formData, actionType: e.target.value })}
                      className={inputCls}
                    >
                      <option value="One Time Settlement (OTS)">One Time Settlement (OTS)</option>
                      <option value="SARFAESI Section 13(4) Physical Possession">SARFAESI Section 13(4) Physical Possession</option>
                      <option value="E-Auction Sale of Mortgaged Asset">E-Auction Sale of Mortgaged Asset</option>
                      <option value="Direct Cash Recovery / Compromise">Direct Cash Recovery / Compromise</option>
                    </select>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Book Dues (₹ Cr) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 68.40"
                      value={formData.ledgerOutstandingAmount || ''}
                      onChange={(e) => setFormData({ ...formData, ledgerOutstandingAmount: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Approved OTS (₹ Cr) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 45.00"
                      value={formData.settlementAmountApproved || ''}
                      onChange={(e) => setFormData({ ...formData, settlementAmountApproved: e.target.value })}
                      className={`${inputCls} font-semibold text-sky-700 dark:text-sky-400`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Cash Realized (₹ Cr)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 15.00"
                      value={formData.recoveryAmountRealized || ''}
                      onChange={(e) => setFormData({ ...formData, recoveryAmountRealized: e.target.value })}
                      className={`${inputCls} font-semibold text-emerald-700 dark:text-emerald-400`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Approval Authority</label>
                    <select
                      value={formData.approvalAuthority || ''}
                      onChange={(e) => setFormData({ ...formData, approvalAuthority: e.target.value })}
                      className={inputCls}
                    >
                      <option value="SARG Settlement Committee (Scale IV/V)">SARG Settlement Committee (Scale IV/V)</option>
                      <option value="General Manager (SARG Apex Committee)">General Manager (SARG Apex Committee)</option>
                      <option value="Executive Director / Managing Director Board">Executive Director / Managing Director Board</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Settlement Status</label>
                    <select
                      value={formData.status || ''}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Proposal Received & Under Review">Proposal Received & Under Review</option>
                      <option value="SARG Committee Sanctioned">SARG Committee Sanctioned</option>
                      <option value="Upfront 15% Token Paid">Upfront 15% Token Paid</option>
                      <option value="Full OTS Amount Realized">Full OTS Amount Realized</option>
                      <option value="Settled & Account Closed (NOC Issued)">Settled & Account Closed (NOC Issued)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Action & Payment Terms Notes</label>
                  <textarea
                    rows="2"
                    value={formData.actionNotes || ''}
                    onChange={(e) => setFormData({ ...formData, actionNotes: e.target.value })}
                    className={`${inputCls} h-auto py-2 leading-relaxed`}
                  ></textarea>
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
                  <span>{isCreateOpen ? 'Log Settlement' : 'Save Update'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}