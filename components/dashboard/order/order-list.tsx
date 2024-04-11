import {EllipsisVertical,Eye} from "lucide-react"
import Link from "next/link"

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


export const OrderList = () => {
  const date = new Date()
  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow>
            <TableCell>
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>250.00</TableCell>
            <TableCell>{date.toDateString()}</TableCell>
            <TableCell>COD</TableCell>
            <TableCell>
              <Badge className="bg-green-500">Delivered</Badge>
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
                    <Link href={`/dashboard/orders`} className="flex items-center gap-x-3">
                      <Eye className="w-4 h-4" />
                        View
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>250.00</TableCell>
            <TableCell>{date.toDateString()}</TableCell>
            <TableCell>COD</TableCell>
            <TableCell>
              <Badge className="bg-rose-500">Returned</Badge>
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
                    <Link href={`/dashboard/orders`} className="flex items-center gap-x-3">
                      <Eye className="w-4 h-4" />
                        View
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  )
}
