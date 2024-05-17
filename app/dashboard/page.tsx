import { Todo } from "@/components/dashboard/todo"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, CreditCard, DollarSign, Users,ShoppingCart,RefreshCcw,Truck,Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import {BigCard} from "@/components/dashboard/big-card"
import {SmallCard} from "@/components/dashboard/small-card"
import {Charts} from "@/components/dashboard/charts"
import {MostSaleProducts} from "@/components/dashboard/most-sale-products"
import { db } from "@/lib/db"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

const Dashboard = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const todayFilter = {
        createdAt: {
            gte: today,
            lt: tomorrow,
        },
    }

    const todaysOrdersCount = await db.order.count({
        where: todayFilter,
        select: {
            id: true
        }
    });

    const todaysSellerOrdersCount = await db.sellerOrder.count({
        where: todayFilter,
        select: {
            id: true
        }
    });

    const todaysQuickOrdersCount = await db.quickOrder.count({
        where: todayFilter,
        select: {
            id: true
        }
    });

    const todayTotalOrdersCount = todaysOrdersCount.id + todaysSellerOrdersCount.id + todaysQuickOrdersCount.id

    const todayOrdersTotal = await db.order.findMany({
        select: {
            totalAmount: true
        }
    })
    const todaySellerOrdersTotal = await db.sellerOrder.findMany({
        select: {
            total: true
        }
    })
    const todayQuickOrdersTotal = await db.quickOrder.findMany({
        select: {
            total: true
        }
    })

    const todayOrdersTotalAmount = todayOrdersTotal.reduce((acc, order) => acc + order.totalAmount, 0);
    const todaySellerOrdersTotalAmount = todaySellerOrdersTotal.reduce((acc, order) => acc + order.total, 0);
    const todayQuickOrdersTotalAmount = todayQuickOrdersTotal.reduce((acc, order) => acc + order.total, 0);

    const todayTotal = todayOrdersTotalAmount + todaySellerOrdersTotalAmount + todayQuickOrdersTotalAmount;

    const yesterdayFilter = {
        createdAt: {
            gte: yesterday,
            lt: today,
        },
    }

    const yesterdayOrdersTotal = await db.order.findMany({
        where: yesterdayFilter,
        select: {
            totalAmount: true
        }
    });

    const yesterdaySellerOrdersTotal = await db.sellerOrder.findMany({
        where: yesterdayFilter,
        select: {
            total: true
        }
    });

    const yesterdayQuickOrdersTotal = await db.quickOrder.findMany({
        where: yesterdayFilter,
        select: {
            total: true
        }
    });

    const yesterdayOrdersTotalAmount = yesterdayOrdersTotal.reduce((acc, order) => acc + order.totalAmount, 0);
    const yesterdaySellerOrdersTotalAmount = yesterdaySellerOrdersTotal.reduce((acc, order) => acc + order.total, 0);
    const yesterdayQuickOrdersTotalAmount = yesterdayQuickOrdersTotal.reduce((acc, order) => acc + order.total, 0);

    const totalYesterday = yesterdayOrdersTotalAmount + yesterdaySellerOrdersTotalAmount + yesterdayQuickOrdersTotalAmount;




    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const thisMonthFilter = {
        createdAt: {
            gte: firstDayOfMonth,
            lt: lastDayOfMonth,
        },
    }

    const thisMonthOrdersTotal = await db.order.findMany({
        where: thisMonthFilter,
        select: {
            totalAmount: true
        }
    });

    const thisMonthSellerOrdersTotal = await db.sellerOrder.findMany({
        where: thisMonthFilter,
        select: {
            total: true
        }
    });

    const thisMonthQuickOrdersTotal = await db.quickOrder.findMany({
        where: thisMonthFilter,
        select: {
            total: true
        }
    });

    const thisMonthOrdersTotalAmount = thisMonthOrdersTotal.reduce((acc, order) => acc + order.totalAmount, 0);
    const thisMonthSellerOrdersTotalAmount = thisMonthSellerOrdersTotal.reduce((acc, order) => acc + order.total, 0);
    const thisMonthQuickOrdersTotalAmount = thisMonthQuickOrdersTotal.reduce((acc, order) => acc + order.total, 0);

    const totalThisMonth = thisMonthOrdersTotalAmount + thisMonthSellerOrdersTotalAmount + thisMonthQuickOrdersTotalAmount;

    const sellers = await db.user.count({
        where: {
            role: "seller"
        }
    })

    const orderPending = await db.order.count({
        where: {
            status: "PENDING"
        }
    })
    const orderPendingSeller = await db.sellerOrder.count({
        where: {
            status: "pending"
        }
    })
    const orderPendingQuickOrder = await db.order.count({
        where: {
            status: "pending"
        }
    })

    const totalPending = orderPending + orderPendingSeller + orderPendingQuickOrder

    const orderDelivered = await db.order.count({
        where: {
            status: "DELIVERED"
        }
    })
    const orderDeliveredSeller = await db.sellerOrder.count({
        where: {
            status: "delivered"
        }
    })
    const orderDeliveredQuickOrder = await db.order.count({
        where: {
            status: "delivered"
        }
    })

    const totalDelivered = orderDelivered + orderDeliveredSeller + orderDeliveredQuickOrder

    const orderReturned = await db.order.count({
        where: {
            status: "RETURNED"
        }
    })
    const orderReturnedSeller = await db.sellerOrder.count({
        where: {
            status: "returned"
        }
    })
    const orderReturnedQuickOrder = await db.order.count({
        where: {
            status: "returned"
        }
    })

    const totalReturned = orderReturned + orderReturnedSeller + orderReturnedQuickOrder

    const recentOrders = await db.sellerOrder.findMany({
        include: {
            orderProducts: {
                include: {
                    product: {
                        select: {
                            featureImageUrl: true
                        }
                    }
                }
            },
            user: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 3
    })

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <BigCard title="Today Orders" icon={DollarSign} value={todayTotal} />
                <BigCard title="Yesterday Orders" icon={DollarSign} value={totalYesterday} />
                <BigCard title="This Month" icon={CreditCard} value={totalThisMonth} />
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Sellers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{sellers}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <SmallCard title="Today Orders" icon={ShoppingCart} value={todayTotalOrdersCount} />
                <SmallCard title="Order Pending" icon={RefreshCcw} value={totalPending} />
                <SmallCard title="Order Delivered" icon={Truck} value={totalDelivered} />
                <SmallCard title="Order Returned" icon={Check} value={totalReturned} />
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8">
                <Charts />
                <MostSaleProducts />
            </div>
            <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                            Recent orders from your store.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Seller</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Product
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        recentOrders.map(order => (
                                            <TableRow className="" key={order.id}>
                                                <TableCell>
                                                    <div className="font-medium">{order.user.name}</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {
                                                        order.orderProducts.map((product, i) => (
                                                            <Avatar key={i}>
                                                                <AvatarImage src={product.product.featureImageUrl} />
                                                                <AvatarFallback>PS</AvatarFallback>
                                                            </Avatar>
                                                        ))
                                                    }
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {format(order.createdAt, "dd MMMM yyyy")}
                                                </TableCell>
                                                <TableCell className="text-right">{order.total}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <Todo />
            </div>
        </main>
    )
}

export default Dashboard