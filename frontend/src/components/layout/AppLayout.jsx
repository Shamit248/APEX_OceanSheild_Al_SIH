import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('arabian-sea');

  return (
    <div className="min-h-screen bg-ocean-main text-ocean-textPrimary flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Topbar */}
        <Topbar
          onOpenMobileMenu={() => setMobileOpen(true)}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1700px] w-full mx-auto">
          <Outlet context={{ selectedRegion }} />
        </main>
      </div>
    </div>
  );
}
