
import { cn } from "@/lib/utils";
import { DiscountStatus } from "@/types/discount";

interface DiscountStatusBadgeProps {
  status: DiscountStatus;
  className?: string;
}

export const DiscountStatusBadge = ({ status, className }: DiscountStatusBadgeProps) => {
  let badgeClasses = "flex items-center gap-1.5 rounded-[4px] text-xs font-medium w-fit px-[10px] py-[2px]";
  
  switch (status) {
    case "Active":
      badgeClasses = cn(badgeClasses, "bg-[#CFE7CF] border border-[#9BC29B] text-[#2D7048]", className);
      return (
        <div className={badgeClasses}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#2D7048]"></span>
          <span>Active</span>
        </div>
      );
    case "Expired":
      badgeClasses = cn(badgeClasses, "bg-[#FAD9DE] border border-[#F1BDC4] text-[#CC334C]", className);
      return (
        <div className={badgeClasses}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#CC334C]"></span>
          <span>Expired</span>
        </div>
      );
    case "Pending":
      badgeClasses = cn(badgeClasses, "bg-[#FCF2DC] border border-[#F2C480] text-[#B35300]", className);
      return (
        <div className={badgeClasses}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#B35300]"></span>
          <span>Pending</span>
        </div>
      );
    default:
      return null;
  }
};
