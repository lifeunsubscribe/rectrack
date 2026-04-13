import type { Client, Account, ChecklistPeriod, Question, Schedule } from '../../types';
import ClientHeader from './ClientHeader';
import AccountsTable from './AccountsTable';
import ChecklistPanel from './ChecklistPanel';
import QuestionsPanel from './QuestionsPanel';
import '../../styles/clientDetail.css';

interface ClientDetailProps {
  client: Client;
  accounts: Account[];
  checklist: ChecklistPeriod | null;
  questions: Question[];
  schedule: Schedule | null;
}

/**
 * ClientDetail - Main client detail view container
 * Orchestrates header, accounts table, checklist, and questions panels
 * Displays when a client is selected in the sidebar
 */
function ClientDetail({
  client,
  accounts,
  checklist,
  questions,
  schedule,
}: ClientDetailProps) {
  // Derive current period from checklist or default to current month
  const currentPeriod = checklist?.period || new Date().toISOString().slice(0, 7); // YYYY-MM format

  // Count open questions for header badge
  const openQuestionCount = questions.filter((q) => q.status === 'open').length;

  return (
    <div className="client-detail">
      <ClientHeader
        client={client}
        schedule={schedule}
        openQuestionCount={openQuestionCount}
      />

      <div className="client-detail__content">
        <div className="client-detail__section">
          <AccountsTable accounts={accounts} />
        </div>

        <div className="client-detail__section">
          <ChecklistPanel checklist={checklist} currentPeriod={currentPeriod} />
        </div>

        <div className="client-detail__section">
          <QuestionsPanel questions={questions} />
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
