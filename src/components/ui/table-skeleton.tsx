
import { TableCell, TableRow } from "./table"
import { Skeleton } from "./skeleton"

interface TableSkeletonProps {
  columnCount: number
  rowCount?: number
}

export const TableSkeleton = ({
  columnCount,
  rowCount = 5
}: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, i) => (
        <TableRow key={i} className="hover:bg-transparent">
          {Array.from({ length: columnCount }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
