import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';
import { STATUS_COLORS } from '../../utils/pipelineStatus';

// Helper to convert hex to rgb format for comparison with computed styles
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r}, ${g}, ${b})`;
}

describe('StatusBadge', () => {
  it('renders without crashing', () => {
    const { container } = render(<StatusBadge status="green" />);
    expect(container.querySelector('.status-badge')).toBeInTheDocument();
  });

  it('displays correct color for each status', () => {
    const statuses = ['grey', 'green', 'blue', 'yellow', 'red'] as const;

    statuses.forEach((status) => {
      const { container } = render(<StatusBadge status={status} />);
      const badge = container.querySelector('.status-badge') as HTMLElement;
      expect(badge.style.backgroundColor).toBe(hexToRgb(STATUS_COLORS[status]));
    });
  });

  it('has accessible label', () => {
    render(<StatusBadge status="blue" />);
    expect(screen.getByLabelText('Pipeline status: blue')).toBeInTheDocument();
  });

  it('applies small size by default', () => {
    const { container } = render(<StatusBadge status="green" />);
    const badge = container.querySelector('.status-badge') as HTMLElement;
    expect(badge.style.width).toBe('12px');
    expect(badge.style.height).toBe('12px');
  });

  it('applies medium size when specified', () => {
    const { container } = render(<StatusBadge status="green" size="medium" />);
    const badge = container.querySelector('.status-badge') as HTMLElement;
    expect(badge.style.width).toBe('16px');
    expect(badge.style.height).toBe('16px');
  });
});
