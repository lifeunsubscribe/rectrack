import type { AccountNote } from '../../types';
import UserNoteRow from './UserNoteRow';

interface UserNotesProps {
  notes: AccountNote[];
}

/**
 * User notes section
 * Displays freeform notes added by users
 * Filters to show only user_note type
 */
export default function UserNotes({ notes }: UserNotesProps) {
  const userNotes = notes.filter((note) => note.note_type === 'user_note');

  if (userNotes.length === 0) {
    return null;
  }

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
        User Notes
      </h3>
      <div>
        {userNotes.map((note) => (
          <UserNoteRow key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
