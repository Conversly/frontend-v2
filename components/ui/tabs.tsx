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
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: "default" | "segmented"
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        "text-muted-foreground inline-flex w-fit items-center justify-center gap-1 rounded-xl border border-border/70 bg-[var(--toolbar-background)] p-1 shadow-xs",
        variant === "default" && "h-10",
        variant === "segmented" && "h-auto flex-wrap justify-start rounded-2xl p-1.5",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: "default" | "segmented"
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex items-center justify-center gap-1.5 border border-transparent whitespace-nowrap transition-[color,box-shadow,border-color,background-color] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "default" && "h-8 rounded-lg px-3 py-1 text-sm font-semibold data-[state=active]:border-border/70",
        variant === "segmented" && "min-h-11 rounded-xl px-3.5 py-2 text-sm font-semibold data-[state=active]:border-border/70 data-[state=active]:bg-card data-[state=active]:shadow-sm",
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
      className={cn("outline-none mt-3", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
