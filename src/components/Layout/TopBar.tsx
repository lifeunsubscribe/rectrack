/**
 * TopBar component - Breadcrumb navigation and view controls
 * Displays hamburger menu on mobile, breadcrumb navigation, and view switcher
 */

import type { MainView } from '../../hooks/useViewState';
import ViewSwitcher from './ViewSwitcher';

interface TopBarProps {
  breadcrumb?: string[];
  currentView?: MainView;
  onViewChange?: (view: MainView) => void;
  isMobile?: boolean;
  onToggleMobileDrawer?: () => void;
}

function TopBar({
  breadcrumb = ['Dashboard'],
  currentView,
  onViewChange,
  isMobile = false,
  onToggleMobileDrawer,
}: TopBarProps) {
  return (
    <div className="dashboard-layout__topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Hamburger menu button - only visible on mobile */}
        {isMobile && onToggleMobileDrawer && (
          <button
            onClick={onToggleMobileDrawer}
            className="hamburger-button touch-target"
            aria-label="Toggle sidebar menu"
            aria-expanded={false}
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        <nav aria-label="Breadcrumb">
          <ol
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '8px',
              fontSize: '14px',
              color: '#34495e',
            }}
          >
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
