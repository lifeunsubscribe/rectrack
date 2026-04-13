import type { ClientWithMetadata } from '../../hooks/useClientFilter';
import type { Account } from '../../types';
import { groupClientsByStep } from '../../utils/kanbanHelpers';
import KanbanColumn from './KanbanColumn';
import '../../styles/kanban.css';

interface KanbanBoardProps {
  clients: ClientWithMetadata[];
  accounts: Account[];
  onClientClick: (clientId: string) => void;
}

/**
 * KanbanBoard - Main kanban view component
 * Displays 6 columns: Steps 1-5 + Complete
 * Groups clients by their lowest incomplete step
 * Per ADR: cards are NOT draggable, clicking navigates to client detail
 */
function KanbanBoard({ clients, accounts, onClientClick }: KanbanBoardProps) {
  const columns = groupClientsByStep(clients);

  return (
    <div
      className="kanban-board"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '24px',
        minHeight: 'calc(100vh - 180px)',
      }}
    >
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          title={column.title}
          clients={column.clients}
          accounts={accounts}
          onCardClick={onClientClick}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
