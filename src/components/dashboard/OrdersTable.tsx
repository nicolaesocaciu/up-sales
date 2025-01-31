import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal, ChevronDown, ChevronUp, FileText, RefreshCw, XOctagon } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Order = {
  id: string;
  date: string;
  items: string;
  value: string;
  status: "Paid" | "Processing" | "Waiting";
};

const orders: Order[] = [
  {
    id: "#44213",
    date: "29 Jan 2025",
    items: "3 items",
    value: "$9,750",
    status: "Paid",
  },
  {
    id: "#44324",
    date: "27 Jan 2025",
    items: "Anker 737 Power Bank",
    value: "$300",
    status: "Processing",
  },
  {
    id: "#44262",
    date: "27 Jan 2025",
    items: "2 items",
    value: "$5,710",
    status: "Paid",
  },
  {
    id: "#44221",
    date: "27 Jan 2025",
    items: "2 items",
    value: "$1,230",
    status: "Waiting",
  },
  {
    id: "#44256",
    date: "25 Jan 2025",
    items: "Logitech MX Master 3S Mouse",
    value: "$700",
    status: "Paid",
  },
];

export const OrdersTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortDirection === "asc" 
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="rounded-[24px] bg-white">
      <div className="flex items-center justify-between px-6 py-6">
        <h2 className="text-lg font-semibold">Latest orders</h2>
        <Button 
          variant="outline" 
          className="text-primary hover:bg-primary/5"
        >
          View all
        </Button>
      </div>
      <div className="px-6">
        <Table>
          <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
            <TableRow className="h-12 hover:bg-transparent">
              <TableHead className="rounded-l-[8px]">Order ID</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-[#DADADA]"
                onClick={toggleSort}
              >
                <div className="flex items-center gap-2">
                  Date
                  {sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Order value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-r-[8px] w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow 
                key={order.id} 
                className="h-12 hover:bg-[#E7F2F9] transition-colors"
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.value}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "bg-opacity-10",
                      order.status === "Paid" && "bg-status-paid text-status-paid",
                      order.status === "Processing" &&
                        "bg-status-processing text-status-processing",
                      order.status === "Waiting" &&
                        "bg-status-waiting text-status-waiting"
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-[hsla(204,35%,93%,0.5)]"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white">
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#F5F5F5] rounded-lg">
                        <FileText className="h-5 w-5" />
                        View order
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#F5F5F5] rounded-lg">
                        <RefreshCw className="h-5 w-5" />
                        Change status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#F5F5F5] rounded-lg text-red-600 hover:text-red-600">
                        <XOctagon className="h-5 w-5" />
                        Cancel order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};