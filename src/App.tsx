import DashboardLayout from './components/Layout/DashboardLayout';

function App() {
  return (
    <DashboardLayout breadcrumb={['Dashboard']}>
      <div>
        <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>
          RecTrack Demo
        </h1>
        <p style={{ fontSize: '16px', color: '#7f8c8d' }}>
          CPA Reconciliation Workflow Tracker
        </p>
      </div>
    </DashboardLayout>
  );
}

export default App;
