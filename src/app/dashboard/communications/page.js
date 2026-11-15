'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  Send,
  Phone,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Trash2,
  X,
  RefreshCw,
  AlertCircle,
  Truck,
  Eye,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 mt-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'text-[11px] font-medium text-slate-600 dark:text-slate-300';
const chip = 'inline-flex items-center gap-1 px-1.5 py-px rounded text-[10.5px] font-medium ring-1 ring-inset whitespace-nowrap';

const TEMPLATES = [
  {
    name: 'SARFAESI Section 13(2) Demand Intimation',
    channel: 'WhatsApp',
    subject: 'Statutory 60-Day Notice Dispatch Intimation - Loan Default',
    body: 'Dear Borrower, Formal Statutory Demand Notice under Section 13(2) of SARFAESI Act, 2002 has been issued against your Corporate Credit Facility. Kindly clear outstanding dues within 60 days to prevent physical possession of mortgaged collateral.',
  },
  {
    name: 'Pre-Notice Soft Payment Reminder (SMA Stage)',
    channel: 'SMS',
    subject: 'Urgent: Overdue Corporate Loan Installment Reminder',
    body: 'Notice from State Bank SARG: Your corporate loan account EMI is overdue. Please deposit required amount immediately to regularize the facility and avoid DPD aging to NPA.',
  },
  {
    name: 'DRT / NCLT Court Hearing Date Intimation',
    channel: 'Email',
    subject: 'Urgent: Court Hearing Schedule Listing Notice',
    body: 'Respected Counsel, Case has been listed before Hon’ble Presiding Officer for arguments on bank interim attachment application. Bank authorized officer will attend with original loan dockets.',
  },
  {
    name: 'Speed Post Statutory Notice Dispatch Notice',
    channel: 'Speed Post AD',
    subject: 'Registered Speed Post AD - Demand Notice & Guarantee Invocation',
    body: 'Certified copy of Statutory Notice dispatched via Registered Speed Post AD with acknowledgment due to the borrower corporate office and personal guarantors.',
  },
  {
    name: 'OTS Compromise Settlement Discussion Invitation',
    channel: 'Email',
    subject: 'Invitation for Bilateral Compromise / OTS Discussion - SARG Committee',
    body: 'With reference to your loan default, Bank Stressed Assets Resolution Group invites the authorized promoters for an in-person compromise settlement meeting before the Competent SARG Committee.',
  },
];

