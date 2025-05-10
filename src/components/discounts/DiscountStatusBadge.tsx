
import { cn } from "@/lib/utils";
import { DiscountStatus } from "@/types/discount";

interface DiscountStatusBadgeProps {
  status: DiscountStatus;
  className?: string;
}

export const DiscountStatusBadge = ({ status, className }: DiscountStatusBadgeProps) => {
  let badgeClasses = "rounded-[4px] text-xs font-medium py-[4px] px-[12px]";
  
  switch (status) {
    case "Active":
      badgeClasses = cn(badgeClasses, "border border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]", className);
      return (
        <div className={badgeClasses}>
          <span>Active</span>
        </div>
      );
    case "Expired":
      badgeClasses = cn(badgeClasses, "border border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C]", className);
      return (
        <div className={badgeClasses}>
          <span>Expired</span>
        </div>
      );
    case "Pending":
      badgeClasses = cn(badgeClasses, "border border-[#F2C480] bg-[#FCF2DC] text-[#B35300]", className);
      return (
        <div className={badgeClasses}>
          <span>Pending</span>
        </div>
      );
    default:
      return null;
  }
};
