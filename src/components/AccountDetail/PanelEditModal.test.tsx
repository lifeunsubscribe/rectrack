import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PanelEditModal from './PanelEditModal';
import type { FieldPreference } from '../../hooks/useFieldPreferences';

describe('PanelEditModal', () => {
  const mockPreferences: FieldPreference[] = [
    { key: 'type', label: 'Account Type', visible: true, order: 1 },
    { key: 'institution_name', label: 'Institution', visible: true, order: 2 },
    { key: 'location', label: 'Location', visible: false, order: 3 },
  ];

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <PanelEditModal
        isOpen={false}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    expect(screen.getByText(/Edit Layout/i)).toBeInTheDocument();
  });

  it('displays all field preferences', () => {
    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Account Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Institution')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
  });

  it('calls onToggleField when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggleField = vi.fn();

    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={mockOnToggleField}
        onReset={vi.fn()}
      />
    );

    await user.click(screen.getByLabelText('Location'));
    expect(mockOnToggleField).toHaveBeenCalledWith('location');
  });

  it('calls onReset when Reset to Defaults button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnReset = vi.fn();

    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={mockOnReset}
      />
    );

    await user.click(screen.getByText(/Reset to Defaults/i));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Done button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();

    render(
      <PanelEditModal
        isOpen={true}
        onClose={mockOnClose}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    await user.click(screen.getByText(/Done/i));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
