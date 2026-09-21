import React, { useState, useEffect } from 'react';
import { Activity, Server, Cpu, Radio, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { DEMO_SYSTEM_STATUS } from '../../services/demoData';

export default function SystemStatus() {
  const [status] = useState(DEMO_SYSTEM_STATUS);
  const [syncTime, setSyncTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setSyncTime(new Date().toLocaleTimeString());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-5 rounded-xl bg-ocean-card border border-ocean-border shadow-card">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-ocean-border">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-ocean-cyan" />
          <h3 className="text-sm font-semibold text-ocean-textPrimary">
            System & Sensor Telemetry
          </h3>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-ocean-textMuted">
          <RefreshCw className="w-3 h-3 text-ocean-cyan animate-spin" style={{ animationDuration: '6s' }} />
          Sync: {syncTime}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Frontend Status */}
        <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60 flex items-start gap-3">
          <div className="p-2 rounded-md bg-ocean-green/10 text-emerald-400 border border-ocean-green/20 shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">
              Frontend Client
            </span>
            <span className="text-xs font-bold text-emerald-400 block truncate">
              {status.frontend.status}
            </span>
            <span className="text-[10px] font-mono text-ocean-textMuted">
              {status.frontend.version}
            </span>
          </div>
        </div>

        {/* API Connection */}
        <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60 flex items-start gap-3">
          <div className="p-2 rounded-md bg-ocean-warning/10 text-amber-400 border border-ocean-warning/20 shrink-0">
            <Server className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">
              Backend API
            </span>
            <span className="text-xs font-bold text-amber-400 block truncate">
              {status.apiConnection.status}
            </span>
            <span className="text-[10px] font-mono text-ocean-textMuted">
              FastAPI Standby
            </span>
          </div>
        </div>

        {/* AI Detection Model */}
        <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60 flex items-start gap-3">
          <div className="p-2 rounded-md bg-ocean-cyan/10 text-ocean-cyan border border-ocean-cyan/20 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">
              Segmentation Model
            </span>
            <span className="text-xs font-bold text-ocean-cyan block truncate">
              {status.aiModel.status}
            </span>
            <span className="text-[10px] font-mono text-ocean-textMuted">
              {status.aiModel.latency}
            </span>
          </div>
        </div>

        {/* AIS Satellite Feed */}
        <div className="p-3 rounded-lg bg-ocean-secondary border border-ocean-border/60 flex items-start gap-3">
          <div className="p-2 rounded-md bg-ocean-blue/10 text-blue-400 border border-ocean-blue/20 shrink-0">
            <Radio className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase text-ocean-textMuted block">
              AIS Satellite Feed
            </span>
            <span className="text-xs font-bold text-blue-400 block truncate">
              {status.aisFeed.status}
            </span>
            <span className="text-[10px] font-mono text-ocean-textMuted">
              {status.aisFeed.rate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
