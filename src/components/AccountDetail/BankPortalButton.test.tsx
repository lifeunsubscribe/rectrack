import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BankPortalButton from './BankPortalButton';

describe('BankPortalButton', () => {
  it('renders button with valid bank URL', () => {
    render(<BankPortalButton bankUrl="https://example.com" />);

    const link = screen.getByText(/Open Bank Portal/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render when bankUrl is undefined', () => {
    const { container } = render(<BankPortalButton />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when bankUrl is empty string', () => {
    const { container } = render(<BankPortalButton bankUrl="" />);
    expect(container.firstChild).toBeNull();
  });
});
