"use client"

import { Order, OrderProduct } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatPrice } from "@/lib/utils"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"


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
            const totalAmount:number = row.getValue("totalAmount");
            return formatPrice(totalAmount); 
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
            const status = row.getValue("status")
            if (status === "pending") {
                return <Badge>Pending</Badge>
            }
        }
    }
]
