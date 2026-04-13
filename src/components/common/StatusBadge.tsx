import type { PipelineStatus } from '../../types';
import { STATUS_COLORS } from '../../utils/pipelineStatus';

interface StatusBadgeProps {
  status: PipelineStatus;
  size?: 'small' | 'medium';
}

/**
 * StatusBadge - Colored pill indicator for pipeline status
 * Colors match ADR Section 6 status color system
 */
function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const backgroundColor = STATUS_COLORS[status];

  const sizeStyles = size === 'small'
    ? { width: '12px', height: '12px' }
    : { width: '16px', height: '16px' };

  return (
    <div
      className="status-badge"
      style={{
        ...sizeStyles,
        backgroundColor,
        borderRadius: '50%',
        flexShrink: 0,
      }}
      title={`Status: ${status}`}
      aria-label={`Pipeline status: ${status}`}
    />
  );
}

export default StatusBadge;
