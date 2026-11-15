'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Building2,
  Trash2,
  Edit3,
  Loader2,
  X,
  ShieldAlert,
  ArrowRight,
  Flame,
  CheckSquare
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';

export default function TasksPage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [counts, setCounts] = useState({ totalTasks: 0, criticalCount: 0, completedCount: 0, overdueCount: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('ALL');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    taskTitle: '',
    assignedToRole: 'Panel Advocate',
    assignedToName: 'Adv. Rajeshwar Sharma',
    assignedToPhone: '+91 98200 44556',
    borrower: '',
    priority: 'High',
    category: 'SARFAESI Statutory Filing',
    dueDate: '',
    description: '',
    status: 'Pending / Assigned',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // 1. Fetch Tasks & Borrowers
  const fetchData = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      let url = 'https://indolex-backend.onrender.com/api/tasks';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedPriority !== 'ALL') params.append('priority', selectedPriority);
      if (params.toString()) url += `?${params.toString()}`;

      const resTasks = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataTasks = await resTasks.json();
      if (resTasks.ok && dataTasks.tasks) {
        setTasks(dataTasks.tasks);
        setCounts(dataTasks.counts || { totalTasks: 0, criticalCount: 0, completedCount: 0, overdueCount: 0 });
      }

      // Fetch Borrowers
      const resBorrowers = await fetch('https://indolex-backend.onrender.com/api/borrowers', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const dataBorrowers = await resBorrowers.json();
      if (resBorrowers.ok && dataBorrowers.borrowers) {
        setBorrowers(dataBorrowers.borrowers);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedPriority]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // 2. Create Task
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch('https://indolex-backend.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Task creation failed');

      setIsCreateOpen(false);
      showToast('Task assigned and SLA clock started!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 3. Quick Toggle Status (Mark Completed)
  const handleToggleComplete = async (task) => {
    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const newStatus =
        task.status === 'Completed & Verified' ? 'In Progress' : 'Completed & Verified';

      const res = await fetch(`https://indolex-backend.onrender.com/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        showToast(`Task marked as ${newStatus}!`);
        fetchData();
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  // 4. Open Edit
  const handleOpenEdit = (t) => {
    setEditingTask(t);
    setFormData({
      taskTitle: t.taskTitle || '',
      assignedToRole: t.assignedToRole || 'Panel Advocate',
      assignedToName: t.assignedToName || '',
      assignedToPhone: t.assignedToPhone || '',
      borrower: t.borrower?._id || t.borrower || '',
      priority: t.priority || 'High',
      category: t.category || 'SARFAESI Statutory Filing',
      dueDate: t.dueDate ? t.dueDate.split('T')[0] : '',
      description: t.description || '',
      status: t.status || 'Pending / Assigned',
    });
    setIsEditOpen(true);
  };

  // 5. Update Task
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTask) return;
    setFormSubmitting(true);
    setFormError('');

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`https://indolex-backend.onrender.com/api/tasks/${editingTask._id}`, {
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
      setEditingTask(null);
      showToast('Task details and SLA updated!');
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 6. Delete Task
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete Task "${title}"?`)) return;

    try {
      const authToken = token || localStorage.getItem('indolex_token');
      const res = await fetch(`https://indolex-backend.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error('Delete failed');

      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast('Task deleted.');
    } catch (err) {
      alert(err.message);
    }
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30 font-semibold';
      case 'High':
        return 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30 font-semibold';
      case 'Medium':
        return 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30 font-medium';
      default:
        return 'bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-500/30 font-medium';
    }
  };

  const kpis = [
    {
      label: 'Total Delegated Tasks',
      value: `${counts.totalTasks} Tasks`,
      icon: CheckSquare,
      v: 'text-slate-900 dark:text-white',
      i: 'text-sky-500 dark:text-sky-400',
    },
    {
      label: 'Critical Priority',
      value: `${counts.criticalCount} Urgent`,
      icon: Flame,
      v: 'text-rose-700 dark:text-rose-400',
      i: 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'Overdue SLA Warning',
      value: `${counts.overdueCount} Overdue`,
      icon: AlertTriangle,
      v: 'text-amber-700 dark:text-amber-400',
      i: 'text-amber-500 dark:text-amber-400',
    },
    {
      label: 'Completed & Verified',
      value: `${counts.completedCount} Done`,
      icon: CheckCircle2,
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
              M-10 Module
            </span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>BRD Section 3 · Tasks & SLA enforcement cockpit</span>
          </p>
          <h1 className="mt-1 text-lg leading-6 font-semibold tracking-tight text-slate-900 dark:text-white">
            Task Delegation & Statutory SLA Desk
          </h1>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-3xl">
            Assign statutory tasks to Panel Advocates, Recovery Agents and Valuers with automated SLA due date surveillance.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              taskTitle: 'File Section 14 CMM Possession Application',
              assignedToRole: 'Panel Advocate',
              assignedToName: 'Adv. Rajeshwar Sharma',
              assignedToPhone: '+91 98200 44556',
              borrower: borrowers[0]?._id || '',
              priority: 'Critical',
              category: 'SARFAESI Statutory Filing',
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              description: 'Section 13(2) 60-day period expired without payment. Prepare Section 14 affidavit for CMM Court Mumbai.',
              status: 'Pending / Assigned',
            });
            setIsCreateOpen(true);
          }}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11.5px] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Assign New Task</span>
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

      {/* Tasks Table */}
      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                <th className="py-1.5 px-3.5 font-medium">Task Title & Category</th>
                <th className="py-1.5 px-3 font-medium">Corporate Borrower</th>
                <th className="py-1.5 px-3 font-medium">Assigned To (Assignee)</th>
                <th className="py-1.5 px-3 font-medium">Priority</th>
                <th className="py-1.5 px-3 font-medium">SLA Due Date</th>
                <th className="py-1.5 px-3 font-medium">Status</th>
                <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11.5px]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 dark:text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1.5 text-sky-500" />
                    <span>Loading Delegated Tasks from SARG Clock...</span>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-[13px]">No Active Tasks Assigned</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Click "+ Assign New Task" to delegate actions to advocates or recovery officers.
                    </p>
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5 max-w-[280px]">
                      <div className="font-semibold text-slate-900 dark:text-white leading-4">{t.taskTitle}</div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{t.category}</span>
                    </td>

                    <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">
                      {t.borrower?.companyName || 'General SARG Task'}
                    </td>

                    <td className="py-2 px-3">
                      <div className="font-medium text-slate-900 dark:text-white leading-4">{t.assignedToName}</div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{t.assignedToRole}</span>
                    </td>

                    <td className="py-2 px-3">
                      <span
                        className={`inline-flex items-center px-1.5 py-px text-[10.5px] rounded ring-1 ring-inset whitespace-nowrap ${getPriorityBadge(
                          t.priority
                        )}`}
                      >
                        {t.priority}
                      </span>
                    </td>

                    <td className="py-2 px-3 font-semibold tabular-nums text-rose-600 dark:text-rose-400 whitespace-nowrap">
                      {t.dueDate
                        ? new Date(t.dueDate).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'No Date'}
                    </td>

                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleToggleComplete(t)}
                        className={`inline-flex items-center px-1.5 py-px text-[10.5px] font-medium rounded ring-1 ring-inset whitespace-nowrap transition-colors cursor-pointer ${
                          t.status === 'Completed & Verified'
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30'
                            : 'bg-amber-50 text-amber-700 ring-amber-200 hover:bg-emerald-50 hover:text-emerald-700 hover:ring-emerald-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-500/30'
                        }`}
                        title="Click to toggle completed"
                      >
                        {t.status}
                      </button>
                    </td>

                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(t)}
                          aria-label={`Edit ${t.taskTitle}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 transition-colors"
                          title="Edit Task"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id, t.taskTitle)}
                          aria-label={`Delete ${t.taskTitle}`}
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 transition-colors"
                          title="Delete Task"
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
                {isCreateOpen ? 'Delegate Statutory Task' : 'Update Task & SLA'}
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
                  <label className={labelCls}>Task Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. File Section 14 CMM Possession Application"
                    value={formData.taskTitle || ''}
                    onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Assign To Role *</label>
                    <select
                      value={formData.assignedToRole || ''}
                      onChange={(e) => setFormData({ ...formData, assignedToRole: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Panel Advocate">Panel Advocate</option>
                      <option value="Recovery Enforcement Officer">Recovery Enforcement Officer</option>
                      <option value="Bank Approved Valuer">Bank Approved Valuer</option>
                      <option value="Legal Compliance Officer">Legal Compliance Officer</option>
                      <option value="Bank SARG Head">Bank SARG Head</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Assignee Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adv. Rajeshwar Sharma"
                      value={formData.assignedToName || ''}
                      onChange={(e) => setFormData({ ...formData, assignedToName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Linked Corporate Borrower</label>
                    <select
                      value={formData.borrower || ''}
                      onChange={(e) => setFormData({ ...formData, borrower: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">-- General SARG Task --</option>
                      {borrowers.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>SLA Due Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.dueDate || ''}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className={`${inputCls} font-medium dark:[color-scheme:dark]`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Priority Level</label>
                    <select
                      value={formData.priority || ''}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Critical">Critical (Immediate SLA)</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Routine">Routine</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Task Category</label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={inputCls}
                    >
                      <option value="SARFAESI Statutory Filing">SARFAESI Statutory Filing</option>
                      <option value="DRT Court Hearing Attendance">DRT Court Hearing Attendance</option>
                      <option value="Valuation & Site Inspection">Valuation & Site Inspection</option>
                      <option value="OTS Compromise Review">OTS Compromise Review</option>
                      <option value="ROC Charge & Title Verification">ROC Charge & Title Verification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Detailed Description & Instructions *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Record exact action required, document references, and expected output..."
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <span>{isCreateOpen ? 'Assign Task' : 'Update Task'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}