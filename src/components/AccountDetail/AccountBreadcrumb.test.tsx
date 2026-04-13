import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountBreadcrumb from './AccountBreadcrumb';

describe('AccountBreadcrumb', () => {
  it('renders client name and account name', () => {
    const mockOnClientClick = vi.fn();
    render(
      <AccountBreadcrumb
        clientName="Test Client"
        accountName="Test Account"
        onClientClick={mockOnClientClick}
      />
    );

    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('Test Account')).toBeInTheDocument();
  });

  it('calls onClientClick when client name is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClientClick = vi.fn();

    render(
      <AccountBreadcrumb
        clientName="Test Client"
        accountName="Test Account"
        onClientClick={mockOnClientClick}
      />
    );

    await user.click(screen.getByText('Test Client'));
    expect(mockOnClientClick).toHaveBeenCalledTimes(1);
  });

  it('displays breadcrumb separator', () => {
    const mockOnClientClick = vi.fn();
    render(
      <AccountBreadcrumb
        clientName="Test Client"
        accountName="Test Account"
        onClientClick={mockOnClientClick}
      />
    );

    expect(screen.getByText('›')).toBeInTheDocument();
  });
});
