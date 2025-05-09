
import React from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  // Adding 10 more notifications
  {
    id: "6",
    type: "order",
    title: "New Order Created",
    orderId: "#285",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
  },
  {
    id: "7",
    type: "payment",
    title: "Payment Declined",
    orderId: "#289",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
  },
  {
    id: "8",
    type: "stock",
    title: "Low Stock Alert",
    orderId: "Chicken Sal...",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
  },
  {
    id: "9",
    type: "ready",
    title: "Order Completed",
    orderId: "#267",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    read: true,
  },
  {
    id: "10",
    type: "promo",
    title: "Weekly Special Live",
    orderId: "Weekend Spe...",
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    read: true,
  },
  {
    id: "11",
    type: "order",
    title: "Catering Order",
    orderId: "#291",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: false,
  },
  {
    id: "12",
    type: "payment",
    title: "Refund Processed",
    orderId: "#276",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: "13",
    type: "stock",
    title: "Inventory Updated",
    orderId: "Summer Men...",
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000), // 30 hours ago
    read: false,
  },
  {
    id: "14",
    type: "ready",
    title: "Pickup Ready",
    orderId: "#302",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000), // 36 hours ago
    read: true,
  },
  {
    id: "15",
    type: "promo",
    title: "New Seasonal Items",
    orderId: "Fall Special...",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    read: false,
  }
];

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  }
};

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Custom notification icon
  const NotificationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.25C16.04 2.25 19.3168 5.52445 19.3174 9.56543L19.3184 10.8838V10.8848C19.3184 11.4714 19.4303 12.0503 19.6494 12.5908L19.75 12.8203L20.2168 13.8115L20.2979 14.001C21.0697 15.965 19.6263 18.1346 17.4727 18.1348H15.8398C15.7187 20.1511 14.0461 21.75 11.998 21.75C9.95094 21.7499 8.27837 20.1509 8.15723 18.1348H6.52832C4.30528 18.1345 2.83841 15.8225 3.78418 13.8115L4.25 12.8213L4.35059 12.5908C4.56963 12.0496 4.68359 11.4708 4.68359 10.8848V10.8838L4.68457 9.56543C4.68511 5.52462 7.96028 2.25026 12 2.25ZM9.66113 18.1348C9.77876 19.3222 10.7803 20.2499 11.998 20.25C13.2169 20.25 14.2183 19.3221 14.3359 18.1348H9.66113ZM12 3.75C8.78824 3.75026 6.18458 6.35371 6.18457 9.56641V9.56738L6.18359 10.8857C6.18347 11.6649 6.03249 12.4348 5.74121 13.1543L5.60742 13.459L5.1416 14.4502C4.66378 15.4666 5.40507 16.6345 6.52832 16.6348H17.4727C18.526 16.6346 19.2433 15.6077 18.9346 14.6416L18.8594 14.4502L18.3936 13.46L18.2598 13.1543C17.9678 12.4341 17.8185 11.6643 17.8184 10.8857L17.8174 9.56738V9.56641C17.8174 6.35356 15.2121 3.75 12 3.75Z" fill="white"/>
    </svg>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <NotificationIcon />
          {unreadCount > 0 && (
            <div className="absolute top-0 right-0 w-3 h-3 bg-[#CC334C] rounded-full border-2 border-[#252626]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 bg-white rounded-lg shadow-lg h-[80vh]" sideOffset={6}>
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
        <ScrollArea className="h-[calc(80vh-60px)]">
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
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
