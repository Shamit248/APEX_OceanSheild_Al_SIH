import React, { useState, useMemo } from 'react';
import { Ship, Search, SlidersHorizontal, RefreshCw, Layers } from 'lucide-react';
import VesselMap from '../components/vessels/VesselMap';
import VesselTable from '../components/vessels/VesselTable';
import VesselDetails from '../components/vessels/VesselDetails';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/common/Button';
import { useVessels } from '../hooks/useVessels';

export default function Vessels() {
  const [search, setSearch] = useState('');
  const [mmsiSearch, setMmsiSearch] = useState('');
  const [vesselType, setVesselType] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVessel, setSelectedVessel] = useState(null);

  const { vessels, loading, error, refetch } = useVessels();

  const filteredVessels = useMemo(() => {
    return vessels.filter((v) => {
      if (search) {
        const q = search.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesFlag = (v.flag || '').toLowerCase().includes(q);
        if (!matchesName && !matchesFlag) return false;
      }

      if (mmsiSearch) {
        const q = mmsiSearch.toLowerCase();
        const matchesMmsi = v.mmsi.includes(q);
        const matchesImo = (v.imo || '').includes(q);
        if (!matchesMmsi && !matchesImo) return false;
      }

      if (vesselType !== 'All' && v.type !== vesselType) {
        return false;
      }

      if (statusFilter !== 'All' && v.associationStatus !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [vessels, search, mmsiSearch, vesselType, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Ship className="w-4 h-4 text-ocean-cyan" />
            <span className="text-xs font-mono uppercase text-ocean-cyan font-semibold tracking-wider">
              AIS Traffic Surveillance
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-ocean-textPrimary font-sans">
            Tracked Maritime Vessels
          </h1>
          <p className="text-xs text-ocean-textSecondary mt-0.5">
            Real-time transponder plots, speed/heading vectors, and correlation rankings with active slicks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={RefreshCw} onClick={refetch}>
            Refresh AIS
          </Button>
        </div>
      </div>

      {/* Vessel Filters Toolbar */}
      <div className="p-4 rounded-xl bg-ocean-card border border-ocean-border shadow-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* General Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ocean-textMuted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vessel name or flag..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-ocean-secondary border border-ocean-border text-xs text-ocean-textPrimary placeholder:text-ocean-textMuted focus:outline-none focus:border-ocean-cyan"
            />
          </div>

          {/* MMSI / IMO Search */}
          <div>
            <input
              type="text"
              value={mmsiSearch}
              onChange={(e) => setMmsiSearch(e.target.value)}
              placeholder="Filter by MMSI or IMO..."
              className="w-full px-3 py-2 rounded-lg bg-ocean-secondary border border-ocean-border text-xs text-ocean-textPrimary placeholder:text-ocean-textMuted focus:outline-none focus:border-ocean-cyan font-mono"
            />
          </div>

          {/* Vessel Type Filter */}
          <div>
            <select
              value={vesselType}
              onChange={(e) => setVesselType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-ocean-secondary border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan cursor-pointer"
            >
              <option value="All">All Vessel Types</option>
              <option value="Crude Oil Tanker">Crude Oil Tanker</option>
              <option value="Chemical Tanker">Chemical Tanker</option>
              <option value="LNG Tanker">LNG Tanker</option>
              <option value="Products Tanker">Products Tanker</option>
              <option value="Container Ship">Container Ship</option>
              <option value="Bulk Carrier">Bulk Carrier</option>
              <option value="Offshore Support Vessel">Offshore Support Vessel</option>
            </select>
          </div>

          {/* Association Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-ocean-secondary border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan cursor-pointer"
            >
              <option value="All">All Association Statuses</option>
              <option value="Candidate Vessel">Candidate Vessel (Alert)</option>
              <option value="Monitored">Monitored AIS</option>
              <option value="Clear">Clear / Transiting</option>
            </select>
          </div>
        </div>

        {/* Clear Filters helper */}
        {(search || mmsiSearch || vesselType !== 'All' || statusFilter !== 'All') && (
          <div className="pt-2 border-t border-ocean-border/60 flex justify-end">
            <button
              onClick={() => {
                setSearch('');
                setMmsiSearch('');
                setVesselType('All');
                setStatusFilter('All');
              }}
              className="text-[11px] font-mono text-ocean-cyan hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Vessel Interactive Map */}
      <VesselMap
        vessels={filteredVessels}
        selectedVessel={selectedVessel}
        onSelectVessel={(v) => setSelectedVessel(v)}
        center={[19.2, 70.8]}
        zoom={7}
        height="400px"
      />

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-ocean-textMuted font-mono">
        <span>Displaying {filteredVessels.length} tracked vessels</span>
        <span className="text-amber-400">
          {filteredVessels.filter((v) => v.associationStatus === 'Candidate Vessel').length} Candidate associations
        </span>
      </div>

      {/* Vessel Registry Table */}
      {loading ? (
        <LoadingState message="Connecting to simulated AIS transponder network..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : filteredVessels.length === 0 ? (
        <EmptyState
          title="No vessels found"
          description="No vessels matched the specified MMSI, name, or vessel class filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setMmsiSearch('');
            setVesselType('All');
            setStatusFilter('All');
          }}
        />
      ) : (
        <VesselTable
          vessels={filteredVessels}
          onSelectVessel={(v) => setSelectedVessel(v)}
        />
      )}

      {/* Vessel Profile Drawer */}
      <VesselDetails
        vessel={selectedVessel}
        onClose={() => setSelectedVessel(null)}
      />
    </div>
  );
}
