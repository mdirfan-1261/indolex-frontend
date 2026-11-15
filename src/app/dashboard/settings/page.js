'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  User,
  Shield,
  KeyRound,
  Bell,
  CheckCircle2,
  AlertCircle,
  Save,
  Lock,
  BadgeCheck,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/* ── UI-only style tokens (light + dark) ── */
const card =
  'rounded-lg bg-white dark:bg-[#101F33] ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
const inputCls =
  'w-full h-8 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-colors';
const labelCls = 'block mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300';
const eyeBtn =
  'absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer';

function SettingsContent() {
  const { token, user: authUser } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Password Show/Hide
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    zonalOffice: '',
    jurisdiction: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Sync tab with URL
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'security', 'notifications', 'permissions'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // 1. FETCH LIVE PROFILE FROM MONGODB ATLAS
  const fetchLiveProfile = async () => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('indolex_token');

      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const json = await res.json();
      if (res.ok && json.data) {
        const u = json.data;
        setFormData((prev) => ({
          ...prev,
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '+91 98765 43210',
          organization: u.organization || 'Institutional Banking SARG',
          zonalOffice: u.zonalOffice || 'Corporate SARG Desk, Mumbai',
          jurisdiction: u.jurisdiction || 'Pan-India Corporate NPAs (> ₹5 Cr)',
          role: u.role || 'sarg_officer',
        }));
      }
    } catch (err) {
      console.error('Error fetching live profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveProfile();
  }, []);

  // 2. LIVE PROFILE UPDATE HANDLER
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setStatusMessage({ type: '', text: '' });
      const authToken = token || localStorage.getItem('indolex_token');

      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          organization: formData.organization,
          zonalOffice: formData.zonalOffice,
          jurisdiction: formData.jurisdiction,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        // Update local session so Header & Dropdown update immediately
        try {
          const stored = localStorage.getItem('indolex_user');
          if (stored) {
            const u = JSON.parse(stored);
            u.fullName = formData.name;
            u.name = formData.name;
            localStorage.setItem('indolex_user', JSON.stringify(u));
            window.dispatchEvent(new Event('indolex-auth-change'));
          }
        } catch (e) {
          console.error(e);
        }

        setStatusMessage({ type: 'success', text: 'Profile details saved successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to update profile' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Network error connecting to backend' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    }
  };

  // 3. LIVE PASSWORD CHANGE HANDLER
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setStatusMessage({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }

    try {
      setSaving(true);
      setStatusMessage({ type: '', text: '' });
      const authToken = token || localStorage.getItem('indolex_token');

      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Password successfully updated and encrypted!' });
        setFormData((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Current password incorrect' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to update password' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center text-slate-500 dark:text-slate-400">
        <Loader2 className="h-5 w-5 animate-spin text-sky-500 mr-2" />
        <span className="text-xs font-medium">Connecting to MongoDB Atlas Live Session...</span>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-4 space-y-3 pb-8 text-slate-800 dark:text-slate-100">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-lg leading-6 font-semibold tracking-tight text-[#172B45] dark:text-white">
          Officer Profile & Account Settings
        </h1>
        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time synchronized credentials with MongoDB Atlas database.
        </p>
      </div>

      {/* Live Status Alerts */}
      {statusMessage.text && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11.5px] font-medium ring-1 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800'
              : 'bg-rose-50 text-rose-800 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* 2. TABS */}
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 gap-5 text-[11.5px] font-medium [scrollbar-width:none]">
        {[
          { id: 'profile', label: 'Officer Profile & Zonal Info', icon: User },
          { id: 'security', label: 'Security & Password', icon: KeyRound },
          { id: 'notifications', label: 'Statutory Alerts', icon: Bell },
          { id: 'permissions', label: 'Statutory Authority', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
              className={`flex shrink-0 items-center gap-1.5 pb-2 -mb-px border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-sky-600 text-sky-700 dark:border-sky-400 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT */}
      <div className={`${card} px-4 py-4`}>
        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-3 max-w-2xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Full Officer Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Official Email Address</label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className={`${inputCls} bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed`}
                />
              </div>

              <div>
                <label className={labelCls}>Contact Mobile</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Assigned Institution / Bank</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Zonal Recovery Office</label>
                <input
                  type="text"
                  value={formData.zonalOffice}
                  onChange={(e) => setFormData({ ...formData, zonalOffice: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Authorized Jurisdiction</label>
                <input
                  type="text"
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#172B45] hover:bg-[#1f3a5c] dark:bg-sky-500 dark:hover:bg-sky-400 px-3.5 text-[11.5px] font-medium text-white cursor-pointer disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              <span>{saving ? 'Saving to Database...' : 'Save Profile Updates'}</span>
            </button>
          </form>
        )}

        {/* TAB 2: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
            <div>
              <label className={labelCls}>Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  placeholder="Enter current password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className={`${inputCls} pr-8`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  aria-label={showCurrentPass ? 'Hide current password' : 'Show current password'}
                  className={eyeBtn}
                >
                  {showCurrentPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className={labelCls}>New SARG Security Password</label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  placeholder="Enter new strong password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className={`${inputCls} pr-8`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  aria-label={showNewPass ? 'Hide new password' : 'Show new password'}
                  className={eyeBtn}
                >
                  {showNewPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className={labelCls}>Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  required
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`${inputCls} pr-8`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  aria-label={showConfirmPass ? 'Hide confirm password' : 'Show confirm password'}
                  className={eyeBtn}
                >
                  {showConfirmPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 px-3.5 text-[11.5px] font-medium text-white dark:text-slate-900 cursor-pointer disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Lock className="h-3.5 w-3.5" />}
              <span>{saving ? 'Encrypting & Updating...' : 'Update Security Password'}</span>
            </button>
          </form>
        )}

        {/* TAB 3: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-2 max-w-xl">
            {[
              { title: 'SARFAESI 60-Day Expiry Notice Alarms', desc: 'Get SMS & email 5 days prior to Sec 13(2) limitation expiry.' },
              { title: 'DRT & NCLT Daily Cause List Sync', desc: 'Receive morning digest of matters listed for hearing today.' },
              { title: 'CRILC Weekly Submission Reminder', desc: 'Alert every Friday for corporate exposures above ₹5 Crores.' },
            ].map((n, i) => (
              <label
                key={i}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg ring-1 ring-slate-200 dark:ring-slate-800 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#172B45] dark:text-white leading-4">{n.title}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{n.desc}</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 shrink-0 rounded accent-sky-600 cursor-pointer"
                />
              </label>
            ))}
          </div>
        )}

        {/* TAB 4: STATUTORY AUTHORITY */}
        {activeTab === 'permissions' && (
          <div className="space-y-3 max-w-xl">
            <div className="rounded-lg bg-sky-50 dark:bg-sky-500/10 ring-1 ring-sky-200/70 dark:ring-sky-500/20 px-3 py-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-900 dark:text-sky-200">
                <BadgeCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span>Statutory Delegation of Financial Power (DOFP)</span>
              </div>
              <p className="text-[11px] text-sky-800/80 dark:text-sky-300/80 mt-1">
                Authorized Signatory under SARFAESI Act 2002 & Authorized Recovery Officer under RDDBFI Act 1993.
              </p>
            </div>

            <div className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex justify-between gap-3 py-2">
                <span className="text-slate-500 dark:text-slate-400">Sec 13(2) Notice Signatory Authority</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-right">Authorized (Up to ₹100 Cr)</span>
              </div>
              <div className="flex justify-between gap-3 py-2">
                <span className="text-slate-500 dark:text-slate-400">Sec 13(4) Physical Possession Sign-off</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-right">Authorized</span>
              </div>
              <div className="flex justify-between gap-3 py-2">
                <span className="text-slate-500 dark:text-slate-400">OTS Haircut Compromise Sanction Limit</span>
                <span className="font-semibold text-sky-700 dark:text-sky-400 text-right">Up to ₹25.00 Crores</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex items-center justify-center text-slate-400 dark:text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
          <span className="ml-2 text-xs">Loading Live Session...</span>
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}