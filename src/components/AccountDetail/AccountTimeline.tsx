import type { TimelineEvent as TimelineEventType } from '../../types';
import TimelineEvent from './TimelineEvent';

interface AccountTimelineProps {
  events: TimelineEventType[];
}

/**
 * Account timeline section
 * Shows events related to this account
 * Events are sorted by timestamp (most recent first)
 */
export default function AccountTimeline({ events }: AccountTimelineProps) {
  if (events.length === 0) {
    return null;
  }

  // Sort events by timestamp descending
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #ecf0f1',
        borderRadius: '6px',
        marginBottom: '24px',
        overflow: 'hidden',
      }}
    >
      <h3
        style={{
          margin: '0',
          padding: '16px 20px',
          fontSize: '16px',
          color: '#2c3e50',
          fontWeight: '600',
          borderBottom: '1px solid #ecf0f1',
        }}
      >
        Account Timeline
      </h3>
      <div>
        {sortedEvents.map((event) => (
          <TimelineEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
