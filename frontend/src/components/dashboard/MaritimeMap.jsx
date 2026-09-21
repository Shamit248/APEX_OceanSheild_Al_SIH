import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { createSpillIcon, createVesselIcon } from '../../utils/mapUtils';
import { formatCoordinates, formatArea, formatSpeed } from '../../utils/formatters';
import { Shield, Ship, AlertTriangle, Layers, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

// Controller to fly or recenter map when selected incident or region center changes
function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.flyTo(center, zoom || map.getZoom(), { duration: 1.2 });
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }
  }, [center, zoom, map]);
  return null;
}

export default function MaritimeMap({
  spills = [],
  vessels = [],
  selectedSpill,
  onSelectSpill,
  center = [19.2, 70.8],
  zoom = 7,
  height = '500px',
  showLegend = true,
}) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-ocean-border shadow-card bg-ocean-secondary" style={{ height }}>
      {/* Top Map Status Overlay */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-ocean-secondary/90 border border-ocean-border/80 text-ocean-textPrimary text-xs font-mono backdrop-blur-md shadow-lg pointer-events-auto">
          <Layers className="w-3.5 h-3.5 text-ocean-cyan" />
          <span>RADAR & SATELLITE OVERLAY</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ocean-warning/20 border border-ocean-warning/40 text-amber-400 text-[11px] font-mono backdrop-blur-md shadow-lg pointer-events-auto">
          <Info className="w-3.5 h-3.5" />
          <span>DEMO DATA: Simulated Coordinates</span>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        attributionControl={true}
      >
        <MapRecenter center={center} zoom={zoom} />

        {/* CartoDB Dark Matter dark tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> contributors'
          maxZoom={18}
          subdomains="abcd"
        />

        {/* Render Spills */}
        {spills.map((spill) => {
          const isSelected = selectedSpill?.id === spill.id;
          return (
            <React.Fragment key={spill.id}>
              {/* Approximate spill surface area circle */}
              <Circle
                center={[spill.lat, spill.lng]}
                radius={(Math.sqrt(spill.area) * 1000) / 1.5}
                pathOptions={{
                  color: spill.confidence >= 90 ? '#EF4444' : '#F59E0B',
                  fillColor: spill.confidence >= 90 ? '#EF4444' : '#F59E0B',
                  fillOpacity: isSelected ? 0.35 : 0.2,
                  weight: isSelected ? 2 : 1.5,
                  dashArray: '4, 4',
                }}
              />

              {/* Center Marker */}
              <Marker
                position={[spill.lat, spill.lng]}
                icon={createSpillIcon(spill.confidence, isSelected)}
                eventHandlers={{
                  click: () => onSelectSpill?.(spill),
                }}
              >
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-ocean-border pb-1">
                      <span className="font-mono font-bold text-xs text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {spill.id}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ocean-danger/20 text-red-400">
                        {spill.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-ocean-textSecondary mb-3">
                      <div><strong className="text-ocean-textPrimary">Area:</strong> {formatArea(spill.area)}</div>
                      <div><strong className="text-ocean-textPrimary">Confidence:</strong> {spill.confidence}%</div>
                      <div><strong className="text-ocean-textPrimary">Coords:</strong> {formatCoordinates(spill.lat, spill.lng)}</div>
                      <div><strong className="text-ocean-textPrimary">Sensor:</strong> {spill.satelliteSource?.split('(')[0]}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectSpill?.(spill)}
                        className="flex-1 py-1 text-center rounded bg-ocean-card hover:bg-ocean-cardHover border border-ocean-border text-[11px] font-mono text-ocean-cyan"
                      >
                        Inspect Anomaly
                      </button>
                      <Link
                        to={`/incidents/${spill.id}`}
                        className="px-2 py-1 rounded bg-ocean-cyan text-ocean-main font-semibold text-[11px] hover:bg-cyan-300"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}

        {/* Render Vessels */}
        {vessels.map((vessel) => {
          const isCandidate = vessel.associationStatus === 'Candidate Vessel';
          return (
            <Marker
              key={vessel.id || vessel.mmsi}
              position={[vessel.lat, vessel.lng]}
              icon={createVesselIcon(isCandidate, vessel.heading || 0)}
            >
              <Popup>
                <div className="p-1 min-w-[190px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-ocean-border pb-1">
                    <span className="font-sans font-bold text-xs text-ocean-cyan flex items-center gap-1">
                      <Ship className="w-3.5 h-3.5" />
                      {vessel.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isCandidate ? 'bg-ocean-danger/20 text-red-400' : 'bg-ocean-cyan/20 text-ocean-cyan'
                    }`}>
                      {vessel.associationStatus}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-ocean-textSecondary mb-2">
                    <div><strong className="text-ocean-textPrimary">MMSI:</strong> {vessel.mmsi}</div>
                    <div><strong className="text-ocean-textPrimary">Type:</strong> {vessel.type}</div>
                    <div><strong className="text-ocean-textPrimary">Speed:</strong> {formatSpeed(vessel.speed)}</div>
                    <div><strong className="text-ocean-textPrimary">Course:</strong> {vessel.heading}°</div>
                    {vessel.correlationScore && (
                      <div><strong className="text-ocean-textPrimary">Correlation:</strong> <span className="text-amber-400 font-mono font-bold">{vessel.correlationScore}%</span></div>
                    )}
                  </div>
                  <div className="text-[10px] text-ocean-textMuted font-mono">
                    Destination: {vessel.destination || 'Unspecified'}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      {showLegend && (
        <div className="absolute bottom-4 right-4 z-[1000] p-3 rounded-lg bg-ocean-secondary/95 border border-ocean-border/80 backdrop-blur-md shadow-2xl text-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ocean-textMuted mb-2 pb-1 border-b border-ocean-border">
            Surveillance Legend
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-ocean-danger shadow-glow-red" />
              <span className="text-ocean-textSecondary">High-Confidence Spill (≥90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-ocean-warning" />
              <span className="text-ocean-textSecondary">Moderate Anomaly (&lt;90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-dashed border-ocean-danger rounded-full" />
              <span className="text-ocean-textSecondary">Approx. Slick Perimeter</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#EF4444">
                <path d="M12 2L19 21L12 17L5 21L12 2Z" />
              </svg>
              <span className="text-ocean-textSecondary">Candidate Vessel</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#22D3EE">
                <path d="M12 2L19 21L12 17L5 21L12 2Z" />
              </svg>
              <span className="text-ocean-textSecondary">Monitored AIS Vessel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
