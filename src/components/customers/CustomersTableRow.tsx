
import { TableCell, TableRow } from "@/components/ui/table";
import { ColumnVisibility } from "./CustomersTableColumns";
import { Customer } from "@/types/customer";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { formatCurrency } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface CustomersTableRowProps {
  customer: Customer;
  columnVisibility: ColumnVisibility;
  selected: boolean;
  onSelect: (customerId: string, checked: boolean) => void;
  highlightText: (text: string) => ReactNode;
}

// Building SVG component for company icon
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path d="M10.3955 1.57031C11.3313 1.66533 12.0615 2.45586 12.0615 3.41699V5.50586H12.3965C13.196 5.50586 13.8535 6.15351 13.8535 6.96289V13.4404H14L14.1006 13.4502C14.3285 13.4968 14.5 13.6988 14.5 13.9404C14.4998 14.1819 14.3284 14.3842 14.1006 14.4307L14 14.4404H13.3623C13.3594 14.4405 13.3565 14.4414 13.3535 14.4414C13.3506 14.4414 13.3477 14.4405 13.3447 14.4404H11.5703C11.5674 14.4405 11.5645 14.4414 11.5615 14.4414C11.5586 14.4414 11.5557 14.4405 11.5527 14.4404H9.35645C9.35352 14.4405 9.35059 14.4414 9.34766 14.4414C9.34472 14.4414 9.34179 14.4405 9.33887 14.4404H6.66113C6.65821 14.4405 6.65528 14.4414 6.65234 14.4414C6.64941 14.4414 6.64648 14.4405 6.64355 14.4404H4.4502C4.44727 14.4405 4.44434 14.4414 4.44141 14.4414C4.43847 14.4414 4.43554 14.4405 4.43262 14.4404H2.73145C2.72852 14.4405 2.72559 14.4414 2.72266 14.4414C2.71972 14.4414 2.71679 14.4405 2.71387 14.4404H2C1.72402 14.4404 1.50026 14.2163 1.5 13.9404C1.5 13.6643 1.72386 13.4404 2 13.4404H2.22266V6.96289C2.22266 6.15354 2.88014 5.50586 3.67969 5.50586H3.94141V3.41699C3.94141 2.39167 4.77252 1.55957 5.79785 1.55957H10.2061L10.3955 1.57031ZM3.67969 6.50586C3.42842 6.50586 3.22266 6.70982 3.22266 6.96289V13.4404H3.94141V6.50586H3.67969ZM5.79785 2.56055C5.32481 2.56055 4.94141 2.94394 4.94141 3.41699V13.4404H6.15234V12.2031C6.15255 11.6457 6.60769 11.1906 7.16504 11.1904H8.83496C9.39218 11.1904 9.84745 11.646 9.84766 12.2031V13.4404H11.0615V6.0332C11.061 6.02411 11.0586 6.01507 11.0586 6.00586C11.0586 5.99549 11.0609 5.98482 11.0615 5.97461V3.41699C11.0615 2.97325 10.7244 2.6091 10.293 2.56543L10.2061 2.56055H5.79785ZM7.16211 12.1914C7.16081 12.1921 7.15906 12.1935 7.15723 12.1953C7.15543 12.1971 7.15392 12.1989 7.15332 12.2002L7.15234 12.2031V13.4404H8.84766V12.2031L8.84668 12.2002C8.84607 12.1989 8.84463 12.1963 8.84277 12.1943C8.84112 12.1927 8.8391 12.192 8.83789 12.1914L8.83496 12.1904H7.16504C7.16399 12.1905 7.163 12.191 7.16211 12.1914ZM12.0615 13.4404H12.8535V6.96289C12.8535 6.70985 12.6478 6.50586 12.3965 6.50586H12.0615V13.4404ZM6.78906 8.69434C7.0265 8.64923 7.25742 8.77989 7.3457 8.99512L7.37402 9.0918L7.375 9.09863L7.38379 9.2002C7.38009 9.43233 7.21455 9.63851 6.97754 9.68359C6.74043 9.72859 6.51039 9.59753 6.42188 9.38281L6.39258 9.28516L6.3916 9.2793L6.38281 9.17773C6.3862 8.94546 6.55204 8.73961 6.78906 8.69434ZM9.02148 8.69434C9.25881 8.64925 9.48878 8.78006 9.57715 8.99512L9.60645 9.0918L9.60742 9.09863L9.61621 9.2002C9.61252 9.43228 9.4469 9.63846 9.20996 9.68359C8.97287 9.72859 8.74283 9.5975 8.6543 9.38281L8.625 9.28516L8.62402 9.2793L8.61523 9.17773C8.61862 8.94541 8.78438 8.73955 9.02148 8.69434ZM6.78906 6.49902C7.0265 6.45392 7.25742 6.58458 7.3457 6.7998L7.37402 6.89648L7.375 6.90332L7.38379 7.00488C7.38009 7.23702 7.21455 7.4432 6.97754 7.48828C6.74043 7.53328 6.51039 7.40222 6.42188 7.1875L6.39258 7.08984L6.3916 7.08398L6.38281 6.98242C6.3862 6.75015 6.55204 6.5443 6.78906 6.49902ZM9.02148 6.49902C9.25881 6.45394 9.48878 6.58475 9.57715 6.7998L9.60645 6.89648L9.60742 6.90332L9.61621 7.00488C9.61252 7.23697 9.4469 7.44314 9.20996 7.48828C8.97287 7.53328 8.74283 7.40219 8.6543 7.1875L8.625 7.08984L8.62402 7.08398L8.61523 6.98242C8.61862 6.7501 8.78438 6.54424 9.02148 6.49902ZM6.78906 4.25391C7.0265 4.2088 7.25742 4.33946 7.3457 4.55469L7.37402 4.65137L7.375 4.6582L7.38379 4.75977C7.38009 4.9919 7.21455 5.19809 6.97754 5.24316C6.74043 5.28816 6.51039 5.1571 6.42188 4.94238L6.39258 4.84473L6.3916 4.83887L6.38281 4.7373C6.3862 4.50503 6.55204 4.29918 6.78906 4.25391ZM9.02148 4.25391C9.25881 4.20882 9.48878 4.33963 9.57715 4.55469L9.60645 4.65137L9.60742 4.6582L9.61621 4.75977C9.61252 4.99185 9.4469 5.19803 9.20996 5.24316C8.97287 5.28816 8.74283 5.15707 8.6543 4.94238L8.625 4.84473L8.62402 4.83887L8.61523 4.7373C8.61862 4.50498 8.78438 4.29913 9.02148 4.25391Z" fill="#116FAE"/>
  </svg>
);

