import React, { useState, useEffect } from "react";
import { CollapseButton } from "./sidebar/CollapseButton";
import { MenuItems } from "./sidebar/MenuItems";
import { BetaPrompt } from "./sidebar/BetaPrompt";

// Import icons
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  FileText,
  Share,
  Percent
} from "lucide-react";

const SIDEBAR_STATE_KEY = "sidebar-collapsed-state";

export const Sidebar = ({ onCollapse }: { onCollapse: (collapsed: boolean) => void }) => {
  // State to track if sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Set initial value on component mount
  useEffect(() => {
    onCollapse(isCollapsed);
  }, []);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(newCollapsedState));
    onCollapse(newCollapsedState);
  };

  // Menu items configuration with Lucide icons
  const menuItems = [
    {
      icon: () => <Home className="w-6 h-6" />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: () => <ShoppingCart className="w-6 h-6" />,
      label: "Orders",
      path: "/orders",
    },
    {
      icon: () => <Package className="w-6 h-6" />,
      label: "Products",
      path: "/products",
    },
    {
      icon: () => <Users className="w-6 h-6" />,
      label: "Customers",
      path: "/customers",
    },
    {
      icon: () => <FileText className="w-6 h-6" />,
      label: "Content",
      path: "/content",
    },
    {
      icon: () => <Share className="w-6 h-6" />,
      label: "Marketing",
      path: "/marketing",
    },
    {
      icon: () => <Percent className="w-6 h-6" />,
      label: "Discounts",
      path: "/discounts",
    }
  ];

  return (
    <div
      className={`fixed top-16 bottom-0 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-[300px]"
      } bg-[#252626] h-[calc(100vh-64px)]`}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="flex-1 px-4 py-6">
          <MenuItems items={menuItems} isCollapsed={isCollapsed} />
        </div>

        <div className={`px-4 pb-6 ${isCollapsed ? "hidden" : ""}`}>
          <BetaPrompt />
        </div>

        <div className="px-4 pb-6">
          <CollapseButton isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </div>
  );
};
