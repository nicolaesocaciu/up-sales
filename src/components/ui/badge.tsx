
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] border px-[12px] py-[4px] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
        "stock-out": "border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C]",
        "stock-low": "border-[#F2C480] bg-[#FCF2DC] text-[#B35300]",
        "stock-stable": "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]",
        "stock-overstock": "border-[#99CBEC] bg-[#E7F2F9] text-[#0D5788]",
        "stock-insufficient": "border-[#C0C0C0] bg-[#DADADA] text-[#494A4A]",
        
        // Custom badge variants for customer status
        success: "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]",
        warning: "border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C]",
        
        // Additional variants based on the knowledge
        "green": "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]",
        "red": "border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C]", 
        "orange": "border-[#F2C480] bg-[#FCF2DC] text-[#B35300]",
        "blue": "border-[#99CBEC] bg-[#E7F2F9] text-[#0D5788]",
        "grey": "border-[#C0C0C0] bg-[#DADADA] text-[#494A4A]",
        "purple": "border-[#AD95DA80] bg-[#E3D7FA] text-[#7249BC]",
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
