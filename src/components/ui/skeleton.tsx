
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-[#F1F1F1] via-[#EAEAEA] to-[#F1F1F1] bg-[length:200%_100%] animate-shimmer", 
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
