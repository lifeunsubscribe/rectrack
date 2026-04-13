interface AccountBreadcrumbProps {
  clientName: string;
  accountName: string;
  onClientClick: () => void;
}

/**
 * Breadcrumb navigation for account detail page
 * Shows: [Client Name] > [Account Name]
 * Client name is clickable to return to client detail
 */
export default function AccountBreadcrumb({
  clientName,
  accountName,
  onClientClick,
}: AccountBreadcrumbProps) {
  return (
    <div style={{ marginBottom: '24px', fontSize: '14px', color: '#7f8c8d' }}>
      <button
        onClick={onClientClick}
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          font: 'inherit',
          cursor: 'pointer',
          color: '#3498db',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = 'none';
        }}
      >
        {clientName}
      </button>
      <span style={{ margin: '0 8px' }}>›</span>
      <span style={{ color: '#2c3e50' }}>{accountName}</span>
    </div>
  );
}
