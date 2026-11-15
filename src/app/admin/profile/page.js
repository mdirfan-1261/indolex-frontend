'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserCircle,
  ShieldCheck,
  Mail,
  Phone,
  Building2,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
  Eye,
  EyeOff,
  UserCheck,
  Settings,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '');

const API_BASE = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

export default function AdminProfilePage() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Passwords visibility
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Profile Form
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    department: '',
    role: '',
    status: '',
    createdAt: '',
  });

  // Password Form
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const getAuthToken = () => {
    if (typeof window === 'undefined') return '';
    return (
      token ||
      localStorage.getItem('indolex_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('authToken') ||
      ''
    );
  };

  // 1. Fetch Live Profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const authToken = getAuthToken();

      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const json = await res.json();
      if (res.ok && (json.data || json.user)) {
        const u = json.data || json.user;
        setProfile({
          name: u.fullName || u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          organization: u.organization || u.institutionName || 'Indolex Authority',
          department: u.department || 'Statutory Recovery & Legal Supervision',
          role: u.role || 'super_admin',
          status: u.status || 'active',
          createdAt: u.createdAt || '',
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 2. Save Profile Changes
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      setMessage({ type: '', text: '' });
      const authToken = getAuthToken();

      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          organization: profile.organization,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Failed to update profile');
      }

      // Sync local storage so header immediately updates
      try {
        const stored = localStorage.getItem('indolex_user');
        if (stored) {
          const u = JSON.parse(stored);
          u.fullName = profile.name;
          u.name = profile.name;
          u.phone = profile.phone;
          u.organization = profile.organization;
          localStorage.setItem('indolex_user', JSON.stringify(u));
          window.dispatchEvent(new Event('indolex-auth-change'));
        }
      } catch (e) {
        console.error(e);
      }

      setMessage({
        type: 'success',
        text: 'Super Admin profile details updated successfully!',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Error updating profile',
      });
    } finally {
      setSavingProfile(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  // 3. Change Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New password and confirm password do not match.',
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters long.',
      });
      return;
    }

    try {
      setSavingPassword(true);
      setMessage({ type: '', text: '' });
      const authToken = getAuthToken();

      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Password update failed');
      }

      setMessage({
        type: 'success',
        text: 'Super Admin password changed successfully!',
      });
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Failed to change password',
      });
    } finally {
      setSavingPassword(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  /* ── UI-only style tokens (light + dark) ── */
  const card =
    'rounded-lg bg-white dark:bg-[#0A1526] ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]';
  const inputStyle =
    'w-full h-8 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors';
  const labelStyle = 'block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1';
  const hintStyle = 'block mt-0.5 text-[10px] text-slate-400 dark:text-slate-500';

  // UI-only derived display values
  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : '';
  const roleLabel = (profile.role || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="p-3 md:p-4 space-y-3 max-w-5xl pb-8 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-500/20">
            <UserCircle size={17} />
          </div>
          <div className="min-w-0">
            <h1 className="text-[15px] leading-5 font-semibold tracking-tight text-slate-900 dark:text-white">
              Super Admin Profile & Credentials
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Manage your administrator identity, contact information and security access keys.
            </p>
          </div>
        </div>

        <Link
          href="/admin/settings"
          className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 px-2.5 text-[11px] font-medium text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <Settings className="h-3 w-3 text-slate-400" />
          <span>Platform Settings</span>
        </Link>
      </div>

      {/* Alert Message */}
      {message.text && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11.5px] font-medium ring-1 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800'
              : 'bg-rose-50 text-rose-800 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle size={14} className="text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Overview Identity Badge */}
      <div className={`${card} px-4 py-3`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-600 to-rose-800 text-white text-sm font-semibold shadow ring-1 ring-white/10">
              {profile.name
                ? profile.name
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join('')
                    .toUpperCase()
                : 'SA'}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[14px] font-semibold text-slate-900 dark:text-white leading-5">
                  {profile.name || 'Root Super Admin'}
                </h2>
                <span className="inline-flex items-center gap-1 rounded px-1.5 py-px text-[10px] font-medium ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">
                  <ShieldCheck size={11} />
                  Master Root
                </span>
              </div>
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                <Mail size={11} className="shrink-0" />
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-md bg-slate-50 dark:bg-slate-900/60 ring-1 ring-slate-200 dark:ring-slate-800 px-2.5 py-1.5">
              <span className="block text-[9.5px] font-medium text-slate-400 dark:text-slate-500">Security level</span>
              <span className="text-[11.5px] font-semibold text-rose-600 dark:text-rose-400">Tier-1 Super Administrator</span>
            </div>
            {roleLabel && (
              <div className="rounded-md bg-slate-50 dark:bg-slate-900/60 ring-1 ring-slate-200 dark:ring-slate-800 px-2.5 py-1.5">
                <span className="block text-[9.5px] font-medium text-slate-400 dark:text-slate-500">Role · Status</span>
                <span className="text-[11.5px] font-semibold text-slate-700 dark:text-slate-200 capitalize">
                  {roleLabel} · {profile.status}
                </span>
              </div>
            )}
            {memberSince && (
              <div className="rounded-md bg-slate-50 dark:bg-slate-900/60 ring-1 ring-slate-200 dark:ring-slate-800 px-2.5 py-1.5">
                <span className="block text-[9.5px] font-medium text-slate-400 dark:text-slate-500">Member since</span>
                <span className="text-[11.5px] font-semibold text-slate-700 dark:text-slate-200 tabular-nums">{memberSince}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        {/* Profile Details Form */}
        <div className={`${card} px-4 py-3 space-y-3`}>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <UserCheck size={14} className="text-slate-400" />
            <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white">
              Administrator Personal Information
            </h3>
          </div>

          {loading ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
              <span>Loading profile details...</span>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="space-y-3">
              <div>
                <label className={labelStyle}>Super Admin Full Name *</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Adv. Rajeshwar Sharma"
                  className={inputStyle}
                />
                <span className={hintStyle}>This name appears in audit logs and header profiles.</span>
              </div>

              <div>
                <label className={labelStyle}>Official Email Address (Permanent)</label>
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className={`${inputStyle} opacity-60 cursor-not-allowed`}
                />
                <span className={hintStyle}>Root email used for system clearance & authentication.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle}>Contact Mobile Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Institution / Authority</label>
                  <input
                    type="text"
                    value={profile.organization}
                    onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                    placeholder="e.g. Indolex Authority"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md bg-rose-600 hover:bg-rose-700 px-3.5 text-[11.5px] font-medium text-white cursor-pointer disabled:opacity-60 transition-colors"
                >
                  {savingProfile ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security & Password Form */}
        <div className={`${card} px-4 py-3 space-y-3`}>
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <KeyRound size={14} className="text-slate-400" />
            <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white">Change Master Admin Password</h3>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div>
              <label className={labelStyle}>Current Password *</label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className={`${inputStyle} pr-8`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  aria-label={showCurrentPass ? 'Hide current password' : 'Show current password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  {showCurrentPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>New Password *</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="••••••••"
                    className={`${inputStyle} pr-8`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    aria-label={showNewPass ? 'Hide new password' : 'Show new password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    {showNewPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className={labelStyle}>Confirm New Password *</label>
                <input
                  type="password"
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={inputStyle}
                />
              </div>
            </div>
            <span className={hintStyle}>Minimum 6 characters. Use a unique password for the root account.</span>

            <div className="pt-1">
              <button
                type="submit"
                disabled={savingPassword}
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-3.5 text-[11.5px] font-medium text-white cursor-pointer disabled:opacity-60 transition-colors"
              >
                {savingPassword ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-rose-400" />
                )}
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}