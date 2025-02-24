
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-[#F1F0FB] via-[#F2F2F2] to-[#F1F0FB] bg-[length:200%_100%] animate-shimmer", 
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
