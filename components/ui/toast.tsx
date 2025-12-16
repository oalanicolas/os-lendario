import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  action,
  variant = "default",
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Animation duration
  };

  // Auto close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const variantStyles = {
    default: "bg-background border-border text-foreground",
    destructive: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-900 dark:text-red-100",
    success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-900 dark:text-green-100",
    warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-900 dark:text-amber-100",
  };

  const icons = {
    default: "bell",
    destructive: "cross-circle",
    success: "check-circle",
    warning: "exclamation"
  };

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        variantStyles[variant],
        isExiting ? "animate-fade-out translate-x-full" : "animate-slide-in-right"
      )}
    >
      <div className="flex gap-3 items-start">
          {variant !== 'default' && (
              <Icon name={icons[variant]} className={cn("mt-0.5 shrink-0", "text-current")} />
          )}
          <div className="grid gap-1">
            {title && <div className="text-sm font-semibold">{title}</div>}
            {description && (
            <div className="text-sm opacity-90 font-serif">
                {description}
            </div>
            )}
          </div>
      </div>
      {action}
      <button
        onClick={handleClose}
        className={cn(
            "absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
            variant === 'default' ? "text-foreground/50 hover:text-foreground" : "text-current opacity-70 hover:opacity-100"
        )}
      >
        <Icon name="cross" size="size-3" />
      </button>
    </div>
  );
};