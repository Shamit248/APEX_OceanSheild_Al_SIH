import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, ArrowUpRight, Compass, ShieldAlert, Clock, Satellite } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCoordinates, formatArea, formatDate } from '../../utils/formatters';

export default function IncidentSummary({ incident }) {
  if (!incident) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 rounded-xl bg-ocean-card border border-ocean-border text-center">
        <ShieldAlert className="w-10 h-10 text-ocean-textMuted mb-2" />
        <p className="text-sm font-medium text-ocean-textSecondary">
          Select an incident on the map or list
        </p>
        <span className="text-xs text-ocean-textMuted mt-1">
          Click any radar marker to view operational analysis
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-ocean-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-ocean-cyan tracking-wider">
                ACTIVE INVESTIGATION
              </span>
            </div>
            <h3 className="text-lg font-bold text-ocean-textPrimary font-mono flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-400" />
              {incident.id}
            </h3>
          </div>
          <Badge status={incident.status} />
        </div>

        {/* Core Attributes */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block mb-1">
              Estimated Slick Area
            </span>
            <span className="text-lg font-bold text-red-400 font-mono">
              {formatArea(incident.area)}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block mb-1">
              AI Confidence
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-ocean-cyan font-mono">
                {incident.confidence}%
              </span>
              <span className="text-[10px] text-ocean-textMuted">UNet v2</span>
            </div>
          </div>
        </div>

        {/* Detailed Metadata */}
        <div className="space-y-2.5 text-xs text-ocean-textSecondary mb-4">
          <div className="flex items-start gap-2">
            <Compass className="w-4 h-4 text-ocean-cyan shrink-0 mt-0.5" />
            <div>
              <span className="text-ocean-textPrimary font-medium block">
                {incident.locationName}
              </span>
              <span className="text-[11px] font-mono text-ocean-textMuted">
                {formatCoordinates(incident.lat, incident.lng)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-ocean-textMuted shrink-0" />
            <span>
              Detected: <strong className="text-ocean-textPrimary font-mono">{formatDate(incident.timestamp)}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4 text-ocean-textMuted shrink-0" />
            <span className="truncate">
              Sensor: <strong className="text-ocean-textPrimary">{incident.satelliteSource}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-ocean-border flex items-center justify-between">
        <span className="text-xs text-ocean-textMuted font-mono">
          {incident.candidateVesselsCount} candidate vessels
        </span>
        <Link to={`/incidents/${incident.id}`}>
          <Button variant="primary" size="sm" icon={ArrowUpRight} iconPosition="right">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
