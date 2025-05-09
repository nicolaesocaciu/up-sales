
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ChevronUp, ChevronDown, Plus } from "lucide-react";
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
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Sort the data based on the date
  const sortedReports = [...reportsData].sort((a, b) => {
    const dateA = new Date(a.date.replace(/(\d+) ([A-Za-z]+) (\d+)/, "$2 $1, $3"));
    const dateB = new Date(b.date.replace(/(\d+) ([A-Za-z]+) (\d+)/, "$2 $1, $3"));
    return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reports</h2>
        <Button 
          className="flex items-center gap-2 border border-[#0D5788] bg-[#0D5788] text-white hover:bg-[#124D77] hover:border-[#124D77] active:bg-[#1B384C] active:border-[#1B384C] rounded-[8px]"
        >
          <Plus className="h-4 w-4" />
          New report
        </Button>
      </div>
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
          {sortedReports.map(report => (
            <TableRow 
              key={report.id} 
              className="h-16 hover:bg-[#E7F2F9]"
              onMouseEnter={() => setHoveredRow(report.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell className="text-[#116fae]">{report.name}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.createdBy}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu 
                  open={isDropdownOpen === report.id}
                  onOpenChange={(open) => setIsDropdownOpen(open ? report.id : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={`transition-colors ${isDropdownOpen === report.id ? 'bg-[rgba(153,203,236,0.50)]' : 'hover:bg-[rgba(153,203,236,0.50)]'}`}
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white z-[9999] shadow-lg" sideOffset={-10}>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg text-red-600 hover:text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
