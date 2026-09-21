import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { createVesselIcon } from '../../utils/mapUtils';
import { formatCoordinates, formatSpeed } from '../../utils/formatters';
import { Ship, Info } from 'lucide-react';

export default function VesselMap({
  vessels = [],
  selectedVessel,
  onSelectVessel,
  center = [19.2, 70.8],
  zoom = 7,
  height = '420px',
}) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-ocean-border shadow-card bg-ocean-secondary" style={{ height }}>
      {/* Overlay header */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-ocean-secondary/90 border border-ocean-border/80 text-ocean-textPrimary text-xs font-mono backdrop-blur-md shadow-lg pointer-events-auto">
          <Ship className="w-3.5 h-3.5 text-ocean-cyan" />
          <span>REAL-TIME AIS MARITIME PLOT (SIMULATED)</span>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> contributors'
          maxZoom={18}
          subdomains="abcd"
        />

        {vessels.map((v) => {
          const isCandidate = v.associationStatus === 'Candidate Vessel';
          const isSelected = selectedVessel?.mmsi === v.mmsi;
          return (
            <Marker
              key={v.id || v.mmsi}
              position={[v.lat, v.lng]}
              icon={createVesselIcon(isCandidate, v.heading || 0, isSelected)}
              eventHandlers={{
                click: () => onSelectVessel?.(v),
              }}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-ocean-border pb-1">
                    <span className="font-bold text-xs text-ocean-cyan flex items-center gap-1">
                      <Ship className="w-3.5 h-3.5" />
                      {v.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isCandidate ? 'bg-ocean-danger/20 text-red-400' : 'bg-ocean-cyan/20 text-ocean-cyan'
                    }`}>
                      {v.associationStatus}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-ocean-textSecondary mb-2">
                    <div><strong className="text-ocean-textPrimary">MMSI:</strong> {v.mmsi}</div>
                    <div><strong className="text-ocean-textPrimary">Type:</strong> {v.type}</div>
                    <div><strong className="text-ocean-textPrimary">Speed:</strong> {formatSpeed(v.speed)}</div>
                    <div><strong className="text-ocean-textPrimary">Heading:</strong> {v.heading}°</div>
                    <div><strong className="text-ocean-textPrimary">Coords:</strong> {formatCoordinates(v.lat, v.lng)}</div>
                  </div>

                  <button
                    onClick={() => onSelectVessel?.(v)}
                    className="w-full py-1 text-center rounded bg-ocean-cyan hover:bg-cyan-300 text-ocean-main font-semibold text-[11px] transition-colors"
                  >
                    View Vessel Profile
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
