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

  it('calls onClose when ESC key is pressed', async () => {
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

    await user.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('sets initial focus to modal when opened', () => {
    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(document.activeElement).toBe(dialog);
  });

  it('traps focus within modal when tabbing forward', async () => {
    const user = userEvent.setup();

    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    // Get focusable elements
    const closeButton = screen.getByLabelText('Close modal');
    const doneButton = screen.getByText('Done');

    // Focus the last focusable element (Done button)
    doneButton.focus();
    expect(document.activeElement).toBe(doneButton);

    // Tab from last element should wrap to first
    await user.tab();
    expect(document.activeElement).toBe(closeButton);
  });

  it('traps focus within modal when shift-tabbing backward', async () => {
    const user = userEvent.setup();

    render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    // Get first focusable element
    const closeButton = screen.getByLabelText('Close modal');
    const doneButton = screen.getByText('Done');

    // Focus the first focusable element (Close button)
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);

    // Shift+Tab from first element should wrap to last
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(doneButton);
  });

  it('restores focus to previous element when modal closes', () => {
    const triggerButton = document.createElement('button');
    triggerButton.textContent = 'Open Modal';
    document.body.appendChild(triggerButton);
    triggerButton.focus();

    const { rerender } = render(
      <PanelEditModal
        isOpen={true}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    // Focus should be on modal
    const dialog = screen.getByRole('dialog');
    expect(document.activeElement).toBe(dialog);

    // Close modal
    rerender(
      <PanelEditModal
        isOpen={false}
        onClose={vi.fn()}
        preferences={mockPreferences}
        onToggleField={vi.fn()}
        onReset={vi.fn()}
      />
    );

    // Focus should be restored to trigger button
    expect(document.activeElement).toBe(triggerButton);

    // Cleanup
    document.body.removeChild(triggerButton);
  });
});
