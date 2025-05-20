
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
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V7.5C22 7.23478 21.8946 6.98043 21.7071 6.79289C21.5196 6.60536 21.2652 6.5 21 6.5H14L12 4H3C2.46957 4 1.96086 4.21071 1.58579 4.58579C1.21071 4.96086 1 5.46957 1 6V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 14L12 11L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
