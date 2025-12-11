"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { DataTableProps } from "@/types"
import { useRouter,useParams } from "next/navigation"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const router = useRouter();
  const params = useParams();
  const orgId = params.org_id as string;

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

    return (
    <div>
      <Table className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="bg-cyan-500/20 border-b border-cyan-500/30 text-white">
                  {header.isPlaceholder ? null : 
                    flexRender(header.column.columnDef.header, header.getContext())
                  }
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => {
              const taskId = (row.original as any).id;
              
              return (
                <TableRow 
                  key={row.id}
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  onClick={() => {
                    if (taskId) {
                      router.push(`/dashboard/${orgId}/projects/task/${taskId}/`);
                    }
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
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
  )
}