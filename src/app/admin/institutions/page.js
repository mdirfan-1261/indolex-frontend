'use client';

import { useState } from 'react';
import {
  Building2,
  Landmark,
  Shield,
  Plus,
  Search,
  ExternalLink,
  CheckCircle2,
  Coins,
  Briefcase,
} from 'lucide-react';

const INITIAL_INSTITUTIONS = [
  { id: 1, name: 'State Bank of India (SARG Desk)', type: 'PSU Commercial Bank', branches: '14 Zonal Desks', activeNPAs: '₹2,450 Cr', status: 'ACTIVE' },
  { id: 2, name: 'Punjab National Bank (SAMB)', type: 'PSU Commercial Bank', branches: '8 Zonal Desks', activeNPAs: '₹1,280 Cr', status: 'ACTIVE' },
  { id: 3, name: 'Phoenix ARC Private Limited', type: 'Asset Reconstruction Company', branches: 'Pan-India Pool', activeNPAs: '₹840 Cr', status: 'ACTIVE' },
  { id: 4, name: 'Shardul Amarchand Mangaldas & Co.', type: 'Empaneled Law Firm', branches: 'Delhi / Mumbai / BLR', activeNPAs: '34 Court Matters', status: 'ACTIVE' },
  { id: 5, name: 'HDFC Bank Special Assets Desk', type: 'Private Commercial Bank', branches: 'Mumbai Corporate Desk', activeNPAs: '₹910 Cr', status: 'ACTIVE' },
];

export default function AdminInstitutionsPage() {
  const [institutions, setInstitutions] = useState(INITIAL_INSTITUTIONS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInst, setNewInst] = useState({ name: '', type: 'PSU Commercial Bank', branches: '', activeNPAs: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newInst.name) return;
    setInstitutions([...institutions, { id: Date.now(), ...newInst, status: 'ACTIVE' }]);
    setShowAddModal(false);
    setNewInst({ name: '', type: 'PSU Commercial Bank', branches: '', activeNPAs: '' });
  };

  const filtered = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(search.toLowerCase()) ||
    inst.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Banks & Institutions Master Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage participating Commercial Banks, Asset Reconstruction Companies (ARCs), and Empaneled Law Firms.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Onboard New Institution</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by bank, ARC or law firm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-800 bg-[#0A1526] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
        />
      </div>

      {/* Institutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inst) => (
          <div key={inst.id} className="rounded-2xl border border-slate-800 bg-[#0A1526] p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 border border-rose-900/50 px-2 py-0.5 rounded-md">
                {inst.type}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> {inst.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{inst.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{inst.branches}</p>
            </div>

            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">Stressed Exposure:</span>
              <span className="font-extrabold text-white">{inst.activeNPAs}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to add institution */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0A1526] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Onboard New Financial Institution</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Institution Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank of Baroda (SARG)"
                  value={newInst.name}
                  onChange={(e) => setNewInst({ ...newInst, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Institution Type</label>
                <select
                  value={newInst.type}
                  onChange={(e) => setNewInst({ ...newInst, type: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                >
                  <option value="PSU Commercial Bank">PSU Commercial Bank</option>
                  <option value="Private Commercial Bank">Private Commercial Bank</option>
                  <option value="Asset Reconstruction Company">Asset Reconstruction Company (ARC)</option>
                  <option value="Empaneled Law Firm">Empaneled Law Firm</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Zonal Desks / Jurisdiction</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai Corporate Desk"
                  value={newInst.branches}
                  onChange={(e) => setNewInst({ ...newInst, branches: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white"
                >
                  Save Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}