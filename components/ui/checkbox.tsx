import React, { useState } from "react"
import { cn } from "../../lib/utils"
import { Icon } from "./icon"

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked: controlledChecked, onCheckedChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(false);
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const toggle = () => {
      const newState = !isChecked;
      if (controlledChecked === undefined) {
        setInternalChecked(newState);
      }
      onCheckedChange?.(newState);
    };

    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        onClick={toggle}
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          isChecked ? "bg-primary text-primary-foreground" : "bg-transparent",
          className
        )}
        {...props}
      >
        <span className={cn("flex items-center justify-center", isChecked ? "opacity-100" : "opacity-0")}>
           <Icon name="check" className="h-3 w-3" />
        </span>
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }