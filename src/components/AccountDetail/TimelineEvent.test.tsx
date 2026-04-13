import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimelineEvent from './TimelineEvent';
import type { TimelineEvent as TimelineEventType } from '../../types';

describe('TimelineEvent', () => {
  const mockEvent: TimelineEventType = {
    id: 'event-1',
    entity_type: 'account',
    entity_id: 'account-1',
    action: 'account.created',
    performed_by: 'user-sarah',
    timestamp: '2024-01-15T10:30:00Z',
    client_id: 'client-1',
  };

  it('renders event action formatted correctly', () => {
    render(<TimelineEvent event={mockEvent} />);
    expect(screen.getByText('Account Created')).toBeInTheDocument();
  });

  it('renders performer name formatted correctly', () => {
    render(<TimelineEvent event={mockEvent} />);
    expect(screen.getByText(/by Sarah/i)).toBeInTheDocument();
  });

  it('formats timestamp in readable format', () => {
    render(<TimelineEvent event={mockEvent} />);
    // The exact format depends on locale, but should include month and year
    expect(screen.getByText(/Jan.*2024/i)).toBeInTheDocument();
  });

  it('displays "System" when performed_by is undefined', () => {
    const eventWithoutPerformer: TimelineEventType = {
      ...mockEvent,
      performed_by: undefined,
    };
    render(<TimelineEvent event={eventWithoutPerformer} />);
    expect(screen.getByText(/by System/i)).toBeInTheDocument();
  });

  it('formats action with underscores correctly', () => {
    const eventWithUnderscores: TimelineEventType = {
      ...mockEvent,
      action: 'status_changed',
    };
    render(<TimelineEvent event={eventWithUnderscores} />);
    expect(screen.getByText('Status Changed')).toBeInTheDocument();
  });

  it('formats action with dots correctly', () => {
    const eventWithDots: TimelineEventType = {
      ...mockEvent,
      action: 'account.status.updated',
    };
    render(<TimelineEvent event={eventWithDots} />);
    expect(screen.getByText('Account Status Updated')).toBeInTheDocument();
  });

  it('handles complex performer IDs', () => {
    const eventWithComplexPerformer: TimelineEventType = {
      ...mockEvent,
      performed_by: 'user-john-doe',
    };
    render(<TimelineEvent event={eventWithComplexPerformer} />);
    expect(screen.getByText(/by John-doe/i)).toBeInTheDocument();
  });
});
