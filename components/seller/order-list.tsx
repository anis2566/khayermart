"use client"

import qs from "query-string";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns"
import {SellerOrder as PrismaOrder, SellerOrderProduct as PrismaOrderProduct} from "@prisma/client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { useDebounce } from "@/store/use-debounce";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-0">Image</TableHead>
                                <TableHead className="px-0 hidden md:table-cell">Customer</TableHead>
                                <TableHead className="px-0 hidden md:table-cell">Price</TableHead>
                                <TableHead className="px-0">Quantity</TableHead>
                                <TableHead className="px-0">Total</TableHead>
                                <TableHead className="hidden md:table-cell px-0">
                                    Date
                                </TableHead>
                                <TableHead className="px-0">
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                orders.map((order) => (
                                    <TableRow className="" key={order.id}>
                                        <TableCell className="py-2 px-0">
                                            {
                                                order.orderProducts.map(product => (
                                                    <Avatar key={product.id}>
                                                        <AvatarImage src={product.product.featureImageUrl} />
                                                        <AvatarFallback>PS</AvatarFallback>
                                                    </Avatar>
                                                ))
                                            }
                                        </TableCell>
                                        <TableCell className="py-2 px-0 hidden md:table-cell">
                                            {order.customerName}
                                        </TableCell>
                                        <TableCell className="py-2 px-0 hidden md:table-cell space-y-4">
                                            {
                                                order.orderProducts.map((item, i) => (
                                                    <p key={i}>&#2547;{item.price}</p>
                                                ))
                                            }
                                        </TableCell>
                                        <TableCell className="py-2 px-0 space-y-4">
                                            {
                                                order.orderProducts.map((item, i) => (
                                                    <p key={i}>{item.quantity}</p>
                                                ))
                                            }
                                        </TableCell>
                                        <TableCell className="py-2 px-0">&#2547;{order.total + order.deliveryFee}</TableCell>
                                        <TableCell className="py-2 px-0 hidden md:table-cell">{format(order?.createdAt, "hh:mm a, dd-MM-yyyy")}</TableCell>
                                        <TableCell className="py-2 px-0">
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
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    {
                        orders.length === 0 && (
                            <div className="w-full h-[20vh] flex items-center justify-center">
                                <p className="text-xl text-muted-foreground">Order not found</p>
                            </div>
                        )
                    }

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
                </CardContent>
            </Card>
        </div>
    )
}