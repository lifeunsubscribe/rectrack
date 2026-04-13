/**
 * TopBar component - Breadcrumb navigation and view controls
 * Placeholder implementation for Phase 1 layout shell
 */

interface TopBarProps {
  breadcrumb?: string[];
}

function TopBar({ breadcrumb = ['Dashboard'] }: TopBarProps) {
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
        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
          View switcher placeholder
        </div>
      </div>
    </div>
  );
}

export default TopBar;
