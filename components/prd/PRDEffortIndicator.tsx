import React from 'react';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { PRD_PRIMARY } from './prd-tokens';

// =============================================================================
// TYPES
// =============================================================================

interface PRDEffortIndicatorProps {
  /** Human effort percentage (0-100) */
  human: number;
  /** AI effort percentage (0-100) */
  ai: number;
  /** Component size */
  size?: 'sm' | 'md' | 'lg';
  /** Show progress bar visual */
  showBar?: boolean;
  /** Additional CSS class */
  className?: string;
}

// =============================================================================
// COLORS
// =============================================================================

const COLORS = {
  human: 'bg-blue-500',
  humanText: 'text-blue-500',
  ai: 'bg-blue-600',
  aiText: 'text-blue-600',
};

// =============================================================================
// SIZE CONFIG
// =============================================================================

const SIZE_CONFIG = {
  sm: {
    text: 'text-[10px]',
    icon: 'size-3',
    bar: 'h-1',
    barWidth: 'w-12',
    gap: 'gap-1.5',
  },
  md: {
    text: 'text-xs',
    icon: 'size-3.5',
    bar: 'h-1.5',
    barWidth: 'w-16',
    gap: 'gap-2',
  },
  lg: {
    text: 'text-sm',
    icon: 'size-4',
    bar: 'h-2',
    barWidth: 'w-20',
    gap: 'gap-3',
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export const PRDEffortIndicator: React.FC<PRDEffortIndicatorProps> = ({
  human,
  ai,
  size = 'md',
  showBar = true,
  className,
}) => {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className={cn('inline-flex items-center', config.gap, className)}
      title={`${human}% do trabalho é feito por você, ${ai}% é assistido pela IA`}
    >
      {/* Human Section */}
      <div className={cn('flex items-center gap-1', config.text)}>
        <Icon name="user" className={COLORS.humanText} size={config.icon} />
        {human > 0 && (
          <span className={cn('font-mono font-medium', COLORS.humanText)}>{human}%</span>
        )}
      </div>

      {/* Progress Bar */}
      {showBar && (
        <div
          className={cn(
            'flex overflow-hidden rounded-full bg-muted/50',
            config.bar,
            config.barWidth
          )}
        >
          <div
            className={cn('transition-all duration-300', COLORS.human)}
            style={{ width: `${human}%` }}
          />
          <div
            className={cn('transition-all duration-300', COLORS.ai)}
            style={{ width: `${ai}%` }}
          />
        </div>
      )}

      {/* AI Section */}
      <div className={cn('flex items-center gap-1', config.text)}>
        {ai > 0 && <span className={cn('font-mono font-medium', COLORS.aiText)}>{ai}%</span>}
        <Icon name="robot" className={COLORS.aiText} size={config.icon} />
      </div>
    </div>
  );
};

export default PRDEffortIndicator;
