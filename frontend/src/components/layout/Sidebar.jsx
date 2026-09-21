import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertOctagon,
  Ship,
  BarChart3,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
  Shield,
  Radio,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/incidents', label: 'Incidents', icon: AlertOctagon, countBadge: '3' },
  { path: '/vessels', label: 'Vessels', icon: Ship },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/about', label: 'About', icon: Info },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 flex flex-col
          bg-ocean-secondary border-r border-ocean-border transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header / Brand Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-ocean-border">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-10 h-10 rounded-lg bg-ocean-card flex items-center justify-center border border-ocean-cyan/40 shadow-glow-cyan shrink-0">
              <Shield className="w-5 h-5 text-ocean-cyan" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-ocean-cyan animate-ping" />
            </div>

            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-base font-bold tracking-tight text-ocean-textPrimary font-sans">
                  OceanShield<span className="text-ocean-cyan font-mono ml-1">AI</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-ocean-cyan font-mono font-medium">
                  Maritime Intelligence
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-ocean-textSecondary hover:text-ocean-textPrimary hover:bg-ocean-card"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-ocean-cyan/15 text-ocean-cyan border border-ocean-cyan/40 shadow-glow-cyan'
                      : 'text-ocean-textSecondary hover:text-ocean-textPrimary hover:bg-ocean-card hover:border hover:border-ocean-border/80'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />

                {!collapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}

                {!collapsed && item.countBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-ocean-danger/20 text-red-400 border border-ocean-danger/30">
                    {item.countBadge}
                  </span>
                )}

                {/* Collapsed active indicator bar */}
                {collapsed && (
                  <span className="sr-only">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom System Status Section */}
        <div className="p-3 border-t border-ocean-border bg-ocean-main/60">
          {!collapsed ? (
            <div className="p-2.5 rounded-lg bg-ocean-card border border-ocean-border text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase text-ocean-textMuted tracking-wider">
                  Engine Status
                </span>
                <span className="flex items-center gap-1 text-[11px] text-ocean-green font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-ocean-green animate-pulse" />
                  DEMO
                </span>
              </div>
              <div className="text-[11px] text-ocean-textSecondary truncate font-mono">
                AIS Feed: Simulated
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="System: Demo Mode Active">
              <span className="w-2.5 h-2.5 rounded-full bg-ocean-green animate-pulse" />
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full mt-3 py-1.5 rounded-lg text-ocean-textSecondary hover:text-ocean-textPrimary hover:bg-ocean-card border border-transparent hover:border-ocean-border transition-colors text-xs gap-2"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="font-mono text-[11px] uppercase tracking-wider">Collapse View</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
