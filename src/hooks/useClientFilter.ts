import { useState, useMemo } from 'react';
import type { Client, ChecklistPeriod, Question, Account, Schedule, PipelineStatus } from '../types';
import { getPipelineStatus } from '../utils/pipelineStatus';

export interface ClientWithMetadata {
  client: Client;
  pipelineStatus: PipelineStatus;
  currentStep: number;
  openQuestionCount: number;
  schedule: Schedule | undefined;
}

interface UseClientFilterProps {
  clients: Client[];
  checklists: ChecklistPeriod[];
  questions: Question[];
  accounts: Account[];
  schedules: Schedule[];
}

interface UseClientFilterReturn {
  filteredClients: ClientWithMetadata[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: PipelineStatus | 'all';
  setStatusFilter: (status: PipelineStatus | 'all') => void;
  scheduleFilter: string | 'all';
  setScheduleFilter: (scheduleId: string | 'all') => void;
  showArchived: boolean;
  setShowArchived: (show: boolean) => void;
}

/**
 * Custom hook for managing client search and filter state
 * Computes pipeline status, current step, and open question count per client
 */
export function useClientFilter({
  clients,
  checklists,
  questions,
  accounts,
  schedules,
}: UseClientFilterProps): UseClientFilterReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PipelineStatus | 'all'>('all');
  const [scheduleFilter, setScheduleFilter] = useState<string | 'all'>('all');
  const [showArchived, setShowArchived] = useState(false);

  // Compute enriched client data with metadata
  const enrichedClients = useMemo<ClientWithMetadata[]>(() => {
    return clients.map((client) => {
      // Find checklist for this client
      const checklist = checklists.find((c) => c.client_id === client.id);

      // Count open questions for this client
      const openQuestionCount = questions.filter(
        (q) => q.client_id === client.id && q.status === 'open'
      ).length;

      // Calculate current step (number of completed steps)
      let currentStep = 0;
      if (checklist) {
        if (checklist.step_1_complete) currentStep++;
        if (checklist.step_2_complete) currentStep++;
        if (checklist.step_3_complete) currentStep++;
        if (checklist.step_4_complete) currentStep++;
        if (checklist.step_5_complete) currentStep++;
      }

      // Find earliest close date from client's accounts
      // Pipeline status needs the soonest upcoming deadline across all accounts
      const clientAccounts = accounts.filter((a) => a.client_id === client.id);
      const closeDates = clientAccounts
        .map((a) => a.close_date)
        .filter((date): date is string => !!date); // Type guard: filter out undefined dates

      // Sort ISO date strings lexicographically (YYYY-MM-DD sorts correctly)
      const earliestCloseDate = closeDates.length > 0
        ? closeDates.sort()[0]
        : undefined;

      // Compute pipeline status
      const pipelineStatus = getPipelineStatus(checklist, earliestCloseDate);

      // Find schedule
      const schedule = schedules.find((s) => s.id === client.schedule_id);

      return {
        client,
        pipelineStatus,
        currentStep,
        openQuestionCount,
        schedule,
      };
    });
  }, [clients, checklists, questions, accounts, schedules]);

  // Apply filters
  const filteredClients = useMemo(() => {
    return enrichedClients.filter((enriched) => {
      const { client, pipelineStatus } = enriched;

      // Filter by archived status
      if (!showArchived && client.archived) {
        return false;
      }

      // Filter by search query (case-insensitive substring match on name)
      if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Filter by pipeline status
      if (statusFilter !== 'all' && pipelineStatus !== statusFilter) {
        return false;
      }

      // Filter by schedule
      if (scheduleFilter !== 'all' && client.schedule_id !== scheduleFilter) {
        return false;
      }

      return true;
    });
  }, [enrichedClients, searchQuery, statusFilter, scheduleFilter, showArchived]);

  return {
    filteredClients,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    scheduleFilter,
    setScheduleFilter,
    showArchived,
    setShowArchived,
  };
}
