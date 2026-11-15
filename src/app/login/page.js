
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Scale,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  Clock,
  Shield,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [targetDocket, setTargetDocket] = useState('/dashboard');

  // Detect if user came from a locked module
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const redir = params.get('redirect');

      if (redir && redir.startsWith('/dashboard')) {
        setTargetDocket(redir);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Please provide both institutional email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid institutional credentials');
      }

      // Store JWT token and officer profile
      localStorage.setItem('indolex_token', data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('indolex_user', JSON.stringify(data.user));
      localStorage.setItem('user', JSON.stringify(data.user));

      const officerName =
        data.user?.name ||
        data.user?.fullName ||
        'Authorized Officer';

      setSuccess(`Authenticated as ${officerName}! Entering workspace...`);

      setTimeout(() => {
        router.push(targetDocket);
      }, 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isPendingError = error.toLowerCase().includes('pending');

  const inputClass =
    'w-full bg-white dark:bg-[#0B172E] border border-[#E5EAF0] dark:border-white/10 rounded-lg sm:rounded-xl pl-10 pr-11 py-2.5 sm:py-3 text-sm text-[#172B45] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all focus:border-[#527F94] focus:ring-2 focus:ring-[#527F94]/10';

  const labelClass =
    'text-[11px] sm:text-xs font-semibold text-[#34465C] dark:text-slate-300 block mb-1 sm:mb-1.5';

  return (
    <div className="min-h-screen bg-[#FCFBF7] dark:bg-[#071326] text-[#172B45] dark:text-slate-100 flex flex-col justify-start items-center px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-3 relative overflow-x-hidden font-sans transition-colors duration-200">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[220px] sm:h-[300px] bg-[#EAF2F5]/70 dark:bg-blue-500/10 blur-[90px] sm:blur-[130px] rounded-full pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 bg-white dark:bg-[#0B172E] border border-[#EDEBE4] dark:border-white/10 rounded-xl sm:rounded-2xl shadow-lg shadow-slate-900/[0.05] overflow-hidden relative z-10 transition-colors duration-200">

        {/* LEFT SIDE: BRAND PANEL */}
        <div className="md:col-span-5 bg-[#F1F6F7] dark:bg-[#101F33] p-3.5 sm:p-6 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5EAE8] dark:border-white/10 transition-colors duration-200">

          <div>
            {/* LOGO */}
            <Link href="/" className="inline-flex items-center gap-2 mb-3 sm:mb-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#172B45] dark:bg-[#527F94] flex items-center justify-center text-white">
                <Scale className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>

              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#172B45] dark:text-white">
                IndoLex <span className="text-[#527F94] dark:text-blue-400">Laws</span>
              </span>
            </Link>

            {/* BRAND CONTENT */}
            <h1 className="text-base sm:text-xl font-bold text-[#172B45] dark:text-white mb-1.5 sm:mb-2 leading-snug">
              Corporate Recovery & Legal CRM
            </h1>

            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3 sm:mb-5">
              Access centralized stressed loan accounts, SARFAESI notices, and judicial court dockets through one institutional workspace.
            </p>

            {/* WORKFLOW CARDS */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-1 gap-2">

              <div className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B172E] border border-[#E5EAE8] dark:border-white/10 text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-[#527F94] dark:text-blue-400 block mb-1">
                  SARFAESI 13(2) Workflow
                </span>
                Structured statutory notice preparation and document tracking.
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-[#0B172E] border border-[#E5EAE8] dark:border-white/10 text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-[#527F94] dark:text-blue-400 block mb-1">
                  DRT & NCLT Case Management
                </span>
                Centralized case records, hearing schedules and order tracking.
              </div>

            </div>
          </div>

          {/* SECURITY FOOTER */}
          <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2 pt-3 sm:pt-5">
            <ShieldCheck className="w-4 h-4 text-[#527F94] dark:text-blue-400 shrink-0" />
            <span>Secure institutional access framework</span>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="md:col-span-7 p-3.5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-center">

          {/* FORM HEADING */}
          <div className="mb-4 sm:mb-6">

            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-[#527F94] dark:text-blue-400">
              Institutional Access
            </span>

            <h2 className="text-lg sm:text-xl font-bold text-[#172B45] dark:text-white mt-1">
              Sign In to Console
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Enter your authorized email and password to enter your workspace.
            </p>

            {/* TARGET DOCKET NOTIFICATION */}
            {targetDocket !== '/dashboard' && (
              <div className="mt-3 inline-flex items-start gap-1.5 px-3 py-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-[10px] sm:text-[11px] font-medium">
                <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5" />

                <span>
                  Protected Docket: Sign in to open{' '}
                  <strong>
                    {targetDocket.replace('/dashboard/', 'M-')}
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* SUCCESS NOTIFICATION */}
          {success && (
            <div className="mb-3 sm:mb-4 flex items-start gap-2 rounded-lg border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2.5 text-xs font-medium text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          {/* ERROR NOTIFICATION */}
          {error && (
            <div
              className={`mb-3 sm:mb-4 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium ${
                isPendingError
                  ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300'
              }`}
            >
              {isPendingError ? (
                <Clock className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              )}

              <p>{error}</p>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-3">

            {/* EMAIL */}
            <div>
              <label className={labelClass}>
                Official Corporate Email
              </label>

              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="nodal.officer@bank.com"
                  autoComplete="username"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className={labelClass}>
                Password
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={inputClass}
                  required
                />

                {/* SHOW / HIDE PASSWORD */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#527F94] dark:text-blue-400" />
                  )}
                </button>
              </div>
            </div>

            {/* REMEMBER SESSION / FORGOT PASSWORD */}
            <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 pt-1">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="rounded border-slate-300 text-[#527F94] focus:ring-[#527F94]"
                />

                <span>Remember Session</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-[#527F94] dark:text-blue-400 font-semibold hover:underline whitespace-nowrap"
              >
                Forgot Password?
              </Link>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#172B45] dark:bg-[#527F94] hover:bg-[#243E5C] dark:hover:bg-[#416A7D] disabled:opacity-60 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Officer...</span>
                </>
              ) : (
                <>
                  <span>Sign In to SARG Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* REGISTRATION LINK */}
          <div className="text-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#EDEBE4] dark:border-white/10 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have an institutional account?{' '}
            <Link
              href="/register"
              className="text-[#527F94] dark:text-blue-400 font-bold hover:underline"
            >
              Register New Officer
            </Link>
          </div>
        </div>
      </div>

      {/* BACK TO WEBSITE */}
      <Link
        href="/"
        className="relative z-10 mt-3 sm:mt-4 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hover:text-[#527F94] dark:hover:text-blue-400 transition-colors"
      >
        ← Back to IndoLex Laws Website
      </Link>
    </div>
  );
}
