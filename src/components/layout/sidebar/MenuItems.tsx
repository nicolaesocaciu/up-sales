
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItem {
  icon: () => React.ReactNode;
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
            "flex items-center space-x-3 px-4 h-14 rounded-[12px] transition-colors mb-1",
            location.pathname === item.path 
              ? "bg-primary text-white" 
              : "text-gray-700 hover:bg-[rgba(255,255,255,0.05)]",
            isCollapsed && "justify-center"
          )}
        >
          <span className={cn(
            "flex items-center justify-center", 
            location.pathname === item.path 
              ? "[&_svg]:stroke-white [&_svg_path]:fill-none [&_svg_path]:stroke-white" 
              : "[&_svg]:stroke-[#C0C0C0] [&_svg_path]:fill-none [&_svg_path]:stroke-[#C0C0C0]",
            location.pathname === item.path && item.path === "/customers"
              ? "[&_svg_path]:fill-white"
              : location.pathname === item.path && item.path === "/discounts" 
                ? "[&_svg_path]:fill-white"
                : item.path === "/customers"
                  ? "[&_svg_path]:fill-[#C0C0C0]"
                  : item.path === "/discounts"
                    ? "[&_svg_path]:fill-[#C0C0C0]"
                    : ""
          )}>
            {item.icon()}
          </span>
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
