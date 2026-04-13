import type { Client } from '../types';

/**
 * Mock clients for demo - 8 clients spanning all pipeline statuses
 *
 * Pipeline status distribution:
 * - Grey (no period): 1 client
 * - Green (complete): 1 client
 * - Blue (in progress): 2 clients
 * - Yellow (warning): 2 clients
 * - Red (overdue): 2 clients
 */
export const mockClients: Client[] = [
  {
    id: 'client-001',
    name: 'Greenfield Consulting LLC',
    email: 'accounting@greenfield-consulting.com',
    schedule_id: 'schedule-monthly-001',
    notes: 'Primary demo client - use for detailed views',
    archived: false,
  },
  {
    id: 'client-002',
    name: 'Riverside Medical Group',
    email: 'finance@riversidemedical.com',
    schedule_id: 'schedule-monthly-001',
    notes: 'Multiple locations, complex account structure',
    archived: false,
  },
  {
    id: 'client-003',
    name: 'Oakmont Property Management',
    email: 'bookkeeper@oakmontpm.com',
    schedule_id: 'schedule-quarterly-001',
    archived: false,
  },
  {
    id: 'client-004',
    name: 'Silverline Tech Services',
    email: 'ap@silverlinetech.com',
    schedule_id: 'schedule-monthly-001',
    notes: 'New client - onboarding in progress',
    archived: false,
  },
  {
    id: 'client-005',
    name: 'Blue Ridge Manufacturing',
    email: 'controller@blueridgemfg.com',
    schedule_id: 'schedule-monthly-001',
    archived: false,
  },
  {
    id: 'client-006',
    name: 'Harbor Financial Advisors',
    email: 'operations@harborfa.com',
    schedule_id: 'schedule-quarterly-001',
    notes: 'Requires SEC compliance documentation',
    archived: false,
  },
  {
    id: 'client-007',
    name: 'Summit Retail Inc',
    email: 'accounting@summitretail.com',
    schedule_id: 'schedule-monthly-001',
    archived: false,
  },
  {
    id: 'client-008',
    name: 'Cascade Construction',
    email: 'finance@cascadeconst.com',
    schedule_id: 'schedule-monthly-001',
    notes: 'Multiple bank accounts due to job costing requirements',
    archived: false,
  },
];
