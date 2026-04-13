import type { Client, Schedule } from '../../types';
import ScheduleBadge from '../common/ScheduleBadge';
import QuestionBadge from '../common/QuestionBadge';

interface ClientHeaderProps {
  client: Client;
  schedule: Schedule | null;
  openQuestionCount: number;
}

/**
 * ClientHeader - Client metadata header with name, email, schedule, and edit button
 * Shows open question count badge when > 0
 * Edit button is non-functional placeholder
 */
function ClientHeader({ client, schedule, openQuestionCount }: ClientHeaderProps) {
  return (
    <div className="client-header">
      <div className="client-header__main">
        <div className="client-header__title-row">
          <h2 className="client-header__name">{client.name}</h2>
          {openQuestionCount > 0 && (
            <QuestionBadge count={openQuestionCount} />
          )}
        </div>
        <div className="client-header__meta">
          {client.email && (
            <a href={`mailto:${client.email}`} className="client-header__email">
              {client.email}
            </a>
          )}
          {schedule && (
            <div className="client-header__schedule">
              <ScheduleBadge schedule={schedule} />
            </div>
          )}
        </div>
      </div>
      <button
        className="client-header__edit-btn"
        onClick={() => alert('Edit client feature coming soon (demo placeholder)')}
      >
        Edit Client
      </button>
    </div>
  );
}

export default ClientHeader;
