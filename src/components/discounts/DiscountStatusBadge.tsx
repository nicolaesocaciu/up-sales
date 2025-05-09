
import { DiscountStatus } from "@/types/discount";

interface DiscountStatusBadgeProps {
  status: DiscountStatus;
}

export const DiscountStatusBadge = ({ status }: DiscountStatusBadgeProps) => {
  let bgColor = "";
  let dotColor = "";
  
  switch (status) {
    case "Active":
      bgColor = "bg-[#E8F5E9]";
      dotColor = "bg-[#4CAF50]";
      break;
    case "Expired":
      bgColor = "bg-[#FFEBEE]";
      dotColor = "bg-[#F44336]";
      break;
    case "Pending":
      bgColor = "bg-[#FFF8E1]";
      dotColor = "bg-[#FFC107]";
      break;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${bgColor}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
      <span className="text-sm">{status}</span>
    </div>
  );
};
