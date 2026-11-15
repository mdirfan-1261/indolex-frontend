
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ShieldCheck,
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  Scale,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  Clock,
  Landmark,
  Gavel,
  ShieldAlert,
} from 'lucide-react';

// 5 MAIN INSTITUTIONAL PERSONAS
const INSTITUTIONAL_ROLES = [
  {
    id: 'bank_sarg_head',
    title: 'Bank SARG Head / Officer',
    desc: 'For PSU/Private Bank Stressed Asset Officers & Credit Admins',
    icon: Landmark,
    badge: 'NPA & CRILC Desk',
  },
  {
    id: 'legal_counsel',
    title: 'Legal Counsel & Advocate',
    desc: 'For In-House Bank Counsels & Empaneled High Court / DRT Lawyers',
    icon: Gavel,
    badge: 'DRT / NCLT Litigation',
  },
  {
    id: 'npa_recovery_officer',
    title: 'Recovery & Enforcement Officer',
    desc: 'For SARFAESI Sec 13(4) Possession, DM Petitions & Enforcement Agents',
    icon: ShieldAlert,
    badge: 'Sec 13(4) Enforcement',
  },
  {
    id: 'resolution_professional',
    title: 'Resolution Professional (RP)',
    desc: 'For Insolvency Professionals managing IBC 2016 CIRP & CoC Voting',
    icon: Scale,
    badge: 'IBC CIRP Administration',
  },
  {
    id: 'valuation_agency',
    title: 'Approved Valuer & Surveyor',
    desc: 'For IBBI Certified Valuers conducting Land & Plant Valuations',
    icon: Briefcase,
    badge: 'Collateral Valuation',
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'bank_sarg_head',
    institutionName: '',
    phone: '',
    branchOrBarCouncilId: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleRoleSelect = (roleId) => {
    setFormData({ ...formData, role: roleId });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(
        'Application submitted! Your account is PENDING verification by Bank SARG Nodal Officer. Redirecting to login...'
      );

      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedRoleObj = INSTITUTIONAL_ROLES.find(
    (r) => r.id === formData.role
  );

  const inputClass =
    'w-full rounded-lg sm:rounded-xl border border-[#D7E5E9] bg-[#F8FAFA] py-2.5 pl-10 pr-4 text-xs text-[#172B45] transition-all focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-[#0B1523] dark:text-white placeholder:text-slate-400';

  const labelClass =
    'mb-1 block text-[11px] sm:text-xs font-semibold text-[#707B85] dark:text-slate-400';

  return (
    <div className="min-h-screen bg-[#F6F5F2] px-3 pt-3 pb-4 dark:bg-[#0B1523] sm:px-4 sm:pt-4 sm:pb-5 font-sans">

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="text-center mb-5 sm:mb-6">

          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] sm:text-xs font-semibold text-sky-700 dark:text-sky-300 mb-2">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Institutional Portal Access
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B45] dark:text-white">
            Register Institutional Officer
          </h1>

          <p className="mt-1.5 text-[11px] sm:text-xs text-[#707B85] dark:text-slate-400">
            Select your professional department and enter authorized credentials.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="rounded-xl sm:rounded-2xl border border-[#EDEBE4] bg-white p-3.5 sm:p-6 shadow-lg shadow-slate-900/[0.04] dark:border-slate-800 dark:bg-[#101F33]">

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-[11px] sm:text-xs font-medium text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-[11px] sm:text-xs font-medium text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              <Clock className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">

            {/* 1. ROLE SELECTOR */}
            <div>

              <label className="mb-2 block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#172B45] dark:text-slate-200">
                1. Select Authority / Department *
              </label>

              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">

                {INSTITUTIONAL_ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = formData.role === r.id;

                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleSelect(r.id)}
                      className={`flex items-start gap-2.5 rounded-xl border p-2.5 sm:p-3 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-sm dark:border-sky-400 dark:bg-sky-950/40'
                          : 'border-[#EDEBE4] bg-[#F8FAFA] hover:border-slate-300 dark:border-slate-800 dark:bg-[#0B1523] dark:hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg mt-0.5 shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 text-white dark:bg-sky-500'
                            : 'bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-[11px] sm:text-xs font-bold text-[#172B45] dark:text-white leading-snug">
                            {r.title}
                          </h4>

                          {isSelected && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                          )}
                        </div>

                        <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {r.desc}
                        </p>

                        <span className="inline-block mt-1 text-[9px] font-semibold text-blue-700 dark:text-sky-300 uppercase">
                          {r.badge}
                        </span>

                      </div>
                    </button>
                  );
                })}

              </div>

              {/* SELECTED ROLE INFO */}
              <div className="mt-2 rounded-lg bg-slate-50 p-2 border border-slate-200/80 text-[10px] sm:text-[11px] text-slate-600 dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-400">
                Registering as:{' '}
                <strong className="text-blue-700 dark:text-sky-400 font-bold">
                  {selectedRoleObj?.title}
                </strong>
                {' '}({selectedRoleObj?.desc})
              </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-[#E5EAE8] dark:border-slate-800" />

            {/* 2. OFFICER DETAILS */}
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#172B45] dark:text-slate-200">
              2. Officer Credentials & Organization
            </div>

            {/* NAME & EMAIL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <div>
                <label className={labelClass}>
                  Officer Full Name *
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Adv. Rajesh Sharma / Sunil Verma"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Institutional Email *
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="officer@sbi.co.in"
                    className={inputClass}
                  />
                </div>
              </div>

            </div>

            {/* PASSWORD & PHONE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <div>
                <label className={labelClass}>
                  Secure Password *
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full rounded-lg sm:rounded-xl border border-[#D7E5E9] bg-[#F8FAFA] py-2.5 pl-10 pr-10 text-xs text-[#172B45] transition-all focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-[#0B1523] dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Official Mobile No *
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>
              </div>

            </div>

            {/* ORGANIZATION & ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <div>
                <label className={labelClass}>
                  Bank / Law Firm / ARC Name *
                </label>

                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="institutionName"
                    required
                    value={formData.institutionName}
                    onChange={handleChange}
                    placeholder="State Bank of India"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Branch Code / Bar Council No.
                </label>

                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="branchOrBarCouncilId"
                    value={formData.branchOrBarCouncilId}
                    onChange={handleChange}
                    placeholder="D/1234/2015 or SARG-MUM-01"
                    className={inputClass}
                  />
                </div>
              </div>

            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-[#527F94] py-3 px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#436a7c] disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-400 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Registration...
                </>
              ) : (
                <>
                  Submit Application for SARG Approval
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>

          {/* FOOTER LOGIN LINK */}
          <div className="mt-4 pt-3 border-t border-[#EDEBE4] text-center text-[10px] sm:text-xs text-[#707B85] dark:border-slate-800 dark:text-slate-400">
            Already authorized by Bank SARG?{' '}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:underline dark:text-sky-400"
            >
              Sign In here
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
