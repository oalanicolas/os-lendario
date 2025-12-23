import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className={cn('relative inline-block', className)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        {...props}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  children,
  className,
  asChild,
  ...props
}) => {
  return (
    <div className={cn('inline-block cursor-help', className)} {...props}>
      {children}
    </div>
  );
};

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'bottom' | 'left' | 'right';
}

const TooltipContent: React.FC<TooltipContentProps> = ({
  children,
  className,
  side = 'top',
  ...props
}) => {
  const context = useContext(TooltipContext);

  if (!context?.isOpen) return null;

  return (
    <div
      className={cn(
        'pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 font-sans text-xs font-semibold text-background shadow-md',
        'animate-in fade-in zoom-in-95 duration-200',
        // Positioning logic
        side === 'top' && 'bottom-full left-1/2 mb-2 -translate-x-1/2',
        side === 'bottom' && 'left-1/2 top-full mt-2 -translate-x-1/2',
        side === 'left' && 'right-full top-1/2 mr-2 -translate-y-1/2',
        side === 'right' && 'left-full top-1/2 ml-2 -translate-y-1/2',
        className
      )}
      {...props}
    >
      {children}
      {/* Arrow */}
      {side === 'top' && (
        <div className="absolute left-1/2 top-full -mt-px h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-foreground"></div>
      )}
      {side === 'bottom' && (
        <div className="absolute bottom-full left-1/2 -mb-px h-0 w-0 -translate-x-1/2 border-b-[4px] border-l-[4px] border-r-[4px] border-b-foreground border-l-transparent border-r-transparent"></div>
      )}
    </div>
  );
};

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
