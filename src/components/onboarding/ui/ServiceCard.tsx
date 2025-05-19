
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
        border rounded-lg p-6 cursor-pointer transition-colors flex flex-col items-center justify-center h-[160px]
        ${selected 
          ? 'border-[#116FAE] bg-[#E7F2F9]' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      onClick={onClick}
    >
      <div className="flex-1 flex items-center justify-center mb-4">
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
      <div className="text-center">
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
  );
};
