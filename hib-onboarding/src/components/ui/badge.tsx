"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-hib-blue-50 text-hib-blue-700 ring-hib-blue-600/20",
        secondary: "bg-gray-50 text-gray-700 ring-gray-600/20",
        destructive: "bg-red-50 text-red-700 ring-red-600/20",
        success: "bg-green-50 text-green-700 ring-green-600/20",
        warning: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        info: "bg-blue-50 text-blue-700 ring-blue-600/20",
        outline: "text-foreground ring-border",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  pulse?: boolean
}

function Badge({ className, variant, size, icon, pulse, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }