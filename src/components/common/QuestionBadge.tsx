interface QuestionBadgeProps {
  count: number;
}

/**
 * QuestionBadge - Shows open question count with visual indicator
 */
function QuestionBadge({ count }: QuestionBadgeProps) {
  if (count === 0) {
    return null;
  }

  return (
    <span
      className="question-badge"
      style={{
        backgroundColor: '#3B82F6',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: 600,
        padding: '2px 6px',
        borderRadius: '10px',
        minWidth: '18px',
        textAlign: 'center',
        display: 'inline-block',
      }}
      title={`${count} open question${count !== 1 ? 's' : ''}`}
      aria-label={`${count} open questions`}
    >
      {count}
    </span>
  );
}

export default QuestionBadge;
