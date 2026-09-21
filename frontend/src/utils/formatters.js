/**
 * Formatting helpers for OceanShield AI maritime dashboard
 */

export function formatCoordinates(lat, lng, format = 'dms') {
  if (lat === undefined || lng === undefined) return 'N/A';

  if (format === 'decimal') {
    return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
  }

  const toDms = (val, isLat) => {
    const absVal = Math.abs(val);
    const degrees = Math.floor(absVal);
    const minutes = Math.floor((absVal - degrees) * 60);
    const seconds = ((absVal - degrees - minutes / 60) * 3600).toFixed(1);
    const direction = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
    return `${degrees}°${minutes}'${seconds}" ${direction}`;
  };

  return `${toDms(lat, true)}, ${toDms(lng, false)}`;
}

export function formatArea(km2) {
  if (km2 === undefined || km2 === null) return '0.0 km²';
  return `${Number(km2).toFixed(1)} km²`;
}

export function formatDistance(nm) {
  if (nm === undefined || nm === null) return 'N/A';
  return `${Number(nm).toFixed(1)} nm`;
}

export function formatSpeed(knots) {
  if (knots === undefined || knots === null) return '0.0 kn';
  return `${Number(knots).toFixed(1)} kn`;
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    }) + ' UTC';
  } catch (e) {
    return dateString;
  }
}

export function getStatusStyle(status) {
  switch ((status || '').toLowerCase()) {
    case 'active':
      return {
        bg: 'bg-ocean-danger/15',
        text: 'text-red-400',
        border: 'border-ocean-danger/30',
        dot: 'bg-ocean-danger animate-ping',
      };
    case 'under review':
    case 'under assessment':
      return {
        bg: 'bg-ocean-warning/15',
        text: 'text-amber-400',
        border: 'border-ocean-warning/30',
        dot: 'bg-ocean-warning',
      };
    case 'resolved':
    case 'clear':
      return {
        bg: 'bg-ocean-green/15',
        text: 'text-emerald-400',
        border: 'border-ocean-green/30',
        dot: 'bg-ocean-green',
      };
    case 'high association':
      return {
        bg: 'bg-ocean-danger/15',
        text: 'text-red-400',
        border: 'border-ocean-danger/40',
        dot: 'bg-ocean-danger',
      };
    case 'moderate association':
      return {
        bg: 'bg-ocean-warning/15',
        text: 'text-amber-400',
        border: 'border-ocean-warning/40',
        dot: 'bg-ocean-warning',
      };
    case 'demo':
    default:
      return {
        bg: 'bg-ocean-cyan/15',
        text: 'text-ocean-cyan',
        border: 'border-ocean-cyan/30',
        dot: 'bg-ocean-cyan',
      };
  }
}
