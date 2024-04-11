"use client"

import { EllipsisVertical, Trash2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const CustomerList = () => {
    return (
    <Table>
      <TableCaption>A list of your customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
            <TableRow>
                <TableCell>
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <EllipsisVertical className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <AlertDialog>
                      <AlertDialogTrigger className="flex gap-x-3 text-rose-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 select-none items-center rounded-sm px-2 py-1.5 text-sm w-full">
                        <Trash2 className="text-rose-500 w-4 h-4" />
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will delete the customer permanantly.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
      </TableBody>
    </Table>
    )
}