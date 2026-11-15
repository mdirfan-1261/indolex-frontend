
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (pathname === "/admin/login") {
    return children;
  }

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={closeMobileMenu}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <div
        className={`min-h-screen min-w-0 transition-[padding] duration-300 ${
          collapsed ? "lg:pl-[68px]" : "lg:pl-[238px]"
        }`}
      >
        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="min-h-[calc(100vh-76px)] min-w-0 w-full p-3 sm:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