export default function CommunicationsPage() {
  const [logs, setLogs] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState({
    totalLogs: 0,
    whatsappCount: 0,
    emailCount: 0,
    speedPostCount: 0,
    deliveryRate: 100,
  });

  const [loading, setLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState('All');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewLog, setViewLog] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    channel: 'WhatsApp',
    recipientRole: 'Corporate Borrower / Director',
    recipientName: '',
    recipientContact: '',
    borrower: '',
    loanAccount: '',
    templateUsed: 'Custom Communication',
    subject: '',
    messageBody: '',
    trackingNumber: '',
    deliveryStatus: 'Delivered',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [logsRes, statsRes, borrowersRes, loansRes] = await Promise.all([
        fetch(`${API_BASE}/communications?channel=${activeChannel}&search=${encodeURIComponent(search)}`),
        fetch(`${API_BASE}/communications/stats`),
        fetch(`${API_BASE}/borrowers`),
        fetch(`${API_BASE}/loans`),
      ]);

      const logsData = await logsRes.json();
      const statsData = await statsRes.json();
      const borrowersData = await borrowersRes.json();
      const loansData = await loansRes.json();

      if (logsData.success) setLogs(logsData.data || []);
      if (statsData.success && statsData.stats) setStats(statsData.stats);
      if (borrowersData.success) setBorrowers(borrowersData.data || []);
      if (loansData.success) setLoans(loansData.data || []);
    } catch (err) {
      setError(err.message || 'Error fetching communications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeChannel]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleTemplateSelect = (templateName) => {
    const found = TEMPLATES.find((t) => t.name === templateName);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        templateUsed: found.name,
        channel: found.channel,
        subject: found.subject,
        messageBody: found.body,
      }));
    } else {
      setFormData((prev) => ({ ...prev, templateUsed: 'Custom Communication' }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      const res = await fetch(`${API_BASE}/communications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to dispatch communication');
      }

      setIsCreateOpen(false);
      setFormData({
        channel: 'WhatsApp',
        recipientRole: 'Corporate Borrower / Director',
        recipientName: '',
        recipientContact: '',
        borrower: '',
        loanAccount: '',
        templateUsed: 'Custom Communication',
        subject: '',
        messageBody: '',
        trackingNumber: '',
        deliveryStatus: 'Delivered',
      });
      fetchData();
    } catch (err) {
      alert('Error creating communication: ' + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this communication dispatch log?')) return;
    try {
      const res = await fetch(`${API_BASE}/communications/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete');
      }
      fetchData();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleStatusToggle = async (log) => {
    const nextStatus =
      log.deliveryStatus === 'Delivered'
        ? 'Read'
        : log.deliveryStatus === 'Read'
        ? 'Sent'
        : 'Delivered';

    try {
      const res = await fetch(`${API_BASE}/communications/${log._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update status');
      }
      fetchData();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const getChannelBadge = (channel) => {
    switch (channel) {
      case 'WhatsApp':
        return (
          <span className={`${chip} bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30`}>
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp</span>
          </span>
        );
      case 'Email':
        return (
          <span className={`${chip} bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30`}>
            <Mail className="w-3 h-3" />
            <span>Email</span>
          </span>
        );
      case 'Speed Post AD':
        return (
          <span className={`${chip} bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30`}>
            <Truck className="w-3 h-3" />
            <span>Speed Post AD</span>
          </span>
        );
      case 'SMS':
        return (
          <span className={`${chip} bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-500/30`}>
            <Phone className="w-3 h-3" />
            <span>SMS</span>
          </span>
        );
      default:
        return (
          <span className={`${chip} bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700`}>
            {channel}
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Read':
        return (
          <span className={`${chip} bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30`}>
            <CheckCircle className="w-3 h-3" />
            <span>Read (Blue Tick)</span>
          </span>
        );
      case 'Delivered':
        return (
          <span className={`${chip} bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30`}>
            <CheckCircle className="w-3 h-3" />
            <span>Delivered</span>
          </span>
        );
      case 'Sent':
        return (
          <span className={`${chip} bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700`}>
            <Clock className="w-3 h-3" />
            <span>Dispatched</span>
          </span>
        );
      default:
        return (
          <span className={`${chip} bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30`}>
            <AlertCircle className="w-3 h-3" />
            <span>Failed</span>
          </span>
        );
    }
  };

  const kpis = [
    { label: 'Total Logs Recorded', value: stats.totalLogs, sub: '100% Audit Tracked', icon: Send, v: 'text-slate-900 dark:text-white', i: 'text-indigo-500 dark:text-indigo-400' },
    { label: 'WhatsApp Alerts', value: stats.whatsappCount, sub: 'Official Business API', icon: MessageSquare, v: 'text-emerald-700 dark:text-emerald-400', i: 'text-emerald-500 dark:text-emerald-400' },
    { label: 'Speed Post AD Dispatches', value: stats.speedPostCount, sub: 'Postal Consignment Sync', icon: Truck, v: 'text-amber-700 dark:text-amber-400', i: 'text-amber-500 dark:text-amber-400' },
    { label: 'Delivery Success Rate', value: `${stats.deliveryRate}%`, sub: 'Verified Recipients', icon: CheckCircle, v: 'text-sky-700 dark:text-sky-400', i: 'text-sky-500 dark:text-sky-400' },
  ];

  return (
    <div className="p-3 md:p-4 max-w-[1400px] mx-auto space-y-3 min-h-screen text-slate-800 dark:text-slate-100">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-gradient-to-br from-[#172B45] to-[#2B4A6B] dark:from-sky-500 dark:to-sky-600 text-white shadow-sm ring-1 ring-inset ring-white/10">
            <Send className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base leading-5 font-semibold tracking-tight text-slate-900 dark:text-white">
              M-11 • Communication Management Desk
            </h1>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 truncate">
              Multi-channel notice dispatch intimations, advocate causelists, WhatsApp logs & Speed Post tracking
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11.5px] inline-flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Dispatch / Log New Communication</span>
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
                <div className={`mt-0.5 text-lg leading-6 font-semibold tabular-nums ${k.v}`}>{k.value}</div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{k.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className={`${card} flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-2`}>
        <div className="flex items-center gap-0.5 overflow-x-auto p-0.5 rounded-md bg-slate-100 dark:bg-slate-800 w-fit max-w-full">
          {['All', 'WhatsApp', 'Email', 'Speed Post AD', 'SMS'].map((chan) => (
            <button
              key={chan}
              onClick={() => setActiveChannel(chan)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeChannel === chan
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {chan === 'All' ? 'All Channels' : chan}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipient, tracking no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 pl-8 pr-3 w-56 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            aria-label="Search"
            className="h-7 w-7 grid place-items-center rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={fetchData}
            aria-label="Refresh"
            className="h-7 w-7 grid place-items-center rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </form>
      </div>

      {/* MAIN LOGS TABLE */}
      <div className={`${card} overflow-hidden`}>
        {loading ? (
          <div className="py-10 text-center text-slate-400 dark:text-slate-500 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-500" />
            <span>Loading communication logs from MongoDB...</span>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-rose-600 dark:text-rose-400 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="py-10 text-center text-slate-400 dark:text-slate-500 text-xs">
            No communication logs found matching filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11.5px] border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                  <th className="py-1.5 px-3.5 font-medium">Ref & Channel</th>
                  <th className="py-1.5 px-3 font-medium">Recipient Details</th>
                  <th className="py-1.5 px-3 font-medium">Subject & Template</th>
                  <th className="py-1.5 px-3 font-medium">Linked Company / Loan</th>
                  <th className="py-1.5 px-3 font-medium">Status & Tracking</th>
                  <th className="py-1.5 px-3 font-medium">Dispatched At</th>
                  <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {logs.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                    <td className="py-2 px-3.5">
                      <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">
                        {item.communicationRef}
                      </div>
                      <div className="mt-1">{getChannelBadge(item.channel)}</div>
                    </td>

                    <td className="py-2 px-3 max-w-xs">
                      <div className="font-semibold text-slate-900 dark:text-white leading-4">{item.recipientName}</div>
                      <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium leading-4">
                        {item.recipientRole}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                        {item.recipientContact}
                      </div>
                    </td>

                    <td className="py-2 px-3 max-w-sm">
                      <div className="font-medium text-slate-900 dark:text-white line-clamp-1 leading-4">{item.subject}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{item.templateUsed}</div>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.messageBody}
                      </p>
                    </td>

                    <td className="py-2 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 leading-4">
                        {item.borrower?.companyName || 'General SARG'}
                      </div>
                      {item.loanAccount && (
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {item.loanAccount.accountNumber} ({item.loanAccount.facilityType})
                        </div>
                      )}
                    </td>

                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleStatusToggle(item)}
                        className="cursor-pointer transition-transform active:scale-95 text-left"
                        title="Click to toggle status"
                      >
                        {getStatusBadge(item.deliveryStatus)}
                      </button>
                      {item.trackingNumber && (
                        <div className="text-[10px] font-mono mt-1 flex items-center gap-1">
                          <span className="font-medium text-slate-400 dark:text-slate-500">ID:</span>
                          <span className="font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 px-1 py-px rounded">
                            {item.trackingNumber}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-2 px-3 text-slate-600 dark:text-slate-300 text-[11px] whitespace-nowrap">
                      <div className="tabular-nums leading-4">
                        {new Date(item.sentAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">
                        {new Date(item.sentAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewLog(item)}
                          aria-label="View full dispatch details"
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 cursor-pointer transition-colors"
                          title="View Full Dispatch Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          aria-label="Delete log"
                          className="h-6 w-6 grid place-items-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 cursor-pointer transition-colors"
                          title="Delete Log"
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

      {/* VIEW FULL DETAILS MODAL */}
      {viewLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                {getChannelBadge(viewLog.channel)}
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-100 text-[11.5px] truncate">
                  {viewLog.communicationRef}
                </span>
              </div>
              <button
                onClick={() => setViewLog(null)}
                aria-label="Close"
                className="h-6 w-6 grid place-items-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg ring-1 ring-slate-100 dark:ring-slate-800">
                <div>
                  <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">Recipient</div>
                  <div className="font-semibold text-slate-900 dark:text-white text-[13px] mt-0.5">{viewLog.recipientName}</div>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{viewLog.recipientRole}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{viewLog.recipientContact}</div>
                </div>
                <div>
                  <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">Status & Consignment</div>
                  <div className="mt-1">{getStatusBadge(viewLog.deliveryStatus)}</div>
                  {viewLog.trackingNumber && (
                    <div className="text-[11px] font-mono font-semibold text-indigo-700 dark:text-indigo-300 mt-1">
                      Tracking: {viewLog.trackingNumber}
                    </div>
                  )}
                  <div className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-1">
                    Sent By: {viewLog.sentByOfficer}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">Subject Header</div>
                <div className="font-semibold text-slate-900 dark:text-white text-[13px] mt-0.5">{viewLog.subject}</div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500">Template: {viewLog.templateUsed}</div>
              </div>

              <div>
                <div className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium mb-1">
                  Dispatched Message Body / Statutory Notice
                </div>
                <div className="p-3 bg-slate-900 dark:bg-slate-950 ring-1 ring-slate-800 text-slate-100 rounded-lg text-[11.5px] font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                  {viewLog.messageBody}
                </div>
              </div>
            </div>

            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50/50 dark:bg-slate-800/30 shrink-0">
              <button
                onClick={() => setViewLog(null)}
                className="h-7 px-3 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-medium text-[11.5px] cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISPATCH NEW COMMUNICATION MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 shrink-0 grid place-items-center bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg">
                  <Send className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-[13px] leading-4">
                    Dispatch / Log Communication
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Log formal WhatsApp, Email, or Speed Post AD legal communications
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                aria-label="Close"
                className="h-6 w-6 grid place-items-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex flex-col min-h-0">
              <div className="p-4 space-y-3 text-xs overflow-y-auto">
                {/* SELECT TEMPLATE PRESET */}
                <div className="p-2.5 bg-sky-50 dark:bg-sky-500/10 rounded-lg ring-1 ring-sky-100 dark:ring-sky-500/20">
                  <label className="font-medium text-sky-900 dark:text-sky-200 text-[11px]">
                    Select Pre-Approved Legal Template (Auto-fills subject & message):
                  </label>
                  <select
                    value={formData.templateUsed || 'Custom Communication'}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className={inputCls}
                  >
                    <option value="Custom Communication">-- Custom Message (Free Text) --</option>
                    {TEMPLATES.map((tpl) => (
                      <option key={tpl.name} value={tpl.name}>
                        [{tpl.channel}] {tpl.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Communication Channel *</label>
                    <select
                      value={formData.channel || 'WhatsApp'}
                      onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                      className={inputCls}
                    >
                      <option value="WhatsApp">WhatsApp (Official Business)</option>
                      <option value="Email">Email (Registered Notice)</option>
                      <option value="Speed Post AD">Speed Post AD (Postal Dispatch)</option>
                      <option value="SMS">SMS (Automated Notification)</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Recipient Legal Role *</label>
                    <select
                      value={formData.recipientRole || 'Corporate Borrower / Director'}
                      onChange={(e) => setFormData({ ...formData, recipientRole: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Corporate Borrower / Director">Corporate Borrower / Director</option>
                      <option value="Personal Guarantor">Personal Guarantor</option>
                      <option value="Panel Advocate">Panel Advocate</option>
                      <option value="Recovery Enforcement Officer">Recovery Enforcement Officer</option>
                      <option value="Bank SARG Head">Bank SARG Head</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Recipient Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kewal Kishan Singhania (MD)"
                      value={formData.recipientName || ''}
                      onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Recipient Phone / Email / Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98110 54321 / director@company.com"
                      value={formData.recipientContact || ''}
                      onChange={(e) => setFormData({ ...formData, recipientContact: e.target.value })}
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
                      <option value="">-- None / General SARG Intimation --</option>
                      {borrowers.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.companyName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Linked Loan Account</label>
                    <select
                      value={formData.loanAccount || ''}
                      onChange={(e) => setFormData({ ...formData, loanAccount: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">-- None / Facility Independent --</option>
                      {loans.map((l) => (
                        <option key={l._id} value={l._id}>
                          {l.accountNumber} ({l.facilityType})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Subject / Header *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Statutory 60-Day Notice Dispatch Intimation - Loan Default"
                    value={formData.subject || ''}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Message Content / Notice Body *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter complete message or dispatch intimation text..."
                    value={formData.messageBody || ''}
                    onChange={(e) => setFormData({ ...formData, messageBody: e.target.value })}
                    className={`${inputCls} h-auto py-2 font-mono leading-relaxed`}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Speed Post / Consignment Tracking ID</label>
                    <input
                      type="text"
                      placeholder="e.g. EM482910482IN or WA-MSG-123"
                      value={formData.trackingNumber || ''}
                      onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Delivery Status</label>
                    <select
                      value={formData.deliveryStatus || 'Delivered'}
                      onChange={(e) => setFormData({ ...formData, deliveryStatus: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="Read">Read (Blue Tick Verified)</option>
                      <option value="Sent">Sent / Dispatched</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 shrink-0 bg-slate-50/50 dark:bg-slate-800/30">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="h-7 px-3 rounded-md ring-1 ring-slate-200 dark:ring-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-[11.5px] cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="h-7 px-3.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11.5px] inline-flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? 'Logging Dispatch...' : 'Dispatch / Log Communication'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}