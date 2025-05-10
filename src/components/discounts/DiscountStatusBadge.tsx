
import { cn } from "@/lib/utils";
import { DiscountStatus } from "@/types/discount";

interface DiscountStatusBadgeProps {
  status: DiscountStatus;
  className?: string;
}

export const DiscountStatusBadge = ({ status, className }: DiscountStatusBadgeProps) => {
  let badgeClasses = "rounded-[4px] text-xs font-medium py-[3px] px-[12px]";
  
  switch (status) {
    case "Active":
      badgeClasses = cn(badgeClasses, "inline-flex border border-[#CFE7CF] bg-[#EBF7EB] text-[#2D7048] font-semibold", className);
      return (
        <div className={badgeClasses}>
          <span>Active</span>
        </div>
      );
    case "Expired":
      badgeClasses = cn(badgeClasses, "inline-flex border border-[#FAD9DE] bg-[#FFEDEF] text-[#CC334C] font-semibold", className);
      return (
        <div className={badgeClasses}>
          <span>Expired</span>
        </div>
      );
    case "Pending":
      badgeClasses = cn(badgeClasses, "inline-flex border border-[#FCDFB1] bg-[#FFF7E4] text-[#B35300] font-semibold", className);
      return (
        <div className={badgeClasses}>
          <span>Pending</span>
        </div>
      );
    default:
      return null;
  }
};
