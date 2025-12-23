import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '../ui/icon';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface PRDTimerProps {
  /** Initial time in seconds (to resume session) */
  initialSeconds?: number;
  /** Callback called every second */
  onTick?: (seconds: number) => void;
  /** Show pause/reset controls */
  showControls?: boolean;
  /** Component size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** Auto-start on mount (default: true) */
  autoStart?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const PRDTimer: React.FC<PRDTimerProps> = ({
  initialSeconds = 0,
  onTick,
  showControls = false,
  size = 'md',
  className,
  autoStart = true,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Format time as HH:MM:SS or MM:SS
  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }
    return `${pad(minutes)}:${pad(secs)}`;
  }, []);

  // Start/stop interval based on isRunning
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newValue = prev + 1;
          onTick?.(newValue);
          return newValue;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, onTick]);

  // Sync initialSeconds if it changes
  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const toggleRunning = () => setIsRunning((prev) => !prev);

  const reset = () => {
    setSeconds(0);
    setIsRunning(true);
    onTick?.(0);
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5',
  };

  const iconSizes = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg bg-muted/50 text-muted-foreground',
        sizeClasses[size],
        className
      )}
    >
      <Icon name="clock" className={cn(isRunning && 'text-foreground')} size={iconSizes[size]} />
      <span className="font-mono font-medium tabular-nums">{formatTime(seconds)}</span>

      {showControls && (
        <div className="ml-2 flex items-center gap-1 border-l border-border pl-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-muted"
            onClick={toggleRunning}
            title={isRunning ? 'Pausar' : 'Continuar'}
          >
            <Icon name={isRunning ? 'pause' : 'play'} size="size-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-muted"
            onClick={reset}
            title="Resetar"
          >
            <Icon name="refresh" size="size-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PRDTimer;
