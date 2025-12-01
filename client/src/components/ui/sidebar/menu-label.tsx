"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function SidebarMenuLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-label"
      data-sidebar="menu-label"
      className={cn(
        "text-sidebar-foreground/70 px-2 py-1.5 text-xs font-medium",
        className
      )}
      {...props}
    />
  )
}
