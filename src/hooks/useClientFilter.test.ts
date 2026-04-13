import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClientFilter } from './useClientFilter';
import type { Client, ChecklistPeriod, Question, Account, Schedule } from '../types';

describe('useClientFilter', () => {
  const mockSchedules: Schedule[] = [
    { id: 'schedule-1', name: 'Monthly', period_type: 'monthly' },
  ];

  const mockClients: Client[] = [
    {
      id: 'client-1',
      name: 'Greenfield Consulting',
      archived: false,
      schedule_id: 'schedule-1',
    },
    {
      id: 'client-2',
      name: 'Riverside Medical',
      archived: true,
      schedule_id: 'schedule-1',
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
    {
      id: 'q2',
      client_id: 'client-1',
      period: '2026-04',
      text: 'Test question 2',
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

  it('returns enriched client data with metadata', () => {
    const { result } = renderHook(() =>
      useClientFilter({
        clients: mockClients,
        checklists: mockChecklists,
        questions: mockQuestions,
        accounts: mockAccounts,
        schedules: mockSchedules,
      })
    );

    expect(result.current.filteredClients).toHaveLength(1);
    const enriched = result.current.filteredClients[0];
    expect(enriched.client.name).toBe('Greenfield Consulting');
    expect(enriched.currentStep).toBe(2);
    expect(enriched.openQuestionCount).toBe(2);
  });

  it('filters by search query', () => {
    const { result } = renderHook(() =>
      useClientFilter({
        clients: mockClients,
        checklists: mockChecklists,
        questions: mockQuestions,
        accounts: mockAccounts,
        schedules: mockSchedules,
      })
    );

    act(() => {
      result.current.setSearchQuery('Greenfield');
    });

    expect(result.current.filteredClients).toHaveLength(1);
    expect(result.current.filteredClients[0].client.name).toBe('Greenfield Consulting');
  });

  it('hides archived clients by default', () => {
    const { result } = renderHook(() =>
      useClientFilter({
        clients: mockClients,
        checklists: mockChecklists,
        questions: mockQuestions,
        accounts: mockAccounts,
        schedules: mockSchedules,
      })
    );

    expect(result.current.filteredClients).toHaveLength(1);
    expect(result.current.filteredClients[0].client.archived).toBe(false);
  });

  it('shows archived clients when toggled', () => {
    const { result } = renderHook(() =>
      useClientFilter({
        clients: mockClients,
        checklists: mockChecklists,
        questions: mockQuestions,
        accounts: mockAccounts,
        schedules: mockSchedules,
      })
    );

    act(() => {
      result.current.setShowArchived(true);
    });

    expect(result.current.filteredClients).toHaveLength(2);
  });
});
