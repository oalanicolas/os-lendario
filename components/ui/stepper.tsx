import React from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

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
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="relative flex justify-between items-center">
          {/* Background Line */}
          <div className="absolute left-0 top-4 w-full h-0.5 bg-muted -z-10" />
          
          {/* Active Line Progress */}
          <div 
            className="absolute left-0 top-4 h-0.5 bg-primary -z-10 transition-all duration-500 ease-in-out"
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
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                      ? "bg-card border-primary text-primary ring-4 ring-primary/10 scale-110"
                      : "bg-muted border-transparent text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Icon name="check" size="size-3" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="flex flex-col items-center text-center">
                    <span 
                        className={cn(
                            "text-xs font-semibold transition-colors duration-300",
                            isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        {step.label}
                    </span>
                    {step.description && (
                        <span className="text-[10px] text-muted-foreground hidden sm:block">
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
Stepper.displayName = "Stepper";

export { Stepper };
