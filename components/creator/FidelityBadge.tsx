import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../ui/icon';

interface FidelityBadgeProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const FidelityBadge: React.FC<FidelityBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  className,
}) => {
  if (score === null) {
    return (
      <div
        className={cn(
          'flex items-center gap-1 text-muted-foreground',
          size === 'sm' && 'text-[10px]',
          size === 'md' && 'text-xs',
          size === 'lg' && 'text-sm',
          className
        )}
      >
        <Icon name="minus-circle" className="size-3" />
        {showLabel && <span>--</span>}
      </div>
    );
  }

  // Determine color based on score
  const getScoreConfig = (score: number) => {
    if (score >= 85) {
      return {
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        icon: 'check-circle',
        label: 'Alta',
      };
    } else if (score >= 60) {
      return {
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        icon: 'exclamation-circle',
        label: 'Media',
      };
    } else {
      return {
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        icon: 'exclamation-triangle',
        label: 'Baixa',
      };
    }
  };

  const config = getScoreConfig(score);

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'size-3',
    md: 'size-3.5',
    lg: 'size-4',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.bgColor,
        config.borderColor,
        config.color,
        sizeClasses[size],
        className
      )}
    >
      <Icon name={config.icon} className={iconSizes[size]} />
      <span className="font-mono font-bold">{score}%</span>
      {showLabel && size !== 'sm' && (
        <span className="font-normal text-muted-foreground">Fidelidade</span>
      )}
    </div>
  );
};

export default FidelityBadge;
