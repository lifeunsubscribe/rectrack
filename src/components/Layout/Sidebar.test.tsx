import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar />);
    expect(screen.getByText('Clients')).toBeInTheDocument();
  });

  it('shows client list when not collapsed', () => {
    render(<Sidebar isCollapsed={false} />);
    expect(screen.getByText('Clients')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search clients...')).toBeInTheDocument();
  });

  it('shows abbreviated text when collapsed', () => {
    render(<Sidebar isCollapsed={true} />);
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Search clients...')).not.toBeInTheDocument();
  });

  it('applies correct CSS class', () => {
    const { container } = render(<Sidebar />);
    expect(container.querySelector('.dashboard-layout__sidebar')).toBeInTheDocument();
  });

  it('renders mock client data', () => {
    render(<Sidebar />);
    expect(screen.getByText('Greenfield Consulting LLC')).toBeInTheDocument();
  });
});
