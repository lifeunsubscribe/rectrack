import type { Schedule } from '../../types';

interface ScheduleBadgeProps {
  schedule: Schedule | undefined;
}

/**
 * ScheduleBadge - Displays Monthly/Quarterly schedule indicator
 */
function ScheduleBadge({ schedule }: ScheduleBadgeProps) {
  if (!schedule) {
    return null;
  }

  return (
    <span
      className="schedule-badge"
      style={{
        fontSize: '11px',
        color: '#95a5a6',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {schedule.name.charAt(0)}
    </span>
  );
}

export default ScheduleBadge;
