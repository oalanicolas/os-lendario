import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';

interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ trigger, children, width = 'w-80' }) => {
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
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-help underline decoration-muted-foreground/50 decoration-dotted underline-offset-4">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 animate-fade-in rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none',
            width
          )}
        >
          {children}
          {/* Arrow */}
          <div className="absolute left-1/2 top-full -mt-px h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-border"></div>
          <div className="absolute left-1/2 top-full -mt-[2px] h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-popover"></div>
        </div>
      )}
    </div>
  );
};

export { HoverCard };
