"use client"

import { Order, OrderProduct } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, formatPrice } from "@/lib/utils"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"


interface UserOrderProducts extends OrderProduct {
    product: {
        featureImageUrl: string;
        name: string;
    }
}

interface UserOrder extends Order {
    products: UserOrderProducts[]
}

export const columns: ColumnDef<UserOrder>[] = [
  {
    accessorKey: "products",
        header: "Products",
        cell: ({ row }) => {
            const products:UserOrderProducts[] = row.getValue("products")
            return (
                <div className="flex items-center gap-x-2">
                    {
                        products.map((item) => (
                            <Avatar key={item.orderId}>
                                <AvatarImage src={item.product.featureImageUrl} />
                                <AvatarFallback>{item.product.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ))
                    }
                </div>
        )
    }
    },
    {
        accessorKey: "totalAmount",
        header: "Total",
        cell: ({ row }) => {
            const order = row.original;
            const totalAmount:number = row.getValue("totalAmount");
            return formatPrice(totalAmount + order.deliveryFee); 
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const formattedDate = format(row.getValue("createdAt"), "yy-mm-dd")
            return <p>{formattedDate}</p>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status:string = row.getValue("status")
            return (
                <Badge
                    className={cn("text-white",
                        status === "PENDING" && "bg-amber-600",
                        status === "SHIPPING" && "bg-indogo-600",
                        status === "DELIVERED" && "bg-green-600",
                    )}
                >{status}</Badge>
            )
        }
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const order = row.original;
            return (
                <Link href={`/account/orders/${order.id}`}>
                    <Button variant="ghost" size="icon">
                        <Eye className="w-5 h-5 text-indigo-500" />
                    </Button>
                </Link>
            )
        }
    }
]
