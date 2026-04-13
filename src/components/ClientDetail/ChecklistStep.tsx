interface ChecklistStepProps {
  stepNumber: number;
  label: string;
  isComplete: boolean;
  completedBy?: string;
  completedAt?: string;
  onToggle: (stepNumber: number) => void;
}

/**
 * ChecklistStep - Individual checklist step with toggle, label, and completion metadata
 * Shows completing user name and timestamp when complete
 */
function ChecklistStep({
  stepNumber,
  label,
  isComplete,
  completedBy,
  completedAt,
  onToggle,
}: ChecklistStepProps) {
  // Format timestamp to readable date/time
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
    <div className="checklist-step">
      <div className="checklist-step__header">
        <input
          type="checkbox"
          id={`step-${stepNumber}`}
          checked={isComplete}
          onChange={() => onToggle(stepNumber)}
          className="checklist-step__checkbox"
        />
        <label htmlFor={`step-${stepNumber}`} className="checklist-step__label">
          <span className="checklist-step__number">{stepNumber}.</span>
          <span className="checklist-step__text">{label}</span>
        </label>
      </div>
      {isComplete && completedBy && completedAt && (
        <div className="checklist-step__meta">
          Completed by {completedBy} on {formatTimestamp(completedAt)}
        </div>
      )}
    </div>
  );
}

export default ChecklistStep;
