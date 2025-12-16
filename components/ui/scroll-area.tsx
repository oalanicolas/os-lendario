import React from "react"
import { cn } from "../../lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    maxHeight?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, maxHeight = "h-full", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden", 
        maxHeight,
        className
      )}
      {...props}
    >
      <div className={cn("h-full w-full overflow-y-auto custom-scrollbar pr-2")}>
        {children}
      </div>
    </div>
  )
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
