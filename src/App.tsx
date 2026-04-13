import DashboardLayout from './components/Layout/DashboardLayout';
import DashboardHome from './components/Dashboard/DashboardHome';
import AccountDetail from './components/AccountDetail/AccountDetail';
import ClientDetail from './components/ClientDetail/ClientDetail';
import KanbanBoard from './components/Kanban/KanbanBoard';
import { useClientFilter } from './hooks/useClientFilter';
import { useViewState } from './hooks/useViewState';
import {
  mockClients,
  mockAccounts,
  mockChecklists,
  mockQuestions,
  mockSchedules,
} from './data';

function App() {
  const {
    currentView,
    selectedClientId,
    selectedAccountId,
    previousMainView,
    navigateToDashboard,
    navigateToKanban,
    navigateToClient,
    navigateToAccount,
    navigateBack,
  } = useViewState('dashboard');

  // Use client filter hook to get enriched client data
  const { filteredClients } = useClientFilter({
    clients: mockClients,
    checklists: mockChecklists,
    questions: mockQuestions,
    accounts: mockAccounts,
    schedules: mockSchedules,
  });

  // Build breadcrumb based on current view and previous main view
  // Per ADR: "Dashboard" or "Kanban" is the root, not both
  let breadcrumb: string[] = ['Dashboard'];

  if (currentView === 'dashboard') {
    breadcrumb = ['Dashboard'];
  } else if (currentView === 'kanban') {
    breadcrumb = ['Kanban'];
  } else if (currentView === 'client-detail') {
    // When viewing client detail, show root based on previous view
    const root = previousMainView === 'kanban' ? 'Kanban' : 'Dashboard';
    const clientName = mockClients.find((c) => c.id === selectedClientId)?.name || 'Client';
    breadcrumb = [root, clientName];
  } else if (currentView === 'account-detail') {
    // When viewing account detail, show full path: [Root] > [Client] > [Account]
    const root = previousMainView === 'kanban' ? 'Kanban' : 'Dashboard';
    const account = mockAccounts.find((a) => a.id === selectedAccountId);
    const client = account ? mockClients.find((c) => c.id === account.client_id) : null;
    const accountName = account
      ? `${account.institution_name} ${account.type.charAt(0).toUpperCase() + account.type.slice(1)}`
      : 'Account';
    breadcrumb = [root, client?.name || 'Client', accountName];
  }

  // Determine which main view to show in view switcher
  // Only show switcher for dashboard/kanban views, not detail views
  const mainViewForSwitcher = currentView === 'dashboard' || currentView === 'kanban'
    ? currentView
    : previousMainView;

  const handleViewChange = (view: 'dashboard' | 'kanban') => {
    if (view === 'dashboard') {
      navigateToDashboard();
    } else {
      navigateToKanban();
    }
  };

  return (
    <DashboardLayout
      breadcrumb={breadcrumb}
      currentView={mainViewForSwitcher}
      onViewChange={handleViewChange}
      selectedClientId={currentView === 'client-detail' ? selectedClientId : null}
      onClientSelect={navigateToClient}
    >
      {currentView === 'dashboard' && (
        <DashboardHome
          clients={filteredClients}
          accounts={mockAccounts}
          onClientClick={navigateToClient}
        />
      )}

      {currentView === 'account-detail' && selectedAccountId && (
        <AccountDetail
          accountId={selectedAccountId}
          onNavigateToClient={navigateBack}
        />
      )}

      {currentView === 'client-detail' && selectedClientId && (() => {
        const client = mockClients.find((c) => c.id === selectedClientId)!;
        const schedule =
          mockSchedules.find((s) => s.id === client.schedule_id) || null;
        return (
          <ClientDetail
            client={client}
            accounts={mockAccounts.filter((a) => a.client_id === selectedClientId)}
            checklist={mockChecklists.find((c) => c.client_id === selectedClientId) || null}
            questions={mockQuestions.filter((q) => q.client_id === selectedClientId)}
            schedule={schedule}
            onAccountClick={navigateToAccount}
          />
        );
      })()}

      {currentView === 'kanban' && (
        <KanbanBoard
          clients={filteredClients}
          accounts={mockAccounts}
          onClientClick={navigateToClient}
        />
      )}
    </DashboardLayout>
  );
}

export default App;
