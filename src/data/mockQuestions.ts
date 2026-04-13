import type { Question } from '../types';

/**
 * Mock questions for demo
 * Client 001 (Greenfield Consulting) has 2+ open questions for demo purposes
 */
export const mockQuestions: Question[] = [
  // Client 001 - Greenfield Consulting (2 open questions for demo)
  {
    id: 'question-001',
    client_id: 'client-001',
    period: '2026-04',
    text: 'Please clarify the $2,450 consulting revenue entry on 4/5 - was this for the Acme project or Zenith project?',
    status: 'open',
    created_by: 'user-katie',
  },
  {
    id: 'question-002',
    client_id: 'client-001',
    period: '2026-04',
    text: 'Need approval for the equipment purchase reclassification from Office Supplies to Fixed Assets',
    status: 'open',
    created_by: 'user-jen',
  },
  {
    id: 'question-003',
    client_id: 'client-001',
    period: '2026-04',
    text: 'Missing receipt for March travel expense - client to provide by 4/15',
    status: 'resolved',
    created_by: 'user-katie',
    resolved_by: 'user-jen',
    resolved_at: '2026-04-10T11:30:00Z',
  },

  // Client 002 - Riverside Medical
  {
    id: 'question-004',
    client_id: 'client-002',
    period: '2026-03',
    text: 'Unreconciled payroll deduction of $3,200 - awaiting client response on benefits provider',
    status: 'open',
    created_by: 'user-katie',
  },
  {
    id: 'question-005',
    client_id: 'client-002',
    period: '2026-03',
    text: 'Client needs to confirm medical equipment lease terms before we can book depreciation',
    status: 'open',
    created_by: 'user-jen',
  },

  // Client 003 - Oakmont Property
  {
    id: 'question-006',
    client_id: 'client-003',
    period: '2026-Q1',
    text: 'Tenant deposit refund documentation needed for units 12A and 15C',
    status: 'open',
    created_by: 'user-katie',
  },

  // Client 005 - Blue Ridge Manufacturing
  {
    id: 'question-007',
    client_id: 'client-005',
    period: '2026-04',
    text: 'Raw materials inventory count variance - client to recount and confirm',
    status: 'resolved',
    created_by: 'user-katie',
    resolved_by: 'user-katie',
    resolved_at: '2026-04-11T14:20:00Z',
  },

  // Client 007 - Summit Retail
  {
    id: 'question-008',
    client_id: 'client-007',
    period: '2026-03',
    text: 'Sales tax filing discrepancy - state return shows different amount than our calculation',
    status: 'open',
    created_by: 'user-jen',
  },
  {
    id: 'question-009',
    client_id: 'client-007',
    period: '2026-03',
    text: 'Credit card statement missing for AMEX ending in 4392',
    status: 'open',
    created_by: 'user-katie',
  },

  // Client 008 - Cascade Construction
  {
    id: 'question-010',
    client_id: 'client-008',
    period: '2026-03',
    text: 'Job costing allocation needed for shared equipment expenses in March',
    status: 'open',
    created_by: 'user-jen',
  },
];
