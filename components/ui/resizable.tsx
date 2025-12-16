import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

interface ResizablePanelGroupProps {
  direction?: "horizontal" | "vertical";
  children?: React.ReactNode;
  className?: string;
}

const ResizablePanelGroup = ({ direction = "horizontal", children, className }: ResizablePanelGroupProps) => {
  return (
    <div className={cn("flex w-full h-full overflow-hidden", direction === "vertical" ? "flex-col" : "flex-row", className)}>
      {children}
    </div>
  );
};

interface ResizablePanelProps {
  defaultSize?: number; // Percentage
  minSize?: number;
  maxSize?: number;
  children?: React.ReactNode;
  className?: string;
}

const ResizablePanel = ({ defaultSize = 50, children, className }: ResizablePanelProps) => {
  return (
    <div 
        className={cn("flex-grow overflow-auto transition-all duration-75 ease-out", className)}
        style={{ flexBasis: `${defaultSize}%` }}
    >
      {children}
    </div>
  );
};

interface ResizableHandleProps {
  withHandle?: boolean;
  direction?: "horizontal" | "vertical";
}

const ResizableHandle = ({ withHandle, direction = "horizontal" }: ResizableHandleProps) => {
  return (
    <div 
        className={cn(
            "relative flex items-center justify-center bg-border hover:bg-primary/50 transition-colors z-10 group",
            direction === "horizontal" ? "w-1 h-full cursor-col-resize" : "h-1 w-full cursor-row-resize"
        )}
    >
        {withHandle && (
            <div className={cn(
                "z-20 rounded-sm bg-border border border-input flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors",
                direction === "horizontal" ? "w-4 h-8" : "w-8 h-4"
            )}>
                <Icon name={direction === "horizontal" ? "menu-dots-vertical" : "menu-dots"} size="size-3" />
            </div>
        )}
    </div>
  );
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };