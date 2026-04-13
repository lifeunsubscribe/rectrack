import { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import AccountDetail from './components/AccountDetail/AccountDetail';

type View = 'dashboard' | 'account-detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  // Navigation handlers
  const handleNavigateToAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
    setCurrentView('account-detail');
  };

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedAccountId(null);
  };

  // Breadcrumb based on current view
  const breadcrumb = currentView === 'account-detail' ? ['Dashboard', 'Account Detail'] : ['Dashboard'];

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

          {/* Demo navigation - click to view account detail */}
          <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: '#2c3e50' }}>
              Demo: View Account Details
            </h2>
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
              View Greenfield Consulting - Checking Account
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
    </DashboardLayout>
  );
}

export default App;
