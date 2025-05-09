
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

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
  
  // Add Marketing to the items list
  const allItems = [...items, {
    icon: () => <MessageSquare className="h-5 w-5 text-[#C0C0C0]" />,
    label: "Marketing",
    path: "/marketing"
  }];
  
  return (
    <>
      {allItems.map(item => {
        const isActive = location.pathname === item.path;
        
        // Clone the icon and modify its props to add the fill color when active
        const IconWithFill = () => {
          const originalIcon = item.icon();
          
          // Check if it's an SVG element
          if (React.isValidElement(originalIcon) && 
              typeof originalIcon.type === 'string' && 
              originalIcon.type.toLowerCase() === 'svg') {
            
            // Properly type the SVG element to avoid TypeScript errors
            const svgProps = originalIcon.props as React.SVGAttributes<SVGSVGElement>;
            
            // Clone the SVG element with modified props
            return React.cloneElement(
              originalIcon as React.ReactElement<React.SVGAttributes<SVGSVGElement>>,
              {
                ...svgProps,
                fill: isActive ? "#FFFFFF" : "none",
                // Apply the fill to all path children if they exist
                children: React.Children.map(svgProps.children, child => {
                  if (React.isValidElement(child) && 
                      typeof child.type === 'string' && 
                      child.type.toLowerCase() === 'path') {
                    
                    const pathProps = child.props as React.SVGAttributes<SVGPathElement>;
                    
                    return React.cloneElement(
                      child as React.ReactElement<React.SVGAttributes<SVGPathElement>>, 
                      {
                        ...pathProps,
                        fill: isActive ? "#FFFFFF" : pathProps.fill || "#C0C0C0"
                      }
                    );
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
