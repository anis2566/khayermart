import { RefreshCcw, ShoppingBag, ShoppingCart, Undo2 } from "lucide-react"
import {format} from "date-fns"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { getUserId } from "@/service/user.service"
import { BigCard } from "@/components/seller/big-card"


// import { RegisterSubscription } from "@/components/register-subscription"

const Dashboard = async () => {
    const userId = await getUserId()
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const totalOrders = await db.sellerOrder.findMany({
        where: {
            userId
        },
        select: {
            id: true
        }
    })

    // // Today's orders
    const todaysOrders = await db.sellerOrder.findMany({
        where: {
            userId,
            createdAt: {
                gte: today,
                lt: tomorrow,
            },
        },
        select: {
            id: true
        }
    });

    const orders = await db.sellerOrder.findMany({
        where: {
            userId,
        },
        include: {
            orderProducts: {
                include: {
                    product: {
                        select: {
                            name: true,
                            featureImageUrl: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })

    const pendingOrders = await db.sellerOrder.findMany({
        where: {
            userId,
            status: "pending"
        },
    })

    const returnedOrders = await db.sellerOrder.findMany({
        where: {
            userId,
            status: "returned"
        },
    })

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <BigCard title="Total Orders" icon={ShoppingCart} value={todaysOrders.length} />
                <BigCard title="Today Orders" icon={ShoppingBag} value={todaysOrders.length} />
                <BigCard title="Pending Orders" icon={RefreshCcw} value={pendingOrders.length} />
                <BigCard title="Returned Orders" icon={Undo2} value={returnedOrders.length} />
            </div>
            <div>
                <Card>
                    <CardHeader className="px-7">
                        <CardTitle className="tracking-widest">Orders</CardTitle>
                        <CardDescription>
                          Recent orders from your store
                        </CardDescription>
                    </CardHeader>
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
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default Dashboard