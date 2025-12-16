import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  sideOffset?: number;
}

const Popover: React.FC<PopoverProps> = ({ 
    trigger, 
    content, 
    align = "center", 
    side = "bottom", 
    className,
    sideOffset = 4
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamic positioning classes
  const positionClasses = {
      top: "bottom-full mb-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2",
      right: "left-full ml-2",
  };

  const alignClasses = {
      // Vertical Axis (for top/bottom sides)
      vertical: {
          start: "left-0",
          center: "left-1/2 -translate-x-1/2",
          end: "right-0",
      },
      // Horizontal Axis (for left/right sides)
      horizontal: {
          start: "top-0",
          center: "top-1/2 -translate-y-1/2",
          end: "bottom-0",
      }
  };

  const isVertical = side === "top" || side === "bottom";
  const axis = isVertical ? "vertical" : "horizontal";

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div 
            className={cn(
                "absolute z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-fade-in",
                positionClasses[side],
                alignClasses[axis][align],
                className
            )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export { Popover };