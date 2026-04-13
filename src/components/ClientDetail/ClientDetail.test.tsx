import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClientDetail from './ClientDetail';
import type { Client, Account, ChecklistPeriod, Question, Schedule } from '../../types';

describe('ClientDetail', () => {
  const mockClient: Client = {
    id: 'client-001',
    name: 'Test Client LLC',
    email: 'test@example.com',
    schedule_id: 'schedule-001',
    archived: false,
  };

  const mockSchedule: Schedule = {
    id: 'schedule-001',
    name: 'Monthly',
    period_type: 'monthly',
  };

  const mockAccounts: Account[] = [
    {
      id: 'account-001',
      client_id: 'client-001',
      type: 'checking',
      institution_name: 'Test Bank',
      access_method: 'Direct access',
      rec_through_date: '2026-03-31',
      close_date: '2026-04-30',
      archived: false,
    },
  ];

  const mockChecklist: ChecklistPeriod = {
    id: 'checklist-001',
    client_id: 'client-001',
    period: '2026-04',
    step_1_complete: true,
    step_1_completed_by: 'user-jen',
    step_1_completed_at: '2026-04-02T10:30:00Z',
    step_2_complete: false,
    step_3_complete: false,
    step_4_complete: false,
    step_5_complete: false,
  };

  const mockQuestions: Question[] = [
    {
      id: 'question-001',
      client_id: 'client-001',
      period: '2026-04',
      text: 'Test question?',
      status: 'open',
    },
  ];

  it('renders without crashing', () => {
    render(
      <ClientDetail
        client={mockClient}
        accounts={mockAccounts}
        checklist={mockChecklist}
        questions={mockQuestions}
        schedule={mockSchedule}
      />
    );
    expect(screen.getByText('Test Client LLC')).toBeInTheDocument();
  });

  it('displays client header with name and email', () => {
    render(
      <ClientDetail
        client={mockClient}
        accounts={mockAccounts}
        checklist={mockChecklist}
        questions={mockQuestions}
        schedule={mockSchedule}
      />
    );
    expect(screen.getByText('Test Client LLC')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('displays accounts table with account count', () => {
    render(
      <ClientDetail
        client={mockClient}
        accounts={mockAccounts}
        checklist={mockChecklist}
        questions={mockQuestions}
        schedule={mockSchedule}
      />
    );
    expect(screen.getByText('Accounts (1)')).toBeInTheDocument();
    expect(screen.getByText('Test Bank')).toBeInTheDocument();
  });

  it('displays checklist panel with period', () => {
    render(
      <ClientDetail
        client={mockClient}
        accounts={mockAccounts}
        checklist={mockChecklist}
        questions={mockQuestions}
        schedule={mockSchedule}
      />
    );
    expect(screen.getByText(/Checklist - 2026-04/i)).toBeInTheDocument();
  });

  it('displays questions panel with open question count', () => {
    render(
      <ClientDetail
        client={mockClient}
        accounts={mockAccounts}
        checklist={mockChecklist}
        questions={mockQuestions}
        schedule={mockSchedule}
      />
    );
    expect(screen.getByText('Questions')).toBeInTheDocument();
    expect(screen.getByText('1 open')).toBeInTheDocument();
  });
});
