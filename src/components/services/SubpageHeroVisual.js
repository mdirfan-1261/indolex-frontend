'use client';

import React, { useState } from 'react';
import { Scale } from 'lucide-react';

export default function SubpageHeroVisual({ imageSrc, title, code }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-72 sm:h-88 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
      {!hasError ? (
        <img
          src={imageSrc}
          alt={title}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#071326] via-[#0A1528] to-[#0D1F3C] text-white space-y-3">
          <div className="h-14 w-14 rounded-2xl bg-[#E05320]/20 text-[#E05320] border border-[#E05320]/30 flex items-center justify-center shadow-lg">
            <Scale className="h-7 w-7" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
            {code} Visual Chamber Slot
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Upload: {imageSrc}
          </span>
        </div>
      )}

      {/* Gradient Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/30 to-transparent pointer-events-none" />

      {/* Top Status Pill */}
      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Statutory Docket Active</span>
      </div>

      {/* Top Right Scale Icon */}
      <div className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-[#E05320] text-white flex items-center justify-center shadow-lg shadow-[#E05320]/30">
        <Scale className="h-4 w-4" />
      </div>

      {/* Bottom Caption Overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E05320] text-white uppercase tracking-wider">
          {code} JURISDICTION
        </span>
        <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-1 leading-snug">
          Judicial Enforceability &amp; Evidence Audit
        </h3>
      </div>
    </div>
  );
}
