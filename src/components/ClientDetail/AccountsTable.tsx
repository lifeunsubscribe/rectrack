import type { Account } from '../../types';
import AccountRow from './AccountRow';

interface AccountsTableProps {
  accounts: Account[];
  onAccountClick?: (accountId: string) => void;
}

/**
 * AccountsTable - Table of client accounts with headers and clickable rows
 */
function AccountsTable({ accounts, onAccountClick }: AccountsTableProps) {
  const handleAccountClick = (accountId: string) => {
    onAccountClick?.(accountId);
  };

  if (accounts.length === 0) {
    return (
      <div className="accounts-table">
        <h3 className="accounts-table__title">Accounts</h3>
        <div className="accounts-table__empty">No accounts for this client</div>
      </div>
    );
  }

  return (
    <div className="accounts-table">
      <h3 className="accounts-table__title">Accounts ({accounts.length})</h3>
      <div className="accounts-table__container">
        <div className="accounts-table__header">
          <div className="accounts-table__header-cell accounts-table__header-cell--type">Type</div>
          <div className="accounts-table__header-cell accounts-table__header-cell--institution">Institution</div>
          <div className="accounts-table__header-cell accounts-table__header-cell--close-date">Close Date</div>
          <div className="accounts-table__header-cell accounts-table__header-cell--rec-date">Rec Through</div>
          <div className="accounts-table__header-cell accounts-table__header-cell--access">Access Method</div>
          <div className="accounts-table__header-cell accounts-table__header-cell--status">Status</div>
        </div>
        <div className="accounts-table__body">
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              onClick={handleAccountClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountsTable;
