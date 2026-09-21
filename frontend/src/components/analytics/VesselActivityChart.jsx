import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="p-2.5 rounded-lg bg-ocean-secondary border border-ocean-border shadow-xl text-xs font-mono">
        <p className="font-bold text-ocean-textPrimary">{data.name}</p>
        <p className="text-ocean-cyan font-bold">
          {data.value} Vessels
        </p>
      </div>
    );
  }
  return null;
}

export default function VesselActivityChart({ data = [] }) {
  return (
    <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-ocean-border">
        <div>
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            Vessel Traffic Density Overview
          </h3>
          <p className="text-[11px] text-ocean-textMuted font-mono">
            Breakdown of monitored transponders by category
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-cyan/15 text-ocean-cyan border border-ocean-cyan/30">
          DEMO DATA
        </span>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(val) => <span className="text-xs text-ocean-textSecondary">{val}</span>}
            />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
              stroke="#07111F"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
