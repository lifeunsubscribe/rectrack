import { useState } from 'react';
import { useClientFilter } from '../../hooks/useClientFilter';
import type { Client, ChecklistPeriod, Question, Account, Schedule } from '../../types';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import ClientRow from './ClientRow';
import '../../styles/sidebar.css';

interface ClientListProps {
  clients: Client[];
  checklists: ChecklistPeriod[];
  questions: Question[];
  accounts: Account[];
  schedules: Schedule[];
  // Optional controlled selection. When both are provided, the parent owns
  // selection state; otherwise ClientList manages it internally.
  selectedClientId?: string | null;
  onSelectClient?: (clientId: string) => void;
}

/**
 * ClientList - Scrollable client list with search and filter controls
 * Container component that manages client selection and filtering
 */
function ClientList({
  clients,
  checklists,
  questions,
  accounts,
  schedules,
  selectedClientId: controlledSelectedId,
  onSelectClient,
}: ClientListProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const isControlled = controlledSelectedId !== undefined && onSelectClient !== undefined;
  const selectedClientId = isControlled ? controlledSelectedId : internalSelectedId;
  const handleSelect = (clientId: string) => {
    if (isControlled) {
      onSelectClient!(clientId);
    } else {
      setInternalSelectedId(clientId);
    }
  };

  const {
    filteredClients,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    scheduleFilter,
    setScheduleFilter,
    showArchived,
    setShowArchived,
  } = useClientFilter({
    clients,
    checklists,
    questions,
    accounts,
    schedules,
  });

  return (
    <div className="client-list" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="client-list__header" style={{ padding: '20px 16px 12px 16px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600, color: '#ecf0f1' }}>
          Clients
        </h2>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <FilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        scheduleFilter={scheduleFilter}
        onScheduleFilterChange={setScheduleFilter}
        schedules={schedules}
        showArchived={showArchived}
        onShowArchivedChange={setShowArchived}
      />

      <div
        className="client-list__items"
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {filteredClients.length === 0 ? (
          <div
            style={{
              padding: '20px 16px',
              textAlign: 'center',
              fontSize: '14px',
              color: '#95a5a6',
            }}
          >
            No clients found
          </div>
        ) : (
          filteredClients.map((clientData) => (
            <ClientRow
              key={clientData.client.id}
              clientData={clientData}
              isSelected={clientData.client.id === selectedClientId}
              onClick={() => handleSelect(clientData.client.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ClientList;
