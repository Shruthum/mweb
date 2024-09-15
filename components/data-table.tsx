"use client"

import {
 DropdownMenu,
 DropdownMenuCheckboxItem,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger   
} from "@/components/ui/dropdown-menu" 

import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "./ui/table" 
import { 
 ColumnDef,
 ColumnFiltersState,
 SortingState,
 VisibilityState,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 getPaginationRowModel,
 getSortedRowModel,
 useReactTable
} from "@tanstack/react-table"

import { RxCaretSort, RxDotsHorizontal } from "react-icons/rx"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CollegesProps } from "./college-table"
import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { DeleteForm, UpdateForm } from "./update-delete"
import Link from "next/link"

export const columns: ColumnDef<CollegesProps>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox checked={
    //             table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //         />
    //     ),
    //     cell: ({row}) => (
    //         <Checkbox
    //          checked={row.getIsSelected()}
    //          onCheckedChange={(value) => row.toggleSelected(!!value)}
    //          aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false
    // },
    {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("code")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button 
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <RxCaretSort className="ml-2 size-5"/>
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>
    },
    {
        accessorKey: "headmaster",
        header: ({ column }) => (
            <Button 
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                HeadMaster
                <RxCaretSort className="ml-2 size-5"/>
            </Button>
        )
    },
    {
        accessorKey: "highersecondary",
        header: "HS"
    },
    {
        accessorKey: "loweersecondary",
        header: "LS"
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button 
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <RxCaretSort className="ml-2 size-5"/>
            </Button>
        )
    },
    {
        accessorKey: "phoneno",
        header: ({ column }) => (
            <Button 
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Telephone
                <RxCaretSort className="ml-2 size-5"/>
            </Button>
        )
    },
    {
        accessorKey: "ps",
        header: ({ column }) => (
            <Button 
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                PS
                <RxCaretSort className="ml-2 size-5"/>
            </Button>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                        <RxDotsHorizontal className="size-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <div className="grid place-items-center">
                        <DropdownMenuItem>
                            <Button asChild>
                                <Link href={`/update?code=${row.original.code}`}>
                                    <GrUpdate className="size-4" />
                                </Link>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button variant={"destructive"} asChild>
                                <Link href={`/delete?code=${row.original.code}`}>
                                    <MdDeleteOutline className="size-4" />
                                </Link>
                            </Button>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
]

export interface DataTableProps{
    data: CollegesProps[]
}

export function DataTableDemo({ data }:DataTableProps) {

    const [sorting,setSorting] = useState<SortingState>([])
    const [columnFilters,setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility,setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection,setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        },
    })
    return (
        <div className="w-full">
            <div className="flex items-center py-4 justify-between">
                <Input 
                    placeholder="Filter Code..."
                    value={(table.getColumn("code")?.getFilterValue() as string)?? ""}
                    onChange={( event ) => table.getColumn("code")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"gradient"} className="ml-auto">
                            Columns <ChevronDownIcon className="size-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border"> 
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder? null: flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No Results
                                    </TableCell>         
                                </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {
                        table.getFilteredSelectedRowModel().rows.length
                    } of{" "} {table.getFilteredRowModel().rows.length} rows selected.
                </div> 
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                     >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>         
            </div>
        </div>
    )
}