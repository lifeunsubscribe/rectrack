import { useState } from 'react';
import { mockAccounts } from '../../data/mockAccounts';
import { mockClients } from '../../data/mockClients';
import { mockNotes } from '../../data/mockNotes';
import { mockTimeline } from '../../data/mockTimeline';
import { useFieldPreferences } from '../../hooks/useFieldPreferences';
import AccountBreadcrumb from './AccountBreadcrumb';
import AccountMetadata from './AccountMetadata';
import BankPortalButton from './BankPortalButton';
import TypeSpecificNotes from './TypeSpecificNotes';
import UserNotes from './UserNotes';
import AccountTimeline from './AccountTimeline';
import PanelEditModal from './PanelEditModal';
import EditLayoutButton from '../common/EditLayoutButton';

interface AccountDetailProps {
  accountId: string;
  onNavigateToClient: () => void;
}

/**
 * Full-page account detail view
 * Displays account metadata, bank portal button, type-specific notes,
 * user notes, timeline, and Edit Layout functionality
 */
export default function AccountDetail({ accountId, onNavigateToClient }: AccountDetailProps) {
  // Modal state for Edit Layout panel
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch account data from mock store
  // In production, this would be a data fetching hook
  const account = mockAccounts.find((a) => a.id === accountId);
  const client = account ? mockClients.find((c) => c.id === account.client_id) : undefined;

  // Get field preferences for this account type
  // Preferences are per-user, per-account-type in production
  const { preferences, visibleFields, toggleFieldVisibility, resetToDefaults } = useFieldPreferences(
    account?.type || 'checking'
  );

  // Filter notes for this account, separating type-specific from user notes
  const accountNotes = mockNotes.filter((n) => n.account_id === accountId);
  const typeSpecificNote = accountNotes.find((n) => n.note_type === 'type_specific');
  const userNotes = accountNotes.filter((n) => n.note_type === 'user_note');

  // Get timeline events scoped to this specific account
  // Timeline shows account creation, updates, and related checklist events
  const accountEvents = mockTimeline.filter(
    (e) => e.entity_type === 'account' && e.entity_id === accountId
  );

  if (!account || !client) {
    return (
      <div style={{ padding: '24px' }}>
        <div style={{ color: '#e74c3c', fontSize: '16px' }}>
          Account not found
        </div>
      </div>
    );
  }

  // Generate account display name
  const accountDisplayName = `${account.institution_name} ${account.type.charAt(0).toUpperCase() + account.type.slice(1).replace(/_/g, ' ')}`;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      {/* Breadcrumb */}
      <AccountBreadcrumb
        clientName={client.name}
        accountName={accountDisplayName}
        onClientClick={onNavigateToClient}
      />

      {/* Header with Edit Layout button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: '#2c3e50', fontWeight: '600' }}>
          {accountDisplayName}
        </h1>
        <EditLayoutButton onClick={() => setIsModalOpen(true)} />
      </div>

      {/* Bank Portal Button */}
      {account.bank_url && (
        <div style={{ marginBottom: '24px' }}>
          <BankPortalButton bankUrl={account.bank_url} />
        </div>
      )}

      {/* Access Method */}
      {account.access_method && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#856404',
          }}
        >
          <strong>Access Method:</strong> {account.access_method}
        </div>
      )}

      {/* Account Metadata */}
      <AccountMetadata account={account} visibleFields={visibleFields} />

      {/* Type-Specific Notes */}
      {typeSpecificNote && (
        <TypeSpecificNotes
          accountType={account.type}
          content={typeSpecificNote.content}
        />
      )}

      {/* User Notes */}
      {userNotes.length > 0 && <UserNotes notes={userNotes} />}

      {/* Account Timeline */}
      {accountEvents.length > 0 && <AccountTimeline events={accountEvents} />}

      {/* Panel Edit Modal */}
      <PanelEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preferences={preferences}
        onToggleField={toggleFieldVisibility}
        onReset={resetToDefaults}
      />
    </div>
  );
}
