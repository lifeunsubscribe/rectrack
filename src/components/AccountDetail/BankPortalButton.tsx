interface BankPortalButtonProps {
  bankUrl?: string;
}

/**
 * Prominent "Open Portal" button for bank URL
 * Opens in new tab when clicked
 */
export default function BankPortalButton({ bankUrl }: BankPortalButtonProps) {
  if (!bankUrl) {
    return null;
  }

  return (
    <a
      href={bankUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#3498db',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: '600',
        borderRadius: '6px',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2980b9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#3498db';
      }}
    >
      Open Bank Portal →
    </a>
  );
}
