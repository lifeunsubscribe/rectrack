import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserNoteRow from './UserNoteRow';
import type { AccountNote } from '../../types';

describe('UserNoteRow', () => {
  it('renders note content correctly', () => {
    const note: AccountNote = {
      id: '1',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'This is a test note about the account',
      created_by: 'user-alice',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText('This is a test note about the account')).toBeInTheDocument();
  });

  it('displays author name with proper capitalization', () => {
    const note: AccountNote = {
      id: '2',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'Test content',
      created_by: 'user-bob',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText(/Added by Bob/i)).toBeInTheDocument();
  });

  it('capitalizes first letter of author name', () => {
    const note: AccountNote = {
      id: '3',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'Test content',
      created_by: 'user-charlie',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText('Added by Charlie')).toBeInTheDocument();
  });

  it('displays Unknown when created_by is undefined', () => {
    const note: AccountNote = {
      id: '4',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'Test content',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText('Added by Unknown')).toBeInTheDocument();
  });

  it('handles empty created_by string', () => {
    const note: AccountNote = {
      id: '5',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'Test content',
      created_by: '',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText('Added by Unknown')).toBeInTheDocument();
  });

  it('handles created_by without user- prefix', () => {
    const note: AccountNote = {
      id: '6',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'Test content',
      created_by: 'david',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText('Added by David')).toBeInTheDocument();
  });

  it('renders note content with multiple lines', () => {
    const note: AccountNote = {
      id: '7',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'Line 1\nLine 2\nLine 3',
      created_by: 'user-eve',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText((_content, element) => {
      return element?.textContent === 'Line 1\nLine 2\nLine 3';
    })).toBeInTheDocument();
  });

  it('renders note with special characters in content', () => {
    const note: AccountNote = {
      id: '8',
      account_id: 'acc-1',
      note_type: 'user_note',
      content: 'Note with special chars: @#$%^&*()',
      created_by: 'user-frank',
    };

    render(<UserNoteRow note={note} />);

    expect(screen.getByText('Note with special chars: @#$%^&*()')).toBeInTheDocument();
  });
});
