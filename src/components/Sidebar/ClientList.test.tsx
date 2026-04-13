import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientList from './ClientList';
import type { Client, ChecklistPeriod, Question, Account, Schedule } from '../../types';

describe('ClientList', () => {
  const mockSchedules: Schedule[] = [
    { id: 'schedule-1', name: 'Monthly', period_type: 'monthly' },
    { id: 'schedule-2', name: 'Quarterly', period_type: 'quarterly' },
  ];

  const mockClients: Client[] = [
    {
      id: 'client-1',
      name: 'Greenfield Consulting LLC',
      archived: false,
      schedule_id: 'schedule-1',
    },
    {
      id: 'client-2',
      name: 'Riverside Medical Group',
      archived: false,
      schedule_id: 'schedule-2',
    },
  ];

  const mockChecklists: ChecklistPeriod[] = [
    {
      id: 'checklist-1',
      client_id: 'client-1',
      period: '2026-04',
      step_1_complete: true,
      step_2_complete: true,
      step_3_complete: false,
      step_4_complete: false,
      step_5_complete: false,
    },
  ];

  const mockQuestions: Question[] = [
    {
      id: 'q1',
      client_id: 'client-1',
      period: '2026-04',
      text: 'Test question',
      status: 'open',
    },
  ];

  const mockAccounts: Account[] = [
    {
      id: 'account-1',
      client_id: 'client-1',
      type: 'checking',
      institution_name: 'Test Bank',
      archived: false,
      close_date: '2026-04-30',
    },
  ];

  it('renders without crashing', () => {
    render(
      <ClientList
        clients={mockClients}
        checklists={mockChecklists}
        questions={mockQuestions}
        accounts={mockAccounts}
        schedules={mockSchedules}
      />
    );
    expect(screen.getByText('Clients')).toBeInTheDocument();
  });

  it('displays all clients', () => {
    render(
      <ClientList
        clients={mockClients}
        checklists={mockChecklists}
        questions={mockQuestions}
        accounts={mockAccounts}
        schedules={mockSchedules}
      />
    );
    expect(screen.getByText('Greenfield Consulting LLC')).toBeInTheDocument();
    expect(screen.getByText('Riverside Medical Group')).toBeInTheDocument();
  });

  it('filters clients by search query', () => {
    render(
      <ClientList
        clients={mockClients}
        checklists={mockChecklists}
        questions={mockQuestions}
        accounts={mockAccounts}
        schedules={mockSchedules}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search clients...');
    fireEvent.change(searchInput, { target: { value: 'Greenfield' } });

    expect(screen.getByText('Greenfield Consulting LLC')).toBeInTheDocument();
    expect(screen.queryByText('Riverside Medical Group')).not.toBeInTheDocument();
  });

  it('shows "No clients found" when no matches', () => {
    render(
      <ClientList
        clients={mockClients}
        checklists={mockChecklists}
        questions={mockQuestions}
        accounts={mockAccounts}
        schedules={mockSchedules}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search clients...');
    fireEvent.change(searchInput, { target: { value: 'NonexistentClient' } });

    expect(screen.getByText('No clients found')).toBeInTheDocument();
  });

  it('highlights selected client on click', () => {
    const { container } = render(
      <ClientList
        clients={mockClients}
        checklists={mockChecklists}
        questions={mockQuestions}
        accounts={mockAccounts}
        schedules={mockSchedules}
      />
    );

    const firstClient = screen.getByText('Greenfield Consulting LLC');
    fireEvent.click(firstClient);

    const clientRow = container.querySelector('.client-row--selected');
    expect(clientRow).toBeInTheDocument();
  });
});
