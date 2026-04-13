import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KanbanCard from './KanbanCard';
import type { ClientWithMetadata } from '../../hooks/useClientFilter';

describe('KanbanCard', () => {
  const mockClientData: ClientWithMetadata = {
    client: {
      id: 'client-001',
      name: 'Test Client LLC',
      archived: false,
    },
    pipelineStatus: 'blue',
    currentStep: 2,
    openQuestionCount: 3,
    schedule: {
      id: 'schedule-monthly-001',
      name: 'Monthly',
      period_type: 'monthly',
    },
  };

  it('renders client name', () => {
    const onClick = vi.fn();
    render(<KanbanCard clientData={mockClientData} onClick={onClick} />);

    expect(screen.getByText('Test Client LLC')).toBeInTheDocument();
  });

  it('renders schedule badge', () => {
    const onClick = vi.fn();
    const { container } = render(<KanbanCard clientData={mockClientData} onClick={onClick} />);

    expect(container.querySelector('.schedule-badge')).toBeInTheDocument();
  });

  it('renders question badge when questions exist', () => {
    const onClick = vi.fn();
    const { container } = render(<KanbanCard clientData={mockClientData} onClick={onClick} />);

    expect(container.querySelector('.question-badge')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not render question badge when no questions', () => {
    const onClick = vi.fn();
    const clientWithNoQuestions = { ...mockClientData, openQuestionCount: 0 };
    const { container } = render(
      <KanbanCard clientData={clientWithNoQuestions} onClick={onClick} />
    );

    expect(container.querySelector('.question-badge')).not.toBeInTheDocument();
  });

  it('displays days until close date in green when > 7 days', () => {
    const onClick = vi.fn();
    render(<KanbanCard clientData={mockClientData} daysUntilClose={10} onClick={onClick} />);

    const daysText = screen.getByText('10d until close');
    expect(daysText).toBeInTheDocument();
    expect(daysText.style.color).toBe('rgb(16, 185, 129)'); // green
  });

  it('displays days until close date in yellow when 1-7 days', () => {
    const onClick = vi.fn();
    render(<KanbanCard clientData={mockClientData} daysUntilClose={5} onClick={onClick} />);

    const daysText = screen.getByText('5d until close');
    expect(daysText).toBeInTheDocument();
    expect(daysText.style.color).toBe('rgb(245, 158, 11)'); // yellow
  });

  it('displays overdue in red when days are negative', () => {
    const onClick = vi.fn();
    render(<KanbanCard clientData={mockClientData} daysUntilClose={-3} onClick={onClick} />);

    const daysText = screen.getByText('3d overdue');
    expect(daysText).toBeInTheDocument();
    expect(daysText.style.color).toBe('rgb(239, 68, 68)'); // red
  });

  it('displays due today when days is 0', () => {
    const onClick = vi.fn();
    render(<KanbanCard clientData={mockClientData} daysUntilClose={0} onClick={onClick} />);

    expect(screen.getByText('Due today')).toBeInTheDocument();
  });

  it('displays no close date when undefined', () => {
    const onClick = vi.fn();
    render(<KanbanCard clientData={mockClientData} daysUntilClose={undefined} onClick={onClick} />);

    expect(screen.getByText('No close date')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<KanbanCard clientData={mockClientData} onClick={onClick} />);

    const card = screen.getByRole('button', { name: /view test client llc/i });
    await user.click(card);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<KanbanCard clientData={mockClientData} onClick={onClick} />);

    const card = screen.getByRole('button', { name: /view test client llc/i });
    card.focus();
    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible with tabIndex', () => {
    const onClick = vi.fn();
    render(<KanbanCard clientData={mockClientData} onClick={onClick} />);

    const card = screen.getByRole('button', { name: /view test client llc/i });
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
