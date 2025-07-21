"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type { ColumnDef } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { EmployeeData } from "./EmployeeColums"

interface DataTableProps {
  columns: ColumnDef<EmployeeData>[]
  data: EmployeeData[]
}

export function DataTable({
  columns,
  data,
}: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border border-gray-300 shadow-md bg-gray-800 text-white">
      <Table className="w-full border-collapse">
      <TableHeader className="bg-gray-700">
      {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id} className="border-b border-gray-600">
        {headerGroup.headers.map((header) => {
        return (
        <TableHead
        key={header.id}
        className="px-4 py-2 text-left text-sm font-medium text-white"
        >
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
        className="hover:bg-gray-700"
        >
        {row.getVisibleCells().map((cell) => (
        <TableCell
        key={cell.id}
        className="px-4 py-2 text-sm text-white"
        >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
        ))}
        </TableRow>
      ))
      ) : (
      <TableRow className="border-t border-gray-600">
        <TableCell
        colSpan={columns.length}
        className="h-24 text-center text-sm text-gray-400"
        >
        No results.
        </TableCell>
      </TableRow>
      )}
      </TableBody>
      </Table>
    </div>
  )
}