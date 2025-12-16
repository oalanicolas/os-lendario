import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof toggleVariants> {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    variant?: "default" | "outline" | null;
    size?: "default" | "sm" | "lg" | null;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, onPressedChange, ...props }, ref) => {
    const [internalPressed, setInternalPressed] = React.useState(false);
    const isPressed = pressed !== undefined ? pressed : internalPressed;

    const handleClick = () => {
        const newState = !isPressed;
        if(pressed === undefined) setInternalPressed(newState);
        onPressedChange?.(newState);
        props.onClick?.(null as any);
    }

    return (
        <button
            ref={ref}
            type="button"
            aria-pressed={isPressed}
            data-state={isPressed ? "on" : "off"}
            className={cn(toggleVariants({ variant, size, className }))}
            onClick={handleClick}
            {...props}
        />
    )
  }
)

Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }