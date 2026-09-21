import React, { useState, useMemo } from 'react';
import { AlertOctagon, Filter, RefreshCw, PlusCircle, Sliders } from 'lucide-react';
import IncidentFilters from '../components/incidents/IncidentFilters';
import IncidentCard from '../components/incidents/IncidentCard';
import IncidentTable from '../components/incidents/IncidentTable';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/common/Button';
import { useSpills } from '../hooks/useSpills';

export default function Incidents() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('0');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [visibleCount, setVisibleCount] = useState(6);

  const { spills, loading, error, refetch } = useSpills();

  // Filter incidents locally based on search, status, and confidence
  const filteredIncidents = useMemo(() => {
    return spills.filter((item) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesLoc = item.locationName.toLowerCase().includes(q);
        const matchesSensor = item.satelliteSource.toLowerCase().includes(q);
        if (!matchesId && !matchesLoc && !matchesSensor) return false;
      }

      // Status
      if (status !== 'All' && item.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }

      // Confidence
      if (confidenceFilter !== '0' && item.confidence < Number(confidenceFilter)) {
        return false;
      }

      return true;
    });
  }, [spills, search, status, confidenceFilter]);

  const displayedIncidents = filteredIncidents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredIncidents.length;

  return (
    <div className="space-y-6">
      {/* Page Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertOctagon className="w-4 h-4 text-red-400" />
            <span className="text-xs font-mono uppercase text-red-400 font-semibold tracking-wider">
              Satellite Anomaly Archive
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-ocean-textPrimary font-sans">
            Oil Spill Incidents Registry
          </h1>
          <p className="text-xs text-ocean-textSecondary mt-0.5">
            Verified SAR & Multi-Spectral slick detections with automated geometric boundaries and confidence metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={RefreshCw} onClick={refetch}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <IncidentFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        confidenceFilter={confidenceFilter}
        setConfidenceFilter={setConfidenceFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-ocean-textMuted font-mono">
        <span>
          Showing {displayedIncidents.length} of {filteredIncidents.length} detected events
        </span>
        {status !== 'All' && (
          <span className="text-ocean-cyan">
            Filter: Status = {status}
          </span>
        )}
      </div>

      {/* Loading, Error, Empty, or Content */}
      {loading ? (
        <LoadingState message="Fetching surveillance incident archive..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : displayedIncidents.length === 0 ? (
        <EmptyState
          title="No matching incidents found"
          description="Try broadening your search query or resetting the status/confidence filters."
          actionLabel="Reset All Filters"
          onAction={() => {
            setSearch('');
            setStatus('All');
            setDateFilter('all');
            setConfidenceFilter('0');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {displayedIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      ) : (
        <IncidentTable incidents={displayedIncidents} />
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-4">
          <Button
            variant="secondary"
            onClick={() => setVisibleCount((prev) => prev + 6)}
          >
            Load More Incidents
          </Button>
        </div>
      )}
    </div>
  );
}
