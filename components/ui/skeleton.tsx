import React from "react"
import { cn } from "../../lib/utils"

/**
 * Base Skeleton component for loading states
 *
 * DESIGN SYSTEM RULE: Always use skeleton loaders that mirror the actual UI layout.
 * Never use generic spinners for page/section loads - they should reflect what's loading.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

/**
 * Text line skeleton - for paragraphs, titles, labels
 * Use varying widths (w-full, w-3/4, w-1/2) to simulate natural text
 */
function SkeletonText({
  className,
  lines = 1,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { lines?: number }) {
  const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3']

  return (
    <div className="space-y-2" {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", widths[i % widths.length], className)}
        />
      ))}
    </div>
  )
}

/**
 * Heading skeleton - for page/section titles
 */
function SkeletonHeading({
  className,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "default" | "lg" | "xl"
}) {
  const heights = {
    sm: "h-5",
    default: "h-6",
    lg: "h-8",
    xl: "h-10",
  }

  return (
    <Skeleton
      className={cn(heights[size], "w-1/2", className)}
      {...props}
    />
  )
}

/**
 * Avatar/Circle skeleton - for profile pics, scores, icons
 */
function SkeletonCircle({
  className,
  size = "md",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl"
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  }

  return (
    <Skeleton
      className={cn(sizes[size], "rounded-full", className)}
      {...props}
    />
  )
}

/**
 * Card skeleton - for card-based layouts
 */
function SkeletonCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 space-y-3",
        className
      )}
      {...props}
    >
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

/**
 * Button skeleton - for action buttons
 */
function SkeletonButton({
  className,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "default" | "lg"
}) {
  const sizes = {
    sm: "h-8 w-20",
    default: "h-10 w-24",
    lg: "h-12 w-32",
  }

  return (
    <Skeleton
      className={cn(sizes[size], "rounded-md", className)}
      {...props}
    />
  )
}

/**
 * Table row skeleton - for table/list loading states
 */
function SkeletonTableRow({
  className,
  cols = 4,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { cols?: number }) {
  return (
    <div
      className={cn("flex items-center gap-4 py-3", className)}
      {...props}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === 0 ? "w-1/4" : i === cols - 1 ? "w-16" : "flex-1"
          )}
        />
      ))}
    </div>
  )
}

/**
 * Sidebar item skeleton - for navigation items
 */
function SkeletonSidebarItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-3 py-2", className)}
      {...props}
    >
      <Skeleton className="h-5 w-5 rounded" />
      <Skeleton className="h-4 flex-1" />
    </div>
  )
}

/**
 * Input skeleton - for form fields
 */
function SkeletonInput({
  className,
  withLabel = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { withLabel?: boolean }) {
  return (
    <div className="space-y-2" {...props}>
      {withLabel && <Skeleton className="h-4 w-24" />}
      <Skeleton className={cn("h-10 w-full rounded-md", className)} />
    </div>
  )
}

export {
  Skeleton,
  SkeletonText,
  SkeletonHeading,
  SkeletonCircle,
  SkeletonCard,
  SkeletonButton,
  SkeletonTableRow,
  SkeletonSidebarItem,
  SkeletonInput,
}
