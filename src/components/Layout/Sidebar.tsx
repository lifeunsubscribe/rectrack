/**
 * Sidebar component - Persistent left panel on desktop, off-canvas drawer on mobile
 * Populated with scrollable client list, search, and filters
 * Passes selection state through to ClientList
 */

import ClientList from '../Sidebar/ClientList';
import { mockClients } from '../../data/mockClients';
import { mockChecklists } from '../../data/mockChecklists';
import { mockQuestions } from '../../data/mockQuestions';
import { mockAccounts } from '../../data/mockAccounts';
import { mockSchedules } from '../../data/mockSchedules';

interface SidebarProps {
  isCollapsed?: boolean;
  isMobile?: boolean;
  isMobileDrawerOpen?: boolean;
  selectedClientId?: string | null;
  onSelectClient?: (clientId: string) => void;
}

function Sidebar({
  isCollapsed = false,
  isMobile = false,
  isMobileDrawerOpen = false,
  selectedClientId,
  onSelectClient,
}: SidebarProps) {
  // Determine sidebar visibility class based on mobile state
  const sidebarClass = [
    'dashboard-layout__sidebar',
    isMobile && 'dashboard-layout__sidebar--mobile',
    isMobile && isMobileDrawerOpen && 'dashboard-layout__sidebar--drawer-open',
  ]
    .filter(Boolean)
    .join(' ');

  if (isCollapsed) {
    return (
      <div className={sidebarClass}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>C</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={sidebarClass}>
      <ClientList
        clients={mockClients}
        checklists={mockChecklists}
        questions={mockQuestions}
        accounts={mockAccounts}
        schedules={mockSchedules}
        selectedClientId={selectedClientId}
        onSelectClient={onSelectClient}
      />
    </div>
  );
}

export default Sidebar;
