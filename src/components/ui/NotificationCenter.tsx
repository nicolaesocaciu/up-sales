
import React from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type NotificationType = 'order' | 'payment' | 'stock' | 'ready' | 'promo';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  orderId?: string;
  createdAt: Date;
  read: boolean;
}

const typeIcons: Record<NotificationType, React.ReactNode> = {
  order: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#D9F2DD]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2.5H14M2 5.5H14M2 8.5H6M2 11.5H6M9 8.5H14L9 13.5V8.5Z" stroke="#1D8E29" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  payment: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#D2EAFA]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6" stroke="#116FAE" strokeWidth="1.5"/>
        <path d="M5.5 8L7 9.5L10.5 6" stroke="#116FAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  stock: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#FADADD]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3V8M8 13H8.01M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8Z" stroke="#CC334C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  ),
  ready: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#D9F2DD]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#1D8E29" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  promo: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#FFEFD2]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 7.5L6.5 9.5M6.5 6.5L8.5 8.5M8.5 5.5L10.5 7.5M1.5 8L8 1.5L14.5 8L8 14.5L1.5 8Z" stroke="#E09E00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Created",
    orderId: "#284",
    createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Completed",
    orderId: "#255",
    createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    read: false,
  },
  {
    id: "3",
    type: "stock",
    title: "Out of Stock Item",
    orderId: "Breakfast Bur...",
    createdAt: new Date(Date.now() - 16 * 60 * 1000), // 16 minutes ago
    read: false,
  },
  {
    id: "4",
    type: "ready",
    title: "Ready to Serve",
    orderId: "#213",
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    read: false,
  },
  {
    id: "5",
    type: "promo",
    title: "New Promo Discount",
    orderId: "Western ome...",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: false,
  },
];

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
};

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[24px] w-[24px] text-white" />
          {unreadCount > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#CC334C] rounded-full border-2 border-[#252626]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 bg-white rounded-lg shadow-lg" sideOffset={6}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-medium text-base">Notifications</h3>
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#116fae] hover:text-[#0D5788] text-sm h-auto p-1"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className={cn(
              "flex items-start gap-3 p-4",
              notification.read ? "" : "bg-[#F8F9FA]"
            )}>
              {typeIcons[notification.type]}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">
                      {notification.title} <span className="font-normal">for {notification.orderId}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.createdAt)}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-[#CC334C] mt-1"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
