'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Edit3,
  Trash2,
  CheckCircle2,
  Loader2,
  X,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';

export default function BorrowersPage() {
  const { token } = useAuth();
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBorrower, setEditingBorrower] = useState(null);

  // Forms
  const [formData, setFormData] = useState({
    companyName: '',
    cin: '',
    pan: '',
    gstin: '',
    industrySector: 'Infrastructure & Real Estate',
    registeredAddress: '',
    state: 'Maharashtra',
    leadBankName: 'State Bank of India',
    consortiumType: 'Multiple Banking',
    totalSanctionedExposure: '',
    promoterDirectorName: '',
    promoterPhone: '',
    promoterEmail: '',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // Fetch Borrowers from MongoDB
  const fetchBorrowers = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');
      let url = 'https://indolex-backend.onrender.com/api/borrowers';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedBank !== 'ALL') params.append('leadBank', selectedBank);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok && data.borrowers) {
        setBorrowers(data.borrowers);
      }
    } catch (err) {
      console.error('Error fetching borrowers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowers();
  }, [selectedBank]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBorrowers();
  };

  // Create Borrower
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch('https://indolex-backend.onrender.com/api/borrowers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setIsCreateOpen(false);
      showToast('Corporate Borrower registered successfully!');
      setFormData({
        companyName: '',
        cin: '',
        pan: '',
        gstin: '',
        industrySector: 'Infrastructure & Real Estate',
        registeredAddress: '',
        state: 'Maharashtra',
        leadBankName: 'State Bank of India',
        consortiumType: 'Multiple Banking',
        totalSanctionedExposure: '',
        promoterDirectorName: '',
        promoterPhone: '',
        promoterEmail: '',
      });
      fetchBorrowers();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Open Edit
  const handleOpenEdit = (b) => {
    setEditingBorrower(b);
    setFormData({
      companyName: b.companyName,
      cin: b.cin,
      pan: b.pan,
      gstin: b.gstin || '',
      industrySector: b.industrySector || 'Infrastructure',
      registeredAddress: b.registeredAddress || '',
      state: b.state || 'Maharashtra',
      leadBankName: b.leadBankName || 'State Bank of India',
      consortiumType: b.consortiumType || 'Sole Banking',
      totalSanctionedExposure: b.totalSanctionedExposure || '',
      promoterDirectorName: b.promoterDirectorName || '',
      promoterPhone: b.promoterPhone || '',
      promoterEmail: b.promoterEmail || '',
    });
    setIsEditOpen(true);
  };

  // Submit Edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingBorrower) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`https://indolex-backend.onrender.com/api/borrowers/${editingBorrower._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      setIsEditOpen(false);
      setEditingBorrower(null);
      showToast('Borrower details updated!');
      fetchBorrowers();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Borrower
  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete Corporate Borrower "${name}"?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`https://indolex-backend.onrender.com/api/borrowers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setBorrowers((prev) => prev.filter((b) => b._id !== id));
      showToast('Borrower deleted successfully.');
    } catch (err) {
      alert(err.message);
    }
  };

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
              M-02 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 6 · Corporate CRM</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Corporate Borrower Directory
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Central repository of corporate debt entities, MCA CIN details, directors and banking consortia.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              companyName: '',
              cin: '',
              pan: '',
              gstin: '',
              industrySector: 'Infrastructure & Real Estate',
              registeredAddress: '',
              state: 'Maharashtra',
              leadBankName: 'State Bank of India',
              consortiumType: 'Multiple Banking',
              totalSanctionedExposure: '',
              promoterDirectorName: '',
              promoterPhone: '',
              promoterEmail: '',
            });
            setIsCreateOpen(true);
          }}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard Corporate Borrower</span>
        </button>
      </div>

      {/* Filters */}
      <div className={`${card} flex flex-col md:flex-row md:items-center justify-between gap-2 p-2`}>
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search company, CIN or PAN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputCls} h-7 pl-8 pr-3`}
          />
        </form>

        <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-slate-100 dark:bg-slate-800 w-fit max-w-full overflow-x-auto">
          {['ALL', 'State Bank of India', 'Punjab National Bank', 'Bank of Baroda'].map((bank) => (
            <button
              key={bank}
              onClick={() => setSelectedBank(bank)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedBank === bank
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {bank === 'ALL' ? 'All Consortia' : bank.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Borrowers Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {loading ? 'Loading…' : `${borrowers.length} ${borrowers.length === 1 ? 'entity' : 'entities'}`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Corporate Entity</th>
                <th className="py-1.5 px-3 font-medium">CIN & PAN</th>
                <th className="py-1.5 px-3 font-medium">Lead Bank / Consortium</th>
                <th className="py-1.5 px-3 font-medium text-right">Sanctioned Limit</th>
                <th className="py-1.5 px-3 font-medium">Managing Director / Promoter</th>
                <th className="py-1.5 px-3 font-medium">State</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading Corporate Entities...</span>
                  </td>
                </tr>
              ) : borrowers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">
                      No Corporate Borrowers Registered
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ Onboard Corporate Borrower" to add your first company.
                    </p>
                  </td>
                </tr>
              ) : (
                borrowers.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="font-semibold text-slate-900 dark:text-white leading-4">{b.companyName}</div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{b.industrySector}</span>
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      <div className="leading-4">{b.cin}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">PAN: {b.pan}</div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-medium text-slate-800 dark:text-slate-200 leading-4">{b.leadBankName}</div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{b.consortiumType}</span>
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-slate-900 dark:text-white whitespace-nowrap">
                      ₹ {b.totalSanctionedExposure || 0} Cr
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-medium text-slate-900 dark:text-white leading-4">
                        {b.promoterDirectorName || 'Not Listed'}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">
                        {b.promoterPhone || b.promoterEmail}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{b.state}</td>
                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          aria-label={`Edit ${b.companyName}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Edit Borrower"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(b._id, b.companyName)}
                          aria-label={`Delete ${b.companyName}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Delete Borrower"
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
                {isCreateOpen ? 'Onboard Corporate Borrower' : 'Edit Corporate Borrower'}
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

                <div>
                  <label className={labelCls}>Company Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Infra & Highways Private Limited"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Corporate CIN (21 digits) *</label>
                    <input
                      type="text"
                      required
                      placeholder="U45200MH2014PTC254890"
                      value={formData.cin}
                      onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Company PAN (10 chars) *</label>
                    <input
                      type="text"
                      required
                      placeholder="AAACA1234F"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Lead Bank</label>
                    <select
                      value={formData.leadBankName}
                      onChange={(e) => setFormData({ ...formData, leadBankName: e.target.value })}
                      className={inputCls}
                    >
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                      <option value="Bank of Baroda">Bank of Baroda (BOB)</option>
                      <option value="HDFC Bank Ltd">HDFC Bank Ltd</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Total Sanctioned (₹ Cr)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 68.40"
                      value={formData.totalSanctionedExposure}
                      onChange={(e) => setFormData({ ...formData, totalSanctionedExposure: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Managing Director / Promoter</label>
                    <input
                      type="text"
                      placeholder="e.g. Kewal Kishan Singhania"
                      value={formData.promoterDirectorName}
                      onChange={(e) => setFormData({ ...formData, promoterDirectorName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Promoter Contact (Phone/Email)</label>
                    <input
                      type="text"
                      placeholder="+91 98200 11223"
                      value={formData.promoterPhone}
                      onChange={(e) => setFormData({ ...formData, promoterPhone: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Registered Address & State</label>
                  <input
                    type="text"
                    placeholder="Nariman Point, Mumbai, Maharashtra - 400021"
                    value={formData.registeredAddress}
                    onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
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
                  <span>{isCreateOpen ? 'Register Entity' : 'Update Entity'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}