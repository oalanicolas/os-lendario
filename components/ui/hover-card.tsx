import React, { useState, useRef } from "react";
import { cn } from "../../lib/utils";

interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ trigger, children, width = "w-80" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="cursor-help underline decoration-dotted underline-offset-4 decoration-muted-foreground/50">
        {trigger}
      </div>
      
      {isOpen && (
        <div 
            className={cn(
                "absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none animate-fade-in",
                width
            )}
        >
          {children}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-border"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-popover"></div>
        </div>
      )}
    </div>
  );
};

export { HoverCard };