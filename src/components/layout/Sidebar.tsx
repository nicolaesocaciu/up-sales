import { LayoutDashboard, ShoppingCart, Box, Users, FolderOpen, Megaphone, Tag, Mail, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { MenuItems } from "./sidebar/MenuItems";
import { BetaPrompt } from "./sidebar/BetaPrompt";
import { CollapseButton } from "./sidebar/CollapseButton";
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    onCollapse?.(isCollapsed);
  }, [isCollapsed, onCollapse]);
  return <div className={cn("fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300", isCollapsed ? "w-16" : "w-64")}>
      <div className="flex flex-col h-full py-4 relative bg-[#252626]">
        <CollapseButton isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />

        <nav className="flex flex-col flex-1">
          <div className="px-4">
            <MenuItems items={menuItems} isCollapsed={isCollapsed} />
          </div>

          <div className="h-px bg-gray-200 mx-3 my-8" />

          <div className="px-3">
            <MenuItems items={settingsItems} isCollapsed={isCollapsed} />
          </div>
        </nav>

        <div className="absolute bottom-8 left-0 right-0">
          {!isCollapsed && <BetaPrompt />}
        </div>
      </div>
    </div>;
};