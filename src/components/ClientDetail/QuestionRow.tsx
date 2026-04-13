import type { QuestionStatus } from '../../types';

interface QuestionRowProps {
  id: string;
  text: string;
  status: QuestionStatus;
  resolvedBy?: string;
  resolvedAt?: string;
  onToggleStatus: (id: string) => void;
}

/**
 * QuestionRow - Single question with text and status toggle
 * Shows resolver and timestamp when resolved
 */
function QuestionRow({
  id,
  text,
  status,
  resolvedBy,
  resolvedAt,
  onToggleStatus,
}: QuestionRowProps) {
  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className={`question-row question-row--${status}`}>
      <div className="question-row__content">
        <p className="question-row__text">{text}</p>
        {status === 'resolved' && resolvedBy && resolvedAt && (
          <div className="question-row__meta">
            Resolved by {resolvedBy} on {formatTimestamp(resolvedAt)}
          </div>
        )}
      </div>
      <button
        className={`question-row__toggle question-row__toggle--${status}`}
        onClick={() => onToggleStatus(id)}
        title={status === 'open' ? 'Mark as resolved' : 'Reopen question'}
        aria-pressed={status === 'resolved'}
      >
        {status === 'open' ? 'Open' : 'Resolved'}
      </button>
    </div>
  );
}

export default QuestionRow;
