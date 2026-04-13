import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserNotes from './UserNotes';
import type { AccountNote } from '../../types';

describe('UserNotes', () => {
  it('renders User Notes heading when notes exist', () => {
    const notes: AccountNote[] = [
      {
        id: '1',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'First note',
        created_by: 'user-alice',
      },
    ];

    render(<UserNotes notes={notes} />);

    expect(screen.getByText('User Notes')).toBeInTheDocument();
  });

  it('renders multiple notes correctly', () => {
    const notes: AccountNote[] = [
      {
        id: '1',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'First note',
        created_by: 'user-alice',
      },
      {
        id: '2',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Second note',
        created_by: 'user-bob',
      },
      {
        id: '3',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Third note',
        created_by: 'user-charlie',
      },
    ];

    render(<UserNotes notes={notes} />);

    expect(screen.getByText('First note')).toBeInTheDocument();
    expect(screen.getByText('Second note')).toBeInTheDocument();
    expect(screen.getByText('Third note')).toBeInTheDocument();
  });

  it('does not render when notes array is empty', () => {
    const { container } = render(<UserNotes notes={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders each note with correct author', () => {
    const notes: AccountNote[] = [
      {
        id: '1',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Note by Alice',
        created_by: 'user-alice',
      },
      {
        id: '2',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Note by Bob',
        created_by: 'user-bob',
      },
    ];

    render(<UserNotes notes={notes} />);

    expect(screen.getByText('Note by Alice')).toBeInTheDocument();
    expect(screen.getByText(/Added by Alice/i)).toBeInTheDocument();
    expect(screen.getByText('Note by Bob')).toBeInTheDocument();
    expect(screen.getByText(/Added by Bob/i)).toBeInTheDocument();
  });

  it('renders single note correctly', () => {
    const notes: AccountNote[] = [
      {
        id: '1',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Only one note',
        created_by: 'user-dave',
      },
    ];

    render(<UserNotes notes={notes} />);

    expect(screen.getByText('User Notes')).toBeInTheDocument();
    expect(screen.getByText('Only one note')).toBeInTheDocument();
    expect(screen.getByText(/Added by Dave/i)).toBeInTheDocument();
  });

  it('preserves note order from array', () => {
    const notes: AccountNote[] = [
      {
        id: '3',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Third',
        created_by: 'user-charlie',
      },
      {
        id: '1',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'First',
        created_by: 'user-alice',
      },
      {
        id: '2',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Second',
        created_by: 'user-bob',
      },
    ];

    render(<UserNotes notes={notes} />);

    // Verify all three notes are present in the rendered output
    expect(screen.getByText('Third')).toBeInTheDocument();
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders notes with undefined created_by', () => {
    const notes: AccountNote[] = [
      {
        id: '1',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Anonymous note',
      },
    ];

    render(<UserNotes notes={notes} />);

    expect(screen.getByText('Anonymous note')).toBeInTheDocument();
    expect(screen.getByText('Added by Unknown')).toBeInTheDocument();
  });

  it('uses note id as key for rendering', () => {
    const notes: AccountNote[] = [
      {
        id: 'unique-id-1',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Note 1',
        created_by: 'user-alice',
      },
      {
        id: 'unique-id-2',
        account_id: 'acc-1',
        note_type: 'user_note',
        content: 'Note 2',
        created_by: 'user-bob',
      },
    ];

    render(<UserNotes notes={notes} />);

    // Component should render without warnings about duplicate keys
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
  });
});
