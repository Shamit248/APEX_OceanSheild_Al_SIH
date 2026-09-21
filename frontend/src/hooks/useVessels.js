import { useState, useEffect, useCallback } from 'react';
import { getVessels, getVesselByMmsi } from '../services/api';

export function useVessels(filters = {}) {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVessels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getVessels(filters);
      setVessels(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch vessels');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchVessels();
  }, [fetchVessels]);

  return { vessels, loading, error, refetch: fetchVessels };
}

export function useVessel(mmsi) {
  const [vessel, setVessel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVessel = useCallback(async () => {
    if (!mmsi) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getVesselByMmsi(mmsi);
      setVessel(response.data || null);
    } catch (err) {
      setError(err.message || `Failed to fetch vessel MMSI ${mmsi}`);
    } finally {
      setLoading(false);
    }
  }, [mmsi]);

  useEffect(() => {
    fetchVessel();
  }, [fetchVessel]);

  return { vessel, loading, error, refetch: fetchVessel };
}
