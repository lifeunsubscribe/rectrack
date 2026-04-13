import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccountTimeline from './AccountTimeline';
import type { TimelineEvent } from '../../types';

describe('AccountTimeline', () => {
  const mockEvents: TimelineEvent[] = [
    {
      id: 'event-1',
      entity_type: 'account',
      entity_id: 'account-1',
      action: 'account.created',
      performed_by: 'user-sarah',
      timestamp: '2024-01-15T10:30:00Z',
      client_id: 'client-1',
    },
    {
      id: 'event-2',
      entity_type: 'account',
      entity_id: 'account-1',
      action: 'status.updated',
      performed_by: 'user-john',
      timestamp: '2024-01-20T14:45:00Z',
      client_id: 'client-1',
    },
    {
      id: 'event-3',
      entity_type: 'account',
      entity_id: 'account-1',
      action: 'balance.updated',
      performed_by: 'user-jane',
      timestamp: '2024-01-10T08:15:00Z',
      client_id: 'client-1',
    },
  ];

  it('renders timeline with all events', () => {
    render(<AccountTimeline events={mockEvents} />);
    expect(screen.getByText('Account Timeline')).toBeInTheDocument();
    expect(screen.getByText('Account Created')).toBeInTheDocument();
    expect(screen.getByText('Status Updated')).toBeInTheDocument();
    expect(screen.getByText('Balance Updated')).toBeInTheDocument();
  });

  it('sorts events by timestamp in descending order (most recent first)', () => {
    render(<AccountTimeline events={mockEvents} />);

    const eventElements = screen.getAllByText(/by/i);
    // event-2 (Jan 20) should come before event-1 (Jan 15), which should come before event-3 (Jan 10)
    expect(eventElements[0]).toHaveTextContent('by John');
    expect(eventElements[1]).toHaveTextContent('by Sarah');
    expect(eventElements[2]).toHaveTextContent('by Jane');
  });

  it('does not render when events array is empty', () => {
    const { container } = render(<AccountTimeline events={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders single event correctly', () => {
    const singleEvent = [mockEvents[0]];
    render(<AccountTimeline events={singleEvent} />);

    expect(screen.getByText('Account Timeline')).toBeInTheDocument();
    expect(screen.getByText('Account Created')).toBeInTheDocument();
    expect(screen.queryByText('Status Updated')).not.toBeInTheDocument();
  });

  it('does not mutate original events array when sorting', () => {
    const eventsCopy = [...mockEvents];
    render(<AccountTimeline events={mockEvents} />);

    // Verify original array order hasn't changed
    expect(mockEvents[0].id).toBe(eventsCopy[0].id);
    expect(mockEvents[1].id).toBe(eventsCopy[1].id);
    expect(mockEvents[2].id).toBe(eventsCopy[2].id);
  });

  it('handles events with identical timestamps', () => {
    const identicalTimestampEvents: TimelineEvent[] = [
      {
        id: 'event-1',
        entity_type: 'account',
        entity_id: 'account-1',
        action: 'first.action',
        timestamp: '2024-01-15T10:30:00Z',
        client_id: 'client-1',
      },
      {
        id: 'event-2',
        entity_type: 'account',
        entity_id: 'account-1',
        action: 'second.action',
        timestamp: '2024-01-15T10:30:00Z',
        client_id: 'client-1',
      },
    ];

    render(<AccountTimeline events={identicalTimestampEvents} />);
    expect(screen.getByText('Account Timeline')).toBeInTheDocument();
    expect(screen.getByText('First Action')).toBeInTheDocument();
    expect(screen.getByText('Second Action')).toBeInTheDocument();
  });
});
