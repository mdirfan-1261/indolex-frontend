
"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar, AdminHeader } from "@/components/admin";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_BASE = API_URL.endsWith("/api")
  ? API_URL
  : `${API_URL}/api`;

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};

  const token =
    localStorage.getItem("indolex_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const isLoginPage = pathname === "/admin/login";

  const fetchPendingCount = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE}/admin/overview`,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          cache: "no-store",
        }
      );

      if (!response.ok) return;

      const result = await response.json();

      if (result.success) {
        setPendingCount(
          Number(result.data?.stats?.pendingCount || 0)
        );
      }
    } catch (error) {
      console.error("Pending count error:", error);
    }
  }, []);

  useEffect(() => {
    if (isLoginPage) return;

    fetchPendingCount();

    const handleFocus = () => {
      fetchPendingCount();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [isLoginPage, fetchPendingCount]);

  // Admin login page: no sidebar/header
  if (isLoginPage) {
    return <>{children}</>;
  }

  const openMobileSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-800">

      {/* Admin Sidebar */}
      <AdminSidebar
        mobileOpen={isSidebarOpen}
        onClose={closeMobileSidebar}
        collapsed={collapsed}
        onToggleCollapse={() => {
          setCollapsed((prev) => !prev);
        }}
        pendingCount={pendingCount}
      />

      {/* Main Workspace */}
      <div
        className={`
          flex min-h-screen min-w-0 flex-col
          transition-[padding] duration-300 ease-in-out
          ${collapsed ? "lg:pl-[68px]" : "lg:pl-[238px]"}
        `}
      >

        {/* Admin Header */}
        <AdminHeader
          onMenuClick={openMobileSidebar}
        />

        {/* Page Content */}
        <main className="min-w-0 w-full flex-1 p-3 sm:p-4 lg:p-5 xl:p-6">
          <div className="mx-auto w-full min-w-0 max-w-[1800px]">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
