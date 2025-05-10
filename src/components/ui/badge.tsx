
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] border px-[12px] py-[3px] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        
        // Updated badge variants with the custom colors from knowledge
        "stock-out": "border-[#FAD9DE] bg-[#FFEDEF] text-[#CC334C]",
        "stock-low": "border-[#FCDFB1] bg-[#FFF7E4] text-[#B35300]",
        "stock-stable": "border-[#CFE7CF] bg-[#EBF7EB] text-[#2D7048]",
        "stock-overstock": "border-[#D2EAFA] bg-[#E7F2F9] text-[#0D5788]",
        "stock-insufficient": "border-[#DADADA] bg-[#F2F2F2] text-[#494A4A]",
        
        // Custom badge variants for customer status
        success: "border-[#CFE7CF] bg-[#EBF7EB] text-[#2D7048]",
        warning: "border-[#FCDFB1] bg-[#FFF7E4] text-[#CC334C]",
        
        // Additional variants based on the knowledge
        "green": "border-[#CFE7CF] bg-[#EBF7EB] text-[#2D7048]",
        "red": "border-[#FAD9DE] bg-[#FFEDEF] text-[#CC334C]", 
        "orange": "border-[#FCDFB1] bg-[#FFF7E4] text-[#B35300]",
        "blue": "border-[#D2EAFA] bg-[#E7F2F9] text-[#0D5788]",
        "grey": "border-[#DADADA] bg-[#F2F2F2] text-[#494A4A]",
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
