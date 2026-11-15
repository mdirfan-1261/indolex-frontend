
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  Scale,
  Shield,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_BASE = API_URL.endsWith("/api")
  ? API_URL
  : `${API_URL}/api`;

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("superadmin@indolex.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid login credentials.");
      }

      if (!data.token || !data.user) {
        throw new Error("Invalid server response. Please try again.");
      }

      if (data.user.role !== "super_admin") {
        throw new Error(
          "Access denied. Only Super Admin can access this portal."
        );
      }

      if (data.user.status && data.user.status !== "active") {
        throw new Error("Your administrator account is not active.");
      }

      localStorage.setItem("indolex_token", data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("indolex_user", JSON.stringify(data.user));

      router.replace("/admin");
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#080D18] px-3 pb-5 pt-4 text-white sm:items-center sm:px-4 sm:py-5">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-40 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.025]" />
      </div>

      <div className="relative z-10 w-full max-w-[370px]">
        {/* Brand */}
        <div className="mb-4 text-center sm:mb-5">
          <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10 shadow-lg shadow-orange-500/10">
            <Scale className="h-5 w-5 text-orange-400" />
          </div>

          <h1 className="text-2xl font-bold tracking-[0.15em]">
            INDO<span className="text-orange-400">LEX</span>
          </h1>

          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Administrative Access Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-white/[0.09] bg-[#111827]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-400">
                Secure Admin Login
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight">
              Welcome back
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Sign in with your administrator credentials.
            </p>
          </div>

          {error && (
            <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-xs leading-5 text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-[11px] font-semibold text-slate-300"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@indolex.com"
                  autoComplete="username"
                  required
                  disabled={loading}
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#0B1220] pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-[11px] font-semibold text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#0B1220] pl-9 pr-10 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/10 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-xs font-bold text-white shadow-lg shadow-orange-500/15 transition hover:bg-orange-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In to Admin Console
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.025] p-2.5">
            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <p className="text-[10px] leading-4 text-slate-500">
              Restricted access. Only authorized Super Administrators can
              access the INDOLEX administrative console.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-[11px] font-medium text-slate-500 transition hover:text-orange-400"
          >
            ← Back to Standard Login
          </Link>

          <p className="mt-3 text-[9px] tracking-wide text-slate-600">
            © 2026 INDOLEX. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
