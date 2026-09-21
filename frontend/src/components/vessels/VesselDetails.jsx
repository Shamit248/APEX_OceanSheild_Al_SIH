import React from 'react';
import { X, Ship, Compass, Navigation, Clock, AlertTriangle, Radio, Activity, ExternalLink } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCoordinates, formatDate, formatSpeed } from '../../utils/formatters';
import { Link } from 'react-router-dom';

export default function VesselDetails({ vessel, onClose }) {
  if (!vessel) return null;

  const isCandidate = vessel.associationStatus === 'Candidate Vessel';

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-ocean-secondary border-l border-ocean-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 border-b border-ocean-border flex items-start justify-between bg-ocean-card/60">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${
            isCandidate ? 'bg-ocean-danger/10 border-ocean-danger/30 text-red-400' : 'bg-ocean-cyan/10 border-ocean-cyan/30 text-ocean-cyan'
          }`}>
            <Ship className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-ocean-textPrimary font-sans">
              {vessel.name}
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-ocean-textMuted">
              <span>MMSI: {vessel.mmsi}</span>
              <span>•</span>
              <span>IMO: {vessel.imo || 'N/A'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-ocean-textSecondary hover:text-ocean-textPrimary hover:bg-ocean-card"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5">
        {/* Status Badge */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-card border border-ocean-border">
          <span className="text-xs font-mono text-ocean-textMuted uppercase">
            Association Status
          </span>
          <Badge status={vessel.associationStatus} />
        </div>

        {/* Telemetry Metrics */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-ocean-textMuted mb-2">
            Live AIS Telemetry
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-ocean-card border border-ocean-border">
              <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">Current Speed</span>
              <span className="text-sm font-bold font-mono text-ocean-textPrimary">{formatSpeed(vessel.speed)}</span>
            </div>
            <div className="p-3 rounded-lg bg-ocean-card border border-ocean-border">
              <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">Heading Course</span>
              <span className="text-sm font-bold font-mono text-ocean-cyan">{vessel.heading}° True</span>
            </div>
            <div className="p-3 rounded-lg bg-ocean-card border border-ocean-border">
              <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">Vessel Type</span>
              <span className="text-xs font-medium text-ocean-textPrimary truncate block">{vessel.type}</span>
            </div>
            <div className="p-3 rounded-lg bg-ocean-card border border-ocean-border">
              <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">Flag State</span>
              <span className="text-xs font-mono text-ocean-textSecondary">{vessel.flag || 'International'}</span>
            </div>
          </div>
        </div>

        {/* Position & Time */}
        <div className="p-3 rounded-lg bg-ocean-card border border-ocean-border space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-ocean-textMuted">Position:</span>
            <span className="font-mono text-ocean-textPrimary">{formatCoordinates(vessel.lat, vessel.lng)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ocean-textMuted">Last Ping:</span>
            <span className="font-mono text-ocean-textSecondary">{formatDate(vessel.lastUpdate)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ocean-textMuted">Destination:</span>
            <span className="text-ocean-textPrimary font-medium">{vessel.destination || 'Unspecified'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ocean-textMuted">Estimated Arrival:</span>
            <span className="font-mono text-ocean-textSecondary">{vessel.eta || 'N/A'}</span>
          </div>
        </div>

        {/* Related Incidents */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-ocean-textMuted mb-2">
            Related Incidents
          </h4>
          {vessel.relatedIncidentId ? (
            <div className="p-3 rounded-lg bg-ocean-danger/10 border border-ocean-danger/30 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold font-mono text-xs text-red-400 mb-0.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{vessel.relatedIncidentId}</span>
                </div>
                <p className="text-[11px] text-ocean-textSecondary">
                  Distance: {vessel.distanceFromIncident} nm • Correlation: {vessel.correlationScore}%
                </p>
              </div>
              <Link to={`/incidents/${vessel.relatedIncidentId}`}>
                <Button variant="outline" size="sm">
                  View Spill
                </Button>
              </Link>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-ocean-card border border-ocean-border text-xs text-ocean-textMuted text-center">
              No correlated spill incidents in the current surveillance sector.
            </div>
          )}
        </div>

        {/* Track History Placeholder */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-ocean-textMuted mb-2">
            Historical AIS Trajectory
          </h4>
          <div className="p-6 rounded-xl bg-ocean-main/60 border border-dashed border-ocean-border text-center flex flex-col items-center justify-center">
            <Activity className="w-8 h-8 text-ocean-textMuted mb-2 animate-pulse" />
            <p className="text-xs font-medium text-ocean-textPrimary mb-1">
              Trajectory data will be available after backend integration.
            </p>
            <p className="text-[11px] text-ocean-textMuted max-w-xs">
              Historical voyage waypoints, back-projections, and drift models will stream from FastAPI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
