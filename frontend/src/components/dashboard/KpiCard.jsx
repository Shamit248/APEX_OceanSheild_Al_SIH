import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KpiCard({
  title,
  value,
  change,
  trend = 'neutral',
  status = 'normal',
  icon: Icon,
  accentColor = 'cyan', // 'cyan', 'red', 'orange', 'blue'
}) {
  const accentBorder = {
    cyan: 'border-l-ocean-cyan hover:border-ocean-cyan/60',
    red: 'border-l-ocean-danger hover:border-ocean-danger/60',
    orange: 'border-l-ocean-warning hover:border-ocean-warning/60',
    blue: 'border-l-ocean-blue hover:border-ocean-blue/60',
  }[accentColor] || 'border-l-ocean-cyan';

  const iconColor = {
    cyan: 'text-ocean-cyan bg-ocean-cyan/10 border-ocean-cyan/20',
    red: 'text-red-400 bg-ocean-danger/10 border-ocean-danger/20',
    orange: 'text-amber-400 bg-ocean-warning/10 border-ocean-warning/20',
    blue: 'text-blue-400 bg-ocean-blue/10 border-ocean-blue/20',
  }[accentColor] || 'text-ocean-cyan bg-ocean-cyan/10';

  return (
    <div
      className={`
        relative p-4 rounded-xl bg-ocean-card border border-ocean-border border-l-4 ${accentBorder}
        shadow-card hover:shadow-card-hover transition-all duration-300 group
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-ocean-textSecondary">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${iconColor} transition-transform group-hover:scale-110`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl lg:text-3xl font-bold font-sans tracking-tight text-ocean-textPrimary">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-ocean-warning" />}
        {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-ocean-green" />}
        {trend === 'neutral' && <Minus className="w-3.5 h-3.5 text-ocean-textMuted" />}
        <span className="text-ocean-textSecondary font-mono text-[11px] truncate">
          {change}
        </span>
      </div>
    </div>
  );
}
