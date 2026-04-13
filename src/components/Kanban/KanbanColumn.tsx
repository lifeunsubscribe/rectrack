import type { ClientWithMetadata } from '../../hooks/useClientFilter';
import type { Account } from '../../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  clients: ClientWithMetadata[];
  accounts: Account[];
  onCardClick: (clientId: string) => void;
}

/**
 * Calculate days until earliest close date for a client
 * Uses the same logic as useClientFilter for finding earliest close date
 * All date calculations performed in UTC to avoid timezone inconsistencies
 */
function getDaysUntilClose(clientId: string, accounts: Account[]): number | undefined {
  const clientAccounts = accounts.filter((a) => a.client_id === clientId);
  const closeDates = clientAccounts
    .map((a) => a.close_date)
    .filter((date): date is string => !!date);

  if (closeDates.length === 0) {
    return undefined;
  }

  // Sort ISO date strings lexicographically (YYYY-MM-DD sorts correctly)
  const earliestCloseDate = closeDates.sort()[0];
  const closeDateObj = new Date(earliestCloseDate + 'T00:00:00Z');

  if (isNaN(closeDateObj.getTime())) {
    return undefined;
  }

  // Get today's date in UTC to ensure consistent timezone handling
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

  const diffMs = closeDateObj.getTime() - todayUTC.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * KanbanColumn - Single column in kanban board
 * Shows: column header with step name and client count, list of client cards
 */
function KanbanColumn({ title, clients, accounts, onCardClick }: KanbanColumnProps) {
  return (
    <div
      className="kanban-column"
      style={{
        flex: '0 0 280px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '16px',
        marginRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 180px)', // Allow vertical scrolling within column
      }}
    >
      {/* Column header */}
      <div
        style={{
          marginBottom: '12px',
          paddingBottom: '12px',
          borderBottom: '2px solid #e5e7eb',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#2c3e50',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '4px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#7f8c8d',
            fontWeight: 500,
          }}
        >
          {clients.length} {clients.length === 1 ? 'client' : 'clients'}
        </div>
      </div>

      {/* Client cards - scrollable */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {clients.length === 0 ? (
          <div
            style={{
              fontSize: '13px',
              color: '#95a5a6',
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: '24px',
            }}
          >
            No clients
          </div>
        ) : (
          clients.map((clientData) => {
            const daysUntilClose = getDaysUntilClose(clientData.client.id, accounts);
            return (
              <KanbanCard
                key={clientData.client.id}
                clientData={clientData}
                daysUntilClose={daysUntilClose}
                onClick={() => onCardClick(clientData.client.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
