import { format } from "date-fns";
import Link from "next/link";
import { Eye } from "lucide-react";
import { QuickOrder } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { formatPrice } from "@/lib/utils";


interface OrdersWithProduct extends QuickOrder {
    product: {
        featureImageUrl: string;
    }
}

interface Props {
    orders: OrdersWithProduct[]
}

export const QuickOrderList = ({orders}:Props) => {
    return (
        <>
            {
                orders.length === 0 ? (
                    <div className="w-full h-[40vh] flex flex-col items-center justify-center">
                        <p className="font-bold text-2xl text-primary">Opps! </p>
                        <p className="text-muted-foreground">
                            No order found
                        </p>
                    </div>
                ) : (
                    <Card className="w-[300px] md:w-full">
                        <CardContent>
                            <Table className="w-[300px] md:w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>D. Fee</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Color</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        orders.map(order => (
                                            <TableRow key={order.id}>
                                                <TableCell className="py-3 px-1">
                                                    <Avatar className="w-7 h-7">
                                                        <AvatarImage src={order.product.featureImageUrl} />
                                                        <AvatarFallback>{order.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="py-3 px-1">{order.name}</TableCell>
                                                <TableCell className="py-3 px-1">{formatPrice(order.total)}</TableCell>
                                                <TableCell className="py-3 px-1">{formatPrice(order.deliveryFee)}</TableCell>
                                                <TableCell className="py-3 px-1 uppercase">{order.size || "-"}</TableCell>
                                                <TableCell className="py-3 px-1 capitalize">{order.color || "-"}</TableCell>
                                                <TableCell className="py-3 px-1">{format(order.createdAt, "dd MMMM yyyy")}</TableCell>
                                                <TableCell className="py-3 px-1">
                                                    <Badge>{order.status}</Badge>
                                                </TableCell>
                                                <TableCell className="py-3 px-1">
                                                    <Link href={`/dashboard/quick-orders/${order.id}`}>
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
        </>
    )
}