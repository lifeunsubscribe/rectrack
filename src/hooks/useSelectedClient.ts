import { useMemo } from 'react';
import type { Client, Account, ChecklistPeriod, Question, Schedule } from '../types';

interface UseSelectedClientParams {
  selectedClientId: string | null;
  clients: Client[];
  accounts: Account[];
  checklists: ChecklistPeriod[];
  questions: Question[];
  schedules: Schedule[];
}

interface SelectedClientData {
  client: Client;
  accounts: Account[];
  checklist: ChecklistPeriod | null;
  questions: Question[];
  schedule: Schedule | null;
}

/**
 * useSelectedClient - Derives full client data from selected client ID
 * Returns null if no client is selected or client not found
 */
export function useSelectedClient({
  selectedClientId,
  clients,
  accounts,
  checklists,
  questions,
  schedules,
}: UseSelectedClientParams): SelectedClientData | null {
  return useMemo(() => {
    if (!selectedClientId) return null;

    const client = clients.find((c) => c.id === selectedClientId);
    if (!client) return null;

    const clientAccounts = accounts.filter((a) => a.client_id === selectedClientId && !a.archived);
    const clientChecklist = checklists.find((ch) => ch.client_id === selectedClientId) || null;
    const clientQuestions = questions.filter((q) => q.client_id === selectedClientId);
    const clientSchedule = client.schedule_id
      ? schedules.find((s) => s.id === client.schedule_id) || null
      : null;

    return {
      client,
      accounts: clientAccounts,
      checklist: clientChecklist,
      questions: clientQuestions,
      schedule: clientSchedule,
    };
  }, [selectedClientId, clients, accounts, checklists, questions, schedules]);
}
