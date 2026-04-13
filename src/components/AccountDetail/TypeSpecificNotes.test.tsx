import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TypeSpecificNotes from './TypeSpecificNotes';

describe('TypeSpecificNotes', () => {
  it('renders type-specific notes with content', () => {
    const content = '**Institution:** First National Bank\n**Account:** Business Checking';
    render(<TypeSpecificNotes accountType="checking" content={content} />);

    expect(screen.getByText(/Checking Account Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/First National Bank/i)).toBeInTheDocument();
  });

  it('does not render when content is undefined', () => {
    const { container } = render(<TypeSpecificNotes accountType="checking" />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when content is empty string', () => {
    const { container } = render(<TypeSpecificNotes accountType="checking" content="" />);
    expect(container.firstChild).toBeNull();
  });

  it('formats account type name correctly', () => {
    const content = 'Test content';
    render(<TypeSpecificNotes accountType="credit_card" content={content} />);

    expect(screen.getByText(/Credit card Account Notes/i)).toBeInTheDocument();
  });

  it('handles savings account type', () => {
    const content = 'Test content';
    render(<TypeSpecificNotes accountType="savings" content={content} />);

    expect(screen.getByText(/Savings Account Notes/i)).toBeInTheDocument();
  });

  it('handles account types with multiple underscores', () => {
    const content = 'Test content';
    render(<TypeSpecificNotes accountType="credit_card" content={content} />);

    expect(screen.getByText(/Credit card Account Notes/i)).toBeInTheDocument();
  });
});
