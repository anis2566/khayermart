"use client"

import { format } from "date-fns"
import Link from "next/link"
import { Eye, ShoppingBasket } from "lucide-react"
import queryString from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import { UserOrdersWithFeature } from "@/@types"
import { cn, formatPrice } from "@/lib/utils"
import { Pagination } from "../dashboard/quick-orders/pagination"

interface UserOrders {
    orders: UserOrdersWithFeature[]
}

export const UserOrders = ({ orders }: UserOrders) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleChaangePerPage = (value:string) => {
        const url = queryString.stringifyUrl({
        url: pathname,
        query: {
            status: searchParams.get("status"),
            perPage: value,
        }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }

    const handleChaangeStatus = (value:string) => {
        const url = queryString.stringifyUrl({
        url: pathname,
        query: {
            status: value,
        }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }
    return (
        <Card className="border border-primary p-2">
            <CardContent className="px-2 space-y-3 mt-2">
                <div className="w-full flex justify-between items-center gap-x-3">
                    <Select onValueChange={value => handleChaangePerPage(value)}>
                        <SelectTrigger className="w-[120px] flex-shrink-0">
                            <SelectValue placeholder="Per Page" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["5", "10", "20", "50"].map((v, i) => (
                                    <SelectItem key={i} value={v}>{v}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Select onValueChange={value => handleChaangeStatus(value)}>
                        <SelectTrigger className="w-[120px] flex-shrink-0">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["ALL", "PENDING", "SHIPPING", "DELIVERED", "RETURNED"].map((v, i) => (
                                    <SelectItem key={i} value={v}>{v}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead >Products</TableHead>
                        <TableHead>َQuantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orders.map(order => (
                                <TableRow className="p-0" key={order.id}>
                                    <TableCell className="py-1 flex items-center gap-x-2">
                                        {
                                            order.products.map(item => (
                                                <Avatar key={item.productId}>
                                                    <AvatarImage src={item.product.featureImageUrl} />
                                                    <AvatarFallback>{item.product.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="py-1">
                                        {order.products.reduce((acc, curr) => acc + curr.quantity,0)}
                                    </TableCell>
                                    <TableCell className="py-1">
                                        {formatPrice(order.totalAmount + order.deliveryFee)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-1">
                                        {format(order.createdAt, "dd MMMM yyyy")}
                                    </TableCell>
                                    <TableCell className="py-1">
                                        <Badge
                                            className={cn("text-white",
                                                order.status === "PENDING" && "bg-amber-600",
                                                order.status === "SHIPPING" && "bg-indogo-600",
                                                order.status === "DELIVERED" && "bg-green-600",
                                            )}
                                        >{
                                            order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-1">
                                        <Link href={`/account/orders/${order.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Eye className="w-5 h-5 text-primary" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                {
                    orders.length === 0 && (
                        <div className="flex flex-col items-center justify-center gap-2 py-6">
                            <div className="flex w-20 h-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <ShoppingBasket className="h-16 w-16 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h2 className="text-md text-muted-foreground font-bold tracking-tight">No Order found</h2>
                        </div>
                    )
                }

                <Pagination />
            </CardContent>
        </Card>
)
}
