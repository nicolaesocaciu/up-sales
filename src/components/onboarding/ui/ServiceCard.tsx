
import { Check } from "lucide-react";

type ServiceCardProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
  iconUrl?: string;
};

export const ServiceCard = ({ title, selected, onClick, iconUrl }: ServiceCardProps) => {
  const isManualService = title === "Manual";
  
  return (
    <div 
      className={`
        rounded-[16px] p-6 cursor-pointer transition-colors flex flex-col items-center justify-center h-[200px]
        ${selected 
          ? 'bg-[#E7F2F9] shadow-[inset_0_0_0_4px_#1482CC]' 
          : 'border border-gray-200 bg-white hover:border-[#1482CC] shadow-[0px_5px_10px_0px_rgba(27,56,76,0.1)]'
        }
      `}
      onClick={onClick}
    >
    <div className="flex-1 flex items-center justify-center mb-4">
      {isManualService ? (
        <div className="w-20 h-20 flex items-center justify-center text-[#116FAE]">
          <img src="/lovable-uploads/4e023dfc-f7de-4fb6-9260-0197f2015055.png" alt="Manual upload" className="w-16 h-16" />
        </div>
      ) : iconUrl ? (
        <div className="w-20 h-20 flex items-center justify-center">
          <img src={iconUrl} alt={`${title} logo`} className="max-w-full max-h-full" />
        </div>
      ) : (
        <div className="bg-gray-100 w-12 h-12 rounded-full"></div>
      )}
    </div>
    <div className="text-center">
      <h3 className={`${selected ? 'font-bold' : 'font-normal'}`}>{title}</h3>
    </div>
  </div>
  );
};
