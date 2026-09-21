import L from 'leaflet';

/**
 * Creates custom glowing radar DivIcon for oil spills
 */
export function createSpillIcon(confidence, isSelected = false) {
  const isHigh = confidence >= 90;
  const colorClass = isHigh ? '#EF4444' : '#F59E0B';
  const glowSize = isSelected ? 32 : 24;

  return L.divIcon({
    className: 'custom-spill-marker',
    html: `
      <div style="position: relative; width: ${glowSize}px; height: ${glowSize}px; display: flex; align-items: center; justify-content: center;">
        <div class="spill-marker-pulse" style="background: ${colorClass}44; width: ${glowSize * 1.8}px; height: ${glowSize * 1.8}px; top: -${glowSize * 0.4}px; left: -${glowSize * 0.4}px;"></div>
        <div style="
          width: ${isSelected ? 18 : 14}px; 
          height: ${isSelected ? 18 : 14}px; 
          border-radius: 50%; 
          background: ${colorClass}; 
          border: 2px solid #FFFFFF; 
          box-shadow: 0 0 12px ${colorClass};
          position: relative;
          z-index: 2;
        "></div>
      </div>
    `,
    iconSize: [glowSize, glowSize],
    iconAnchor: [glowSize / 2, glowSize / 2],
    popupAnchor: [0, -glowSize / 2],
  });
}

/**
 * Creates sleek directional vessel DivIcon
 */
export function createVesselIcon(isCandidate = false, heading = 0, isSelected = false) {
  const color = isCandidate ? '#EF4444' : '#22D3EE';
  const size = isSelected ? 28 : 22;

  return L.divIcon({
    className: 'custom-vessel-marker',
    html: `
      <div style="
        position: relative; 
        width: ${size}px; 
        height: ${size}px; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        transform: rotate(${heading}deg);
      ">
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="#07111F" stroke-width="1.5" style="filter: drop-shadow(0 0 6px ${color}88);">
          <path d="M12 2L19 21L12 17L5 21L12 2Z" />
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}
