/**
 * DashboardLayout component - Two-pane dashboard shell
 * Persistent left sidebar + main content area
 * Phase 1: Basic structure with placeholders
 */

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MainContent from './MainContent';
import '../../styles/layout.css';

interface DashboardLayoutProps {
  children?: ReactNode;
  breadcrumb?: string[];
}

function DashboardLayout({ children, breadcrumb }: DashboardLayoutProps) {
  // Sidebar collapse functionality will be added in a future phase
  const isSidebarCollapsed = false;

  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'dashboard-layout--sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <TopBar breadcrumb={breadcrumb} />
      <MainContent>{children}</MainContent>
    </div>
  );
}

export default DashboardLayout;
