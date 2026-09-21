import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Eye, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import LoadingState from '../common/LoadingState';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import { formatDate, formatArea } from '../../utils/formatters';

export default function RecentIncidents({
  incidents = [],
  loading = false,
  error = null,
  onSelectIncident,
  onRetry,
}) {
  if (loading) {
    return <LoadingState message="Loading latest incident detections..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!incidents || incidents.length === 0) {
    return <EmptyState title="No recent incidents" description="No spill events recorded in this surveillance period." />;
  }

  return (
    <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-ocean-border">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-ocean-cyan" />
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            Recent Detections
          </h3>
        </div>
        <Link
          to="/incidents"
          className="text-xs font-mono text-ocean-cyan hover:underline inline-flex items-center gap-1"
        >
          View all registry <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-ocean-border text-ocean-textMuted font-mono text-[10px] uppercase tracking-wider">
              <th className="pb-2 font-medium">Incident ID</th>
              <th className="pb-2 font-medium">Date / Time</th>
              <th className="pb-2 font-medium">Location</th>
              <th className="pb-2 font-medium">Est. Area</th>
              <th className="pb-2 font-medium">Confidence</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ocean-border/50">
            {incidents.slice(0, 5).map((inc) => (
              <tr key={inc.id} className="hover:bg-ocean-cardHover/60 transition-colors group">
                <td className="py-2.5 font-mono font-bold text-ocean-textPrimary">
                  {inc.id}
                </td>
                <td className="py-2.5 font-mono text-ocean-textSecondary">
                  {formatDate(inc.timestamp)}
                </td>
                <td className="py-2.5 text-ocean-textPrimary max-w-[200px] truncate">
                  {inc.locationName}
                </td>
                <td className="py-2.5 font-mono text-red-400 font-medium">
                  {formatArea(inc.area)}
                </td>
                <td className="py-2.5">
                  <span className={`font-mono font-bold ${
                    inc.confidence >= 90 ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {inc.confidence}%
                  </span>
                </td>
                <td className="py-2.5">
                  <Badge status={inc.status} size="sm" />
                </td>
                <td className="py-2.5 text-right space-x-2">
                  {onSelectIncident && (
                    <button
                      onClick={() => onSelectIncident(inc)}
                      className="px-2 py-1 rounded bg-ocean-secondary hover:bg-ocean-border text-ocean-cyan text-[11px] font-mono transition-colors"
                      title="Pin on Map"
                    >
                      Locate
                    </button>
                  )}
                  <Link
                    to={`/incidents/${inc.id}`}
                    className="inline-flex items-center px-2 py-1 rounded bg-ocean-secondary hover:bg-ocean-cardHover border border-ocean-border text-ocean-textPrimary text-[11px] transition-colors"
                  >
                    <Eye className="w-3 h-3 mr-1 text-ocean-cyan" />
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
