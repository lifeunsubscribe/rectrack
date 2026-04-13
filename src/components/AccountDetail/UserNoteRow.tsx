import type { AccountNote } from '../../types';

interface UserNoteRowProps {
  note: AccountNote;
}

/**
 * Individual user note row
 * Displays note content, author, and timestamp (if available)
 */
export default function UserNoteRow({ note }: UserNoteRowProps) {
  // Get author display name (simplified for demo)
  const authorName = note.created_by?.replace('user-', '') || 'Unknown';
  const authorDisplay = authorName.charAt(0).toUpperCase() + authorName.slice(1);

  return (
    <div
      style={{
        padding: '12px',
        borderBottom: '1px solid #ecf0f1',
        backgroundColor: '#fefefe',
      }}
    >
      <div style={{ fontSize: '14px', color: '#2c3e50', marginBottom: '8px' }}>
        {note.content}
      </div>
      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
        Added by {authorDisplay}
      </div>
    </div>
  );
}
