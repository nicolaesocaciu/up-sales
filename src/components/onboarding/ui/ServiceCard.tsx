
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
          <svg width="64" height="64" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3335 10.6666H21.3335L14.0002 3.33331L6.66683 10.6666H10.6668V17.3333H17.3335V10.6666Z" stroke="#116FAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.33333 26.6667V22.6667C3.33333 21.9594 3.61428 21.281 4.11438 20.7809C4.61448 20.2808 5.29276 20 6 20H22C22.7072 20 23.3855 20.2808 23.8856 20.7809C24.3857 21.281 24.6667 21.9594 24.6667 22.6667V26.6667" stroke="#116FAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
