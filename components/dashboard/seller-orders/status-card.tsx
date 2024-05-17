"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useState } from "react";
import { OrderProduct } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOrder } from "@/actions/seller-order.action";
import { Button } from "@/components/ui/button";

interface Props {
    id: string;
    products: OrderProduct[]
}

export const StatusCard = ({id, products}:Props) => {
    const [status, setStatus] = useState<string>("")

    const { mutate, isPending} = useMutation({
        mutationFn: updateOrder,
        onSuccess: (data) => {
            toast.success(data?.success, {
                id: "update-order",
                duration: 2000
            })
        }, 
        onError: (error) => {
            toast.error(error.message, {
                id: "update-order",
                duration: 2000
            })
        },
    })

    const handleUpdate = () => {
        toast.loading("Updating product...", { id: "update-order" });
        mutate({
            id,
            products,
            status
        })
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-4">
                <CardTitle>Status</CardTitle>
                <CardDescription>Update order status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Select defaultValue={status} onValueChange={value => setStatus(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            ["shipping", "delivered", "returned"].map((value, i) => (
                                <SelectItem value={value} key={i} className="capitalize">{value}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Button className="w-full" onClick={handleUpdate} disabled={!status || isPending}>Update</Button>
            </CardContent>
        </Card>
    )
}