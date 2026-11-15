
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Menu,
  X,
  BellRing,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardHeader({ onMenuClick }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Initialize theme after hydration
  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme');
    const dark = savedTheme === 'dark';

    document.documentElement.classList.toggle('dark', dark);
    setIsDarkMode(dark);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // User information
  const userName =
    user?.fullName ||
    user?.name ||
    user?.email ||
    'Officer';

  const userEmail = user?.email || '';

  const userRole = (user?.role || 'Officer')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const userOrg =
    typeof user?.organization === 'object'
      ? user.organization?.name || user.organization?.institutionName || ''
      : user?.organization || user?.institutionName || '';

  const initials = userName
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  // Theme toggle
  const toggleDarkMode = () => {
    const nextTheme = !isDarkMode;

    document.documentElement.classList.toggle('dark', nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');

    setIsDarkMode(nextTheme);
  };

  // Search
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    router.push(
      `/dashboard/crm?search=${encodeURIComponent(query)}`
    );

    setSearchQuery('');
  };

  // Logout
  const handleLogout = async () => {
    setProfileOpen(false);

    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-3 backdrop-blur-xl sm:px-5 dark:border-slate-800 dark:bg-[#0A192F]/95">

      {/* Left: Mobile Menu + Search */}
      <div className="flex min-w-0 flex-1 items-center gap-3">

        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full max-w-xl"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search borrower, CIN, loan or case..."
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-900"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex shrink-0 items-center gap-2">

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          title="Toggle theme"
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {mounted && isDarkMode ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            title="Notifications"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell className="h-4 w-4" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-[min(340px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#101F33]">

              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    Notifications
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  aria-label="Close notifications"
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-4 py-9 text-center">
                <Bell className="mx-auto mb-2 h-7 w-7 text-slate-300 dark:text-slate-600" />

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  No new notifications
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Your alerts will appear here.
                </p>
              </div>

              <div className="border-t border-slate-100 p-2 dark:border-slate-800">
                <Link
                  href="/dashboard/tasks"
                  onClick={() => setNotificationsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-center text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-800"
                >
                  View Tasks & SLAs
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 pr-2.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#172B45] text-[11px] font-bold text-white dark:bg-sky-600">
              {mounted ? initials || 'U' : 'U'}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-[140px] truncate text-xs font-bold text-slate-800 dark:text-white">
                {mounted ? userName : 'Officer'}
              </p>
              <p className="max-w-[140px] truncate text-[10px] text-slate-500 dark:text-slate-400">
                {mounted ? userRole : 'Loading profile'}
              </p>
            </div>

            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-[min(280px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#101F33]">

              {/* User Details */}
              <div className="border-b border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172B45] text-sm font-bold text-white dark:bg-sky-600">
                    {initials || 'U'}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-800 dark:text-white">
                      {userName}
                    </p>

                    <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                      {userEmail || 'No email available'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  <ShieldCheck className="h-3 w-3" />
                  {userRole}
                </div>

                {userOrg && (
                  <p className="mt-2 truncate text-[10px] text-slate-500 dark:text-slate-400">
                    {userOrg}
                  </p>
                )}
              </div>

              {/* Profile Actions */}
              <div className="space-y-1 p-2">

                <Link
                  href="/dashboard/settings?tab=profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  My Profile
                </Link>

                <Link
                  href="/dashboard/settings?tab=security"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  Account & Security
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 p-2 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
