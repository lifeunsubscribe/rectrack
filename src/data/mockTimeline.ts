import type { TimelineEvent } from '../types';

/**
 * Mock timeline events for demo
 * Append-only audit log showing various entity actions
 * Focused on demo client (client-001) and related entities
 */
export const mockTimeline: TimelineEvent[] = [
  // Client 001 - Greenfield Consulting events
  {
    id: 'event-001',
    entity_type: 'client',
    entity_id: 'client-001',
    action: 'client.created',
    performed_by: 'user-jen',
    timestamp: '2025-11-15T09:00:00Z',
    metadata: {
      name: 'Greenfield Consulting LLC',
      schedule: 'Monthly',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-002',
    entity_type: 'account',
    entity_id: 'account-001',
    action: 'account.created',
    performed_by: 'user-jen',
    timestamp: '2025-11-15T09:15:00Z',
    metadata: {
      account_type: 'checking',
      institution_name: 'First National Bank',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-003',
    entity_type: 'account',
    entity_id: 'account-002',
    action: 'account.created',
    performed_by: 'user-jen',
    timestamp: '2025-11-15T09:20:00Z',
    metadata: {
      account_type: 'savings',
      institution_name: 'First National Bank',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-004',
    entity_type: 'account',
    entity_id: 'account-003',
    action: 'account.created',
    performed_by: 'user-jen',
    timestamp: '2025-11-15T09:25:00Z',
    metadata: {
      account_type: 'credit_card',
      institution_name: 'Chase Business',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-005',
    entity_type: 'checklist',
    entity_id: 'checklist-001',
    action: 'checklist.step_1.completed',
    performed_by: 'user-jen',
    timestamp: '2026-04-02T10:30:00Z',
    metadata: {
      step: 1,
      step_name: 'Access confirmed for all accounts',
      period: '2026-04',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-006',
    entity_type: 'checklist',
    entity_id: 'checklist-001',
    action: 'checklist.step_2.completed',
    performed_by: 'user-katie',
    timestamp: '2026-04-08T14:15:00Z',
    metadata: {
      step: 2,
      step_name: 'All accounts reconciled as of close date',
      period: '2026-04',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-007',
    entity_type: 'question',
    entity_id: 'question-001',
    action: 'question.created',
    performed_by: 'user-katie',
    timestamp: '2026-04-08T14:30:00Z',
    metadata: {
      question_text: 'Please clarify the $2,450 consulting revenue entry on 4/5...',
      period: '2026-04',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-008',
    entity_type: 'question',
    entity_id: 'question-002',
    action: 'question.created',
    performed_by: 'user-jen',
    timestamp: '2026-04-09T11:00:00Z',
    metadata: {
      question_text: 'Need approval for the equipment purchase reclassification...',
      period: '2026-04',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-009',
    entity_type: 'question',
    entity_id: 'question-003',
    action: 'question.created',
    performed_by: 'user-katie',
    timestamp: '2026-04-09T15:20:00Z',
    metadata: {
      question_text: 'Missing receipt for March travel expense...',
      period: '2026-04',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-010',
    entity_type: 'question',
    entity_id: 'question-003',
    action: 'question.resolved',
    performed_by: 'user-jen',
    timestamp: '2026-04-10T11:30:00Z',
    metadata: {
      question_text: 'Missing receipt for March travel expense...',
      period: '2026-04',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-011',
    entity_type: 'checklist',
    entity_id: 'checklist-001',
    action: 'checklist.step_3.completed',
    performed_by: 'user-jen',
    timestamp: '2026-04-10T09:45:00Z',
    metadata: {
      step: 3,
      step_name: 'All client questions resolved',
      period: '2026-04',
    },
    client_id: 'client-001',
  },
  {
    id: 'event-012',
    entity_type: 'account',
    entity_id: 'account-001',
    action: 'account.updated',
    performed_by: 'user-katie',
    timestamp: '2026-04-08T16:00:00Z',
    metadata: {
      field: 'rec_through_date',
      old_value: '2026-02-28',
      new_value: '2026-03-31',
    },
    client_id: 'client-001',
  },

  // Client 002 - Riverside Medical events
  {
    id: 'event-013',
    entity_type: 'checklist',
    entity_id: 'checklist-002',
    action: 'checklist.step_1.completed',
    performed_by: 'user-jen',
    timestamp: '2026-03-05T11:20:00Z',
    metadata: {
      step: 1,
      step_name: 'Access confirmed for all accounts',
      period: '2026-03',
    },
    client_id: 'client-002',
  },
  {
    id: 'event-014',
    entity_type: 'checklist',
    entity_id: 'checklist-002',
    action: 'checklist.step_2.completed',
    performed_by: 'user-katie',
    timestamp: '2026-03-12T16:30:00Z',
    metadata: {
      step: 2,
      step_name: 'All accounts reconciled as of close date',
      period: '2026-03',
    },
    client_id: 'client-002',
  },
  {
    id: 'event-015',
    entity_type: 'question',
    entity_id: 'question-004',
    action: 'question.created',
    performed_by: 'user-katie',
    timestamp: '2026-03-20T10:15:00Z',
    metadata: {
      question_text: 'Unreconciled payroll deduction of $3,200...',
      period: '2026-03',
    },
    client_id: 'client-002',
  },

  // Client 006 - Harbor Financial (complete workflow)
  {
    id: 'event-016',
    entity_type: 'checklist',
    entity_id: 'checklist-006',
    action: 'checklist.step_5.completed',
    performed_by: 'user-jen',
    timestamp: '2026-03-25T16:45:00Z',
    metadata: {
      step: 5,
      step_name: 'Financials sent to client',
      period: '2026-Q1',
    },
    client_id: 'client-006',
  },
];
