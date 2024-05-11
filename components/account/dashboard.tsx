import { currentUser } from "@clerk/nextjs"
import { Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

import { CardContent, Card, CardTitle, CardHeader } from "@/components/ui/card"
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

import { db } from "@/lib/db"
import { getUserId } from "@/service/user.service"
import { cn, formatPrice } from "@/lib/utils"
import { Wishlist } from "./wishlist"


export const Dashboard = async () => {
    const userId = await getUserId()
    const user = await currentUser()

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
        },
        take: 5
    })

    return (
        <div className="space-y-8 w-full px-3 flex-1">
            <Card className="border shadow-sm shadow-primary w-full">
                <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
                    <Image
                        alt="Avatar"
                        className="rounded-full"
                        height="100"
                        src={user?.imageUrl || ""}
                        style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                        }}
                        width="100"
                    />
                <div className="grid gap-1 text-sm md:gap-2">
                        <div className="font-semibold text-xl">{`${user?.firstName}`} <span className="text-primary">{user?.lastName}</span></div>
                    <div>{user?.emailAddresses[0].emailAddress}</div>
                </div>
                </CardContent>
            </Card>

            <Card className="border border-primary">
                <CardHeader>
                <CardTitle className="text-primary">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead >Products</TableHead>
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
                </CardContent>
            </Card>

            <Wishlist />
        </div>
    )
}