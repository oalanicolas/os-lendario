import React, { useRef } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

// Dock Component
export const Dock = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex h-16 w-max items-end rounded-2xl border border-border bg-background/50 p-2 backdrop-blur-md shadow-xl gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Dock.displayName = "Dock";

// Dock Icon Component
interface DockIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    label?: string;
    isActive?: boolean;
}

export const DockIcon = React.forwardRef<HTMLButtonElement, DockIconProps>(
  ({ className, icon, label, isActive, ...props }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger>
            <button
                ref={ref}
                className={cn(
                "group relative flex aspect-square h-12 w-12 items-center justify-center rounded-xl bg-background border border-border shadow-sm transition-all duration-200 hover:-translate-y-2 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive && "border-primary bg-primary/10 text-primary",
                className
                )}
                {...props}
            >
                <Icon name={icon} size="size-5" />
                {isActive && (
                    <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary" />
                )}
            </button>
        </TooltipTrigger>
        {label && <TooltipContent side="top">{label}</TooltipContent>}
      </Tooltip>
    );
  }
);
DockIcon.displayName = "DockIcon";

export const DockSeparator = () => (
    <div className="h-8 w-[1px] bg-border mx-1 self-center" />
);