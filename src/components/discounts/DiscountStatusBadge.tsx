
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
      badgeClasses = cn(badgeClasses, "bg-green-100 border border-green-200 text-green-800", className);
      return (
        <div className={badgeClasses}>
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          <span>Active</span>
        </div>
      );
    case "Expired":
      badgeClasses = cn(badgeClasses, "bg-red-100 border border-red-200 text-red-800", className);
      return (
        <div className={badgeClasses}>
          <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
          <span>Expired</span>
        </div>
      );
    case "Pending":
      badgeClasses = cn(badgeClasses, "bg-yellow-100 border border-yellow-200 text-yellow-800", className);
      return (
        <div className={badgeClasses}>
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
          <span>Pending</span>
        </div>
      );
    default:
      return null;
  }
};
