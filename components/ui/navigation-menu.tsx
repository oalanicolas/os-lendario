import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

// --- CONTEXT ---
interface NavigationMenuContextValue {
  value: string | null;
  onValueChange: (value: string | null) => void;
  onLeave: () => void;
  onEnter: () => void;
}
const NavigationMenuContext = React.createContext<NavigationMenuContextValue>({
  value: null,
  onValueChange: () => {},
  onLeave: () => {},
  onEnter: () => {},
});

// --- ROOT ---
const NavigationMenu = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    const [value, setValue] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleValueChange = (newValue: string | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setValue(newValue);
    };

    const handleEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        // Add delay to allow moving mouse to content
        timeoutRef.current = setTimeout(() => {
            setValue(null);
        }, 300); 
    };

    return (
      <NavigationMenuContext.Provider value={{ value, onValueChange: handleValueChange, onLeave: handleLeave, onEnter: handleEnter }}>
        <nav
          ref={ref}
          className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
          onMouseLeave={handleLeave}
          onMouseEnter={handleEnter}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
      {...props}
    />
  )
);
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("relative", className)} {...props} />
  )
);
NavigationMenuItem.displayName = "NavigationMenuItem";

// --- TRIGGER ---
interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string; // Unique ID for this menu item
}

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, children, value, ...props }, ref) => {
    const context = React.useContext(NavigationMenuContext);
    const isOpen = context.value === value;

    return (
      <button
        ref={ref}
        onMouseEnter={() => context.onValueChange(value)}
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <Icon
          name="angle-small-down"
          className={cn(
            "relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// --- CONTENT ---
interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(NavigationMenuContext);
    const isOpen = context.value === value;

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        onMouseEnter={context.onEnter} // Keep open when hovering content
        onMouseLeave={context.onLeave}
        className={cn(
          "absolute left-0 top-full mt-2 w-auto min-w-[200px] origin-top-left rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-lg animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      >
        {props.children}
      </div>
    );
  }
);
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
};