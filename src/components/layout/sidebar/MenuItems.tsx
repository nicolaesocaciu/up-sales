
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface MenuItemsProps {
  items: MenuItem[];
  isCollapsed: boolean;
}

export const MenuItems = ({
  items,
  isCollapsed
}: MenuItemsProps) => {
  const location = useLocation();
  
  return (
    <>
      {items.map(item => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={cn(
            "flex items-center space-x-3 px-3 h-14 rounded-lg transition-colors mb-1",
            location.pathname === item.path 
              ? "bg-primary text-white" 
              : "bg-[rgba(255,255,255,0.05)] text-gray-700 hover:bg-[rgba(255,255,255,0.1)]",
            isCollapsed && "justify-center"
          )}
        >
          <item.icon 
            className={cn(
              "h-5 w-5 flex-shrink-0", 
              location.pathname === item.path 
                ? "stroke-white" 
                : "stroke-[#C0C0C0]"
            )} 
          />
          {!isCollapsed && (
            <span className={cn(
              location.pathname === item.path 
                ? "text-white font-bold" 
                : "text-[#DADADA]"
            )}>
              {item.label}
            </span>
          )}
        </Link>
      ))}
    </>
  );
};
