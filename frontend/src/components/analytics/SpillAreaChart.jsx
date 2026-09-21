import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-2.5 rounded-lg bg-ocean-secondary border border-ocean-border shadow-xl text-xs font-mono">
        <p className="font-bold text-ocean-cyan mb-1">{label}</p>
        <p className="text-ocean-textPrimary">
          Recorded Detections: <span className="font-bold text-amber-400">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}

const BAR_COLORS = ['#22D3EE', '#3B82F6', '#F59E0B', '#EF4444', '#DC2626'];

export default function SpillAreaChart({ data = [] }) {
  return (
    <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-ocean-border">
        <div>
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            Spill Area Distribution
          </h3>
          <p className="text-[11px] text-ocean-textMuted font-mono">
            Categorized by slick surface footprint
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-warning/15 text-amber-400 border border-ocean-warning/30">
          DEMO DATA
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1D3A56" opacity={0.5} vertical={false} />
            <XAxis dataKey="range" stroke="#526D86" fontSize={11} tickLine={false} />
            <YAxis stroke="#526D86" fontSize={11} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
