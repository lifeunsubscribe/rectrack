/**
 * TopBar component - Breadcrumb navigation and view controls
 * Displays breadcrumb navigation and view switcher for Dashboard/Kanban toggle
 */

import type { MainView } from '../../hooks/useViewState';
import ViewSwitcher from './ViewSwitcher';

interface TopBarProps {
  breadcrumb?: string[];
  currentView?: MainView;
  onViewChange?: (view: MainView) => void;
}

function TopBar({ breadcrumb = ['Dashboard'], currentView, onViewChange }: TopBarProps) {
  return (
    <div className="dashboard-layout__topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <nav aria-label="Breadcrumb">
          <ol style={{
            display: 'flex',
            listStyle: 'none',
            gap: '8px',
            fontSize: '14px',
            color: '#34495e'
          }}>
            {breadcrumb.map((crumb, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {index > 0 && <span style={{ color: '#95a5a6' }}>/</span>}
                <span style={{ fontWeight: index === breadcrumb.length - 1 ? 600 : 400 }}>
                  {crumb}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {currentView && onViewChange && (
          <ViewSwitcher currentView={currentView} onViewChange={onViewChange} />
        )}
      </div>
    </div>
  );
}

export default TopBar;
