// @ts-nocheck
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined);

interface DropdownMenuProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right' | 'start' | 'end';
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left" ref={containerRef}>
        {trigger ? (
          <>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              {trigger}
            </div>
            {isOpen && <DropdownMenuContent align={align as any}>{children}</DropdownMenuContent>}
          </>
        ) : (
          children
        )}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, children, asChild, onClick, ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    context.setIsOpen(!context.isOpen);
    if (onClick) onClick(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      ref: ref,
    });
  }

  return (
    <div ref={ref} onClick={handleClick} className={cn('cursor-pointer', className)} {...props}>
      {children}
    </div>
  );
});
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right' | 'start' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, children, align = 'left', side = 'bottom', ...props }, ref) => {
    const context = useContext(DropdownMenuContext);
    if (!context) return null;

    if (!context.isOpen) return null;

    let positionClasses =
      'absolute z-50 mt-2 w-56 rounded-md border border-border bg-popover p-1 shadow-md animate-accordion-down focus:outline-none';

    if (side === 'right') {
      positionClasses = cn(positionClasses, 'top-0 left-full ml-2 mt-0');
      if (align === 'end') positionClasses = cn(positionClasses, 'bottom-0 top-auto');
    } else if (side === 'top') {
      positionClasses = cn(positionClasses, 'bottom-full mb-2 mt-0');
      if (align === 'end' || align === 'right') positionClasses = cn(positionClasses, 'right-0');
      else if (align === 'center')
        positionClasses = cn(positionClasses, 'left-1/2 -translate-x-1/2');
      else positionClasses = cn(positionClasses, 'left-0');
    } else {
      // Bottom default
      if (align === 'right' || align === 'end') positionClasses = cn(positionClasses, 'right-0');
      else if (align === 'center')
        positionClasses = cn(positionClasses, 'left-1/2 -translate-x-1/2');
      else positionClasses = cn(positionClasses, 'left-0');
    }

    return (
      <div ref={ref} className={cn(positionClasses, className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: (e: any) => {
                if ((child.props as any).onClick) (child.props as any).onClick(e);
                context.setIsOpen(false);
              },
            });
          }
          return child;
        })}
      </div>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean; destructive?: boolean }
>(({ className, inset, destructive, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 font-sans text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      destructive && 'text-destructive hover:bg-destructive/10 hover:text-destructive',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
