"use client"

import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { useTransition } from "react"
import {useState} from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import {EllipsisVertical,Pen, Trash2} from "lucide-react"
import {formatPrice} from "@/lib/format"
import Link from "next/link"
import {deleteProduct} from "@/actions/product.action"


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "featureImageUrl",
    header: "Image",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue("featureImageUrl")} />
        <AvatarFallback>KM</AvatarFallback>
      </Avatar>

    )
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}: {row: Product}) => (
      <p>{row.getValue("name")}</p>
    )
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => (
      <p>{formatPrice(row.getValue("price"))}</p>
    )
  },
  {
    accessorKey: "discountPrice",
    header: "D. Price",
    cell: ({row}) => (
      <p>{formatPrice(row.getValue("discountPrice"))}</p>
    )
  },
  {
    accessorKey: "totalStock",
    header: "Stock",
    cell: ({row}) => (
      <p>{row.getValue("totalStock")}</p>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <p>{row.getValue("status")}</p>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [id, setId] = useState<string>("")
      const [pending, startTransition] = useTransition()

      const product = row.original
      
      const handleDelete = () => {
        if(!id) {
          toast.error("Something went wrong")
        } else {
          startTransition(() => {
            deleteProduct(id)
                .then((data) => {
                    if (data?.error) {
                    toast.error(data?.error)
                    }
                    if (data?.success) {
                        toast.success(data?.success)
                    }
            })
        })
        }
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/dashboard/products/edit/${product.id}`} className="flex items-center gap-x-3">
                <Pen className="w-4 h-4" />
                  Edit
              </Link>
            </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger className="flex gap-x-3 text-rose-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 select-none items-center rounded-sm px-2 py-1.5 text-sm w-full" onClick={() => setId(product.id)}>
                  <Trash2 className="text-rose-500 w-4 h-4" />
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will delete the product permanantly.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={pending}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
