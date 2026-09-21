import React from 'react';
import { Ship, ShieldAlert, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';
import { Link } from 'react-router-dom';
import { formatDistance } from '../../utils/formatters';

export default function CandidateVessels({ correlations = [], incidentId }) {
  if (!correlations || correlations.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-ocean-card border border-ocean-border text-center">
        <Ship className="w-8 h-8 text-ocean-textMuted mx-auto mb-2" />
        <p className="text-xs text-ocean-textSecondary">
          No candidate vessels correlated for this incident yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-ocean-border">
        <div className="flex items-center gap-2">
          <Ship className="w-4 h-4 text-ocean-cyan" />
          <h3 className="text-sm font-semibold text-ocean-textPrimary font-sans">
            Candidate Vessels (Potential Association)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-ocean-textMuted">
          Correlated to {incidentId || 'Incident'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-ocean-border text-ocean-textMuted font-mono text-[10px] uppercase tracking-wider">
              <th className="pb-2 font-medium">Vessel Name</th>
              <th className="pb-2 font-medium">MMSI</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Distance</th>
              <th className="pb-2 font-medium">Correlation Score</th>
              <th className="pb-2 font-medium">Association Status</th>
              <th className="pb-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ocean-border/60">
            {correlations.map((c) => (
              <tr key={c.vesselId || c.mmsi} className="hover:bg-ocean-cardHover/60 transition-colors group">
                <td className="py-2.5 font-semibold text-ocean-textPrimary font-sans">
                  {c.vesselName}
                </td>
                <td className="py-2.5 font-mono text-ocean-textSecondary">
                  {c.mmsi}
                </td>
                <td className="py-2.5 text-ocean-textSecondary">
                  {c.vesselType}
                </td>
                <td className="py-2.5 font-mono text-ocean-textPrimary">
                  {formatDistance(c.distanceNm)}
                </td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 rounded-full bg-ocean-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          c.correlationScore >= 80 ? 'bg-red-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${c.correlationScore}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-xs text-ocean-textPrimary">
                      {c.correlationScore}%
                    </span>
                  </div>
                </td>
                <td className="py-2.5">
                  <Badge status={c.associationStatus} size="sm" />
                </td>
                <td className="py-2.5 text-right">
                  <Link
                    to={`/vessels`}
                    className="inline-flex items-center text-ocean-cyan hover:text-cyan-300 font-mono text-[11px] gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-2 border-t border-ocean-border/60 flex items-center justify-between text-[11px] text-ocean-textMuted">
        <span className="italic">
          * Correlation scores indicate spatio-temporal proximity and drift intersection, not legal liability.
        </span>
      </div>
    </div>
  );
}
