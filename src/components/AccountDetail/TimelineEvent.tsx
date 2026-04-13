import type { TimelineEvent as TimelineEventType } from '../../types';

interface TimelineEventProps {
  event: TimelineEventType;
}

/**
 * Individual timeline event row
 * Displays action, performer, and timestamp
 */
export default function TimelineEvent({ event }: TimelineEventProps) {
  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Format action to be more readable
  const formatAction = (action: string) => {
    return action
      .replace(/\./g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get performer display name (simplified for demo)
  const performerName = event.performed_by?.replace('user-', '') || 'System';
  const performerDisplay = performerName.charAt(0).toUpperCase() + performerName.slice(1);

  return (
    <div
      style={{
        padding: '12px',
        borderBottom: '1px solid #ecf0f1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', color: '#2c3e50', marginBottom: '4px' }}>
          {formatAction(event.action)}
        </div>
        <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
          by {performerDisplay}
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#95a5a6', whiteSpace: 'nowrap', marginLeft: '16px' }}>
        {formatTimestamp(event.timestamp)}
      </div>
    </div>
  );
}
