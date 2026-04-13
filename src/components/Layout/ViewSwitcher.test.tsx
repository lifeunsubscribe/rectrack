import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ViewSwitcher from './ViewSwitcher';

describe('ViewSwitcher', () => {
  it('renders dashboard and kanban buttons', () => {
    const mockOnViewChange = vi.fn();
    render(<ViewSwitcher currentView="dashboard" onViewChange={mockOnViewChange} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Kanban')).toBeInTheDocument();
  });

  it('highlights the active view button', () => {
    const mockOnViewChange = vi.fn();
    render(<ViewSwitcher currentView="dashboard" onViewChange={mockOnViewChange} />);

    const dashboardButton = screen.getByText('Dashboard');
    const kanbanButton = screen.getByText('Kanban');

    expect(dashboardButton).toHaveClass('view-switcher__button--active');
    expect(kanbanButton).not.toHaveClass('view-switcher__button--active');
  });

  it('highlights kanban when active', () => {
    const mockOnViewChange = vi.fn();
    render(<ViewSwitcher currentView="kanban" onViewChange={mockOnViewChange} />);

    const dashboardButton = screen.getByText('Dashboard');
    const kanbanButton = screen.getByText('Kanban');

    expect(dashboardButton).not.toHaveClass('view-switcher__button--active');
    expect(kanbanButton).toHaveClass('view-switcher__button--active');
  });

  it('calls onViewChange when dashboard button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnViewChange = vi.fn();
    render(<ViewSwitcher currentView="kanban" onViewChange={mockOnViewChange} />);

    const dashboardButton = screen.getByText('Dashboard');
    await user.click(dashboardButton);

    expect(mockOnViewChange).toHaveBeenCalledWith('dashboard');
    expect(mockOnViewChange).toHaveBeenCalledTimes(1);
  });

  it('calls onViewChange when kanban button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnViewChange = vi.fn();
    render(<ViewSwitcher currentView="dashboard" onViewChange={mockOnViewChange} />);

    const kanbanButton = screen.getByText('Kanban');
    await user.click(kanbanButton);

    expect(mockOnViewChange).toHaveBeenCalledWith('kanban');
    expect(mockOnViewChange).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-pressed attributes', () => {
    const mockOnViewChange = vi.fn();
    render(<ViewSwitcher currentView="dashboard" onViewChange={mockOnViewChange} />);

    const dashboardButton = screen.getByText('Dashboard');
    const kanbanButton = screen.getByText('Kanban');

    expect(dashboardButton).toHaveAttribute('aria-pressed', 'true');
    expect(kanbanButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders with correct role group and aria-label', () => {
    const mockOnViewChange = vi.fn();
    render(<ViewSwitcher currentView="dashboard" onViewChange={mockOnViewChange} />);

    expect(screen.getByRole('group', { name: 'View switcher' })).toBeInTheDocument();
  });
});
