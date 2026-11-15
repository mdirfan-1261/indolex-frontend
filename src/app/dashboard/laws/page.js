'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Search,
  Scale,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit3,
  Loader2,
  X,
  FileText,
  AlertTriangle,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';

export default function LawsPage() {
  const { token } = useAuth();
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAct, setSelectedAct] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLaw, setEditingLaw] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    actName: 'SARFAESI Act, 2002',
    sectionNumber: '',
    sectionTitle: '',
    statutoryTimeLimit: '',
    courtOrTribunal: 'Debt Recovery Tribunal (DRT)',
    legalSummary: '',
    mandatoryChecklist: '1. Valid NPA. 2. Detailed debt ledger. 3. Registered Speed Post dispatch.',
    statutoryNoticeForm: 'Statutory Demand Format',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // 1. Fetch Laws from MongoDB
  const fetchLaws = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      let url = 'http://localhost:5000/api/laws';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedAct !== 'ALL') params.append('actName', selectedAct);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok && data.laws) {
        setLaws(data.laws);
      }
    } catch (err) {
      console.error('Error fetching laws:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaws();
  }, [selectedAct]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLaws();
  };

  // 2. Create Law Reference
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch('http://localhost:5000/api/laws', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Creation failed');

      setIsCreateOpen(false);
      showToast('Statute section reference added successfully!');
      fetchLaws();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 3. Open Edit
  const handleOpenEdit = (l) => {
    setEditingLaw(l);
    setFormData({
      actName: l.actName || 'SARFAESI Act, 2002',
      sectionNumber: l.sectionNumber || '',
      sectionTitle: l.sectionTitle || '',
      statutoryTimeLimit: l.statutoryTimeLimit || '',
      courtOrTribunal: l.courtOrTribunal || 'Debt Recovery Tribunal (DRT)',
      legalSummary: l.legalSummary || '',
      mandatoryChecklist: l.mandatoryChecklist || '',
      statutoryNoticeForm: l.statutoryNoticeForm || '',
    });
    setIsEditOpen(true);
  };

  // 4. Update Law
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingLaw) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/laws/${editingLaw._id}`, {
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
      setEditingLaw(null);
      showToast('Statute reference updated!');
      fetchLaws();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5. Delete Law
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete Statute "${title}"?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/laws/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setLaws((prev) => prev.filter((l) => l._id !== id));
      showToast('Statute reference deleted.');
    } catch (err) {
      alert(err.message);
    }
  };

  const quickRefs = [
    {
      label: 'SARFAESI Timelines',
      value: '60 Days (Sec 13(2))',
      sub: 'Physical Possession ready on Day 61',
      icon: ShieldCheck,
      v: 'text-sky-700 dark:text-sky-400',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'Section 14 CMM Order',
      value: '30–60 Days',
      sub: 'Court Commissioner Appointment',
      icon: Scale,
      v: 'text-purple-700 dark:text-purple-400',
      i: 'text-purple-500 dark:text-purple-400',
    },
    {
      label: 'Cheque Dishonour (138)',
      value: '15-Day Notice',
      sub: 'Criminal Complaint within 30 days',
      icon: AlertTriangle,
      v: 'text-amber-700 dark:text-amber-400',
      i: 'text-amber-500 dark:text-amber-400',
    },
    {
      label: 'DRT OA Limitation',
      value: '3 Years',
      sub: 'Section 19 Recovery Certificate',
      icon: Clock,
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
              M-06 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 5 · Indian banking laws & regulatory codex</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Statutory Legal Acts & Limitation Library
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Regulatory references across SARFAESI Act 2002, IBC 2016, RDB Act 1993 and Section 138 NI Act with statutory limitation clocks.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              actName: 'SARFAESI Act, 2002',
              sectionNumber: '',
              sectionTitle: '',
              statutoryTimeLimit: '60 Days from service',
              courtOrTribunal: 'Debt Recovery Tribunal (DRT)',
              legalSummary: '',
              mandatoryChecklist: '1. Valid NPA. 2. Detailed debt ledger. 3. Registered Speed Post dispatch.',
              statutoryNoticeForm: 'Statutory Demand Format',
            });
            setIsCreateOpen(true);
          }}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Statute Section</span>
        </button>
      </div>

      {/* Quick-reference strip */}
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 [&>*]:border-slate-100 dark:[&>*]:border-slate-800 max-lg:[&>*:nth-child(n+3)]:border-t">
          {quickRefs.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="px-3.5 py-2.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{k.label}</span>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${k.i}`} />
                </div>
                <div className={`mt-0.5 text-[15px] leading-6 font-semibold tabular-nums truncate ${k.v}`}>{k.value}</div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{k.sub}</div>
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
            placeholder="Search section number or law..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputCls} h-7 pl-8 pr-3`}
          />
        </form>

        <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-slate-100 dark:bg-slate-800 w-fit max-w-full overflow-x-auto">
          {['ALL', 'SARFAESI Act, 2002', 'Insolvency and Bankruptcy Code (IBC), 2016', 'Recovery of Debts and Bankruptcy (RDB) Act, 1993', 'Negotiable Instruments Act, 1881'].map((act) => (
            <button
              key={act}
              onClick={() => setSelectedAct(act)}
              title={act === 'ALL' ? 'All Indian Acts' : act}
              className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedAct === act
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {act === 'ALL' ? 'All Indian Acts' : act.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Laws Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Statute Act & Section</th>
                <th className="py-1.5 px-3 font-medium">Marginal Heading / Title</th>
                <th className="py-1.5 px-3 font-medium">Statutory Limitation Clock</th>
                <th className="py-1.5 px-3 font-medium">Jurisdiction Court</th>
                <th className="py-1.5 px-3 font-medium">Legal Application & Practical Guidance</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading Indian Banking Statutory Library...</span>
                  </td>
                </tr>
              ) : laws.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">No Statute Sections Found</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ Add Statute Section" to record a new regulatory provision.
                    </p>
                  </td>
                </tr>
              ) : (
                laws.map((l) => (
                  <tr key={l._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">{l.sectionNumber}</div>
                      <span className="text-[10px] text-sky-700 dark:text-sky-400 font-medium">{l.actName}</span>
                    </td>

                    <td className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">{l.sectionTitle}</td>

                    <td className="py-2 px-3 font-semibold text-rose-600 dark:text-rose-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>{l.statutoryTimeLimit}</span>
                      </div>
                    </td>

                    <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{l.courtOrTribunal}</td>

                    <td className="py-2 px-3 max-w-[280px] text-slate-600 dark:text-slate-400 text-[11px] leading-snug">
                      {l.legalSummary}
                    </td>

                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(l)}
                          aria-label={`Edit ${l.sectionNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Edit Statute Reference"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(l._id, l.sectionNumber)}
                          aria-label={`Delete ${l.sectionNumber}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Delete Reference"
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
                {isCreateOpen ? 'Add Statute Section Reference' : 'Update Statute Reference'}
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
                    <label className={labelCls}>Governing Act Name *</label>
                    <select
                      value={formData.actName || ''}
                      onChange={(e) => setFormData({ ...formData, actName: e.target.value })}
                      className={inputCls}
                    >
                      <option value="SARFAESI Act, 2002">SARFAESI Act, 2002</option>
                      <option value="Insolvency and Bankruptcy Code (IBC), 2016">Insolvency and Bankruptcy Code (IBC), 2016</option>
                      <option value="Recovery of Debts and Bankruptcy (RDB) Act, 1993">Recovery of Debts and Bankruptcy (RDB) Act, 1993</option>
                      <option value="Negotiable Instruments Act, 1881">Negotiable Instruments Act, 1881</option>
                      <option value="RBI Master Directions (Prudential Norms)">RBI Master Directions (Prudential Norms)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Section Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Section 13(2)"
                      value={formData.sectionNumber || ''}
                      onChange={(e) => setFormData({ ...formData, sectionNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Marginal Note / Section Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enforcement of Security Interest 60-Day Notice"
                    value={formData.sectionTitle || ''}
                    onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Statutory Time Limit *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 60 Days from service"
                      value={formData.statutoryTimeLimit || ''}
                      onChange={(e) => setFormData({ ...formData, statutoryTimeLimit: e.target.value })}
                      className={`${inputCls} font-semibold text-rose-600 dark:text-rose-400`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Court / Tribunal Jurisdiction</label>
                    <input
                      type="text"
                      placeholder="e.g. Debt Recovery Tribunal (DRT)"
                      value={formData.courtOrTribunal || ''}
                      onChange={(e) => setFormData({ ...formData, courtOrTribunal: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Legal Summary & Practical Guidance *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Explain legal powers, consequences of borrower default, and officer execution instructions..."
                    value={formData.legalSummary || ''}
                    onChange={(e) => setFormData({ ...formData, legalSummary: e.target.value })}
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
                  <span>{isCreateOpen ? 'Add Statute' : 'Save Update'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}