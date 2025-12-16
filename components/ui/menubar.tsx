import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

// --- Menubar Root ---
const Menubar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border border-border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  />
));
Menubar.displayName = "Menubar";

// --- Menubar Menu (Wrapper) ---
const MenubarMenu = ({ children }: { children?: React.ReactNode }) => {
    // Basic context for submenu state could go here, for now using simple dropdown logic in trigger
    return <div className="relative">{children}</div>;
};

// --- Menubar Trigger ---
interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, label, onClick, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                className
            )}
            onClick={onClick}
            {...props}
        >
            {label}
        </button>
    );
  }
);
MenubarTrigger.displayName = "MenubarTrigger";

// --- Menubar Content (Uses Dropdown Logic internally for this demo) ---
// Note: In a full implementation, this would share logic with DropdownMenu, but we isolate for clarity.
const MenubarContent = ({ 
    isOpen, 
    onClose, 
    children, 
    className 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    children?: React.ReactNode; 
    className?: string 
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "absolute left-0 top-full z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 translate-y-1",
                className
            )}
        >
            {children}
        </div>
    );
};

const MenubarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean; shortcut?: string }
>(({ className, inset, shortcut, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {props.children}
    {shortcut && <span className="ml-auto text-xs tracking-widest text-muted-foreground">{shortcut}</span>}
  </div>
));
MenubarItem.displayName = "MenubarItem";

const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-muted-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = "MenubarLabel";

// Simplified Compound Component for easy usage
const MenubarGroup = ({ trigger, children }: { trigger: string; children?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <MenubarMenu>
            <MenubarTrigger label={trigger} onClick={() => setIsOpen(!isOpen)} className={isOpen ? "bg-accent text-accent-foreground" : ""} />
            <MenubarContent isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {children}
            </MenubarContent>
        </MenubarMenu>
    )
}

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarGroup };