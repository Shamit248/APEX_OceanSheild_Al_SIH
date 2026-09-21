import { useState, useEffect, useCallback } from 'react';
import { getCorrelationsBySpillId } from '../services/api';

export function useCorrelations(spillId) {
  const [correlations, setCorrelations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCorrelations = useCallback(async () => {
    if (!spillId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getCorrelationsBySpillId(spillId);
      setCorrelations(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch vessel correlations');
    } finally {
      setLoading(false);
    }
  }, [spillId]);

  useEffect(() => {
    fetchCorrelations();
  }, [fetchCorrelations]);

  return { correlations, loading, error, refetch: fetchCorrelations };
}
