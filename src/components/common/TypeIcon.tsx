import type { AccountType } from '../../types';

interface TypeIconProps {
  type: AccountType;
  size?: number;
}

/**
 * TypeIcon - Account type icon indicator
 * Visual icons for each account type (checking, savings, loan, investment, credit_card, mortgage)
 */
function TypeIcon({ type, size = 20 }: TypeIconProps) {
  const iconColor = '#34495e';

  // Simple geometric icons for each account type
  const icons: Record<AccountType, JSX.Element> = {
    checking: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    savings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    credit_card: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="14" x2="10" y2="14" />
      </svg>
    ),
    loan: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    investment: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    mortgage: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  };

  return (
    <div className="type-icon" title={`Account type: ${type}`} aria-label={`${type} account`}>
      {icons[type]}
    </div>
  );
}

export default TypeIcon;
