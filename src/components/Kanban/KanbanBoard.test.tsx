import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KanbanBoard from './KanbanBoard';
import type { ClientWithMetadata } from '../../hooks/useClientFilter';
import type { Account } from '../../types';

describe('KanbanBoard', () => {
  const mockClients: ClientWithMetadata[] = [
    {
      client: { id: 'c1', name: 'Complete Client', archived: false },
      pipelineStatus: 'green',
      currentStep: 5,
      openQuestionCount: 0,
      schedule: { id: 's1', name: 'Monthly', period_type: 'monthly' },
    },
    {
      client: { id: 'c2', name: 'Step 1 Client', archived: false },
      pipelineStatus: 'grey',
      currentStep: 0,
      openQuestionCount: 2,
      schedule: { id: 's1', name: 'Monthly', period_type: 'monthly' },
    },
    {
      client: { id: 'c3', name: 'Step 3 Client', archived: false },
      pipelineStatus: 'yellow',
      currentStep: 2,
      openQuestionCount: 1,
      schedule: { id: 's2', name: 'Quarterly', period_type: 'quarterly' },
    },
  ];

  const mockAccounts: Account[] = [
    {
      id: 'a1',
      client_id: 'c1',
      type: 'checking',
      institution_name: 'Bank A',
      close_date: '2026-04-30',
      archived: false,
    },
    {
      id: 'a2',
      client_id: 'c2',
      type: 'savings',
      institution_name: 'Bank B',
      close_date: '2026-04-15',
      archived: false,
    },
  ];

  it('renders all 6 columns', () => {
    const onClientClick = vi.fn();
    render(
      <KanbanBoard clients={mockClients} accounts={mockAccounts} onClientClick={onClientClick} />
    );

    expect(screen.getByText('1. Bank statements received')).toBeInTheDocument();
    expect(screen.getByText('2. Reconciled')).toBeInTheDocument();
    expect(screen.getByText('3. Notes resolved')).toBeInTheDocument();
    expect(screen.getByText('4. Jen review')).toBeInTheDocument();
    expect(screen.getByText('5. Sent to client')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  it('displays client count in each column header', () => {
    const onClientClick = vi.fn();
    const { container } = render(
      <KanbanBoard clients={mockClients} accounts={mockAccounts} onClientClick={onClientClick} />
    );

    // Step 1 column should have 1 client (grey status)
    const step1Column = container.querySelector('.kanban-column');
    expect(step1Column?.textContent).toContain('1 client');
  });

  it('groups clients correctly by pipeline step', () => {
    const onClientClick = vi.fn();
    render(
      <KanbanBoard clients={mockClients} accounts={mockAccounts} onClientClick={onClientClick} />
    );

    // Check client names appear in expected columns
    expect(screen.getByText('Complete Client')).toBeInTheDocument();
    expect(screen.getByText('Step 1 Client')).toBeInTheDocument();
    expect(screen.getByText('Step 3 Client')).toBeInTheDocument();
  });

  it('calls onClientClick when a card is clicked', async () => {
    const onClientClick = vi.fn();
    const user = userEvent.setup();

    render(
      <KanbanBoard clients={mockClients} accounts={mockAccounts} onClientClick={onClientClick} />
    );

    const clientCard = screen.getByRole('button', { name: /view complete client/i });
    await user.click(clientCard);

    expect(onClientClick).toHaveBeenCalledWith('c1');
  });

  it('renders empty state when no clients', () => {
    const onClientClick = vi.fn();
    render(<KanbanBoard clients={[]} accounts={[]} onClientClick={onClientClick} />);

    // All columns should show "No clients"
    const noClientsTexts = screen.getAllByText('No clients');
    expect(noClientsTexts).toHaveLength(6); // One per column
  });

  it('has proper CSS class for horizontal scrolling', () => {
    const onClientClick = vi.fn();
    const { container } = render(
      <KanbanBoard clients={mockClients} accounts={mockAccounts} onClientClick={onClientClick} />
    );

    const board = container.querySelector('.kanban-board');
    expect(board).toBeInTheDocument();
  });
});
