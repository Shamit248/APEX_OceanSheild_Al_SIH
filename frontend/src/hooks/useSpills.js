import { useState, useEffect, useCallback } from 'react';
import { getSpills, getSpillById } from '../services/api';

export function useSpills(filters = {}) {
  const [spills, setSpills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSpills(filters);
      setSpills(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch spill incidents');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchSpills();
  }, [fetchSpills]);

  return { spills, loading, error, refetch: fetchSpills };
}

export function useSpill(id) {
  const [spill, setSpill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpill = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getSpillById(id);
      setSpill(response.data || null);
    } catch (err) {
      setError(err.message || `Failed to fetch incident ${id}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSpill();
  }, [fetchSpill]);

  return { spill, loading, error, refetch: fetchSpill };
}
