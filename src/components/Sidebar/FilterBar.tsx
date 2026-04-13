import type { PipelineStatus, Schedule } from '../../types';

interface FilterBarProps {
  statusFilter: PipelineStatus | 'all';
  onStatusFilterChange: (status: PipelineStatus | 'all') => void;
  scheduleFilter: string | 'all';
  onScheduleFilterChange: (scheduleId: string | 'all') => void;
  schedules: Schedule[];
  showArchived: boolean;
  onShowArchivedChange: (show: boolean) => void;
}

/**
 * FilterBar - Dropdown controls for filtering clients by status and schedule
 */
function FilterBar({
  statusFilter,
  onStatusFilterChange,
  scheduleFilter,
  onScheduleFilterChange,
  schedules,
  showArchived,
  onShowArchivedChange,
}: FilterBarProps) {
  const selectStyles: React.CSSProperties = {
    padding: '6px 8px',
    fontSize: '13px',
    border: '1px solid #34495e',
    borderRadius: '4px',
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    outline: 'none',
    cursor: 'pointer',
  };

  return (
    <div className="filter-bar" style={{ padding: '0 16px 12px 16px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as PipelineStatus | 'all')}
          style={{ ...selectStyles, flex: 1 }}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="grey">Grey</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
        </select>

        <select
          value={scheduleFilter}
          onChange={(e) => onScheduleFilterChange(e.target.value)}
          style={{ ...selectStyles, flex: 1 }}
          aria-label="Filter by schedule"
        >
          <option value="all">All Schedules</option>
          {schedules.map((schedule) => (
            <option key={schedule.id} value={schedule.id}>
              {schedule.name}
            </option>
          ))}
        </select>
      </div>

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: '#95a5a6',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={showArchived}
          onChange={(e) => onShowArchivedChange(e.target.checked)}
          style={{ cursor: 'pointer' }}
        />
        Show archived
      </label>
    </div>
  );
}

export default FilterBar;
