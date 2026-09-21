import React from 'react';
import { Ship, Eye, Compass, Flag } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCoordinates, formatDate, formatSpeed } from '../../utils/formatters';

export default function VesselTable({ vessels = [], onSelectVessel }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ocean-border bg-ocean-card shadow-card">
      <table className="w-full text-left text-xs">
        <thead className="bg-ocean-secondary/80 border-b border-ocean-border font-mono text-[11px] text-ocean-textMuted uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4 font-semibold">Vessel Name</th>
            <th className="py-3 px-4 font-semibold">MMSI / IMO</th>
            <th className="py-3 px-4 font-semibold">Vessel Type</th>
            <th className="py-3 px-4 font-semibold">Flag State</th>
            <th className="py-3 px-4 font-semibold">Coordinates</th>
            <th className="py-3 px-4 font-semibold">Speed & Course</th>
            <th className="py-3 px-4 font-semibold">Last Reported</th>
            <th className="py-3 px-4 font-semibold">Association Status</th>
            <th className="py-3 px-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ocean-border/60">
          {vessels.map((v) => {
            const isCandidate = v.associationStatus === 'Candidate Vessel';
            return (
              <tr key={v.id || v.mmsi} className="hover:bg-ocean-cardHover/60 transition-colors group">
                <td className="py-3 px-4 font-semibold text-ocean-textPrimary font-sans">
                  <div className="flex items-center gap-2">
                    <Ship className={`w-4 h-4 ${isCandidate ? 'text-red-400' : 'text-ocean-cyan'}`} />
                    <span className="truncate">{v.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-ocean-textSecondary">
                  <div>{v.mmsi}</div>
                  <div className="text-[10px] text-ocean-textMuted">IMO: {v.imo || 'N/A'}</div>
                </td>
                <td className="py-3 px-4 text-ocean-textSecondary">
                  {v.type}
                </td>
                <td className="py-3 px-4 text-ocean-textMuted font-mono">
                  {v.flag || 'International'}
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-ocean-textSecondary">
                  {formatCoordinates(v.lat, v.lng, 'decimal')}
                </td>
                <td className="py-3 px-4 font-mono text-ocean-textPrimary">
                  {formatSpeed(v.speed)} • {v.heading}°
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-ocean-textMuted">
                  {formatDate(v.lastUpdate)}
                </td>
                <td className="py-3 px-4">
                  <Badge status={v.associationStatus} size="sm" />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onSelectVessel(v)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-ocean-secondary hover:bg-ocean-border text-ocean-cyan font-mono text-[11px] transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Profile</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
