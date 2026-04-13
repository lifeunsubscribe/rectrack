import type { Schedule } from '../types';

/**
 * Mock schedules for demo
 * Seeded with Monthly and Quarterly as per ADR
 */
export const mockSchedules: Schedule[] = [
  {
    id: 'schedule-monthly-001',
    name: 'Monthly',
    period_type: 'monthly',
    description: 'Standard monthly reconciliation schedule',
  },
  {
    id: 'schedule-quarterly-001',
    name: 'Quarterly',
    period_type: 'quarterly',
    description: 'Quarterly reconciliation schedule',
  },
];
