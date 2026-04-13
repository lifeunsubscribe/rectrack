import type { ClientWithMetadata } from '../../hooks/useClientFilter';
import StatusBadge from '../common/StatusBadge';
import ScheduleBadge from '../common/ScheduleBadge';
import QuestionBadge from '../common/QuestionBadge';

interface ClientRowProps {
  clientData: ClientWithMetadata;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * ClientRow - Individual client list item in sidebar
 * Shows: name, schedule badge, step indicator (n/5), question badge, status color
 */
function ClientRow({ clientData, isSelected, onClick }: ClientRowProps) {
  const { client, pipelineStatus, currentStep, openQuestionCount, schedule } = clientData;

  return (
    <div
      className={`client-row ${isSelected ? 'client-row--selected' : ''}`}
      onClick={onClick}
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        borderBottom: '1px solid #34495e',
        backgroundColor: isSelected ? '#34495e' : 'transparent',
        transition: 'background-color 0.15s ease',
      }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`Select client ${client.name}`}
      aria-pressed={isSelected}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <StatusBadge status={pipelineStatus} />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#ecf0f1',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {client.name}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '20px' }}>
        <ScheduleBadge schedule={schedule} />
        <span
          style={{
            fontSize: '12px',
            color: '#95a5a6',
          }}
        >
          {currentStep}/5
        </span>
        <QuestionBadge count={openQuestionCount} />
      </div>
    </div>
  );
}

export default ClientRow;
