'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Calendar,
  Clock,
  Search,
  Plus,
  Trash2,
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Building2,
  MapPin,
  Eye,
  ChevronRight,
  TrendingUp,
  Inbox,
  Mail,
  Phone,
  Globe,
  Tag,
  CheckCircle2,
  Send,
  MessageSquare,
  Video,
  ExternalLink,
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://indolex-backend.onrender.com/api';

/* ── UI-only style tokens ── */
const card =
  'rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 px-2.5 mt-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors';
const labelCls = 'text-[11px] font-medium text-slate-600 dark:text-slate-300';
const chip = 'inline-flex items-center gap-1 px-1.5 py-px rounded text-[10.5px] font-medium ring-1 ring-inset whitespace-nowrap';

export default function CrmManagementPage() {
  // Main Desk View Mode: 'meetings' | 'inquiries'
  const [activeDeskTab, setActiveDeskTab] = useState('inquiries');

  // CRM Meeting States
  const [interactions, setInteractions] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState({
    totalInteractions: 0,
    jlmCount: 0,
    pendingActions: 0,
    cooperativeCount: 0,
  });

  // Public Inbound Inquiries States
  const [inquiries, setInquiries] = useState([]);
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [scheduleModalInquiry, setScheduleModalInquiry] = useState(null);

  // Demo Scheduling Form State
  const [scheduleData, setScheduleData] = useState({
    meetingDate: '',
    meetingTime: '15:00',
    meetingLink: 'https://meet.google.com/ind-sarg-demo',
    officerName: 'Adv. Rajeshwar Sharma (IndoLex Legal Tech Architect)',
    customNotes: 'Demonstration of automated SARFAESI 13(2) notices, Section 14 dockets, and DRT litigation cause-lists.',
  });

  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('All');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewLog, setViewLog] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    borrower: '',
    loanAccount: '',
    interactionType: 'Promoters In-Person SARG Hearing',
    stakeholderRole: 'Managing Director / Promoter',
    stakeholderName: '',
    stakeholderContact: '',
    meetingLocation: 'SARG Boardroom, State Bank Corporate Centre, Nariman Point, Mumbai',
    relationshipManager: 'Priyanka Sen (AGM - SARG)',
    borrowerStance: 'Cooperative / Offering Compromise',
    discussionSummary: '',
    nextActionPlan: '',
    nextFollowUpDate: '',
    status: 'Action Pending',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const authToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('token') || localStorage.getItem('indolex_token')
          : '';
      const authHeaders = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const [crmRes, statsRes, borrowersRes, loansRes, inqRes] = await Promise.all([
        fetch(`${API_BASE}/crm?interactionType=${activeType}&search=${encodeURIComponent(search)}`, {
          headers: authHeaders,
        }),
        fetch(`${API_BASE}/crm/stats`, { headers: authHeaders }),
        fetch(`${API_BASE}/borrowers`, { headers: authHeaders }),
        fetch(`${API_BASE}/loans`, { headers: authHeaders }),
        fetch(`${API_BASE}/crm/inquiries`, { headers: authHeaders }),
      ]);

      const crmData = await crmRes.json().catch(() => ({ success: false }));
      const statsData = await statsRes.json().catch(() => ({ success: false }));
      const borrowersData = await borrowersRes.json().catch(() => ({ success: false }));
      const loansData = await loansRes.json().catch(() => ({ success: false }));
      const inqData = await inqRes.json().catch(() => ({ success: false }));

      if (crmData.success) setInteractions(crmData.data || []);
      if (statsData.success && statsData.stats) setStats(statsData.stats);

      // Support both { borrowers: [...] } and { data: [...] } responses
      const fetchedBorrowers =
        (borrowersData && (borrowersData.borrowers || borrowersData.data)) || [];
      if (fetchedBorrowers.length > 0) {
        setBorrowers(fetchedBorrowers);
      } else {
        // Fallback institutional borrowers so dropdown is never empty
        setBorrowers([
          {
            _id: '67332c91a0b3f5c71a100001',
            companyName: 'Apex Steels Infrastructure Ltd',
            cin: 'U45200MH2014PTC254890',
          },
          {
            _id: '67332c91a0b3f5c71a100002',
            companyName: 'Vardhaman Global Logistics Ltd',
            cin: 'L63090DL2011PLC221199',
          },
          {
            _id: '67332c91a0b3f5c71a100003',
            companyName: 'Shree Radhey Solar Power Ltd',
            cin: 'U40106GJ2016PTC091234',
          },
          {
            _id: '67332c91a0b3f5c71a100004',
            companyName: 'Bharat Petrochem Industries Ltd',
            cin: 'L23200MH2008PLC180421',
          },
        ]);
      }

      const fetchedLoans = (loansData && (loansData.loans || loansData.data)) || [];
      if (fetchedLoans.length > 0) setLoans(fetchedLoans);
      if (inqData.success) setInquiries(inqData.data || []);
    } catch (err) {
      setError(err.message || 'Error fetching CRM interactions');
      // Ensure dropdown always has companies available
      setBorrowers((prev) =>
        prev.length > 0
          ? prev
          : [
              {
                _id: '67332c91a0b3f5c71a100001',
                companyName: 'Apex Steels Infrastructure Ltd',
                cin: 'U45200MH2014PTC254890',
              },
              {
                _id: '67332c91a0b3f5c71a100002',
                companyName: 'Vardhaman Global Logistics Ltd',
                cin: 'L63090DL2011PLC221199',
              },
              {
                _id: '67332c91a0b3f5c71a100003',
                companyName: 'Shree Radhey Solar Power Ltd',
                cin: 'U40106GJ2016PTC091234',
              },
            ]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.borrower) {
      alert('Please select an Associated Corporate Borrower');
      return;
    }

    try {
      setFormSubmitting(true);
      const authToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('token') || localStorage.getItem('indolex_token')
          : '';
      const res = await fetch(`${API_BASE}/crm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to log interaction');
      }

      setIsCreateOpen(false);
      setFormData({
        borrower: '',
        loanAccount: '',
        interactionType: 'Promoters In-Person SARG Hearing',
        stakeholderRole: 'Managing Director / Promoter',
        stakeholderName: '',
        stakeholderContact: '',
        meetingLocation: 'SARG Boardroom, State Bank Corporate Centre, Nariman Point, Mumbai',
        relationshipManager: 'Priyanka Sen (AGM - SARG)',
        borrowerStance: 'Cooperative / Offering Compromise',
        discussionSummary: '',
        nextActionPlan: '',
        nextFollowUpDate: '',
        status: 'Action Pending',
      });
      fetchData();
    } catch (err) {
      alert('Error creating CRM interaction: ' + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this CRM meeting log?')) return;
    try {
      const res = await fetch(`${API_BASE}/crm/${id}`, { method: 'DELETE' });
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
      log.status === 'Action Pending'
        ? 'Concluded'
        : log.status === 'Concluded'
        ? 'Escalated to Legal Head'
        : 'Action Pending';

    try {
      const res = await fetch(`${API_BASE}/crm/${log._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
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

  const handleInquiryStatusChange = async (inquiryId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/crm/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === inquiryId ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      alert('Failed to update inquiry status: ' + err.message);
    }
  };

  // 🚀 DISPATCH ACTIONS (WHATSAPP & EMAIL)
  const sendWhatsAppNotification = (inq) => {
    const cleanPhone = (inq.phoneNumber || '').replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    const message = `Namaste ${inq.firstName} ${inq.lastName} ji,\n\nGreetings from IndoLex Laws SARG Corporate Desk.\n\nWe have received your statutory consultation request for *${inq.organization}* (Ref: *${inq.inquiryRef}*).\n\nOur Legal-Tech Solution Architect (*${scheduleData.officerName}*) has scheduled your platform demo walkthrough:\n\n📅 *Date:* ${scheduleData.meetingDate || 'Tomorrow'}\n⏰ *Time:* ${scheduleData.meetingTime} IST\n🔗 *Meeting Link:* ${scheduleData.meetingLink}\n\nKindly confirm your availability.\n\nRegards,\nIndoLex Laws Platform\nhttps://indolex.in`;

    const waUrl = `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    handleInquiryStatusChange(inq._id, 'Contacted');
  };

  const sendEmailNotification = (inq) => {
    const subject = `[IndoLex Laws] Platform Demo & Consultation Scheduled - Ref: ${inq.inquiryRef}`;
    const body = `Dear ${inq.firstName} ${inq.lastName},\n\nThank you for requesting an enterprise walkthrough of IndoLex Laws for ${inq.organization}.\n\nYour session has been accepted by our SARG recovery & litigation desk.\n\n--- MEETING DETAILS ---\nReference: ${inq.inquiryRef}\nHost / Architect: ${scheduleData.officerName}\nScheduled Date: ${scheduleData.meetingDate || 'As discussed'}\nScheduled Time: ${scheduleData.meetingTime} IST\nVirtual Meeting Link: ${scheduleData.meetingLink}\n\nAgenda:\n${scheduleData.customNotes}\n\nPlease let us know if you require any rescheduling.\n\nWarm regards,\nIndoLex Laws Corporate Advisory\nSupport: sarg-desk@indolex.in`;

    const mailtoUrl = `mailto:${inq.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    handleInquiryStatusChange(inq._id, 'Demo Scheduled');
  };

  const getStanceBadge = (stance) => {
    switch (stance) {
      case 'Cooperative / Offering Compromise':
        return (
          <span className={`${chip} bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30`}>
            <CheckCircle className="w-3 h-3" />
            <span>Cooperative (OTS Offer)</span>
          </span>
        );
      case 'Seeking Time Extension':
        return (
          <span className={`${chip} bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30`}>
            <Clock className="w-3 h-3" />
            <span>Seeking Extension</span>
          </span>
        );
      case 'Hostile / Contesting SARFAESI':
        return (
          <span className={`${chip} bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30`}>
            <AlertCircle className="w-3 h-3" />
            <span>Hostile (Contesting)</span>
          </span>
        );
      default:
        return (
          <span className={`${chip} bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-500/30`}>
            <span>Willful Non-Coop</span>
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluded':
        return (
          <span className={`${chip} bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30`}>
            ✓ Concluded
          </span>
        );
      case 'Action Pending':
        return (
          <span className={`${chip} bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30`}>
            ⏱ Action Pending
          </span>
        );
      default:
        return (
          <span className={`${chip} bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30`}>
            ⚡ Escalated to Legal
          </span>
        );
    }
  };

  const getInquiryStatusBadge = (status) => {
    switch (status) {
      case 'New Inbound':
        return (
          <span className={`${chip} bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/30 font-semibold`}>
            ● New Inbound
          </span>
        );
      case 'Contacted':
        return (
          <span className={`${chip} bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/30`}>
            💬 Contacted
          </span>
        );
      case 'Demo Scheduled':
        return (
          <span className={`${chip} bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/30`}>
            📅 Demo Scheduled
          </span>
        );
      case 'Converted':
        return (
          <span className={`${chip} bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30`}>
            ✓ Converted (Client)
          </span>
        );
      default:
        return (
          <span className={`${chip} bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300`}>
            {status}
          </span>
        );
    }
  };

  const getOrgTypeBadge = (type) => {
    const map = {
      bank: { label: 'Bank (PSU/Private)', color: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300' },
      nbfc: { label: 'NBFC / FI', color: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300' },
      lawfirm: { label: 'Law Firm / Advocate', color: 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-300' },
      arc: { label: 'ARC Co.', color: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300' },
      consultant: { label: 'Debt Consultant', color: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300' },
    };
    const c = map[type] || { label: type || 'Enterprise', color: 'bg-slate-100 text-slate-700 ring-slate-200' };
    return <span className={`${chip} ${c.color}`}>{c.label}</span>;
  };

  const kpis = [
    { label: 'Inbound Demo Requests', value: inquiries.length, sub: 'Public Landing Leads', icon: Inbox, v: 'text-orange-600 dark:text-orange-400', i: 'text-orange-500' },
    { label: 'SARG Meetings Logged', value: stats.totalInteractions, sub: 'Recorded Proceedings', icon: Users, v: 'text-slate-900 dark:text-white', i: 'text-sky-500 dark:text-sky-400' },
    { label: 'Joint Lenders Meetings', value: stats.jlmCount, sub: 'Consortium Alignment', icon: Building2, v: 'text-indigo-700 dark:text-indigo-400', i: 'text-indigo-500 dark:text-indigo-400' },
    { label: 'OTS Compromise Willing', value: stats.cooperativeCount, sub: 'Settlement Probability', icon: TrendingUp, v: 'text-emerald-700 dark:text-emerald-400', i: 'text-emerald-500 dark:text-emerald-400' },
  ];

  const fmtDate = (d, month = 'short') =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month, year: 'numeric' });

  const filteredInquiries = inquiries.filter((inq) => {
    if (!inquirySearch) return true;
    const term = inquirySearch.toLowerCase();
    return (
      inq.firstName?.toLowerCase().includes(term) ||
      inq.lastName?.toLowerCase().includes(term) ||
      inq.organization?.toLowerCase().includes(term) ||
      inq.email?.toLowerCase().includes(term) ||
      inq.inquiryRef?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-3 md:p-4 max-w-[1400px] mx-auto space-y-3 min-h-screen text-slate-800 dark:text-slate-100">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-gradient-to-br from-[#172B45] to-[#2B4A6B] dark:from-sky-500 dark:to-sky-600 text-white shadow-sm ring-1 ring-inset ring-white/10">
            <Users className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base leading-5 font-semibold tracking-tight text-slate-900 dark:text-white">
              M-01 • CRM & Stakeholder Management Desk
            </h1>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 truncate">
              Public inbound demo requests, promoter SARG hearings, Joint Lenders Meetings & compromise dialogs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeDeskTab === 'meetings' && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-[11.5px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Stakeholder Meeting</span>
            </button>
          )}
          <button
            onClick={fetchData}
            title="Refresh Live Data"
            className="h-8 w-8 grid place-items-center rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
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

      {/* DESK VIEW MODE SELECTOR (TABS) */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDeskTab('inquiries')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeDeskTab === 'inquiries'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inbound Demo Requests & Leads</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeDeskTab === 'inquiries'
                  ? 'bg-white text-orange-600'
                  : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
              }`}
            >
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveDeskTab('meetings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeDeskTab === 'meetings'
                ? 'bg-slate-900 dark:bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>SARG Stakeholder Meetings ({interactions.length})</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block">
          Institutional SARG Gateway • 256-Bit Encrypted
        </div>
      </div>

      {/* VIEW 1: INBOUND DEMO REQUESTS */}
      {activeDeskTab === 'inquiries' && (
        <div className="space-y-3">
          {/* SEARCH & FILTERS FOR INQUIRIES */}
          <div className={`${card} flex items-center justify-between p-2.5`}>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Inbound Stream: Landing page forms submit directly to this desk</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by bank, name, email..."
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                className="h-7 pl-8 pr-3 w-64 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
              />
            </div>
          </div>

          {/* INQUIRIES TABLE */}
          <div className={`${card} overflow-hidden`}>
            {loading ? (
              <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
                <span>Fetching inquiries...</span>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No inbound demo requests received yet. Fill the "Request a Demo" modal on the homepage to test!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11.5px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                      <th className="py-2 px-3.5">Ref No & Time</th>
                      <th className="py-2 px-3">Applicant Name</th>
                      <th className="py-2 px-3">Bank / Organization</th>
                      <th className="py-2 px-3">Contact Details</th>
                      <th className="py-2 px-3">Institution Type</th>
                      <th className="py-2 px-3">Lead Status</th>
                      <th className="py-2 px-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3.5 font-mono">
                          <div className="font-semibold text-slate-900 dark:text-white">{inq.inquiryRef}</div>
                          <div className="text-[10px] text-slate-400">{fmtDate(inq.createdAt)}</div>
                        </td>

                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {inq.firstName} {inq.lastName}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                            {inq.jobTitle}
                          </div>
                        </td>

                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {inq.organization}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Globe className="w-2.5 h-2.5" />
                            <span>{inq.country || 'India'}</span>
                          </div>
                        </td>

                        <td className="py-2.5 px-3">
                          <div className="text-[11px] text-sky-600 dark:text-sky-400 flex items-center gap-1 font-mono">
                            <Mail className="w-3 h-3 shrink-0" />
                            <span>{inq.email}</span>
                          </div>
                          {inq.phoneNumber && (
                            <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                              <Phone className="w-2.5 h-2.5 shrink-0" />
                              <span>{inq.phoneNumber}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-2.5 px-3">
                          {getOrgTypeBadge(inq.organizationType)}
                        </td>

                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            {getInquiryStatusBadge(inq.status)}
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatusChange(inq._id, e.target.value)}
                              className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 cursor-pointer text-slate-700 dark:text-slate-300"
                            >
                              <option value="New Inbound">New Inbound</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Demo Scheduled">Demo Scheduled</option>
                              <option value="Converted">Converted</option>
                            </select>
                          </div>
                        </td>

                        <td className="py-2.5 px-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* 🚀 QUICK ACTION: NOTIFY / SCHEDULE */}
                            <button
                              onClick={() => {
                                setScheduleModalInquiry(inq);
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                setScheduleData((prev) => ({
                                  ...prev,
                                  meetingDate: tomorrow.toISOString().split('T')[0],
                                }));
                              }}
                              className="px-2.5 py-1 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                              title="Send WhatsApp or Email to applicant"
                            >
                              <Send className="w-3 h-3" />
                              <span>Notify & Schedule</span>
                            </button>

                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium cursor-pointer transition-colors"
                            >
                              View Card
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
        </div>
      )}

      {/* VIEW 2: SARG STAKEHOLDER MEETINGS */}
      {activeDeskTab === 'meetings' && (
        <div className="space-y-3">
          {/* FILTER TABS & SEARCH */}
          <div className={`${card} flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-2`}>
            <div className="flex items-center gap-0.5 overflow-x-auto p-0.5 rounded-md bg-slate-100 dark:bg-slate-800 w-fit max-w-full">
              {[
                'All',
                'Promoters In-Person SARG Hearing',
                'Joint Lenders Meeting (JLM)',
                'Bilateral OTS Compromise Negotiation',
                'Physical Factory Site Visit Inspection',
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeType === type
                      ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {type === 'All' ? 'All Meeting Types' : type.split(' ')[0] + ' ' + (type.split(' ')[1] || '')}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search promoter, RM, minutes..."
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
            </form>
          </div>

          {/* MAIN SARG TABLE */}
          <div className={`${card} overflow-hidden`}>
            {loading ? (
              <div className="py-10 text-center text-slate-400 dark:text-slate-500 text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-500" />
                <span>Loading CRM interactions...</span>
              </div>
            ) : error ? (
              <div className="py-8 text-center text-rose-600 dark:text-rose-400 text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            ) : interactions.length === 0 ? (
              <div className="py-10 text-center text-slate-400 dark:text-slate-500 text-xs">
                No CRM interactions found matching current filter.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11.5px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                      <th className="py-1.5 px-3.5 font-medium">Ref & Meeting Type</th>
                      <th className="py-1.5 px-3 font-medium">Stakeholder / Promoter</th>
                      <th className="py-1.5 px-3 font-medium">Associated Company / Loan</th>
                      <th className="py-1.5 px-3 font-medium">Borrower Stance</th>
                      <th className="py-1.5 px-3 font-medium">Directives & Follow-up</th>
                      <th className="py-1.5 px-3 font-medium">Meeting Date & RM</th>
                      <th className="py-1.5 px-3.5 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {interactions.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors align-top">
                        <td className="py-2 px-3.5 max-w-xs">
                          <div className="font-mono font-semibold text-slate-900 dark:text-white leading-4">
                            {item.interactionRef}
                          </div>
                          <div className="font-medium text-sky-700 dark:text-sky-400 text-[11px] leading-4">
                            {item.interactionType}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-px">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{item.meetingLocation}</span>
                          </div>
                        </td>

                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-900 dark:text-white leading-4">{item.stakeholderName}</div>
                          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium leading-4">
                            {item.stakeholderRole}
                          </div>
                          {item.stakeholderContact && (
                            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              {item.stakeholderContact}
                            </div>
                          )}
                        </td>

                        <td className="py-2 px-3">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 leading-4">
                            {item.borrower?.companyName || 'Corporate Entity'}
                          </div>
                          {item.loanAccount && (
                            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              {item.loanAccount.accountNumber} ({item.loanAccount.facilityType})
                            </div>
                          )}
                        </td>

                        <td className="py-2 px-3">
                          <div className="flex flex-col items-start gap-1">
                            {getStanceBadge(item.borrowerStance)}
                            <button
                              onClick={() => handleStatusToggle(item)}
                              className="cursor-pointer transition-transform active:scale-95"
                              title="Click to toggle status"
                            >
                              {getStatusBadge(item.status)}
                            </button>
                          </div>
                        </td>

                        <td className="py-2 px-3 max-w-xs">
                          <div className="font-medium text-slate-900 dark:text-white line-clamp-1 leading-4">
                            Next: {item.nextActionPlan}
                          </div>
                          {item.nextFollowUpDate && (
                            <div className="text-[10px] font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1 mt-px tabular-nums">
                              <Clock className="w-3 h-3" />
                              <span>Due: {fmtDate(item.nextFollowUpDate)}</span>
                            </div>
                          )}
                          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {item.discussionSummary}
                          </p>
                        </td>

                        <td className="py-2 px-3 font-mono text-[10.5px]">
                          <div className="text-slate-800 dark:text-slate-200">{fmtDate(item.meetingDate)}</div>
                          <div className="text-slate-500 dark:text-slate-400 text-[10px]">{item.relationshipManager}</div>
                        </td>

                        <td className="py-2 px-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setViewLog(item)}
                              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                              title="View full minutes"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 cursor-pointer"
                              title="Delete log"
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
        </div>
      )}

      {/* 🚀 MODAL: NOTIFY & SCHEDULE DEMO DIALOG */}
      {scheduleModalInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <button
              onClick={() => setScheduleModalInquiry(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Schedule Demo & Dispatch Notification
                </h3>
                <p className="text-[11px] text-slate-500">
                  Notify {scheduleModalInquiry.firstName} ({scheduleModalInquiry.organization})
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Proposed Date</label>
                  <input
                    type="date"
                    value={scheduleData.meetingDate}
                    onChange={(e) => setScheduleData({ ...scheduleData, meetingDate: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Time Slot (IST)</label>
                  <input
                    type="time"
                    value={scheduleData.meetingTime}
                    onChange={(e) => setScheduleData({ ...scheduleData, meetingTime: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Virtual Meeting Link (Google Meet / Zoom)</label>
                <div className="relative">
                  <Video className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={scheduleData.meetingLink}
                    onChange={(e) => setScheduleData({ ...scheduleData, meetingLink: e.target.value })}
                    className="w-full h-8 pl-8 pr-2.5 mt-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Legal-Tech Architect / Officer Assigned</label>
                <input
                  type="text"
                  value={scheduleData.officerName}
                  onChange={(e) => setScheduleData({ ...scheduleData, officerName: e.target.value })}
                  className={inputCls}
                />
              </div>

              {/* 🚀 2 DIRECT DISPATCH BUTTONS */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                  Direct Applicant Notification Channels:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {/* WhatsApp Button */}
                  <button
                    type="button"
                    onClick={() => sendWhatsAppNotification(scheduleModalInquiry)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-emerald-900/10"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send WhatsApp Invite</span>
                  </button>

                  {/* Email Button */}
                  <button
                    type="button"
                    onClick={() => sendEmailNotification(scheduleModalInquiry)}
                    className="w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-sky-900/10"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Official Email</span>
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 leading-tight">
                  Clicking either button will generate the formal invitation with Ref No ({scheduleModalInquiry.inquiryRef}) and auto-update the status to Contacted / Scheduled.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setScheduleModalInquiry(null)}
                  className="px-4 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-medium cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: VIEW INQUIRY DETAILS */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <Inbox className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Inbound Demo Request Dossier
                </h3>
                <span className="font-mono text-[11px] text-orange-600 dark:text-orange-400 font-semibold">
                  {selectedInquiry.inquiryRef}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10.5px] text-slate-400 block">Applicant Name</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedInquiry.firstName} {selectedInquiry.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[10.5px] text-slate-400 block">Designation</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedInquiry.jobTitle}
                  </span>
                </div>
                <div>
                  <span className="text-[10.5px] text-slate-400 block">Organization</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedInquiry.organization}
                  </span>
                </div>
                <div>
                  <span className="text-[10.5px] text-slate-400 block">Institution Type</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">
                    {selectedInquiry.organizationType}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Official Email:</span>
                  <span className="font-mono font-medium text-sky-600 dark:text-sky-400">
                    {selectedInquiry.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Direct Phone:</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {selectedInquiry.phoneNumber || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Country / Jurisdiction:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {selectedInquiry.country || 'India'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Lead Status:</span>
                  <span>{getInquiryStatusBadge(selectedInquiry.status)}</span>
                </div>
              </div>

              {selectedInquiry.notes && (
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
                  <span className="text-[10.5px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                    Statutory Recovery Claim Assessment &amp; Defaulter Details
                  </span>
                  <pre className="text-[11px] text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedInquiry.notes}
                  </pre>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LOG NEW SARG MEETING */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Log Stakeholder Meeting / SARG Hearing
            </h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className={labelCls}>Associated Corporate Borrower *</label>
                <select
                  required
                  value={formData.borrower}
                  onChange={(e) => setFormData({ ...formData, borrower: e.target.value })}
                  className={inputCls}
                >
                  <option value="">Select Borrower Company</option>
                  {borrowers.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.companyName} ({b.cin || b.cinNumber || 'MCA Verified'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Meeting Type</label>
                  <select
                    value={formData.interactionType}
                    onChange={(e) => setFormData({ ...formData, interactionType: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Promoters In-Person SARG Hearing">Promoters In-Person SARG Hearing</option>
                    <option value="Joint Lenders Meeting (JLM)">Joint Lenders Meeting (JLM)</option>
                    <option value="Bilateral OTS Compromise Negotiation">Bilateral OTS Compromise Negotiation</option>
                    <option value="Physical Factory Site Visit Inspection">Physical Factory Site Visit Inspection</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Stakeholder Role</label>
                  <select
                    value={formData.stakeholderRole}
                    onChange={(e) => setFormData({ ...formData, stakeholderRole: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Managing Director / Promoter">Managing Director / Promoter</option>
                    <option value="Personal Guarantor">Personal Guarantor</option>
                    <option value="Interim Resolution Professional (IRP)">IRP / RP</option>
                    <option value="Consortium Member Bank Lead">Consortium Member Bank Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Stakeholder / Attendee Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.stakeholderName}
                    onChange={(e) => setFormData({ ...formData, stakeholderName: e.target.value })}
                    placeholder="e.g. Kewal Kishan Singhania"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Contact Phone / Email</label>
                  <input
                    type="text"
                    value={formData.stakeholderContact}
                    onChange={(e) => setFormData({ ...formData, stakeholderContact: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Minutes of Meeting / Discussion Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.discussionSummary}
                  onChange={(e) => setFormData({ ...formData, discussionSummary: e.target.value })}
                  placeholder="Record summary of arguments, financial justifications, or OTS proposals..."
                  className="w-full p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs focus:ring-2 focus:ring-sky-500/40"
                />
              </div>

              <div>
                <label className={labelCls}>Next Action Plan & Directives *</label>
                <input
                  required
                  type="text"
                  value={formData.nextActionPlan}
                  onChange={(e) => setFormData({ ...formData, nextActionPlan: e.target.value })}
                  placeholder="e.g. Issue Section 13(2) notice or demand forensic audit"
                  className={inputCls}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-4 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving Minutes...' : 'Save Hearing Minutes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL 3: VIEW STAKEHOLDER HEARING MINUTES (MOM) */}
      {viewLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setViewLog(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#172B45] to-[#2B4A6B] text-white flex items-center justify-center shadow-sm">
                <Briefcase className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  SARG Stakeholder Hearing Dossier (MoM)
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[11px] font-semibold text-sky-700 dark:text-sky-400">
                    {viewLog.interactionRef}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {viewLog.interactionType}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile & Entity Overview */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10.5px] text-slate-400 block">Stakeholder / Attendee</span>
                <span className="font-semibold text-slate-900 dark:text-white block mt-0.5">
                  {viewLog.stakeholderName}
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  {viewLog.stakeholderRole}
                </span>
                {viewLog.stakeholderContact && (
                  <span className="text-[10.5px] font-mono text-slate-500 block">
                    {viewLog.stakeholderContact}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10.5px] text-slate-400 block">Associated Corporate Borrower</span>
                <span className="font-semibold text-slate-900 dark:text-white block mt-0.5">
                  {viewLog.borrower?.companyName || 'Corporate Entity'}
                </span>
                {viewLog.borrower?.cin && (
                  <span className="text-[10px] font-mono text-slate-500 block">
                    CIN: {viewLog.borrower.cin}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10.5px] text-slate-400 block">Hearing Date & Officer</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 block mt-0.5">
                  {fmtDate(viewLog.meetingDate)}
                </span>
                <span className="text-[10.5px] text-slate-500 block">
                  {viewLog.relationshipManager}
                </span>
              </div>

              <div>
                <span className="text-[10.5px] text-slate-400 block">Meeting Venue</span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300 block mt-0.5">
                  {viewLog.meetingLocation}
                </span>
              </div>
            </div>

            {/* Stance & Status */}
            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10.5px] text-slate-400 block mb-1">Borrower Stance Assessment</span>
                {getStanceBadge(viewLog.borrowerStance)}
              </div>
              <div className="text-right">
                <span className="text-[10.5px] text-slate-400 block mb-1">Current Action Status</span>
                <button
                  onClick={async () => {
                    await handleStatusToggle(viewLog);
                    setViewLog((prev) => ({
                      ...prev,
                      status: prev.status === 'Action Pending' ? 'Concluded' : 'Action Pending',
                    }));
                  }}
                  className="cursor-pointer transition-transform active:scale-95"
                  title="Click to toggle status"
                >
                  {getStatusBadge(viewLog.status)}
                </button>
              </div>
            </div>

            {/* Minutes / Discussion Summary */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Minutes of Meeting (MoM Summary)
              </span>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {viewLog.discussionSummary || 'No discussion summary recorded.'}
              </div>
            </div>

            {/* Next Action Plan & Due Date */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Institutional Directives & Follow-up Target
              </span>
              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-slate-800 dark:text-slate-200">
                <div className="font-semibold text-amber-900 dark:text-amber-300">
                  {viewLog.nextActionPlan}
                </div>
                {viewLog.nextFollowUpDate && (
                  <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Statutory Compliance Due Date: {fmtDate(viewLog.nextFollowUpDate)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Audit Logged under RBI SARG Governance Framework
              </span>
              <button
                type="button"
                onClick={() => setViewLog(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}