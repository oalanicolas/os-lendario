import React, { createContext, useContext, useState } from "react"
import { cn } from "../../lib/utils"
import { Symbol } from "./symbol"

const RadioGroupContext = createContext<{
  value: string;
  onChange: (value: string) => void;
  name?: string;
} | undefined>(undefined);

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, defaultValue, name, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (v: string) => {
      if (value === undefined) setInternalValue(v);
      onValueChange?.(v);
    };

    return (
      <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
        <div className={cn("grid gap-2", className)} ref={ref} {...props} />
      </RadioGroupContext.Provider>
    );
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    if (!context) throw new Error("RadioGroupItem must be used within RadioGroup");

    const isChecked = context.value === value;

    return (
      <button
        type="button"
        role="radio"
        aria-checked={isChecked}
        onClick={() => context.onChange(value)}
        ref={ref}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center",
          className
        )}
        {...props}
      >
        {isChecked && <div className="h-2 w-2 rounded-full bg-current" />}
      </button>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }