/**
 * DashboardLayout component - Two-pane dashboard shell
 * Persistent left sidebar on desktop, off-canvas drawer on mobile
 * Manages client selection state and mobile drawer state
 */

import { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MainContent from './MainContent';
import type { MainView } from '../../hooks/useViewState';
import { useMobileBreakpoint } from '../../hooks/useMobileBreakpoint';
import '../../styles/layout.css';
import '../../styles/mobile.css';

interface DashboardLayoutProps {
  breadcrumb?: string[];
  currentView?: MainView;
  onViewChange?: (view: MainView) => void;
  children?: ReactNode;
}

function DashboardLayout({ breadcrumb, currentView, onViewChange, children }: DashboardLayoutProps) {
  // Detect mobile viewport (<=768px)
  const isMobile = useMobileBreakpoint();

  // Mobile drawer state: hidden by default on mobile
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Lift client selection state to coordinate between Sidebar and MainContent
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Handle client selection: close drawer on mobile when client is selected
  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    if (isMobile) {
      setIsMobileDrawerOpen(false);
    }
  };

  // Toggle mobile drawer
  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen((prev) => !prev);
  };

  // Close drawer when overlay is clicked
  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile drawer overlay - only visible when drawer is open on mobile */}
      {isMobile && isMobileDrawerOpen && (
        <div
          className="mobile-drawer-overlay mobile-drawer-overlay--visible"
          onClick={closeMobileDrawer}
          aria-hidden="true"
        />
      )}

      <Sidebar
        isCollapsed={false}
        isMobile={isMobile}
        isMobileDrawerOpen={isMobileDrawerOpen}
        selectedClientId={selectedClientId}
        onSelectClient={handleClientSelect}
      />
      <TopBar
        breadcrumb={breadcrumb}
        currentView={currentView}
        onViewChange={onViewChange}
        isMobile={isMobile}
        onToggleMobileDrawer={toggleMobileDrawer}
      />
      {children ? (
        <div className="dashboard-layout__main">{children}</div>
      ) : (
        <MainContent selectedClientId={selectedClientId} />
      )}
    </div>
  );
}

export default DashboardLayout;
