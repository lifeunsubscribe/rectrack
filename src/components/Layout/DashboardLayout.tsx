/**
 * DashboardLayout component - Two-pane dashboard shell
 * Persistent left sidebar + main content area
 * Manages client selection state and passes it to Sidebar and MainContent
 */

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MainContent from './MainContent';
import '../../styles/layout.css';

interface DashboardLayoutProps {
  breadcrumb?: string[];
}

function DashboardLayout({ breadcrumb }: DashboardLayoutProps) {
  // Sidebar collapse functionality will be added in a future phase
  const isSidebarCollapsed = false;

  // Lift client selection state to coordinate between Sidebar and MainContent
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'dashboard-layout--sidebar-collapsed' : ''}`}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        selectedClientId={selectedClientId}
        onSelectClient={setSelectedClientId}
      />
      <TopBar breadcrumb={breadcrumb} />
      <MainContent selectedClientId={selectedClientId} />
    </div>
  );
}

export default DashboardLayout;
