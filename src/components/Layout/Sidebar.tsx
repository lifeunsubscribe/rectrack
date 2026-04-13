/**
 * Sidebar component - Persistent left panel for client list
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
  selectedClientId?: string | null;
  onSelectClient?: (clientId: string) => void;
}

function Sidebar({ isCollapsed = false, selectedClientId, onSelectClient }: SidebarProps) {
  if (isCollapsed) {
    return (
      <div className="dashboard-layout__sidebar">
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>C</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout__sidebar">
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
