import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  AlertTriangle,
  Waves,
  Ship,
  GitFork,
  Radio,
  RefreshCw,
  Layers,
  Sparkles,
} from 'lucide-react';
import KpiCard from '../components/dashboard/KpiCard';
import MaritimeMap from '../components/dashboard/MaritimeMap';
import IncidentSummary from '../components/dashboard/IncidentSummary';
import CandidateVessels from '../components/dashboard/CandidateVessels';
import RecentIncidents from '../components/dashboard/RecentIncidents';
import SystemStatus from '../components/dashboard/SystemStatus';
import LoadingState from '../components/common/LoadingState';
import { useSpills } from '../hooks/useSpills';
import { useVessels } from '../hooks/useVessels';
import { useCorrelations } from '../hooks/useCorrelations';
import { DEMO_KPIS, REGIONS } from '../services/demoData';

export default function Dashboard() {
  const { selectedRegion } = useOutletContext() || { selectedRegion: 'arabian-sea' };
  const { spills, loading: spillsLoading, error: spillsError, refetch: refetchSpills } = useSpills();
  const { vessels, loading: vesselsLoading } = useVessels();

  const [selectedSpill, setSelectedSpill] = useState(null);

  // Set default selected incident when spills load
  useEffect(() => {
    if (spills.length > 0 && !selectedSpill) {
      setSelectedSpill(spills[0]);
    }
  }, [spills, selectedSpill]);

  // Fetch correlations for currently selected spill
  const { correlations } = useCorrelations(selectedSpill?.id);

  // Determine center coordinates based on selectedRegion
  const currentRegionConfig = REGIONS.find((r) => r.id === selectedRegion) || REGIONS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner / Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-ocean-cyan animate-ping" />
            <span className="text-xs font-mono uppercase text-ocean-cyan font-semibold tracking-wider">
              Surveillance Command Grid
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-ocean-textPrimary font-sans">
            Maritime Operations Center
          </h1>
          <p className="text-xs text-ocean-textSecondary mt-0.5">
            Active monitoring sector: <strong className="text-ocean-textPrimary font-mono">{currentRegionConfig.name}</strong> • Synthetic Aperture Radar (SAR) & AIS Ingestion
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => refetchSpills()}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ocean-card hover:bg-ocean-cardHover border border-ocean-border text-xs font-mono text-ocean-textPrimary transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Refresh Scan</span>
          </button>
        </div>
      </div>

      {/* 4 Compact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title={DEMO_KPIS.activeSpills.label}
          value={DEMO_KPIS.activeSpills.value}
          change={DEMO_KPIS.activeSpills.change}
          trend={DEMO_KPIS.activeSpills.trend}
          icon={AlertTriangle}
          accentColor="red"
        />
        <KpiCard
          title={DEMO_KPIS.totalArea.label}
          value={DEMO_KPIS.totalArea.value}
          change={DEMO_KPIS.totalArea.change}
          trend={DEMO_KPIS.totalArea.trend}
          icon={Waves}
          accentColor="orange"
        />
        <KpiCard
          title={DEMO_KPIS.trackedVessels.label}
          value={DEMO_KPIS.trackedVessels.value}
          change={DEMO_KPIS.trackedVessels.change}
          trend={DEMO_KPIS.trackedVessels.trend}
          icon={Ship}
          accentColor="blue"
        />
        <KpiCard
          title={DEMO_KPIS.candidateCorrelations.label}
          value={DEMO_KPIS.candidateCorrelations.value}
          change={DEMO_KPIS.candidateCorrelations.change}
          trend={DEMO_KPIS.candidateCorrelations.trend}
          icon={GitFork}
          accentColor="cyan"
        />
      </div>

      {/* Main Map & Incident Summary Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Map Section (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 flex flex-col">
          {spillsLoading && !spills.length ? (
            <div className="h-[500px] rounded-xl bg-ocean-card border border-ocean-border flex items-center justify-center">
              <LoadingState message="Initializing geospatial satellite layer..." />
            </div>
          ) : (
            <MaritimeMap
              spills={spills}
              vessels={vessels}
              selectedSpill={selectedSpill}
              onSelectSpill={(spill) => setSelectedSpill(spill)}
              center={selectedSpill ? [selectedSpill.lat, selectedSpill.lng] : currentRegionConfig.center}
              zoom={currentRegionConfig.zoom}
              height="520px"
            />
          )}
        </div>

        {/* Selected Incident Summary Panel */}
        <div className="lg:col-span-1">
          <IncidentSummary incident={selectedSpill} />
        </div>
      </div>

      {/* Candidate Vessels Panel */}
      <CandidateVessels
        correlations={correlations}
        incidentId={selectedSpill?.id}
      />

      {/* Recent Incidents Table & System Status Grid */}
      <div className="grid grid-cols-1 gap-6">
        <RecentIncidents
          incidents={spills}
          loading={spillsLoading}
          error={spillsError}
          onSelectIncident={(inc) => setSelectedSpill(inc)}
          onRetry={refetchSpills}
        />

        <SystemStatus />
      </div>
    </div>
  );
}
