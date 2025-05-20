
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

type ServiceCardProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
  iconUrl?: string;
  description?: string;
  fullWidth?: boolean;
  formComponent?: React.ReactNode;
};

export const ServiceCard = ({ 
  title, 
  selected, 
  onClick, 
  iconUrl, 
  description,
  fullWidth = false,
  formComponent 
}: ServiceCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isManualService = title === "Manual";
  
  if (!fullWidth) {
    // Original card layout for non-fullWidth cards
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
  }
  
  // Full-width expandable card layout
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className={`
        w-full mb-4 rounded-[16px] border bg-white overflow-hidden
        ${selected 
          ? 'border-[#1482CC] shadow-[0px_2px_4px_0px_rgba(13,87,136,0.16)]' 
          : 'border-gray-200 hover:border-[#1482CC] shadow-[0px_5px_10px_0px_rgba(27,56,76,0.1)]'
        }
      `}
    >
      <CollapsibleTrigger 
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="w-full px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center">
          {isManualService ? (
            <div className="w-16 h-16 flex items-center justify-center text-[#116FAE] mr-4">
              <img src="/lovable-uploads/4e023dfc-f7de-4fb6-9260-0197f2015055.png" alt="Manual upload" className="w-12 h-12" />
            </div>
          ) : iconUrl ? (
            <div className="w-16 h-16 flex items-center justify-center mr-4">
              <img src={iconUrl} alt={`${title} logo`} className="max-w-full max-h-full w-12 h-12" />
            </div>
          ) : (
            <div className="bg-gray-100 w-12 h-12 rounded-full mr-4"></div>
          )}
          
          <div className="text-left">
            <h3 className={`${selected ? 'font-bold' : 'font-normal'} text-lg`}>{title}</h3>
            {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
          </div>
        </div>
        
        <div className="text-[#116FAE]">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </CollapsibleTrigger>
      
      {formComponent && (
        <CollapsibleContent className="px-6 pb-6 pt-2">
          {formComponent}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};
