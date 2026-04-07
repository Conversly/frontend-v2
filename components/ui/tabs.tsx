"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function TabsList({
  variant = "underline",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: "underline" | "segmented" | "mindtickle"
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        "text-muted-foreground flex items-center",
        variant === "underline" && "border-b border-[var(--border-secondary)] gap-0",
        variant === "segmented" && "w-fit gap-1 rounded-[var(--radius-input)] border border-border bg-[var(--toolbar-background)] p-1 shadow-xs",
        variant === "mindtickle" && "w-full justify-start gap-4 overflow-x-auto border-0 bg-transparent p-0 shadow-none",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  variant = "underline",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: "underline" | "segmented" | "mindtickle"
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer transition-[color,border-color] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "underline" && [
          "inline-flex items-center gap-1.5 border-b-2 border-transparent px-3 pb-3 pt-2 text-sm font-medium whitespace-nowrap",
          "hover:text-foreground hover:border-border",
          "data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-semibold",
        ],
        variant === "segmented" && [
          "inline-flex items-center gap-1.5 rounded-[var(--radius-input)] px-3 py-1.5 text-sm font-medium whitespace-nowrap",
          "hover:text-foreground",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs dark:data-[state=active]:bg-input/30",
        ],
        variant === "mindtickle" && [
          "relative inline-flex items-center gap-2 rounded-none border-0 bg-transparent px-0 py-4 text-base font-semibold whitespace-nowrap shadow-none",
          "hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
        ],
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none mt-4", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
