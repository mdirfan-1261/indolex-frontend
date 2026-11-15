'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Building2,
  Plus,
  Search,
  Filter,
  IndianRupee,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Edit3,
  Trash2,
  CheckCircle2,
  Loader2,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';

export default function LoansPage() {
  const { token } = useAuth();
  const [loans, setLoans] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    loanAccountNumber: '',
    borrower: '',
    loanType: 'Corporate Term Loan',
    sanctionedAmount: '',
    disbursedAmount: '',
    interestRate: '10.25',
    tenureMonths: '60',
    monthlyEmi: '',
    outstandingPrincipal: '',
    dpd: '0',
    assetClassification: 'Standard',
    isSecured: true,
    primaryCollateralDescription: 'Factory Land, Building & Machinery at MIDC',
    collateralValuationAmount: '',
    personalGuarantorName: '',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // 1. Fetch Loans & Corporate Borrowers from MongoDB
  const fetchData = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      // Fetch Loans
      let url = 'http://localhost:5000/api/loans';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedClassification !== 'ALL') params.append('classification', selectedClassification);
      if (params.toString()) url += `?${params.toString()}`;

      const resLoans = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataLoans = await resLoans.json();
      if (resLoans.ok && dataLoans.loans) {
        setLoans(dataLoans.loans);
      }

      // Fetch Borrowers (for dropdown)
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
    } catch (err) {
      console.error('Error fetching loan data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedClassification]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // 2. Sanction New Loan
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      if (!formData.borrower) throw new Error('Please select a registered Corporate Borrower');

      const payload = {
        ...formData,
        sanctionedAmount: Number(formData.sanctionedAmount) * 10000000, // Converting Cr to ₹
        disbursedAmount: Number(formData.disbursedAmount || formData.sanctionedAmount) * 10000000,
        outstandingPrincipal: Number(formData.outstandingPrincipal || formData.sanctionedAmount) * 10000000,
        collateralValuationAmount: Number(formData.collateralValuationAmount || 0) * 10000000,
        interestRate: Number(formData.interestRate),
        tenureMonths: Number(formData.tenureMonths),
        dpd: Number(formData.dpd),
      };

      const res = await fetch('http://localhost:5000/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Loan sanction failed');

      setIsCreateOpen(false);
      showToast('New Loan Account sanctioned & disbursed successfully!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 3. Open Edit
  const handleOpenEdit = (loan) => {
    setEditingLoan(loan);
    setFormData({
      loanAccountNumber: loan.loanAccountNumber,
      borrower: loan.borrower?._id || loan.borrower,
      loanType: loan.loanType,
      sanctionedAmount: (loan.sanctionedAmount / 10000000).toFixed(2),
      disbursedAmount: (loan.disbursedAmount / 10000000).toFixed(2),
      interestRate: loan.interestRate,
      tenureMonths: loan.tenureMonths,
      monthlyEmi: loan.monthlyEmi,
      outstandingPrincipal: (loan.outstandingPrincipal / 10000000).toFixed(2),
      dpd: loan.dpd,
      assetClassification: loan.assetClassification,
      isSecured: loan.isSecured,
      primaryCollateralDescription: loan.primaryCollateralDescription,
      collateralValuationAmount: (loan.collateralValuationAmount / 10000000).toFixed(2),
      personalGuarantorName: loan.personalGuarantorName || '',
    });
    setIsEditOpen(true);
  };

  // 4. Submit Edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingLoan) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const payload = {
        ...formData,
        sanctionedAmount: Number(formData.sanctionedAmount) * 10000000,
        disbursedAmount: Number(formData.disbursedAmount) * 10000000,
        outstandingPrincipal: Number(formData.outstandingPrincipal) * 10000000,
        collateralValuationAmount: Number(formData.collateralValuationAmount || 0) * 10000000,
        interestRate: Number(formData.interestRate),
        tenureMonths: Number(formData.tenureMonths),
        dpd: Number(formData.dpd),
      };

      const res = await fetch(`http://localhost:5000/api/loans/${editingLoan._id}`, {
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
      setEditingLoan(null);
      showToast('Loan account details updated!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5. Delete Loan
  const handleDelete = async (id, accNo) => {
    if (!confirm(`Are you sure you want to delete Loan Account "${accNo}"?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/loans/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setLoans((prev) => prev.filter((l) => l._id !== id));
      showToast('Loan account deleted successfully.');
    } catch (err) {
      alert(err.message);
    }
  };

  const getAssetBadge = (classification) => {
    switch (classification) {
      case 'Standard':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30';
      case 'SMA-0':
        return 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30';
      case 'SMA-1':
        return 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30';
      case 'SMA-2':
        return 'bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/30';
      case 'Substandard':
      case 'Doubtful':
      case 'Loss':
        return 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30';
      default:
        return 'bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-500/30';
    }
  };

  const kpis = [
    {
      label: 'Total Facilities',
      value: `${loans.length} Accounts`,
      icon: FileSpreadsheet,
      v: 'text-slate-900 dark:text-white',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'Total Outstanding',
      value: `₹ ${(loans.reduce((a, b) => a + (b.outstandingPrincipal || 0), 0) / 10000000).toFixed(2)} Cr`,
      icon: IndianRupee,
      v: 'text-emerald-700 dark:text-emerald-400',
      i: 'text-emerald-500 dark:text-emerald-400',
    },
    {
      label: 'Stressed (SMA-1/2)',
      value: `${loans.filter((l) => l.dpd > 30 && l.dpd < 90).length} Accounts`,
      icon: Clock,
      v: 'text-amber-700 dark:text-amber-400',
      i: 'text-amber-500 dark:text-amber-400',
    },
    {
      label: 'NPA Accounts (90+ DPD)',
      value: `${loans.filter((l) => l.dpd >= 90).length} Accounts`,
      icon: AlertTriangle,
      v: 'text-rose-700 dark:text-rose-400',
      i: 'text-rose-500 dark:text-rose-400',
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
              M-03 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 7 · Loan portfolio management</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Loan Accounts & Facility Surveillance
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Corporate term loans, sanction exposure, DPD ageing, collateral valuations and asset classification.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              loanAccountNumber: `SBI-CORP-${Math.floor(1000 + Math.random() * 9000)}`,
              borrower: borrowers[0]?._id || '',
              loanType: 'Corporate Term Loan',
              sanctionedAmount: '',
              disbursedAmount: '',
              interestRate: '10.25',
              tenureMonths: '60',
              monthlyEmi: '',
              outstandingPrincipal: '',
              dpd: '0',
              assetClassification: 'Standard',
              isSecured: true,
              primaryCollateralDescription: 'Commercial Plant, Land & Machinery',
              collateralValuationAmount: '',
              personalGuarantorName: '',
            });
            setIsCreateOpen(true);
          }}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Sanction & Disburse Loan</span>
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

      {/* Filters */}
      <div className={`${card} flex flex-col md:flex-row md:items-center justify-between gap-2 p-2`}>
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by loan account number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputCls} h-7 pl-8 pr-3`}
          />
        </form>

        <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-slate-100 dark:bg-slate-800 w-fit max-w-full overflow-x-auto">
          {['ALL', 'Standard', 'SMA-1', 'SMA-2', 'Substandard'].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClassification(cls)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedClassification === cls
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Loans Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Loan Account</th>
                <th className="py-1.5 px-3 font-medium">Corporate Borrower</th>
                <th className="py-1.5 px-3 font-medium">Sanction / Disbursed</th>
                <th className="py-1.5 px-3 font-medium text-right">Outstanding (₹ Cr)</th>
                <th className="py-1.5 px-3 font-medium">DPD Ageing</th>
                <th className="py-1.5 px-3 font-medium">Asset Class</th>
                <th className="py-1.5 px-3 font-medium">Collateral Valuation</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading Loan Accounts from CBS...</span>
                  </td>
                </tr>
              ) : loans.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">No Loan Accounts Found</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ Sanction & Disburse Loan" to create your first corporate loan account.
                    </p>
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">
                        {loan.loanAccountNumber}
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{loan.loanType}</span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 leading-4">
                        {loan.borrower?.companyName || 'Corporate Entity'}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        CIN: {loan.borrower?.cin || 'N/A'}
                      </div>
                    </td>
                    <td className="py-2 px-3 tabular-nums">
                      <div className="font-medium text-slate-800 dark:text-slate-200 leading-4">
                        ₹ {(loan.sanctionedAmount / 10000000).toFixed(2)} Cr
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">
                        Disb: ₹ {(loan.disbursedAmount / 10000000).toFixed(2)} Cr • {loan.interestRate}%
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-slate-900 dark:text-white whitespace-nowrap">
                      ₹ {(loan.outstandingPrincipal / 10000000).toFixed(2)} Cr
                    </td>
                    <td className="py-2 px-3 font-semibold tabular-nums whitespace-nowrap">
                      <span
                        className={
                          loan.dpd >= 90
                            ? 'text-rose-600 dark:text-rose-400'
                            : loan.dpd > 0
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }
                      >
                        {loan.dpd} DPD
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset whitespace-nowrap ${getAssetBadge(
                          loan.assetClassification
                        )}`}
                      >
                        {loan.assetClassification}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-medium text-slate-800 dark:text-slate-200 tabular-nums leading-4">
                        ₹ {(loan.collateralValuationAmount / 10000000).toFixed(2)} Cr
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[150px]">
                        {loan.primaryCollateralDescription}
                      </div>
                    </td>
                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(loan)}
                          aria-label={`Edit ${loan.loanAccountNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Edit Loan"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(loan._id, loan.loanAccountNumber)}
                          aria-label={`Delete ${loan.loanAccountNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Delete Loan"
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
                {isCreateOpen ? 'Sanction & Disburse Loan Facility' : 'Update Loan Account'}
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
                    <label className={labelCls}>Loan Account Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SBI-CORP-TL-2026"
                      value={formData.loanAccountNumber}
                      onChange={(e) => setFormData({ ...formData, loanAccountNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Select Corporate Borrower *</label>
                    <select
                      value={formData.borrower}
                      onChange={(e) => setFormData({ ...formData, borrower: e.target.value })}
                      className={inputCls}
                    >
                      {borrowers.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Loan Facility Type</label>
                    <select
                      value={formData.loanType}
                      onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Corporate Term Loan">Corporate Term Loan</option>
                      <option value="Working Capital / Cash Credit">Working Capital / Cash Credit</option>
                      <option value="Project Finance Facility">Project Finance Facility</option>
                      <option value="Bank Guarantee Limit">Bank Guarantee Limit</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Sanctioned Limit (₹ Cr) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 45.00"
                      value={formData.sanctionedAmount}
                      onChange={(e) => setFormData({ ...formData, sanctionedAmount: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Outstanding (₹ Cr)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 42.50"
                      value={formData.outstandingPrincipal}
                      onChange={(e) => setFormData({ ...formData, outstandingPrincipal: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.interestRate}
                      onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>DPD (Days Past Due)</label>
                    <input
                      type="number"
                      value={formData.dpd}
                      onChange={(e) => setFormData({ ...formData, dpd: e.target.value })}
                      className={`${inputCls} font-semibold`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Asset Classification</label>
                    <select
                      value={formData.assetClassification}
                      onChange={(e) => setFormData({ ...formData, assetClassification: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Standard">Standard (0 DPD)</option>
                      <option value="SMA-0">SMA-0 (1-30 DPD)</option>
                      <option value="SMA-1">SMA-1 (31-60 DPD)</option>
                      <option value="SMA-2">SMA-2 (61-90 DPD)</option>
                      <option value="Substandard">Substandard (NPA 90+ DPD)</option>
                      <option value="Doubtful">Doubtful Asset</option>
                      <option value="Loss">Loss Asset</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Collateral Value (₹ Cr)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 60.00"
                      value={formData.collateralValuationAmount}
                      onChange={(e) => setFormData({ ...formData, collateralValuationAmount: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Primary Collateral Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 5.4 Acre Industrial Land & Machinery at Navi Mumbai MIDC"
                    value={formData.primaryCollateralDescription}
                    onChange={(e) => setFormData({ ...formData, primaryCollateralDescription: e.target.value })}
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
                  <span>{isCreateOpen ? 'Sanction Loan' : 'Update Loan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}