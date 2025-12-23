import React from 'react';
import { cn } from '../../lib/utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        ref={ref}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary',
          className
        )}
        {...props}
      />
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
