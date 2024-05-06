"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ORDER_STATUS } from "@/constant"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


export function UserOrderTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [perPage, setPerPage] = useState<string>("5");
  const [pageIndex, setPageIndex] = useState<number>(0);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageSize: parseInt(perPage),
        pageIndex: pageIndex
      },
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleStatusChange = (status: string) => {
    if (status !== "ALL") {
      const newFilter = [
        {
          id: 'status', 
          value: status,
        },
      ];
      setColumnFilters(newFilter);
    } else {
      setColumnFilters([]); // Clear filters when status is "ALL"
    }
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-between items-center">
        <Select value={perPage} onValueChange={setPerPage}>
              <SelectTrigger className="max-w-[100px]">
                  <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                  {
                      ["5", "10", "20", "50"].map((v,i) => (
                          <SelectItem value={v} key={i}>{v}</SelectItem>
                      ))
                  }
              </SelectContent>
          </Select>
        <Select onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                  {
                      [{label: "All", value: "ALL"},...ORDER_STATUS].map((status) => (
                          <SelectItem value={status.value} key={status.value}>{status.label}</SelectItem>
                      ))
                  }
              </SelectContent>
          </Select>
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (table.getCanPreviousPage()) {
              setPageIndex(prev => prev - 1); // Update pageIndex on previous
            }
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (table.getCanNextPage()) {
              setPageIndex(prev => prev + 1); // Update pageIndex on next
            }
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
