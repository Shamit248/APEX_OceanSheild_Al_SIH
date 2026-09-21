import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  Info,
  Layers,
  Filter,
  RefreshCw,
} from 'lucide-react';
import IncidentTrendChart from '../components/analytics/IncidentTrendChart';
import SpillAreaChart from '../components/analytics/SpillAreaChart';
import CorrelationChart from '../components/analytics/CorrelationChart';
import VesselActivityChart from '../components/analytics/VesselActivityChart';
import Button from '../components/common/Button';
import LoadingState from '../components/common/LoadingState';
import { getAnalyticsData } from '../services/api';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [regionFilter, setRegionFilter] = useState('all');

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await getAnalyticsData();
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange, regionFilter]);

  return (
    <div className="space-y-6">
      {/* Header & Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-ocean-cyan" />
            <span className="text-xs font-mono uppercase text-ocean-cyan font-semibold tracking-wider">
              Surveillance Intelligence
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-ocean-textPrimary font-sans">
            Operations & Anomaly Analytics
          </h1>
          <p className="text-xs text-ocean-textSecondary mt-0.5">
            Aggregated spatio-temporal trends, surface slick distributions, and candidate vessel correlations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => alert('Data export (CSV / GeoJSON) scheduled for backend release.')}
          >
            Export Metrics
          </Button>
        </div>
      </div>

      {/* Mandatory Demo Data Notice Banner */}
      <div className="p-3.5 rounded-xl bg-ocean-warning/10 border border-ocean-warning/30 flex items-start gap-3 text-xs text-ocean-textPrimary">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-amber-400 font-mono">
            DEMO DATA NOTICE — INTERFACE EVALUATION ONLY
          </span>
          <p className="text-ocean-textSecondary">
            The charts and metrics displayed below represent simulated patterns for UI verification. They do not constitute actual real-world operational statistics.
          </p>
        </div>
      </div>

      {/* Analytics Toolbar / Filters */}
      <div className="p-4 rounded-xl bg-ocean-card border border-ocean-border flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-ocean-textMuted">
            <Calendar className="w-3.5 h-3.5 text-ocean-cyan" />
            <span>Time Window:</span>
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-ocean-secondary border border-ocean-border">
            {[
              { id: '24h', label: '24 Hours' },
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '90d', label: '90 Days' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeRange(tab.id)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                  timeRange === tab.id
                    ? 'bg-ocean-cyan/20 text-ocean-cyan border border-ocean-cyan/40 shadow-sm'
                    : 'text-ocean-textSecondary hover:text-ocean-textPrimary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-ocean-secondary border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan cursor-pointer"
          >
            <option value="all">All Surveillance Sectors</option>
            <option value="arabian">Arabian Sea Sector</option>
            <option value="hormuz">Strait of Hormuz</option>
            <option value="persian">Persian Gulf</option>
          </select>
        </div>

        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center gap-1.5 text-ocean-cyan hover:underline font-mono text-[11px]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Charts Grid */}
      {loading || !data ? (
        <LoadingState message="Synthesizing surveillance trend telemetry..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncidentTrendChart data={data.detectionsOverTime} />
          <SpillAreaChart data={data.areaDistribution} />
          <CorrelationChart data={data.correlationDistribution} />
          <VesselActivityChart data={data.vesselTypes} />
        </div>
      )}
    </div>
  );
}
