
import { Check } from "lucide-react";

type ModuleCardProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
};

export const ModuleCard = ({ title, selected, onClick }: ModuleCardProps) => {
  return (
    <div 
      className={`
        border rounded-lg p-6 cursor-pointer transition-colors flex flex-col items-center justify-center
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
        ) : (
          <div className="bg-gray-100 w-12 h-12 rounded"></div>
        )}
      </div>
      <div className="text-center">
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
  );
};
