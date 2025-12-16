import React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback } from "./avatar";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  limit?: number;
  size?: "sm" | "default" | "lg";
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, limit, size = "default", ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const excess = limit ? childrenArray.length - limit : 0;
    const showChildren = limit ? childrenArray.slice(0, limit) : childrenArray;

    // Map size to classes for consistency
    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base"
    };

    const spacingClasses = {
        sm: "-space-x-2",
        default: "-space-x-3",
        lg: "-space-x-4"
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClasses[size], className)}
        {...props}
      >
        {React.Children.map(showChildren, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              className: cn("ring-2 ring-background", (child.props as any).className),
              size: size,
            });
          }
          return child;
        })}
        
        {excess > 0 && (
          <Avatar className="ring-2 ring-background" size={size}>
            <AvatarFallback className="bg-muted text-muted-foreground font-bold">
              +{excess}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };