import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('renders without crashing', () => {
    render(<TopBar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders default breadcrumb when none provided', () => {
    render(<TopBar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders custom breadcrumb', () => {
    render(<TopBar breadcrumb={['Home', 'Clients', 'Details']} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Clients')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('renders breadcrumb navigation with correct aria-label', () => {
    render(<TopBar />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('applies correct CSS class', () => {
    const { container } = render(<TopBar />);
    expect(container.querySelector('.dashboard-layout__topbar')).toBeInTheDocument();
  });

  it('renders ViewSwitcher when currentView and onViewChange are provided', () => {
    const mockOnViewChange = vi.fn();
    render(<TopBar currentView="dashboard" onViewChange={mockOnViewChange} />);
    // ViewSwitcher should be present (identified by role group with aria-label)
    expect(screen.getByRole('group', { name: 'View switcher' })).toBeInTheDocument();
    expect(screen.getByText('Kanban')).toBeInTheDocument();
  });

  it('does not render ViewSwitcher when currentView is not provided', () => {
    render(<TopBar />);
    expect(screen.queryByText('Kanban')).not.toBeInTheDocument();
  });

  it('does not render ViewSwitcher when onViewChange is not provided', () => {
    render(<TopBar currentView="dashboard" />);
    expect(screen.queryByText('Kanban')).not.toBeInTheDocument();
  });
});
