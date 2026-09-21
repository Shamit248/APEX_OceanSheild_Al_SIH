import axios from 'axios';
import {
  DEMO_INCIDENTS,
  DEMO_VESSELS,
  DEMO_CORRELATIONS,
  DEMO_KPIS,
  DEMO_SYSTEM_STATUS,
  DEMO_ANALYTICS,
} from './demoData';

// Configuration: API base URL with fallback to local development
const API_BASE_URL = localStorage.getItem('oceanshield_api_url') || 'http://localhost:8000/api/v1';
const IS_DEMO_MODE = localStorage.getItem('oceanshield_demo_mode') !== 'false';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to simulate minor network latency for realistic UX feel
const simulateLatency = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch list of oil spill incidents with optional filtering
 */
export async function getSpills(filters = {}) {
  if (IS_DEMO_MODE) {
    await simulateLatency(200);
    let results = [...DEMO_INCIDENTS];

    if (filters.status && filters.status !== 'All') {
      results = results.filter(item => item.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(item => 
        item.id.toLowerCase().includes(q) || 
        item.locationName.toLowerCase().includes(q)
      );
    }
    if (filters.minConfidence) {
      results = results.filter(item => item.confidence >= Number(filters.minConfidence));
    }

    return { data: results, count: results.length, demoMode: true };
  }

  try {
    const response = await apiClient.get('/spills', { params: filters });
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, falling back to demo data', error);
    return { data: DEMO_INCIDENTS, count: DEMO_INCIDENTS.length, demoMode: true };
  }
}

/**
 * Fetch a single spill incident by ID
 */
export async function getSpillById(id) {
  if (IS_DEMO_MODE) {
    await simulateLatency(150);
    const spill = DEMO_INCIDENTS.find(item => item.id === id) || DEMO_INCIDENTS[0];
    return { data: spill, demoMode: true };
  }

  try {
    const response = await apiClient.get(`/spills/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`Spill ${id} fetch error, falling back to demo data`, error);
    const spill = DEMO_INCIDENTS.find(item => item.id === id) || DEMO_INCIDENTS[0];
    return { data: spill, demoMode: true };
  }
}

/**
 * Fetch tracked AIS vessels
 */
export async function getVessels(filters = {}) {
  if (IS_DEMO_MODE) {
    await simulateLatency(200);
    let results = [...DEMO_VESSELS];

    if (filters.type && filters.type !== 'All') {
      results = results.filter(v => v.type === filters.type);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(v => 
        v.name.toLowerCase().includes(q) || 
        v.mmsi.includes(q) ||
        v.imo.includes(q)
      );
    }
    if (filters.status && filters.status !== 'All') {
      results = results.filter(v => v.associationStatus === filters.status);
    }

    return { data: results, count: results.length, demoMode: true };
  }

  try {
    const response = await apiClient.get('/vessels', { params: filters });
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable for vessels, falling back to demo data', error);
    return { data: DEMO_VESSELS, count: DEMO_VESSELS.length, demoMode: true };
  }
}

/**
 * Fetch single vessel by MMSI
 */
export async function getVesselByMmsi(mmsi) {
  if (IS_DEMO_MODE) {
    await simulateLatency(150);
    const vessel = DEMO_VESSELS.find(v => v.mmsi === mmsi) || DEMO_VESSELS[0];
    return { data: vessel, demoMode: true };
  }

  try {
    const response = await apiClient.get(`/vessels/${mmsi}`);
    return response.data;
  } catch (error) {
    console.warn(`Vessel MMSI ${mmsi} fetch error, falling back to demo data`, error);
    const vessel = DEMO_VESSELS.find(v => v.mmsi === mmsi) || DEMO_VESSELS[0];
    return { data: vessel, demoMode: true };
  }
}

/**
 * Fetch candidate vessel correlations for an incident
 */
export async function getCorrelationsBySpillId(spillId) {
  if (IS_DEMO_MODE) {
    await simulateLatency(150);
    const correlations = DEMO_CORRELATIONS[spillId] || DEMO_CORRELATIONS['OS-2026-089'] || [];
    return { data: correlations, count: correlations.length, demoMode: true };
  }

  try {
    const response = await apiClient.get(`/spills/${spillId}/correlations`);
    return response.data;
  } catch (error) {
    console.warn(`Correlations for ${spillId} unavailable, falling back to demo`, error);
    const correlations = DEMO_CORRELATIONS[spillId] || DEMO_CORRELATIONS['OS-2026-089'] || [];
    return { data: correlations, count: correlations.length, demoMode: true };
  }
}

/**
 * Check backend API health status
 */
export async function checkApiHealth() {
  try {
    const response = await apiClient.get('/health', { timeout: 2000 });
    return { connected: true, status: response.data?.status || 'OK' };
  } catch (error) {
    return { 
      connected: false, 
      status: 'Disconnected (Demo Mode Active)', 
      error: error.message 
    };
  }
}

/**
 * Fetch Dashboard KPIs
 */
export async function getDashboardKpis() {
  await simulateLatency(100);
  return { data: DEMO_KPIS, demoMode: true };
}

/**
 * Fetch System Status telemetry
 */
export async function getSystemStatus() {
  await simulateLatency(100);
  return { data: DEMO_SYSTEM_STATUS, demoMode: true };
}

/**
 * Fetch Analytics data
 */
export async function getAnalyticsData() {
  await simulateLatency(150);
  return { data: DEMO_ANALYTICS, demoMode: true };
}
