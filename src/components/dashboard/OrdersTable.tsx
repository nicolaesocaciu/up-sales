
import { useState } from "react";
import { Table, TableBody } from "../ui/table";
import { OrderTableHeader } from "./OrderTableHeader";
import { OrderTableHeaders } from "./OrderTableHeaders";
import { OrderRow } from "./OrderRow";
import { mockOrders } from "@/data/mockOrders";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { DragDotsIcon } from "../ui/icons/DragDotsIcon";

interface OrdersTableProps {
  isEditMode?: boolean;
}

export const OrdersTable = ({
  isEditMode
}: OrdersTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();
  
  const sortedOrders = [...mockOrders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  }).slice(0, 6);
  
  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  
  return <div className="rounded-[24px] bg-white pb-6 h-full group relative">
      {isEditMode && (
        <div className="absolute left-6 top-6 cursor-grab active:cursor-grabbing z-10">
          <DragDotsIcon className="h-5 w-5 text-[#494A4A] ml-[-21px] mt-[3px]" />
        </div>
      )}
      <div className={isEditMode ? "cursor-grab active:cursor-grabbing" : ""}>
        <OrderTableHeader />
        <div className="px-6">
          <Table>
            <OrderTableHeaders sortDirection={sortDirection} onToggleSort={toggleSort} />
            <TableBody>
              {sortedOrders.map(order => <OrderRow key={order.id} order={order} />)}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>;
};
