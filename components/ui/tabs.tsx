import React, { createContext, useContext, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// --- Contexts ---
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}
const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsListContextValue {
  variant: "default" | "pills" | "outline";
}
const TabsListContext = createContext<TabsListContextValue>({ variant: "default" });

// --- Tabs Root ---
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props} />
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

// --- Tabs List ---
const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "w-full justify-start border-b border-border bg-transparent p-0",
        pills: "h-10 rounded-md bg-muted p-1",
        outline: "border border-border rounded-lg p-1 bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {
  variant?: "default" | "pills" | "outline" | null | undefined
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <TabsListContext.Provider value={{ variant: variant || "default" }}>
        <div
          ref={ref}
          role="tablist"
          className={cn(tabsListVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </TabsListContext.Provider>
    );
  }
);
TabsList.displayName = "TabsList";

// --- Tabs Trigger ---
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-foreground",
        pills:
          "rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        outline:
          "rounded-md data-[state=active]:bg-muted data-[state=active]:font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    const listContext = useContext(TabsListContext);

    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => context.onValueChange(value)}
        className={cn(
          tabsTriggerVariants({ variant: listContext.variant }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

// --- Tabs Content ---
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.value !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state="active"
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in",
          className
        )}
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };