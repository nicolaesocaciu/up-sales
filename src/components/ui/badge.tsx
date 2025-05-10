
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] border px-[10px] py-[2px] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
        
        // Updated badge variants with the custom colors
        "stock-out": "border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C] hover:bg-[#FAD9DE]/90",
        "stock-low": "border-[#F2C480] bg-[#FCF2DC] text-[#B35300] hover:bg-[#FCF2DC]/90",
        "stock-stable": "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048] hover:bg-[#CFE7CF]/90",
        "stock-overstock": "border-[#99CBEC] bg-[#E7F2F9] text-[#0D5788] hover:bg-[#E7F2F9]/90",
        "stock-insufficient": "border-[#C0C0C0] bg-[#DADADA] text-[#494A4A] hover:bg-[#DADADA]/90",
        
        // Custom badge variants for customer status
        success: "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048] hover:bg-[#CFE7CF]/90",
        warning: "border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C] hover:bg-[#FAD9DE]/90",
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
