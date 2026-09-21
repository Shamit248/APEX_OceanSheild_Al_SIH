import React from 'react';
import { Database } from 'lucide-react';

export default function DemoBadge({ className = '', text = 'DEMO MODE' }) {
  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ocean-warning/15 border border-ocean-warning/40 text-amber-400 text-xs font-mono font-medium tracking-wide shadow-sm ${className}`}
      title="Currently running with simulated maritime satellite and AIS dataset"
    >
      <Database className="w-3.5 h-3.5 animate-pulse" />
      <span>{text}</span>
    </div>
  );
}
