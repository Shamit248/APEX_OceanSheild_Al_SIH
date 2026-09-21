import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Sliders,
  Moon,
  MapPin,
  Database,
  Bell,
  CheckCircle,
  AlertTriangle,
  Server,
  RefreshCw,
} from 'lucide-react';
import Button from '../components/common/Button';
import { checkApiHealth } from '../services/api';

export default function Settings() {
  // Interface Settings State
  const [compactMode, setCompactMode] = useState(false);
  const [mapStyle, setMapStyle] = useState('dark');
  const [sidebarPreference, setSidebarPreference] = useState('expanded');

  // Monitoring Preferences State
  const [defaultRegion, setDefaultRegion] = useState('arabian-sea');
  const [defaultZoom, setDefaultZoom] = useState('7');
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [popupAlerts, setPopupAlerts] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('15s');

  // Data & Backend Settings State
  const [demoMode, setDemoMode] = useState(true);
  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem('oceanshield_api_url') || 'http://localhost:8000/api/v1'
  );
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionResult(null);
    try {
      const result = await checkApiHealth();
      setConnectionResult(result);
    } catch (e) {
      setConnectionResult({ connected: false, error: e.message });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveApiUrl = () => {
    localStorage.setItem('oceanshield_api_url', apiUrl);
    alert('API Base URL saved locally.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon className="w-4 h-4 text-ocean-cyan" />
          <span className="text-xs font-mono uppercase text-ocean-cyan font-semibold tracking-wider">
            System Preferences
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-ocean-textPrimary font-sans">
          Platform Configuration
        </h1>
        <p className="text-xs text-ocean-textSecondary mt-0.5">
          Configure interface aesthetics, telemetry refresh cadences, and backend API integration endpoints.
        </p>
      </div>

      {/* 1. Interface Settings */}
      <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-ocean-border">
          <Moon className="w-4 h-4 text-ocean-cyan" />
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            Interface & Visual Settings
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <div>
              <span className="font-semibold text-ocean-textPrimary block">Dark Theme</span>
              <span className="text-ocean-textMuted">Maritime Navy command center palette (default)</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-ocean-cyan/20 text-ocean-cyan font-mono text-[11px] border border-ocean-cyan/30">
              Active • High Contrast
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <div>
              <span className="font-semibold text-ocean-textPrimary block">Compact Layout</span>
              <span className="text-ocean-textMuted">Condense card padding for high-density monitors</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-ocean-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean-cyan"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <div>
              <span className="font-semibold text-ocean-textPrimary block">Map Cartography Style</span>
              <span className="text-ocean-textMuted">Tile provider for tactical maritime view</span>
            </div>
            <select
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-ocean-card border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan"
            >
              <option value="dark">CartoDB Dark Matter (Recommended)</option>
              <option value="satellite">Sentinel Simulated Optical</option>
              <option value="bathymetry">NOAA Bathymetric</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Monitoring Preferences */}
      <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-ocean-border">
          <MapPin className="w-4 h-4 text-ocean-cyan" />
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            Monitoring & Alert Preferences
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <div>
              <span className="font-semibold text-ocean-textPrimary block">Default Monitoring Region</span>
              <span className="text-ocean-textMuted">Default coordinate center on app boot</span>
            </div>
            <select
              value={defaultRegion}
              onChange={(e) => setDefaultRegion(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-ocean-card border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan"
            >
              <option value="arabian-sea">Arabian Sea (Sector Alpha)</option>
              <option value="strait-of-hormuz">Strait of Hormuz</option>
              <option value="persian-gulf">Persian Gulf</option>
              <option value="bay-of-bengal">Bay of Bengal</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <div>
              <span className="font-semibold text-ocean-textPrimary block">Telemetry Polling Interval</span>
              <span className="text-ocean-textMuted">Simulated AIS and satellite pass check cadence</span>
            </div>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-ocean-card border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan"
            >
              <option value="5s">Every 5 Seconds (High Priority)</option>
              <option value="15s">Every 15 Seconds (Normal)</option>
              <option value="30s">Every 30 Seconds</option>
              <option value="60s">Every 60 Seconds</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <div>
              <span className="font-semibold text-ocean-textPrimary block">Surveillance Toast Notifications</span>
              <span className="text-ocean-textMuted">Show banner popup when new slick detected</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={popupAlerts}
                onChange={(e) => setPopupAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-ocean-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean-cyan"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Data & Backend Settings */}
      <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-ocean-border">
          <Database className="w-4 h-4 text-ocean-cyan" />
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            Backend API & Data Source Architecture
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60">
            <div>
              <span className="font-semibold text-ocean-textPrimary block">Demo Mode (Mock Ingestion)</span>
              <span className="text-ocean-textMuted">Use internal mock datasets for radar and vessels</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-ocean-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean-cyan"></div>
            </label>
          </div>

          <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60 space-y-3">
            <div>
              <label className="font-semibold text-ocean-textPrimary block mb-1">
                FastAPI Backend Endpoint URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://localhost:8000/api/v1"
                  className="flex-1 px-3 py-2 rounded-lg bg-ocean-card border border-ocean-border text-xs font-mono text-ocean-textPrimary focus:outline-none focus:border-ocean-cyan"
                />
                <Button variant="secondary" size="sm" onClick={handleSaveApiUrl}>
                  Save
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-ocean-border/60">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-ocean-textMuted" />
                <span className="font-mono text-ocean-textSecondary">
                  Status: {connectionResult ? (connectionResult.connected ? 'Connected' : 'Disconnected') : 'Standby / Demo Mode'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={testingConnection ? RefreshCw : Server}
                onClick={handleTestConnection}
                disabled={testingConnection}
              >
                {testingConnection ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>

            {connectionResult && (
              <div
                className={`p-2.5 rounded-lg border text-xs font-mono ${
                  connectionResult.connected
                    ? 'bg-ocean-green/10 border-ocean-green/30 text-emerald-400'
                    : 'bg-ocean-warning/10 border-ocean-warning/30 text-amber-400'
                }`}
              >
                {connectionResult.connected
                  ? 'Backend responded with 200 OK.'
                  : `Backend not reachable at ${apiUrl}. Frontend running in offline Demo Mode.`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
