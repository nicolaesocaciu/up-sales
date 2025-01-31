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
  Zap,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex-1 py-6 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 bg-white border rounded-full hover:bg-gray-100"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform duration-300",
            isCollapsed && "rotate-180"
          )} />
        </Button>

        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}

          <div className="my-5 border-t border-gray-200" />

          {settingsItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {!isCollapsed && (
        <div className="p-4 mt-auto">
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2 text-gray-800">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">New features!</span>
            </div>
            <p className="text-sm text-gray-600">
              Be a pioneer and enroll in our beta program
            </p>
            <Button
              variant="outline"
              className="w-full bg-white hover:bg-gray-50"
            >
              Learn more
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};