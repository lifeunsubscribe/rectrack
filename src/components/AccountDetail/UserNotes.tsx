import type { AccountNote } from '../../types';
import UserNoteRow from './UserNoteRow';

interface UserNotesProps {
  notes: AccountNote[];
}

/**
 * User notes section
 * Displays freeform notes added by users
 * Expects pre-filtered user_note type notes from parent
 */
export default function UserNotes({ notes }: UserNotesProps) {
  if (notes.length === 0) {
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
        {notes.map((note) => (
          <UserNoteRow key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
