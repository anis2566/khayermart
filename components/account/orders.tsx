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

import { UserOrdersWithFeature } from "@/@types"
import { cn, formatPrice } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"
import { Eye } from "lucide-react"

interface UserOrders {
    orders: UserOrdersWithFeature[]
}

export const UserOrders = ({orders}:UserOrders) => {
    return (
        <Card className="border border-primary p-2">
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
)
}