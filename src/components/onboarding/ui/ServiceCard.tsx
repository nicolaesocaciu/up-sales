
import { Check } from "lucide-react";

type ServiceCardProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
  iconUrl?: string;
};

export const ServiceCard = ({ title, selected, onClick, iconUrl }: ServiceCardProps) => {
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
      {/* Inset border effect */}
      {/* <div className={`
        absolute inset-0 rounded-lg border-2 
        ${selected ? 'border-[#116FAE]' : 'border-gray-200'}
      `}></div> */}
      
      <div className="flex-1 flex items-center justify-center mb-4 z-10">
        {selected ? (
          <div className="bg-[#116FAE] rounded-full w-12 h-12 flex items-center justify-center">
            <Check className="text-white h-5 w-5" />
          </div>
        ) : iconUrl ? (
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={iconUrl} alt={`${title} logo`} className="max-w-full max-h-full" />
          </div>
        ) : (
          <div className="bg-gray-100 w-12 h-12 rounded-full"></div>
        )}
      </div>
      <div className="text-center z-10">
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
  );
};
