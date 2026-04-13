import type { ClientWithMetadata } from '../../hooks/useClientFilter';
import ScheduleBadge from '../common/ScheduleBadge';
import QuestionBadge from '../common/QuestionBadge';

interface KanbanCardProps {
  clientData: ClientWithMetadata;
  daysUntilClose?: number;
  onClick: () => void;
}

/**
 * Get color for days until/since close date badge
 * Per ADR: green (>7 days), yellow (1-7 days), red (past due)
 */
function getDaysColor(days: number | undefined): string {
  if (days === undefined) {
    return '#95a5a6'; // Grey for no close date
  }
  if (days < 0) {
    return '#EF4444'; // Red - past due
  }
  if (days <= 7) {
    return '#F59E0B'; // Yellow - within warning window
  }
  return '#10B981'; // Green - on track
}

/**
 * Format days until/since close date for display
 */
function formatDays(days: number | undefined): string {
  if (days === undefined) {
    return 'No close date';
  }
  if (days < 0) {
    return `${Math.abs(days)}d overdue`;
  }
  if (days === 0) {
    return 'Due today';
  }
  return `${days}d until close`;
}

/**
 * KanbanCard - Individual client card in kanban column
 * Shows: name, schedule badge, question count, days until/since close date
 * Cards are clickable but NOT draggable per ADR
 */
function KanbanCard({ clientData, daysUntilClose, onClick }: KanbanCardProps) {
  const { client, openQuestionCount, schedule } = clientData;
  const daysColor = getDaysColor(daysUntilClose);
  const daysText = formatDays(daysUntilClose);

  return (
    <div
      className="kanban-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${client.name} details`}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '8px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Client name */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#2c3e50',
          marginBottom: '8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={client.name}
      >
        {client.name}
      </div>

      {/* Schedule badge */}
      <div style={{ marginBottom: '6px' }}>
        <ScheduleBadge schedule={schedule} />
      </div>

      {/* Question count badge */}
      {openQuestionCount > 0 && (
        <div style={{ marginBottom: '6px' }}>
          <QuestionBadge count={openQuestionCount} />
        </div>
      )}

      {/* Days until/since close date */}
      <div
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: daysColor,
          marginTop: '8px',
        }}
      >
        {daysText}
      </div>
    </div>
  );
}

export default KanbanCard;
