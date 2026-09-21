import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Globe,
  Bell,
  Clock,
  User,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import DemoBadge from '../common/DemoBadge';
import { REGIONS } from '../../services/demoData';

export default function Topbar({
  onOpenMobileMenu,
  selectedRegion,
  onSelectRegion,
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  // Live UTC system clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      setCurrentTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-ocean-secondary/95 backdrop-blur-md border-b border-ocean-border px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left section: Mobile menu toggle + Region selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-ocean-textSecondary hover:text-ocean-textPrimary hover:bg-ocean-card border border-ocean-border"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Region selector dropdown */}
        <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ocean-card border border-ocean-border hover:border-ocean-cyan/50 transition-colors">
          <Globe className="w-4 h-4 text-ocean-cyan shrink-0" />
          <select
            value={selectedRegion || 'arabian-sea'}
            onChange={(e) => onSelectRegion?.(e.target.value)}
            className="bg-transparent text-xs font-mono font-medium text-ocean-textPrimary focus:outline-none cursor-pointer pr-4"
          >
            {REGIONS.map((reg) => (
              <option key={reg.id} value={reg.id} className="bg-ocean-card text-ocean-textPrimary">
                {reg.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topbar Search */}
        <div className="hidden md:flex items-center relative w-64 lg:w-72">
          <Search className="w-4 h-4 absolute left-3 text-ocean-textMuted pointer-events-none" />
          <input
            type="text"
            placeholder="Search spills, vessels, MMSI..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-ocean-main/60 border border-ocean-border text-xs text-ocean-textPrimary placeholder:text-ocean-textMuted focus:outline-none focus:border-ocean-cyan/70 focus:ring-1 focus:ring-ocean-cyan/30 font-sans transition-all"
          />
        </div>
      </div>

      {/* Right section: Demo Mode Badge, UTC Clock, Notifications, Operator Avatar */}
      <div className="flex items-center gap-3">
        {/* Demo Mode Badge */}
        <DemoBadge />

        {/* System UTC Time Clock */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-md bg-ocean-main/70 border border-ocean-border text-xs font-mono text-ocean-textSecondary">
          <Clock className="w-3.5 h-3.5 text-ocean-cyan" />
          <span>{currentTime || 'SYNCHRONIZING...'}</span>
        </div>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-ocean-textSecondary hover:text-ocean-textPrimary hover:bg-ocean-card border border-ocean-border transition-colors"
            aria-label="System Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-ocean-danger ring-2 ring-ocean-secondary" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-ocean-card border border-ocean-border shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-ocean-border">
                <span className="text-xs font-semibold uppercase font-mono text-ocean-textPrimary">
                  Surveillance Alerts
                </span>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[10px] text-ocean-cyan hover:underline font-mono"
                >
                  Mark read
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-ocean-danger/10 border border-ocean-danger/30 text-ocean-textPrimary">
                  <div className="flex items-center gap-1.5 font-semibold text-red-400 mb-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>New Anomaly OS-2026-089</span>
                  </div>
                  <p className="text-[11px] text-ocean-textSecondary">
                    14.8 km² slick detected off Mumbai High. Candidate vessel correlation computed.
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-ocean-secondary border border-ocean-border text-ocean-textPrimary">
                  <div className="flex items-center gap-1.5 font-semibold text-ocean-cyan mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Sentinel-1B Pass Complete</span>
                  </div>
                  <p className="text-[11px] text-ocean-textSecondary">
                    Simulated SAR interferometric scene processed for Sector Alpha.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User / Watch Officer Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-ocean-border">
          <div className="w-8 h-8 rounded-lg bg-ocean-card border border-ocean-cyan/30 flex items-center justify-center text-ocean-cyan shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-ocean-textPrimary leading-none">
              Cmdr. Patil
            </span>
            <span className="text-[10px] font-mono text-ocean-textMuted leading-tight mt-0.5">
              Sector Watch • Alpha
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
