import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowUpRight } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate, formatArea, formatCoordinates } from '../../utils/formatters';

export default function IncidentTable({ incidents = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ocean-border bg-ocean-card shadow-card">
      <table className="w-full text-left text-xs">
        <thead className="bg-ocean-secondary/80 border-b border-ocean-border font-mono text-[11px] text-ocean-textMuted uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4 font-semibold">Incident ID</th>
            <th className="py-3 px-4 font-semibold">Detection Time (UTC)</th>
            <th className="py-3 px-4 font-semibold">Location / Sector</th>
            <th className="py-3 px-4 font-semibold">Coordinates</th>
            <th className="py-3 px-4 font-semibold">Est. Area</th>
            <th className="py-3 px-4 font-semibold">Confidence</th>
            <th className="py-3 px-4 font-semibold">Status</th>
            <th className="py-3 px-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ocean-border/60">
          {incidents.map((inc) => (
            <tr key={inc.id} className="hover:bg-ocean-cardHover/60 transition-colors group">
              <td className="py-3 px-4 font-mono font-bold text-ocean-textPrimary">
                {inc.id}
              </td>
              <td className="py-3 px-4 font-mono text-ocean-textSecondary">
                {formatDate(inc.timestamp)}
              </td>
              <td className="py-3 px-4 text-ocean-textPrimary font-medium max-w-[220px] truncate">
                {inc.locationName}
              </td>
              <td className="py-3 px-4 font-mono text-[11px] text-ocean-textMuted">
                {formatCoordinates(inc.lat, inc.lng, 'decimal')}
              </td>
              <td className="py-3 px-4 font-mono font-bold text-red-400">
                {formatArea(inc.area)}
              </td>
              <td className="py-3 px-4">
                <span className={`font-mono font-bold ${
                  inc.confidence >= 90 ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {inc.confidence}%
                </span>
              </td>
              <td className="py-3 px-4">
                <Badge status={inc.status} size="sm" />
              </td>
              <td className="py-3 px-4 text-right">
                <Link
                  to={`/incidents/${inc.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-ocean-secondary hover:bg-ocean-border text-ocean-cyan font-mono text-[11px] transition-colors"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
