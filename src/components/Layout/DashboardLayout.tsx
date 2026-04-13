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
  // Optional controlled selection. When both are provided, the parent owns
  // selection and sidebar clicks drive App-level navigation; otherwise
  // DashboardLayout manages selection internally (legacy path).
  selectedClientId?: string | null;
  onClientSelect?: (clientId: string) => void;
  children?: ReactNode;
}

function DashboardLayout({
  breadcrumb,
  currentView,
  onViewChange,
  selectedClientId: controlledSelectedId,
  onClientSelect,
  children,
}: DashboardLayoutProps) {
  const isMobile = useMobileBreakpoint();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);

  const isControlled = controlledSelectedId !== undefined && onClientSelect !== undefined;
  const selectedClientId = isControlled ? controlledSelectedId : internalSelectedId;

  const handleClientSelect = (clientId: string) => {
    if (isControlled) {
      onClientSelect!(clientId);
    } else {
      setInternalSelectedId(clientId);
    }
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
        isMobileDrawerOpen={isMobileDrawerOpen}
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
