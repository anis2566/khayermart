"use client"

import { EllipsisVertical, Pen,Trash2 } from "lucide-react"
import Link from "next/link"
import { Coupon } from "@prisma/client"
import { useState, useTransition } from "react"

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
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import toast from "react-hot-toast"
import { deleteCoupon } from "@/actions/coupon.action"

interface CouponListProps {
    coupons: Coupon[]
}

export const CouponList = ({ coupons }: CouponListProps) => {
  const [id, setId] = useState<string>("")
  const [pending, startTransition] = useTransition()

    const handleDelete = () => {
        if(!id) {
          toast.error("Something went wrong")
        } else {
          startTransition(() => {
            deleteCoupon(id)
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
    <Table>
      <TableCaption>A list of your recent coupons.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
            coupons.map(coupon => (
            <TableRow key={coupon.id}>
                <TableCell>
                <Avatar className="w-7 h-7">
                    <AvatarImage src={coupon.imageUrl} />
                    <AvatarFallback>{coupon.code}</AvatarFallback>
                </Avatar>
                </TableCell>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.value}</TableCell>
                <TableCell>{coupon.startDate.toDateString()}</TableCell>
                <TableCell>{coupon.expiryDate.toDateString()}</TableCell>
                <TableCell>
                <Badge className="bg-green-500">{coupon.status}</Badge>
                </TableCell>
                <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <EllipsisVertical className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={`/dashboard/coupon/edit/${coupon.id}`} className="flex items-center gap-x-3">
                        <Pen className="w-4 h-4" />
                            Edit
                        </Link>
                      </DropdownMenuItem>
                      <AlertDialog>
                      <AlertDialogTrigger className="flex gap-x-3 text-rose-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 select-none items-center rounded-sm px-2 py-1.5 text-sm w-full" onClick={() => setId(coupon.id)}>
                        <Trash2 className="text-rose-500 w-4 h-4" />
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will delete the coupon permanantly.
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
                </TableCell>
            </TableRow>
            ))
        }
      </TableBody>
    </Table>
    )
}