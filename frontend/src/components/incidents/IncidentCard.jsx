import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, Calendar, MapPin, ArrowRight, ShieldCheck, Waves } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCoordinates, formatArea, formatDate } from '../../utils/formatters';

export default function IncidentCard({ incident }) {
  const isHighConfidence = incident.confidence >= 90;

  return (
    <div className="flex flex-col justify-between p-5 rounded-xl bg-ocean-card border border-ocean-border hover:border-ocean-cyan/50 shadow-card hover:shadow-card-hover transition-all duration-300 group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-ocean-danger/10 border border-ocean-danger/30 text-red-400 group-hover:scale-105 transition-transform">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-ocean-textPrimary">
                {incident.id}
              </h3>
              <span className="text-[10px] font-mono text-ocean-textMuted">
                {formatDate(incident.timestamp)}
              </span>
            </div>
          </div>
          <Badge status={incident.status} />
        </div>

        {/* Location */}
        <div className="mb-4">
          <p className="text-xs font-medium text-ocean-textPrimary flex items-center gap-1.5 mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-ocean-cyan shrink-0" />
            <span className="truncate">{incident.locationName}</span>
          </p>
          <span className="text-[11px] font-mono text-ocean-textMuted block pl-5">
            {formatCoordinates(incident.lat, incident.lng)}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60 mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">
              Estimated Area
            </span>
            <span className="font-mono font-bold text-sm text-red-400">
              {formatArea(incident.area)}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">
              Confidence Score
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex-1 h-1.5 rounded-full bg-ocean-main overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isHighConfidence ? 'bg-red-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${incident.confidence}%` }}
                />
              </div>
              <span className="font-mono font-bold text-xs text-ocean-textPrimary">
                {incident.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Sensor & Candidates summary */}
        <div className="flex items-center justify-between text-[11px] font-mono text-ocean-textSecondary mb-2">
          <span className="truncate max-w-[180px]" title={incident.satelliteSource}>
            {incident.satelliteSource?.split('(')[0]}
          </span>
          <span className="text-ocean-cyan">
            {incident.candidateVesselsCount} candidates
          </span>
        </div>
      </div>

      {/* Action footer */}
      <div className="pt-3 border-t border-ocean-border/60 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-ocean-textMuted">
          SAR AI Verified
        </span>
        <Link
          to={`/incidents/${incident.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ocean-cyan/10 hover:bg-ocean-cyan text-ocean-cyan hover:text-ocean-main border border-ocean-cyan/30 text-xs font-medium transition-all group-hover:shadow-glow-cyan"
        >
          <span>Investigate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
