/**
 * MainContent component - Main content area
 * Placeholder implementation for Phase 1 layout shell
 */

import { ReactNode } from 'react';

interface MainContentProps {
  children?: ReactNode;
}

function MainContent({ children }: MainContentProps) {
  return (
    <div className="dashboard-layout__main">
      {children || (
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>
            Welcome to RecTrack
          </h1>
          <p style={{ fontSize: '16px', color: '#7f8c8d', lineHeight: '1.6' }}>
            CPA Reconciliation Workflow Tracker
          </p>
          <p style={{ fontSize: '14px', color: '#95a5a6', marginTop: '12px' }}>
            Client detail content will appear here
          </p>
        </div>
      )}
    </div>
  );
}

export default MainContent;
