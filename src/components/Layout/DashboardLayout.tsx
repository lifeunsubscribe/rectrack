/**
 * DashboardLayout component - Two-pane dashboard shell
 * Persistent left sidebar + main content area
 * Manages client selection state and passes it to Sidebar and MainContent
 */

import { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MainContent from './MainContent';
import type { MainView } from '../../hooks/useViewState';
import '../../styles/layout.css';

interface DashboardLayoutProps {
  breadcrumb?: string[];
  currentView?: MainView;
  onViewChange?: (view: MainView) => void;
  children?: ReactNode;
}

function DashboardLayout({ breadcrumb, currentView, onViewChange, children }: DashboardLayoutProps) {
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
      <TopBar breadcrumb={breadcrumb} currentView={currentView} onViewChange={onViewChange} />
      {children ? (
        <div className="dashboard-layout__main">{children}</div>
      ) : (
        <MainContent selectedClientId={selectedClientId} />
      )}
    </div>
  );
}

export default DashboardLayout;
