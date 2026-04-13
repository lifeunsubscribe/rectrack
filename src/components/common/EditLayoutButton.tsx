interface EditLayoutButtonProps {
  onClick: () => void;
}

/**
 * Button to trigger the panel edit modal
 * Used in account detail view to customize field visibility
 */
export default function EditLayoutButton({ onClick }: EditLayoutButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        backgroundColor: '#ecf0f1',
        color: '#2c3e50',
        fontSize: '14px',
        fontWeight: '500',
        borderRadius: '4px',
        border: '1px solid #bdc3c7',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#d5dbdb';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ecf0f1';
      }}
    >
      Edit Layout
    </button>
  );
}
