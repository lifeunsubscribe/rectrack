/**
 * Sidebar component - Persistent left panel for client list
 * Placeholder implementation for Phase 1 layout shell
 */

interface SidebarProps {
  isCollapsed?: boolean;
}

function Sidebar({ isCollapsed = false }: SidebarProps) {
  return (
    <div className="dashboard-layout__sidebar">
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>
          {isCollapsed ? 'C' : 'Clients'}
        </h2>
        {!isCollapsed && (
          <p style={{ fontSize: '14px', color: '#95a5a6' }}>
            Client list will appear here
          </p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
