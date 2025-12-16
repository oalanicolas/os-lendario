
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border border-l-4 px-4 py-4 text-sm font-sans shadow-sm transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default: 
          "bg-card text-foreground border-border border-l-primary/50",
        destructive:
          "border-red-200 border-l-red-600 bg-red-50 text-red-900 dark:bg-red-950/30 dark:border-red-900/50 dark:border-l-red-500 dark:text-red-200",
        success:
          "border-green-200 border-l-green-600 bg-green-50 text-green-900 dark:bg-green-950/30 dark:border-green-900/50 dark:border-l-green-500 dark:text-green-200",
        warning:
          "border-amber-200 border-l-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900/50 dark:border-l-amber-500 dark:text-amber-200",
        info:
          "border-blue-200 border-l-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:border-blue-900/50 dark:border-l-blue-500 dark:text-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-2 font-bold leading-none tracking-tight text-lg flex items-center gap-2", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90 leading-relaxed font-sans font-medium", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
