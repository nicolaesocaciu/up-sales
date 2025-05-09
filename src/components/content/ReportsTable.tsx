import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample data for reports
const reportsData = [{
  id: 1,
  name: "Total sales for May 2025",
  date: "12 May 2025",
  createdBy: "Emily Thompson"
}, {
  id: 2,
  name: "Most sold products in April 2025",
  date: "01 May 2025",
  createdBy: "Alexander Rodriguez"
}, {
  id: 3,
  name: "Total sales for April 2025",
  date: "01 May 2025",
  createdBy: "Sophia Chen"
}, {
  id: 4,
  name: "Products that don't sell 2025",
  date: "29 April 2025",
  createdBy: "Liam O'Connor"
}, {
  id: 5,
  name: "Total sales for March 2025",
  date: "02 April 2025",
  createdBy: "Olivia Patel"
}, {
  id: 6,
  name: "Total sales for February 2025",
  date: "01 March 2025",
  createdBy: "Noah Yamamoto"
}];
export const ReportsTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Sort the data based on the date
  const sortedReports = [...reportsData].sort((a, b) => {
    const dateA = new Date(a.date.replace(/(\d+) ([A-Za-z]+) (\d+)/, "$2 $1, $3"));
    const dateB = new Date(b.date.replace(/(\d+) ([A-Za-z]+) (\d+)/, "$2 $1, $3"));
    return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
  return <div className="w-full">
      <Table>
        <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
          <TableRow className="hover:bg-transparent border-none h-12">
            <TableHead className="rounded-l-[8px] w-[300px]">Name</TableHead>
            <TableHead onClick={toggleSortDirection} className="cursor-pointer hover:bg-[#DADADA] w-[140px]">
              <div className="flex items-center gap-2">
                Date
                {sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </TableHead>
            <TableHead>Created by</TableHead>
            <TableHead className="text-right rounded-r-[8px] w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedReports.map(report => <TableRow key={report.id} className="h-16">
              <TableCell className="text-[#116fae]">{report.name}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.createdBy}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>;
};