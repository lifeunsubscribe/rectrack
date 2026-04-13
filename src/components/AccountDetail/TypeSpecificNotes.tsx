import type { AccountType } from '../../types';

interface TypeSpecificNotesProps {
  accountType: AccountType;
  content?: string;
}

/**
 * Type-specific notes panel
 * Displays seeded content per account type from mock data
 * Supports markdown-style formatting in content
 */
export default function TypeSpecificNotes({ accountType, content }: TypeSpecificNotesProps) {
  if (!content) {
    return null;
  }

  // Simple markdown-style formatting for **bold** text
  // Converts **Label:** text to formatted label/value pairs
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Check if line starts with ** and contains a colon (label pattern)
      if (line.trim().startsWith('**') && line.includes(':**')) {
        // This is a label line like "**Institution:** First National Bank"
        // Extract label and value using regex
        const match = line.match(/\*\*(.+?):\*\*(.+)/);
        if (match) {
          return (
            <div key={index} style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#2c3e50' }}>{match[1]}:</strong>
              <span style={{ color: '#34495e' }}>{match[2]}</span>
            </div>
          );
        }
      }
      // Regular line (not a label)
      if (line.trim()) {
        return (
          <div key={index} style={{ marginBottom: '8px', color: '#34495e' }}>
            {line}
          </div>
        );
      }
      // Empty line for spacing between sections
      return <div key={index} style={{ height: '8px' }} />;
    });
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '6px',
        padding: '20px',
        marginBottom: '24px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
        {accountType.charAt(0).toUpperCase() + accountType.slice(1).replace('_', ' ')} Account Notes
      </h3>
      <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
        {formatContent(content)}
      </div>
    </div>
  );
}
