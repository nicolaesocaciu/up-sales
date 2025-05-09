
import { Table, TableBody } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { CustomersTableHeader } from "./CustomersTableHeader";
import { CustomersTableRow } from "./CustomersTableRow";
import { CustomersTablePagination } from "./CustomersTablePagination";
import { CustomersTableColumns, ColumnVisibility } from "./CustomersTableColumns";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ReactNode } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useCustomersData } from "@/hooks/useCustomersData";

const defaultColumnVisibility: ColumnVisibility = {
  customerId: true,
  company: true,
  name: true,
  email: true,
  location: true,
  orders: true,
  amountSpent: true,
  subscriptionStatus: true,
  actions: true,
};

export const CustomersDataTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [customersPerPage, setCustomersPerPage] = useState(20);

  // Use our custom hook to fetch and filter data
  const { customers: sortedCustomers, isLoading } = useCustomersData({
    searchQuery,
    sortDirection
  });

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * customersPerPage;
    return sortedCustomers.slice(startIndex, startIndex + customersPerPage);
  }, [sortedCustomers, currentPage, customersPerPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedCustomers.map(customer => customer.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (customerId: string, checked: boolean) => {
    setSelectedRows(prev => {
      if (checked) {
        return [...prev, customerId];
      } else {
        return prev.filter(id => id !== customerId);
      }
    });
  };

  const handleCustomersPerPageChange = (value: string) => {
    setCustomersPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const highlightText = (text: string): ReactNode => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={i} className="bg-yellow-200">{part}</span> : 
        part
    );
  };

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <div className="relative min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search customer ..." 
            className="pl-10 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CustomersTableColumns
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </div>

      <Table>
        <CustomersTableHeader
          sortDirection={sortDirection}
          onSortChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          columnVisibility={columnVisibility}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          totalRows={paginatedCustomers.length}
        />
        <TableBody>
          {isLoading ? (
            <TableSkeleton columnCount={Object.values(columnVisibility).filter(Boolean).length + 1} rowCount={customersPerPage} />
          ) : (
            paginatedCustomers.map((customer) => (
              <CustomersTableRow
                key={customer.id}
                customer={customer}
                columnVisibility={columnVisibility}
                selected={selectedRows.includes(customer.id)}
                onSelect={handleRowSelect}
                highlightText={highlightText}
              />
            ))
          )}
        </TableBody>
      </Table>

      <CustomersTablePagination
        totalCustomers={sortedCustomers.length}
        currentPageSize={paginatedCustomers.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        customersPerPage={customersPerPage}
        onCustomersPerPageChange={handleCustomersPerPageChange}
      />
    </div>
  );
};
