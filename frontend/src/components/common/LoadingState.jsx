import React from 'react';

export default function LoadingState({ message = 'Scanning satellite telemetry...', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="relative w-16 h-16 mb-4">
        {/* Radar sweep background circles */}
        <div className="absolute inset-0 rounded-full border border-ocean-border" />
        <div className="absolute inset-2 rounded-full border border-ocean-cyan/30" />
        <div className="absolute inset-5 rounded-full border border-ocean-cyan/60" />
        <div className="absolute inset-[30px] rounded-full bg-ocean-cyan animate-ping opacity-75" />
        {/* Sweep arm */}
        <div className="absolute inset-0 rounded-full overflow-hidden animate-radar-sweep pointer-events-none">
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-ocean-cyan/40 to-transparent origin-bottom-right" />
        </div>
      </div>
      <p className="text-xs font-mono uppercase tracking-wider text-ocean-cyan animate-pulse">{message}</p>
    </div>
  );
}
