'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users2,
  Plus,
  Search,
  Scale,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle2,
  Trash2,
  Edit3,
  Loader2,
  X,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';

export default function AdvocatesPage() {
  const { token } = useAuth();
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAdvocate, setEditingAdvocate] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    advocateName: '',
    barCouncilEnrollmentNumber: '',
    firmName: 'Chambers of Legal Practice',
    specialization: 'SARFAESI & DRT Litigation',
    courtPractice: 'DRT-I & II Mumbai, High Court of Bombay',
    phone: '',
    email: '',
    chambersAddress: 'Nariman Point, Mumbai - 400021',
    leadBankEmpanelled: 'State Bank of India',
    performanceRating: '4.8',
    empanelmentStatus: 'Active Empanelled',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // 1. Fetch Advocates
  const fetchAdvocates = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      let url = 'http://localhost:5000/api/advocates';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedSpec !== 'ALL') params.append('specialization', selectedSpec);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok && data.advocates) {
        setAdvocates(data.advocates);
      }
    } catch (err) {
      console.error('Error fetching advocates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvocates();
  }, [selectedSpec]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAdvocates();
  };

  // 2. Empanel Advocate
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch('http://localhost:5000/api/advocates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ...formData,
          performanceRating: parseFloat(formData.performanceRating) || 4.8,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Empanelment failed');

      setIsCreateOpen(false);
      showToast('Panel Advocate empanelled successfully!');
      fetchAdvocates();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 3. Open Edit
  const handleOpenEdit = (a) => {
    setEditingAdvocate(a);
    setFormData({
      advocateName: a.advocateName || '',
      barCouncilEnrollmentNumber: a.barCouncilEnrollmentNumber || '',
      firmName: a.firmName || '',
      specialization: a.specialization || 'SARFAESI & DRT Litigation',
      courtPractice: a.courtPractice || '',
      phone: a.phone || '',
      email: a.email || '',
      chambersAddress: a.chambersAddress || '',
      leadBankEmpanelled: a.leadBankEmpanelled || 'State Bank of India',
      performanceRating: a.performanceRating ? String(a.performanceRating) : '4.8',
      empanelmentStatus: a.empanelmentStatus || 'Active Empanelled',
    });
    setIsEditOpen(true);
  };

  // 4. Update Advocate
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingAdvocate) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/advocates/${editingAdvocate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ...formData,
          performanceRating: parseFloat(formData.performanceRating) || 4.8,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      setIsEditOpen(false);
      setEditingAdvocate(null);
      showToast('Advocate profile updated!');
      fetchAdvocates();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5. Delete Advocate
  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to remove Advocate "${name}" from panel?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`http://localhost:5000/api/advocates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setAdvocates((prev) => prev.filter((a) => a._id !== id));
      showToast('Advocate removed from panel.');
    } catch (err) {
      alert(err.message);
    }
  };

  const kpis = [
    {
      label: 'Total Panel Lawyers',
      value: `${advocates.length} Advocates`,
      icon: Users2,
      v: 'text-slate-900 dark:text-white',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'DRT & SARFAESI Specialists',
      value: `${advocates.filter((a) => a.specialization?.includes('DRT')).length} Counsels`,
      icon: Scale,
      v: 'text-sky-700 dark:text-sky-400',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'NCLT Insolvency (IBC)',
      value: `${advocates.filter((a) => a.specialization?.includes('Insolvency')).length} Counsels`,
      icon: ShieldCheck,
      v: 'text-purple-700 dark:text-purple-400',
      i: 'text-purple-500 dark:text-purple-400',
    },
  ];

  // 100% Dynamic Average Rating calculated from empanelled advocates
  const avgRating = advocates.length > 0
    ? (
        advocates.reduce((sum, a) => sum + (parseFloat(a.performanceRating) || 5.0), 0) /
        advocates.length
      ).toFixed(1)
    : '0.0';

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
              M-09 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 3 · Advocate & law firm management</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Panel Advocates & Legal Retainers
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Empanelled bank lawyers, Bar Council verification, DRT & NCLT litigation retainers and performance ratings.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              advocateName: '',
              barCouncilEnrollmentNumber: '',
              firmName: 'Chambers of Legal Practice',
              specialization: 'SARFAESI & DRT Litigation',
              courtPractice: 'DRT-I & II Mumbai, High Court of Bombay',
              phone: '',
              email: '',
              chambersAddress: 'Nariman Point, Mumbai - 400021',
              leadBankEmpanelled: 'State Bank of India',
              performanceRating: '4.8',
              empanelmentStatus: 'Active Empanelled',
            });
            setIsCreateOpen(true);
          }}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Empanel New Advocate</span>
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

          {/* Average rating (dynamically computed from empanelled advocates) */}
          <div className="px-3.5 py-2.5 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">Average Rating</span>
              <Award className="w-3.5 h-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="mt-0.5 text-lg leading-6 font-semibold tabular-nums text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{avgRating} / 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advocates Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Advocate / Firm</th>
                <th className="py-1.5 px-3 font-medium">Bar Council Enrollment ID</th>
                <th className="py-1.5 px-3 font-medium">Practice Specialization</th>
                <th className="py-1.5 px-3 font-medium">Court Jurisdiction</th>
                <th className="py-1.5 px-3 font-medium">Contact Info</th>
                <th className="py-1.5 px-3 font-medium">Empanelment Status</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading Empanelled Legal Counsels...</span>
                  </td>
                </tr>
              ) : advocates.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">No Advocates Empanelled Yet</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ Empanel New Advocate" to onboard your first panel law firm.
                    </p>
                  </td>
                </tr>
              ) : (
                advocates.map((a) => (
                  <tr key={a._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900 dark:text-white leading-4">{a.advocateName}</span>
                        <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-semibold ring-1 ring-inset ring-amber-200 dark:ring-amber-500/30">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          {Number(a.performanceRating || 4.8).toFixed(1)}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{a.firmName}</span>
                    </td>
                    <td className="py-2 px-3 font-mono font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {a.barCouncilEnrollmentNumber}
                    </td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset whitespace-nowrap bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30">
                        {a.specialization}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600 dark:text-slate-400 max-w-[220px]">{a.courtPractice}</td>
                    <td className="py-2 px-3">
                      <div className="font-medium text-slate-800 dark:text-slate-200 leading-4 whitespace-nowrap">{a.phone}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{a.email}</div>
                    </td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset whitespace-nowrap bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                        {a.empanelmentStatus}
                      </span>
                    </td>
                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(a)}
                          aria-label={`Edit ${a.advocateName}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Edit Profile"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(a._id, a.advocateName)}
                          aria-label={`Remove ${a.advocateName}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Remove Advocate"
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
                {isCreateOpen ? 'Empanel Panel Advocate / Law Firm' : 'Update Advocate Profile'}
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
                    <label className={labelCls}>Advocate Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adv. Rajeshwar Sharma"
                      value={formData.advocateName || ''}
                      onChange={(e) => setFormData({ ...formData, advocateName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Bar Council ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MAH/1452/2008"
                      value={formData.barCouncilEnrollmentNumber || ''}
                      onChange={(e) => setFormData({ ...formData, barCouncilEnrollmentNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Law Firm / Chambers Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma & Associates"
                      value={formData.firmName || ''}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Practice Specialization</label>
                    <select
                      value={formData.specialization || ''}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className={inputCls}
                    >
                      <option value="SARFAESI & DRT Litigation">SARFAESI & DRT Litigation</option>
                      <option value="Insolvency & Bankruptcy Code (NCLT)">Insolvency & Bankruptcy Code (NCLT)</option>
                      <option value="Section 138 NI Act Cheque Bounce">Section 138 NI Act Cheque Bounce</option>
                      <option value="High Court Commercial Writs & Appeals">High Court Commercial Writs & Appeals</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Mobile Contact *</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98200 11223"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rajeshwar@chambers.in"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Chambers / Office Address</label>
                  <input
                    type="text"
                    placeholder="Nariman Point, Mumbai - 400021"
                    value={formData.chambersAddress || ''}
                    onChange={(e) => setFormData({ ...formData, chambersAddress: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Performance Rating (1.0 to 5.0) ★</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      required
                      placeholder="e.g. 4.8"
                      value={formData.performanceRating ?? ''}
                      onChange={(e) => setFormData({ ...formData, performanceRating: e.target.value })}
                      className={inputCls}
                    />
                    <p className="mt-0.5 text-[10px] text-slate-400">Score based on recovery success & trial speed</p>
                  </div>
                  <div>
                    <label className={labelCls}>Empanelment Status</label>
                    <select
                      value={formData.empanelmentStatus || 'Active Empanelled'}
                      onChange={(e) => setFormData({ ...formData, empanelmentStatus: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Active Empanelled">Active Empanelled</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Provisional Empanelled">Provisional Empanelled</option>
                      <option value="De-empanelled">De-empanelled</option>
                    </select>
                  </div>
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
                  <span>{isCreateOpen ? 'Empanel Counsel' : 'Update Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}