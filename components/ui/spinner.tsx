import React from 'react';
import { cn } from '../../lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3 border-2',
  md: 'w-4 h-4 border-2',
  lg: 'w-6 h-6 border-2',
};

const variantClasses = {
  default: 'border-primary border-t-transparent',
  light: 'border-white border-t-transparent',
  dark: 'border-black border-t-transparent',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'sm',
  variant = 'default',
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-full animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
