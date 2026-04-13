import { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import AccountDetail from './components/AccountDetail/AccountDetail';
import ClientDetail from './components/ClientDetail/ClientDetail';
import KanbanBoard from './components/Kanban/KanbanBoard';
import { useClientFilter } from './hooks/useClientFilter';
import {
  mockClients,
  mockAccounts,
  mockChecklists,
  mockQuestions,
  mockSchedules,
} from './data';

type View = 'dashboard' | 'account-detail' | 'client-detail' | 'kanban';

function App() {
  const [currentView, setCurrentView] = useState<View>('kanban');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

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
    setSelectedClientId(clientId);
    setCurrentView('client-detail');
  };

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedAccountId(null);
    setSelectedClientId(null);
  };

  const handleNavigateToKanban = () => {
    setCurrentView('kanban');
    setSelectedAccountId(null);
    setSelectedClientId(null);
  };

  // Breadcrumb based on current view
  let breadcrumb: string[] = ['Dashboard'];
  if (currentView === 'account-detail') {
    breadcrumb = ['Dashboard', 'Account Detail'];
  } else if (currentView === 'client-detail') {
    breadcrumb = ['Dashboard', 'Client Detail'];
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

      {currentView === 'client-detail' && selectedClientId && (
        <ClientDetail
          client={mockClients.find((c) => c.id === selectedClientId)!}
          accounts={mockAccounts.filter((a) => a.clientId === selectedClientId)}
          checklist={mockChecklists.find((c) => c.clientId === selectedClientId) || null}
          questions={mockQuestions.filter((q) => q.clientId === selectedClientId)}
          schedule={mockSchedules.find((s) => s.clientId === selectedClientId) || null}
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
