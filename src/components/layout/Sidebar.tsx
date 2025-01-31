import {
  LayoutDashboard,
  ShoppingCart,
  Box,
  Users,
  FolderOpen,
  Megaphone,
  Tag,
  Mail,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MenuItems } from "./sidebar/MenuItems";
import { BetaPrompt } from "./sidebar/BetaPrompt";
import { CollapseButton } from "./sidebar/CollapseButton";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Box, label: "Products", path: "/products" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: FolderOpen, label: "Content", path: "/content" },
  { icon: Megaphone, label: "Marketing", path: "/marketing" },
  { icon: Tag, label: "Discounts", path: "/discounts" },
  { icon: Mail, label: "Emails", path: "/emails" },
];

const settingsItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help center", path: "/help" },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex-1 py-6 relative">
        <CollapseButton 
          isCollapsed={isCollapsed} 
          onClick={() => setIsCollapsed(!isCollapsed)} 
        />

        <nav className="space-y-1">
          <div className="px-3">
            <MenuItems items={menuItems} isCollapsed={isCollapsed} />
          </div>

          <div className="h-px bg-gray-200 mx-3 my-8" />

          <div className="px-3">
            <MenuItems items={settingsItems} isCollapsed={isCollapsed} />
          </div>
        </nav>
      </div>

      {!isCollapsed && <BetaPrompt />}
    </div>
  );
};