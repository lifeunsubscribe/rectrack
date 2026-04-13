/**
 * MainContent component - Main content area
 * Displays ClientDetail when a client is selected, or welcome message otherwise
 */

import ClientDetail from '../ClientDetail/ClientDetail';
import { useSelectedClient } from '../../hooks/useSelectedClient';
import { mockClients, mockAccounts, mockChecklists, mockQuestions, mockSchedules } from '../../data';

interface MainContentProps {
  selectedClientId: string | null;
}

function MainContent({ selectedClientId }: MainContentProps) {
  // Derive full client data from selectedClientId using the hook
  const selectedClientData = useSelectedClient({
    selectedClientId,
    clients: mockClients,
    accounts: mockAccounts,
    checklists: mockChecklists,
    questions: mockQuestions,
    schedules: mockSchedules,
  });

  return (
    <div className="dashboard-layout__main">
      {selectedClientData ? (
        <ClientDetail
          client={selectedClientData.client}
          accounts={selectedClientData.accounts}
          checklist={selectedClientData.checklist}
          questions={selectedClientData.questions}
          schedule={selectedClientData.schedule}
        />
      ) : (
        <div style={{ padding: '32px' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>
            Welcome to RecTrack
          </h1>
          <p style={{ fontSize: '16px', color: '#7f8c8d', lineHeight: '1.6' }}>
            CPA Reconciliation Workflow Tracker
          </p>
          <p style={{ fontSize: '14px', color: '#95a5a6', marginTop: '12px' }}>
            Select a client from the sidebar to view details
          </p>
        </div>
      )}
    </div>
  );
}

export default MainContent;
