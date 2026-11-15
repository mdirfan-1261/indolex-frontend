'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Search,
  Scale,
  Clock,
  Send,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit3,
  Loader2,
  X,
  ExternalLink,
  ShieldCheck,
  ArrowRight
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
  if (status.includes('Expired'))
    return 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30';
  if (status.includes('Representation'))
    return 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-500/30';
  if (status.includes('Served'))
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30';
  return 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30';
};

export default function NoticesPage() {
  const { token } = useAuth();
  const [notices, setNotices] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    noticeNumber: '',
    noticeType: 'SARFAESI Section 13(2) Demand Notice',
    borrower: '',
    loanAccount: '',
    outstandingClaimAmount: '',
    postalTrackingNumber: '',
    securedAssetDescription: 'Commercial Factory Land, Industrial Shed & Hypothecated Plant Machinery',
    authorizedOfficerName: 'Officer R. K. Singhal (Chief Manager - SARG)',
    servingStatus: 'Dispatched via Speed Post',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // 1. Fetch Notices, Borrowers & Loans from MongoDB
  const fetchData = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      // Fetch Notices
      let url = 'http://localhost:5000/api/notices';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedStatus !== 'ALL') params.append('status', selectedStatus);
      if (params.toString()) url += `?${params.toString()}`;

      const resNotices = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataNotices = await resNotices.json();
      if (resNotices.ok && dataNotices.notices) {
        setNotices(dataNotices.notices);
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
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // 2. Issue New Notice
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      if (!formData.borrower) throw new Error('Please select a Corporate Borrower');
      if (!formData.loanAccount) throw new Error('Please select an active Loan Account');

      const payload = {
        ...formData,
        outstandingClaimAmount: Number(formData.outstandingClaimAmount) * 10000000, // Cr to ₹
      };

      const res = await fetch('http://localhost:5000/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Notice generation failed');

      setIsCreateOpen(false);
      showToast('Statutory Demand Notice generated & dispatched!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 3. Open Edit Modal (Safe Fallback to avoid nulls)
  const handleOpenEdit = (n) => {
    setEditingNotice(n);
    setFormData({
      noticeNumber: n.noticeNumber || '',
      noticeType: n.noticeType || 'SARFAESI Section 13(2) Demand Notice',
      borrower: n.borrower?._id || n.borrower || '',
      loanAccount: n.loanAccount?._id || n.loanAccount || '',
      outstandingClaimAmount: n.outstandingClaimAmount ? (n.outstandingClaimAmount / 10000000).toFixed(2) : '',
      postalTrackingNumber: n.postalTrackingNumber || '',
      securedAssetDescription: n.securedAssetDescription || '',
      authorizedOfficerName: n.authorizedOfficerName || '',
      servingStatus: n.servingStatus || 'Dispatched via Speed Post',
    });
    setIsEditOpen(true);
  };

  // 4. Update Notice
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingNotice) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const payload = {
        ...formData,
        outstandingClaimAmount: Number(formData.outstandingClaimAmount) * 10000000,
      };

      const res = await fetch(`http://localhost:5000/api/notices/${editingNotice._id}`, {
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
      setEditingNotice(null);
      showToast('Notice record updated successfully!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5. Delete Notice
  const handleDelete = async (id, num) => {
    if (!confirm(`Are you sure you want to delete Notice "${num}"?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/notices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setNotices((prev) => prev.filter((n) => n._id !== id));
      showToast('Notice deleted.');
    } catch (err) {
      alert(err.message);
    }
  };

  const kpis = [
    {
      label: 'Total Notices Issued',
      value: `${notices.length} Notices`,
      icon: FileText,
      v: 'text-slate-900 dark:text-white',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'Under 60-Day Period',
      value: `${notices.filter((n) => (n.servingStatus || '').includes('Dispatched') || (n.servingStatus || '').includes('Served')).length} Active`,
      icon: Clock,
      v: 'text-amber-700 dark:text-amber-400',
      i: 'text-amber-500 dark:text-amber-400',
    },
    {
      label: '60-Day Expired (13(4) Ready)',
      value: `${notices.filter((n) => (n.servingStatus || '').includes('Expired')).length} Accounts`,
      icon: AlertTriangle,
      v: 'text-rose-700 dark:text-rose-400',
      i: 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'Total Demand Value',
      value: `₹ ${(notices.reduce((a, b) => a + (b.outstandingClaimAmount || 0), 0) / 10000000).toFixed(2)} Cr`,
      icon: Scale,
      v: 'text-emerald-700 dark:text-emerald-400',
      i: 'text-emerald-500 dark:text-emerald-400',
    },
  ];

  return (
    <div className="p-3 md:p-4 space-y-3 min-h-screen text-slate-800 dark:text-slate-100">
      {/* Toast Notification */}
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
              M-07 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 5 · SARFAESI Act 2002 notice studio</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Statutory Demand & Possession Notice Studio
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Issue SARFAESI Section 13(2) 60-day demand notices, track Speed Post delivery and trigger Section 13(4) possession.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              noticeNumber: `SBI/SARG/SARFAESI/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
              noticeType: 'SARFAESI Section 13(2) Demand Notice',
              borrower: borrowers[0]?._id || '',
              loanAccount: loans[0]?._id || '',
              outstandingClaimAmount: '',
              postalTrackingNumber: `ED${Math.floor(100000000 + Math.random() * 900000000)}IN`,
              securedAssetDescription: 'Commercial Factory Land, Industrial Shed & Hypothecated Plant Machinery',
              authorizedOfficerName: 'Officer R. K. Singhal (Chief Manager - SARG)',
              servingStatus: 'Dispatched via Speed Post',
            });
            setIsCreateOpen(true);
          }}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Draft & Issue 13(2) Notice</span>
        </button>
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

      {/* Notices Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Notice Ref / Type</th>
                <th className="py-1.5 px-3 font-medium">Borrower Entity</th>
                <th className="py-1.5 px-3 font-medium">Loan Account</th>
                <th className="py-1.5 px-3 font-medium text-right">Demand Amount</th>
                <th className="py-1.5 px-3 font-medium">Speed Post Tracking</th>
                <th className="py-1.5 px-3 font-medium">Statutory Status</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading SARFAESI Legal Notices...</span>
                  </td>
                </tr>
              ) : notices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">No Statutory Notices Issued Yet</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ Draft & Issue 13(2) Notice" to generate your first SARFAESI demand letter.
                    </p>
                  </td>
                </tr>
              ) : (
                notices.map((n) => (
                  <tr key={n._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">{n.noticeNumber}</div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{n.noticeType}</span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 leading-4">
                        {n.borrower?.companyName || 'Corporate Entity'}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        CIN: {n.borrower?.cin || 'N/A'}
                      </div>
                    </td>
                    <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                      {n.loanAccount?.loanAccountNumber}
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-slate-900 dark:text-white whitespace-nowrap">
                      ₹ {(n.outstandingClaimAmount / 10000000).toFixed(2)} Cr
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px] text-sky-700 dark:text-sky-400 whitespace-nowrap">
                      {n.postalTrackingNumber || 'In-Hand Delivery'}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset whitespace-nowrap ${statusChip(
                          n.servingStatus
                        )}`}
                      >
                        {n.servingStatus}
                      </span>
                    </td>
                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(n)}
                          aria-label={`Edit ${n.noticeNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Edit Notice Record"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(n._id, n.noticeNumber)}
                          aria-label={`Delete ${n.noticeNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Delete Notice"
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
                {isCreateOpen ? 'Issue SARFAESI Section 13(2) Notice' : 'Update Notice Details'}
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
                    <label className={labelCls}>Notice Ref Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.noticeNumber || ''}
                      onChange={(e) => setFormData({ ...formData, noticeNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Notice Statutory Type</label>
                    <select
                      value={formData.noticeType || ''}
                      onChange={(e) => setFormData({ ...formData, noticeType: e.target.value })}
                      className={inputCls}
                    >
                      <option value="SARFAESI Section 13(2) Demand Notice">SARFAESI Section 13(2) Demand Notice</option>
                      <option value="SARFAESI Section 13(4) Possession Notice">SARFAESI Section 13(4) Possession Notice</option>
                      <option value="Section 138 NI Act Cheque Dishonour Notice">Section 138 NI Act Cheque Dishonour Notice</option>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Demand Claim Amount (₹ Cr) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 45.20"
                      value={formData.outstandingClaimAmount || ''}
                      onChange={(e) => setFormData({ ...formData, outstandingClaimAmount: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Postal Tracking (Speed Post)</label>
                    <input
                      type="text"
                      placeholder="e.g. ED123456789IN"
                      value={formData.postalTrackingNumber || ''}
                      onChange={(e) => setFormData({ ...formData, postalTrackingNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Serving Status</label>
                    <select
                      value={formData.servingStatus || ''}
                      onChange={(e) => setFormData({ ...formData, servingStatus: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Dispatched via Speed Post">Dispatched via Speed Post</option>
                      <option value="Served & Acknowledged">Served & Acknowledged</option>
                      <option value="Borrower Representation (13(3A)) Received">Borrower Representation (13(3A)) Received</option>
                      <option value="60-Day Period Expired (Action 13(4) Ready)">60-Day Period Expired (Action 13(4) Ready)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Issuing Authorized Officer</label>
                    <input
                      type="text"
                      value={formData.authorizedOfficerName || ''}
                      onChange={(e) => setFormData({ ...formData, authorizedOfficerName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Mortgaged / Secured Asset Description</label>
                  <textarea
                    rows="2"
                    value={formData.securedAssetDescription || ''}
                    onChange={(e) => setFormData({ ...formData, securedAssetDescription: e.target.value })}
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
                  <span>{isCreateOpen ? 'Dispatch Notice' : 'Update Notice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}