export const CustomersTableRow = ({
  customer,
  columnVisibility,
  selected,
  onSelect,
  highlightText,
}: CustomersTableRowProps) => {
  return (
    <TableRow className="h-16 hover:bg-[#E7F2F9]">
      <TableCell className="px-4">
        <Checkbox 
          checked={selected}
          onCheckedChange={(checked) => onSelect(customer.id, checked === true)}
          className="rounded-[4px]"
        />
      </TableCell>
      
      {columnVisibility.customerId && (
        <TableCell>
          <span className="font-medium">#{customer.customerId}</span>
        </TableCell>
      )}
      
      {columnVisibility.company && (
        <TableCell>
          <div className="flex items-center gap-2 text-[#116FAE]">
            <BuildingIcon />
            <span>{highlightText(customer.company)}</span>
          </div>
        </TableCell>
      )}
      
      {columnVisibility.name && (
        <TableCell>
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{highlightText(customer.name)}</span>
          </div>
        </TableCell>
      )}
      
      {columnVisibility.email && (
        <TableCell>{highlightText(customer.email)}</TableCell>
      )}
      
      {columnVisibility.subscriptionStatus && (
        <TableCell>
          {customer.subscriptionStatus === "subscribed" && (
            <Badge variant="success" className="rounded-full px-3 bg-green-100 border-green-200 text-green-800 hover:bg-green-200">
              Subscribed
            </Badge>
          )}
          {customer.subscriptionStatus === "not_subscribed" && (
            <Badge variant="warning" className="rounded-full px-3 bg-red-100 border-red-200 text-red-800 hover:bg-red-200">
              Not subscribed
            </Badge>
          )}
          {customer.subscriptionStatus === "pending" && (
            <Badge variant="outline" className="rounded-full px-3 bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200">
              Pending
            </Badge>
          )}
        </TableCell>
      )}
      
      {columnVisibility.location && (
        <TableCell>{highlightText(customer.location)}</TableCell>
      )}
      
      {columnVisibility.orders && (
        <TableCell>
          {customer.orders === "N/A" ? "N/A" : `${customer.orders} Orders`}
        </TableCell>
      )}
      
      {columnVisibility.amountSpent && (
        <TableCell className="text-right">{formatCurrency(customer.amountSpent)}</TableCell>
      )}
      
      {columnVisibility.actions && (
        <TableCell className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="transition-colors hover:bg-[rgba(153,203,236,0.50)]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[200px] p-2 rounded-xl bg-white"
              sideOffset={-10}
            >
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                View details
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                Edit customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
};
