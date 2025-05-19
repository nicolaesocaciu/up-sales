
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
    <div className="flex-1 flex items-center justify-center mb-4">
      {selected ? (
        <div className="bg-[#116FAE] rounded-full w-16 h-16 flex items-center justify-center">
          <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.726 27.2778C11.0401 27.5505 11.4101 27.754 11.8112 27.8743C12.2123 27.9947 12.635 28.0291 13.0508 27.9754C13.4666 27.9216 13.8657 27.7808 14.2213 27.5626C14.5769 27.3444 14.8807 27.0539 15.112 26.7106C20.252 16.5051 22.9859 11.0373 31.8039 1.29699C31.9391 1.14752 32.0091 0.951975 31.999 0.752353C31.9889 0.552731 31.8995 0.364952 31.7499 0.229347C31.5913 0.0820706 31.3812 0 31.1629 0C30.9445 0 30.7345 0.0820706 30.5759 0.229347C20.8699 9.60465 18.26 12.6251 12.564 21.706C12.5435 21.7202 12.5184 21.7267 12.4934 21.7241C12.4684 21.7216 12.4452 21.7103 12.428 21.6923L3.74408 16.4541C1.1081 14.8624 -1.75588 19.2292 1.35609 21.0171L10.726 27.2778Z" fill="white" />
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
