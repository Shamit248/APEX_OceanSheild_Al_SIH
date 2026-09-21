import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-2.5 rounded-lg bg-ocean-secondary border border-ocean-border shadow-xl text-xs font-mono">
        <p className="font-bold text-ocean-cyan mb-1">{label}</p>
        <p className="text-ocean-textPrimary">
          Spill Events: <span className="font-bold text-red-400">{payload[0].value}</span>
        </p>
        {payload[1] && (
          <p className="text-ocean-textSecondary">
            Area Impact: <span className="font-bold text-amber-400">{payload[1].value} km²</span>
          </p>
        )}
      </div>
    );
  }
  return null;
}

export default function IncidentTrendChart({ data = [] }) {
  return (
    <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-ocean-border">
        <div>
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            Oil-Spill Detections Over Time
          </h3>
          <p className="text-[11px] text-ocean-textMuted font-mono">
            Daily frequency & cumulative slick footprint (km²)
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-cyan/15 text-ocean-cyan border border-ocean-cyan/30">
          DEMO DATA
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1D3A56" opacity={0.5} vertical={false} />
            <XAxis dataKey="date" stroke="#526D86" fontSize={11} tickLine={false} />
            <YAxis stroke="#526D86" fontSize={11} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#EF4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#incidentGradient)"
            />
            <Area
              type="monotone"
              dataKey="area"
              stroke="#22D3EE"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#areaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
