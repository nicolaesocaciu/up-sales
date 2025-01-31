import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Box, label: "Orders", path: "/orders" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: MessageSquare, label: "Content", path: "/content" },
  { icon: BarChart3, label: "Marketing", path: "/marketing" },
  { icon: Mail, label: "Emails", path: "/emails" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};