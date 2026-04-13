import type { ChecklistPeriod } from '../types';

/**
 * Mock checklist periods for demo
 * Varied completion states to demonstrate all pipeline statuses
 *
 * Pipeline status mapping:
 * - Grey: client-004 (no checklist period)
 * - Green: client-006 (all 5 steps complete)
 * - Blue: client-001, client-003 (in progress, on track)
 * - Yellow: client-005, client-008 (in progress, close date approaching)
 * - Red: client-002, client-007 (overdue)
 */
export const mockChecklists: ChecklistPeriod[] = [
  // Client 001 - Greenfield Consulting (Blue: 3/5 complete)
  {
    id: 'checklist-001',
    client_id: 'client-001',
    period: '2026-04',
    step_1_complete: true,
    step_1_completed_by: 'user-jen',
    step_1_completed_at: '2026-04-02T10:30:00Z',
    step_2_complete: true,
    step_2_completed_by: 'user-katie',
    step_2_completed_at: '2026-04-08T14:15:00Z',
    step_3_complete: true,
    step_3_completed_by: 'user-jen',
    step_3_completed_at: '2026-04-10T09:45:00Z',
    step_4_complete: false,
    step_5_complete: false,
  },

  // Client 002 - Riverside Medical (Red: 2/5 complete, overdue)
  {
    id: 'checklist-002',
    client_id: 'client-002',
    period: '2026-03',
    step_1_complete: true,
    step_1_completed_by: 'user-jen',
    step_1_completed_at: '2026-03-05T11:20:00Z',
    step_2_complete: true,
    step_2_completed_by: 'user-katie',
    step_2_completed_at: '2026-03-12T16:30:00Z',
    step_3_complete: false,
    step_4_complete: false,
    step_5_complete: false,
  },

  // Client 003 - Oakmont Property (Blue: 2/5 complete, quarterly)
  {
    id: 'checklist-003',
    client_id: 'client-003',
    period: '2026-Q1',
    step_1_complete: true,
    step_1_completed_by: 'user-katie',
    step_1_completed_at: '2026-01-15T13:00:00Z',
    step_2_complete: true,
    step_2_completed_by: 'user-katie',
    step_2_completed_at: '2026-02-10T10:00:00Z',
    step_3_complete: false,
    step_4_complete: false,
    step_5_complete: false,
  },

  // Client 004 - Silverline Tech (Grey: no checklist period - represented by absence)

  // Client 005 - Blue Ridge Manufacturing (Yellow: 4/5 complete, close date approaching)
  {
    id: 'checklist-005',
    client_id: 'client-005',
    period: '2026-04',
    step_1_complete: true,
    step_1_completed_by: 'user-katie',
    step_1_completed_at: '2026-04-02T09:00:00Z',
    step_2_complete: true,
    step_2_completed_by: 'user-katie',
    step_2_completed_at: '2026-04-08T11:30:00Z',
    step_3_complete: true,
    step_3_completed_by: 'user-jen',
    step_3_completed_at: '2026-04-09T15:00:00Z',
    step_4_complete: true,
    step_4_completed_by: 'user-jen',
    step_4_completed_at: '2026-04-11T08:45:00Z',
    step_5_complete: false,
  },

  // Client 006 - Harbor Financial (Green: all 5 steps complete)
  {
    id: 'checklist-006',
    client_id: 'client-006',
    period: '2026-Q1',
    step_1_complete: true,
    step_1_completed_by: 'user-jen',
    step_1_completed_at: '2026-01-10T10:00:00Z',
    step_2_complete: true,
    step_2_completed_by: 'user-katie',
    step_2_completed_at: '2026-02-05T14:30:00Z',
    step_3_complete: true,
    step_3_completed_by: 'user-jen',
    step_3_completed_at: '2026-02-15T09:15:00Z',
    step_4_complete: true,
    step_4_completed_by: 'user-jen',
    step_4_completed_at: '2026-03-20T11:00:00Z',
    step_5_complete: true,
    step_5_completed_by: 'user-jen',
    step_5_completed_at: '2026-03-25T16:45:00Z',
  },

  // Client 007 - Summit Retail (Red: 1/5 complete, overdue)
  {
    id: 'checklist-007',
    client_id: 'client-007',
    period: '2026-03',
    step_1_complete: true,
    step_1_completed_by: 'user-katie',
    step_1_completed_at: '2026-03-03T08:30:00Z',
    step_2_complete: false,
    step_3_complete: false,
    step_4_complete: false,
    step_5_complete: false,
  },

  // Client 008 - Cascade Construction (Yellow: 3/5 complete, close date approaching)
  {
    id: 'checklist-008',
    client_id: 'client-008',
    period: '2026-03',
    step_1_complete: true,
    step_1_completed_by: 'user-jen',
    step_1_completed_at: '2026-03-04T13:45:00Z',
    step_2_complete: true,
    step_2_completed_by: 'user-katie',
    step_2_completed_at: '2026-03-10T10:20:00Z',
    step_3_complete: true,
    step_3_completed_by: 'user-jen',
    step_3_completed_at: '2026-03-25T15:30:00Z',
    step_4_complete: false,
    step_5_complete: false,
  },
];
