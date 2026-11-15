
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminHeader({ onMenuClick }) {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [adminName, setAdminName] = useState("Administrator");
  const [adminRole, setAdminRole] = useState("Super Admin");

  useEffect(() => {
    setMounted(true);

    try {
      const storedUser = localStorage.getItem("indolex_user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        setAdminName(
          user.fullName ||
          user.name ||
          user.email ||
          "Administrator"
        );

        setAdminRole(
          (user.role || "super_admin")
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
        );
      }
    } catch (error) {
      console.error("Admin profile error:", error);
    }
  }, []);

  const initials = mounted
    ? adminName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "AD";

  const handleMenuClick = () => {
    console.log("Admin hamburger clicked");

    if (typeof onMenuClick === "function") {
      onMenuClick();
    } else {
      console.error("AdminHeader: onMenuClick callback missing");
    }
  };

  const handleLogout = () => {
    [
      "indolex_user",
      "indolex_token",
      "token",
      "authToken",
    ].forEach((key) => localStorage.removeItem(key));

    router.replace("/admin/login");
  };

  return (
    <header className="sticky top-0 z-[60] flex h-[64px] w-full items-center justify-between border-b border-slate-200 bg-white px-3 shadow-sm sm:h-[70px] sm:px-5 lg:h-[76px] lg:px-8">

      {/* LEFT SECTION */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={handleMenuClick}
          aria-label="Open admin navigation"
          aria-expanded="false"
          className="relative z-[70] flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition active:scale-95 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} strokeWidth={2.2} />
        </button>

        {/* Desktop Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search size={16} className="text-slate-400" />

          <input
            type="search"
            placeholder="Search administration..."
            className="w-48 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
            disabled
          />

          <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] text-slate-400">
            Search
          </span>
        </div>

        {/* Mobile Brand */}
        <div className="min-w-0 md:hidden">
          <p className="text-sm font-bold text-slate-800">
            INDOLEX Admin
          </p>

          <p className="text-[10px] text-slate-400">
            Management Console
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* Admin Status */}
        <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-[10px] font-semibold text-emerald-700">
            Admin Console
          </span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={19} />
        </button>

        {/* Profile */}
        <div className="relative">

          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-expanded={profileOpen}
            aria-label="Admin profile menu"
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#172033] text-xs font-bold text-white">
              {initials}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-36 truncate text-xs font-bold text-slate-800">
                {mounted ? adminName : "Administrator"}
              </p>

              <p className="text-[10px] text-slate-500">
                {mounted ? adminRole : "Super Admin"}
              </p>
            </div>

            <ChevronDown
              size={15}
              className="hidden text-slate-400 sm:block"
            />
          </button>

          {profileOpen && (
            <>
              {/* Outside Click */}
              <button
                type="button"
                aria-label="Close profile menu"
                onClick={() => setProfileOpen(false)}
                className="fixed inset-0 z-[80] cursor-default"
              />

              {/* Dropdown */}
              <div className="absolute right-0 top-full z-[90] mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                <div className="border-b border-slate-100 bg-slate-50 p-4">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {adminName}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-emerald-700">
                    <ShieldCheck size={13} />
                    {adminRole}
                  </div>
                </div>

                <div className="p-2">

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      router.push("/admin/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <UserCircle size={16} />
                    My Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      router.push("/admin/settings");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <Settings size={16} />
                    Settings
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
