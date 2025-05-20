
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ReactNode, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<"connection" | "importData">("connection");
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
  // Always keep the selected background style regardless of open/close state
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
        <div className="px-6 pb-6 border-t bg-[#FFFFFF]">
          {isManualService ? (
            // For manual service, render children directly (Users/Orders tabs)
            children
          ) : (
            // For other services, add tabs for Connection Settings and Import Data
            <div className="pt-4">
              <Tabs 
                defaultValue="connection" 
                onValueChange={(val) => setActiveTab(val as "connection" | "importData")}
                className="w-full"
              >
                <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
                  <TabsTrigger 
                    value="connection"
                    className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
                  >
                    Connection Settings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="importData"
                    className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
                  >
                    Import Data
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="connection" className="mt-4">
                  {/* Connection Settings Content */}
                  <div className="space-y-4">
                    {children}
                  </div>
                </TabsContent>
                
                <TabsContent value="importData" className="mt-4">
                  {/* Import Data Content */}
                  <div className="space-y-4">
                    <p>Select the data you'd like to import:</p>
                    {/* This would typically have checkboxes or options for what data to import */}
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="import-users" className="rounded border-gray-300" />
                        <label htmlFor="import-users">Users</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="import-orders" className="rounded border-gray-300" />
                        <label htmlFor="import-orders">Orders</label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
