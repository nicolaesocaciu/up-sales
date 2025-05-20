
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type ServiceCardProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  badge?: string;
  badgeColor?: "blue" | "green" | "red" | "orange" | "grey";
  disabled?: boolean;
  logoUrl?: string;
  removeBackground?: boolean;
  iconUrl?: string; // Added iconUrl prop
  children?: ReactNode; // Added children prop
  isExpandable?: boolean; // Added isExpandable prop
};

export const ServiceCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
  badge,
  badgeColor = "blue",
  disabled,
  logoUrl,
  removeBackground,
  iconUrl,
  children,
  isExpandable
}: ServiceCardProps) => {
  return (
    <Card 
      className={`relative cursor-pointer transition-all duration-300 overflow-hidden
        ${selected ? "border-[#116FAE] border-2" : "border-gray-200"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${removeBackground ? "bg-transparent border-0 shadow-none" : ""}`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="p-8 flex flex-col items-center justify-center text-center">
        {icon && (
          <div className="mb-4 text-[#116FAE]">{icon}</div>
        )}
        
        {/* Added support for iconUrl */}
        {iconUrl && (
          <div className="mb-4 h-12 flex items-center justify-center">
            <img src={iconUrl} alt={title} className="max-h-full max-w-full" />
          </div>
        )}
        
        {logoUrl && (
          <div className="mb-4 h-12 flex items-center justify-center">
            <img src={logoUrl} alt={title} className="max-h-full max-w-full" />
          </div>
        )}
        
        <CardTitle className="text-lg font-medium mb-2">{title}</CardTitle>
        
        {description && <p className="text-gray-500 text-sm">{description}</p>}
        
        {badge && (
          <Badge variant={badgeColor} className="absolute top-4 right-4">
            {badge}
          </Badge>
        )}
        
        {/* Render children if they exist */}
        {children && <div className="mt-4 w-full">{children}</div>}
      </div>
    </Card>
  );
};
