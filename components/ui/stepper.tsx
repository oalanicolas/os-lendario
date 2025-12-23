import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';

export interface Step {
  id: string | number;
  label: string;
  description?: string;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number; // 0-indexed
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, currentStep, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className="relative flex items-center justify-between">
          {/* Background Line */}
          <div className="absolute left-0 top-4 -z-10 h-0.5 w-full bg-muted" />

          {/* Active Line Progress */}
          <div
            className="absolute left-0 top-4 -z-10 h-0.5 bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-card px-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300',
                    isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isActive
                        ? 'scale-110 border-primary bg-card text-primary ring-4 ring-primary/10'
                        : 'border-transparent bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Icon name="check" size="size-3" /> : <span>{index + 1}</span>}
                </div>
                <div className="flex flex-col items-center text-center">
                  <span
                    className={cn(
                      'text-xs font-semibold transition-colors duration-300',
                      isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="hidden text-[10px] text-muted-foreground sm:block">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
Stepper.displayName = 'Stepper';

export { Stepper };
