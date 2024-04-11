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

const Dashboard = () => {
    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <BigCard title="Today Orders" icon={DollarSign} value={500.35} />
                <BigCard title="Yesterday Orders" icon={DollarSign} value={300.90} />
                <BigCard title="This Month" icon={CreditCard} value={1300.20} />
                <BigCard title="All Time" icon={CreditCard} value={41300.20} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <SmallCard title="Today Orders" icon={ShoppingCart} value={127} />
                <SmallCard title="Order Pending" icon={RefreshCcw} value={27} />
                <SmallCard title="Order Processing" icon={Truck} value={7} />
                <SmallCard title="Order Delivered" icon={Check} value={427} />
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
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="">
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow className="">
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Fulfilled
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-06-23
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
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