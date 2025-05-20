
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ReactNode, useState } from "react";

type ServiceCardProps = {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  iconUrl?: string;
  children?: ReactNode;
  isExpandable?: boolean;
};

export const ServiceCard = ({ 
  title, 
  description, 
  selected, 
  onClick, 
  iconUrl, 
  children, 
  isExpandable = false 
}: ServiceCardProps) => {
  const [isOpen, setIsOpen] = useState(selected);
  const isManualService = title === "Manual";
  
  // Regular card (used for Import Products screen)
  if (!isExpandable) {
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
  
  // Expandable card (used for Import Users and Orders screen)
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(open) => {
        if (selected) {
          setIsOpen(open);
        } else if (!open) {
          setIsOpen(false);
        }
      }}
      className={`
        w-full mb-4 rounded-[16px] border overflow-hidden
        ${selected
          ? 'bg-[#E7F2F9] border-[#1482CC]'
          : 'border-gray-200 bg-white'
        }
      `}
    >
      <CollapsibleTrigger 
        className="w-full cursor-pointer" 
        onClick={(e) => {
          e.preventDefault();
          onClick();
          
          // Toggle open state whether selected or not
          setIsOpen(!isOpen);
        }}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {isManualService ? (
              <div className="w-16 h-16 flex items-center justify-center text-[#116FAE]">
                <img src="/lovable-uploads/4e023dfc-f7de-4fb6-9260-0197f2015055.png" alt="Manual upload" className="w-16 h-16" />
              </div>
            ) : iconUrl ? (
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={iconUrl} alt={`${title} logo`} className="max-w-full max-h-full" />
              </div>
            ) : (
              <div className="bg-gray-100 w-12 h-12 rounded-full"></div>
            )}
            
            <div className="text-left">
              <h3 className={`${selected ? 'font-bold' : 'font-normal'} text-lg`}>{title}</h3>
              {description && <p className="text-gray-600 mt-1">{description}</p>}
            </div>
          </div>
          
          <ChevronDown 
            className={`transition-transform duration-200 size-6 ${isOpen ? 'transform rotate-180' : ''}`} 
            size={24}
          />
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="px-6 pb-6 border-t">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
