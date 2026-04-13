import { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import AccountDetail from './components/AccountDetail/AccountDetail';
import KanbanBoard from './components/Kanban/KanbanBoard';
import { useClientFilter } from './hooks/useClientFilter';
import {
  mockClients,
  mockAccounts,
  mockChecklists,
  mockQuestions,
  mockSchedules,
} from './data';

type View = 'dashboard' | 'account-detail' | 'kanban';

function App() {
  const [currentView, setCurrentView] = useState<View>('kanban');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  // Use client filter hook to get enriched client data
  const { filteredClients } = useClientFilter({
    clients: mockClients,
    checklists: mockChecklists,
    questions: mockQuestions,
    accounts: mockAccounts,
    schedules: mockSchedules,
  });

  // Navigation handlers
  const handleNavigateToAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
    setCurrentView('account-detail');
  };

  const handleNavigateToClient = (clientId: string) => {
    // TODO: Navigate to client detail view when issue #7 is complete
    // For now, show a placeholder alert
    alert(`Client detail view not yet implemented. Selected client: ${clientId}`);
  };

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedAccountId(null);
  };

  const handleNavigateToKanban = () => {
    setCurrentView('kanban');
    setSelectedAccountId(null);
  };

  // Breadcrumb based on current view
  let breadcrumb: string[] = ['Dashboard'];
  if (currentView === 'account-detail') {
    breadcrumb = ['Dashboard', 'Account Detail'];
  } else if (currentView === 'kanban') {
    breadcrumb = ['Dashboard', 'Kanban'];
  }

  return (
    <DashboardLayout breadcrumb={breadcrumb}>
      {currentView === 'dashboard' && (
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>
            RecTrack Demo
          </h1>
          <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '24px' }}>
            CPA Reconciliation Workflow Tracker
          </p>

          {/* Demo navigation */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleNavigateToAccount('account-001')}
              style={{
                padding: '10px 16px',
                backgroundColor: '#3498db',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Account Detail
            </button>
            <button
              onClick={handleNavigateToKanban}
              style={{
                padding: '10px 16px',
                backgroundColor: '#27ae60',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Kanban Board
            </button>
          </div>
        </div>
      )}

      {currentView === 'account-detail' && selectedAccountId && (
        <AccountDetail
          accountId={selectedAccountId}
          onNavigateToClient={handleNavigateToDashboard}
        />
      )}

      {currentView === 'kanban' && (
        <KanbanBoard
          clients={filteredClients}
          accounts={mockAccounts}
          onClientClick={handleNavigateToClient}
        />
      )}
    </DashboardLayout>
  );
}

export default App;
