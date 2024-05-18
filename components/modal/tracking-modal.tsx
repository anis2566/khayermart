"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "../ui/button"


import React, { useEffect } from "react"
import { chnageRole } from "@/actions/user.action"
import { AddTrackingNumberSchema } from "@/schema/seller-order"
import { useTracking } from "@/store/use-tracking"
import { addTrackingNumber } from "@/actions/seller-order.action"

export const TrackingModal = () => {
    
    const {onClose, open, orderId} = useTracking()

    const form = useForm<z.infer<typeof AddTrackingNumberSchema>>({
        resolver: zodResolver(AddTrackingNumberSchema),
        defaultValues: {
            orderId: "",
            trackingId: ""
        },
    })

    useEffect(() => {
        if (orderId) {
            form.setValue("orderId", orderId)
        }
    }, [orderId, form])

    const {mutate: addTracking, isPending} = useMutation({
        mutationFn: addTrackingNumber,
        onSuccess: (data) => {
            onClose()
            toast.success(data.success, {
                id: "add-tracking"
            })
            form.reset()
        }
    })

    function onSubmit(values: z.infer<typeof AddTrackingNumberSchema>) {
        toast.loading("Tracking ID adding...", {
            id: "add-tracking"
        })
        addTracking({orderId:values.orderId, trackingId:values.trackingId})
    }

    return (
        <Dialog open={open}>
            
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Assign Role</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="trackingId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tracking Id</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter trackig id" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending}>
                                Confirm
                            </Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}