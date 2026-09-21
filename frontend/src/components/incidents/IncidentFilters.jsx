import React from 'react';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, Calendar } from 'lucide-react';

export default function IncidentFilters({
  search,
  setSearch,
  status,
  setStatus,
  dateFilter,
  setDateFilter,
  confidenceFilter,
  setConfidenceFilter,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="p-4 rounded-xl bg-ocean-card border border-ocean-border shadow-card space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ocean-textMuted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by incident ID, sector, or coordinate..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-ocean-secondary border border-ocean-border text-xs text-ocean-textPrimary placeholder:text-ocean-textMuted focus:outline-none focus:border-ocean-cyan focus:ring-1 focus:ring-ocean-cyan/30 font-sans"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-ocean-secondary border border-ocean-border shrink-0 self-end md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md text-xs font-mono transition-colors ${
              viewMode === 'grid'
                ? 'bg-ocean-cyan/20 text-ocean-cyan border border-ocean-cyan/40 shadow-sm'
                : 'text-ocean-textSecondary hover:text-ocean-textPrimary'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md text-xs font-mono transition-colors ${
              viewMode === 'table'
                ? 'bg-ocean-cyan/20 text-ocean-cyan border border-ocean-cyan/40 shadow-sm'
                : 'text-ocean-textSecondary hover:text-ocean-textPrimary'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-ocean-border/60">
        <div className="flex items-center gap-1.5 text-xs text-ocean-textMuted font-mono mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-ocean-cyan" />
          <span>Filters:</span>
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-2.5 py-1 rounded-lg bg-ocean-secondary border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Under Review">Under Review</option>
          <option value="Resolved">Resolved</option>
          <option value="Demo">Demo</option>
        </select>

        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-2.5 py-1 rounded-lg bg-ocean-secondary border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan cursor-pointer"
        >
          <option value="all">All Dates</option>
          <option value="24h">Past 24 Hours</option>
          <option value="7d">Past 7 Days</option>
          <option value="30d">Past 30 Days</option>
        </select>

        {/* Confidence Filter */}
        <select
          value={confidenceFilter}
          onChange={(e) => setConfidenceFilter(e.target.value)}
          className="px-2.5 py-1 rounded-lg bg-ocean-secondary border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan cursor-pointer"
        >
          <option value="0">All Confidence Levels</option>
          <option value="90">High (&gt;90%)</option>
          <option value="80">Moderate-High (&gt;80%)</option>
          <option value="70">Moderate (&gt;70%)</option>
        </select>

        {/* Reset Filter Button */}
        {(search || status !== 'All' || dateFilter !== 'all' || confidenceFilter !== '0') && (
          <button
            onClick={() => {
              setSearch('');
              setStatus('All');
              setDateFilter('all');
              setConfidenceFilter('0');
            }}
            className="text-[11px] font-mono text-ocean-cyan hover:underline ml-auto"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
