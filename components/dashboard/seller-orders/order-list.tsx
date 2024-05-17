"use client"

import { ChevronLeft, ChevronRight, EllipsisVertical, Eye} from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import {SellerOrder as PrismaOrder, SellerOrderProduct as PrismaOrderProduct} from "@prisma/client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"
import { useDebounce } from "@/store/use-debounce"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface OrderProduct extends PrismaOrderProduct {
    product: {
        featureImageUrl: string;
        name: string;
    }
}


interface Order extends PrismaOrder {
    user: {
        name: string;
    },
    orderProducts: OrderProduct[]
}

interface OrderListProps {
    orders: Order[]
}

export const OrderList = ({ orders }: OrderListProps) => {
    const [status, setStatus] = useState<string>("all")
    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<string>("5")
    const [search, setSearch] = useState<string>("")

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const debouncedValue = useDebounce(search);

    const paramPage = searchParams.get("page")
    const paramaPerPage = searchParams.get("perPage")
    const paramStatus = searchParams.get("status")

    useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
          page: paramPage,
          perPage: paramaPerPage,
          status: paramStatus,
          search: debouncedValue
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, paramPage, paramPage, paramStatus, router, pathname])

    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    <Select value={perPage} onValueChange={(value) => {
                        const url = qs.stringifyUrl({
                            url: pathname,
                            query: {
                                page: paramPage,
                                perPage: value,
                                status: paramStatus
                            }
                        }, { skipEmptyString: true, skipNull: true });
                        router.push(url);
                        setPerPage(value)
                    }}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["5", "10", "20", "50"].map((item, i) => (
                                    <SelectItem value={item} key={i}>{item}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Input className="hidden md:block" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={status} onValueChange={(value) => {
                    const url = qs.stringifyUrl({
                        url: pathname,
                        query: {
                            page: paramPage,
                            perPage: paramaPerPage,
                            status: value
                        }
                    }, { skipEmptyString: true, skipNull: true });
                    router.push(url);
                    setStatus(value)
                }}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            ["all", "pending", "shipping", "delivered", "returned"].map((item, i) => (
                                <SelectItem value={item} key={i} className="capitalize">{item}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            <Input className="w-full md:hidden" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            <Card className="w-[300px] sm:w-full mx-auto">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-1">Image</TableHead>
                                <TableHead className="px-1">Seller</TableHead>
                                <TableHead className="px-1">Customer</TableHead>
                                <TableHead className="px-1">Price</TableHead>
                                <TableHead className="px-1">Quantity</TableHead>
                                <TableHead className="px-1">Total</TableHead>
                                <TableHead className="px-1 hidden md:table-cell">Date</TableHead>
                                <TableHead className="px-1">Color</TableHead>
                                <TableHead className="px-1">Size</TableHead>
                                <TableHead className="px-1">
                                    Status
                                </TableHead>
                                <TableHead className="px-1">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                            orders.map((order) => (
                                <TableRow className="" key={order.id}>
                                    <TableCell className="py-2 px-1">
                                        {
                                            order.orderProducts.map(orderProduct => (
                                                <Avatar key={orderProduct.id}>
                                                    <AvatarImage src={orderProduct.product.featureImageUrl} />
                                                    <AvatarFallback>{orderProduct.product.name}</AvatarFallback>
                                                </Avatar>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="py-2 px-1">{order.user.name}</TableCell>
                                    <TableCell className="py-2 px-1">{order.customerName.slice(0,30)}</TableCell>
                                    <TableCell className="py-2 px-1 space-y-4">
                                        {
                                            order.orderProducts.map(orderProduct => (
                                                <p key={orderProduct.id}>{orderProduct.price}</p>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="py-2 px-1 space-y-4">
                                        {
                                            order.orderProducts.map(orderProduct => (
                                                <p key={orderProduct.id}>{orderProduct.quantity}</p>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="py-2 px-1">&#2547;{order.total + order.deliveryFee}</TableCell>
                                    <TableCell className="py-2 px-1 hidden md:table-cell">{format(order.createdAt, "hh:mm a, dd-MM-yyyy")}</TableCell>
                                    <TableCell className="py-2 px-1 space-y-4 ">
                                        {
                                            order.orderProducts.map(orderProduct => (
                                                <p key={orderProduct.id}>{orderProduct.color || "-"}</p>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="py-2 px-1 space-y-4 uppercase">
                                        {
                                            order.orderProducts.map(orderProduct => (
                                                <p key={orderProduct.id}>{orderProduct.size || "-"}</p>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="py-2 px-1">
                                        <Badge
                                            className={cn("text-xs capitalize",
                                                order.status === "pending" && "bg-amber-600 text-white",
                                                order.status === "shipping" && "bg-indigo-500 text-white",
                                                order.status === "delivered" && "bg-green-500 text-white",
                                                order.status === "returned" && "bg-rose-500 text-white",
                                                )}
                                            variant="secondary">
                                            {order.status}
                                        </Badge>
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
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/seller-orders/${order.id}`} className="flex items-center gap-x-3">
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                            </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="w-full flex justify-end">
                <div className="flex items-center gap-x-2">
                    <Button size="icon" variant="ghost" onClick={() => {
                        if(page > 1) {
                            const url = qs.stringifyUrl({
                                url: pathname,
                                query: {
                                    page: (page - 1).toString(),
                                    perPage: paramaPerPage,
                                    status: paramStatus
                                }
                            }, { skipEmptyString: true, skipNull: true });
                            router.push(url);
                            setPage(prev => prev - 1)
                        }
                    }} disabled={page <= 1}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => {
                        const url = qs.stringifyUrl({
                            url: pathname,
                            query: {
                                page: (page + 1).toString(),
                                perPage: paramaPerPage,
                                status: paramStatus
                            }
                        }, { skipEmptyString: true, skipNull: true });
                        router.push(url);
                        setPage(prev => prev + 1)
                    }}>
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}