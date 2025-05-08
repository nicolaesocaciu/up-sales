
import { LayoutDashboard, ShoppingCart, Box, Users, FolderOpen, Megaphone, Tag, Mail, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { MenuItems } from "./sidebar/MenuItems";
import { BetaPrompt } from "./sidebar/BetaPrompt";
import { CollapseButton } from "./sidebar/CollapseButton";

const SIDEBAR_STATE_KEY = "sidebar-collapsed-state";

const menuItems = [{
  icon: LayoutDashboard,
  label: "Dashboard",
  path: "/"
}, {
  icon: ShoppingCart,
  label: "Orders",
  path: "/orders"
}, {
  icon: Box,
  label: "Products",
  path: "/products"
}, {
  icon: Users,
  label: "Customers",
  path: "/customers"
}, {
  icon: FolderOpen,
  label: "Content",
  path: "/content"
}, {
  icon: Megaphone,
  label: "Marketing",
  path: "/marketing"
}, {
  icon: Tag,
  label: "Discounts",
  path: "/discounts"
}, {
  icon: Mail,
  label: "Emails",
  path: "/emails"
}];
const settingsItems = [{
  icon: Settings,
  label: "Settings",
  path: "/settings"
}, {
  icon: HelpCircle,
  label: "Help center",
  path: "/help"
}];

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export const Sidebar = ({
  onCollapse
}: SidebarProps) => {
  // Initialize state from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Get the initial state from localStorage
    try {
      const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
      // Return parsed value or default to false if not set
      return savedState ? JSON.parse(savedState) === true : false;
    } catch (error) {
      // If there's any error in parsing, default to false
      return false;
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isCollapsed));
    } catch (error) {
      // Handle any localStorage errors silently
      console.error("Error saving sidebar state:", error);
    }
    
    // Notify parent component about the collapse state change
    onCollapse?.(isCollapsed);
  }, [isCollapsed, onCollapse]);

  // Toggle collapsed state
  const handleToggleCollapse = () => {
    setIsCollapsed(prevState => !prevState);
  };

  return <div className={cn(
    "fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300", 
    isCollapsed ? "w-16" : "w-[300px]"
    )}>
      <div className="flex flex-col h-full py-4 relative bg-[#252626]">
        <CollapseButton isCollapsed={isCollapsed} onClick={handleToggleCollapse} />

        <nav className="flex flex-col flex-1">
          <div className="px-4">
            <MenuItems items={menuItems} isCollapsed={isCollapsed} />
          </div>

          <div className="h-px mx-8 my-8 bg-[#494a4a]" />
          <div className={`h-px my-8 bg-[#494a4a] ${isCollapsed ? "mx-2" : "mx-8"}`} />

          <div className="px-4">
            <MenuItems items={settingsItems} isCollapsed={isCollapsed} />
          </div>
        </nav>

        <div className="absolute bottom-8 left-0 right-0">
          {!isCollapsed && <BetaPrompt />}
        </div>
      </div>
    </div>;
};
