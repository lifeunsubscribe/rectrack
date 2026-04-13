import type { Account } from '../../types';
import TypeIcon from '../common/TypeIcon';

interface AccountRowProps {
  account: Account;
  onClick: (accountId: string) => void;
}

/**
 * AccountRow - Clickable row showing account type, institution, dates, and access info
 * Provides visual feedback on hover
 */
function AccountRow({ account, onClick }: AccountRowProps) {
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Compute account status based on reconciliation progress
  // Grey: No rec_through_date (not started)
  // Green: rec_through_date >= close_date (fully reconciled)
  // Blue: In progress (default)
  const getStatus = (): { label: string; color: string } => {
    if (!account.rec_through_date) return { label: 'Not Started', color: '#95a5a6' };
    if (!account.close_date) return { label: 'In Progress', color: '#3498db' };

    const recDate = new Date(account.rec_through_date);
    const closeDate = new Date(account.close_date);

    if (recDate >= closeDate) {
      return { label: 'Reconciled', color: '#27ae60' };
    }
    return { label: 'In Progress', color: '#3498db' };
  };

  const status = getStatus();

  return (
    <div
      className="account-row"
      onClick={() => onClick(account.id)}
      role="button"
      tabIndex={0}
      aria-label={`View ${account.institution_name} ${account.type} account details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(account.id);
        }
      }}
    >
      <div className="account-row__type">
        <TypeIcon type={account.type} size={20} />
      </div>
      <div className="account-row__institution">{account.institution_name}</div>
      <div className="account-row__close-date">{formatDate(account.close_date)}</div>
      <div className="account-row__rec-date">{formatDate(account.rec_through_date)}</div>
      <div className="account-row__access">{account.access_method || '—'}</div>
      <div className="account-row__status">
        <span
          className="account-row__status-pill"
          style={{ backgroundColor: status.color }}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}

export default AccountRow;
