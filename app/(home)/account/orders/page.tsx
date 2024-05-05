import Link from "next/link"
import { Eye } from "lucide-react"

import { CardContent, Card, CardTitle, CardHeader, CardDescription } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {ORDER_STATUS} from "@/constant"
import { Suspense } from "react"
import { UserOrders } from "@/components/account/user-orders"
import SkeletonComp from "@/components/skeleton"
import { UserOrderTable } from "@/components/account/orders/data-table"
import { columns } from "@/components/account/orders/columns"
import { db } from "@/lib/db"
import { getUserId } from "@/service/user.service"



const Orders = async () => {
    const userId = await getUserId()
    const orders = await db.order.findMany({
        where: {
            userId
        },
        include: {
            products: {
                include: {
                    product: {
                        select: {
                            featureImageUrl: true,
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>All order you have placed so far.</CardDescription>
            </CardHeader> 
            <CardContent className="px-2 space-y-3">
                <div className="w-full flex justify-end">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ORDER_STATUS.map((status) => (
                                    <SelectItem value={status.value} key={status.value}>{status.label}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>

                </div>
                <UserOrderTable columns={columns} data={orders} />
            </CardContent>
        </Card>
    )
}

export default Orders