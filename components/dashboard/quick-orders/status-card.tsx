"use client"

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { updateOrder } from "@/actions/quick-order.action";


interface Props {
    id: string;
    productId: string;
    quantity: number;
    size: string;
}

export const StatusCard = ({id, productId, quantity, size}:Props) => {
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
            orderId: id,
            productId,
            quantity,
            status,
            size: size,
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
                            ["CANCELLED", "SHIPPING", "DELIVERED", "RETURNED"].map((value, i) => (
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