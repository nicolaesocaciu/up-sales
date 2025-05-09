
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        
        // Custom badge variants for stock status
        "stock-out": "bg-red-100 border-red-200 text-red-800 hover:bg-red-200",
        "stock-low": "bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200",
        "stock-stable": "bg-green-100 border-green-200 text-green-800 hover:bg-green-200",
        "stock-overstock": "bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200",
        "stock-insufficient": "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200",
        
        // Custom badge variants for customer status
        success: "bg-green-100 border-green-200 text-green-800 hover:bg-green-200",
        warning: "bg-red-100 border-red-200 text-red-800 hover:bg-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
