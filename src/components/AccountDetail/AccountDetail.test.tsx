import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccountDetail from './AccountDetail';

describe('AccountDetail', () => {
  it('renders account detail page with valid account ID', () => {
    const mockOnNavigateToClient = () => {};
    const { container } = render(<AccountDetail accountId="account-001" onNavigateToClient={mockOnNavigateToClient} />);

    // Check that the page renders without crashing - look for account metadata heading
    expect(screen.getByText(/Account Information/i)).toBeInTheDocument();
    expect(container).toHaveTextContent('First National Bank');
  });

  it('displays error message for invalid account ID', () => {
    const mockOnNavigateToClient = () => {};
    render(<AccountDetail accountId="invalid-id" onNavigateToClient={mockOnNavigateToClient} />);

    expect(screen.getByText(/Account not found/i)).toBeInTheDocument();
  });

  it('renders breadcrumb navigation', () => {
    const mockOnNavigateToClient = () => {};
    render(<AccountDetail accountId="account-001" onNavigateToClient={mockOnNavigateToClient} />);

    // Check for client name in breadcrumb
    expect(screen.getByText(/Greenfield Consulting LLC/i)).toBeInTheDocument();
  });

  it('displays Edit Layout button', () => {
    const mockOnNavigateToClient = () => {};
    render(<AccountDetail accountId="account-001" onNavigateToClient={mockOnNavigateToClient} />);

    expect(screen.getByText(/Edit Layout/i)).toBeInTheDocument();
  });

  it('renders Bank Portal button when bank_url exists', () => {
    const mockOnNavigateToClient = () => {};
    render(<AccountDetail accountId="account-001" onNavigateToClient={mockOnNavigateToClient} />);

    expect(screen.getByText(/Open Bank Portal/i)).toBeInTheDocument();
  });

  it('displays account metadata section', () => {
    const mockOnNavigateToClient = () => {};
    render(<AccountDetail accountId="account-001" onNavigateToClient={mockOnNavigateToClient} />);

    expect(screen.getByText(/Account Information/i)).toBeInTheDocument();
  });
});
