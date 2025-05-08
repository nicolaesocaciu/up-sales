
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
      {items.map(item => {
        const isActive = location.pathname === item.path;
        // Clone the icon and modify its props to add the fill color when active
        const IconWithFill = () => {
          const originalIcon = item.icon();
          
          // Check if it's an SVG element
          if (React.isValidElement(originalIcon) && originalIcon.type === 'svg') {
            // Clone the SVG element with modified props
            return React.cloneElement(
              originalIcon,
              {
                ...originalIcon.props,
                fill: isActive ? "#FFFFFF" : "none",
                // Apply the fill to all path children if they exist
                children: React.Children.map(originalIcon.props.children, child => {
                  if (React.isValidElement(child) && child.type === 'path') {
                    return React.cloneElement(child, {
                      ...child.props,
                      stroke: isActive ? "#FFFFFF" : child.props.stroke || "#C0C0C0",
                      fill: isActive ? "#FFFFFF" : child.props.fill || "none"
                    });
                  }
                  return child;
                })
              }
            );
          }
          
          // Return the original icon if it's not an SVG
          return originalIcon;
        };
        
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex items-center space-x-3 px-4 h-14 rounded-[12px] transition-colors mb-1",
              isActive
                ? "bg-primary text-white" 
                : "text-gray-700 hover:bg-[rgba(255,255,255,0.05)]",
              isCollapsed && "justify-center"
            )}
          >
            <span className={cn(
              "flex items-center justify-center",
              isActive ? "text-white" : ""
            )}>
              <IconWithFill />
            </span>
            {!isCollapsed && (
              <span className={cn(
                isActive
                  ? "text-white font-bold" 
                  : "text-[#DADADA]"
              )}>
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
};
