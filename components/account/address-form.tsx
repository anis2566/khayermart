"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

import { ShippingSchema, ShippingSchemaType } from "@/schema/shipping"
import { createShipping } from "@/actions/shipping.action"

export const AddressForm = () => {
    const [divisions, setDivisions] = useState([])

    const queryClient = useQueryClient()

    useEffect(() => {
        const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': '3cf92c7a23msh629dd8c92371568p184e13jsn31a73a90a274',
            'X-RapidAPI-Host': 'bdapi.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch('https://bdapi.p.rapidapi.com/v1.1/divisions', options);
            const data = await response.json();
            setDivisions(data.data)
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, []);

    const {isPending, mutate} = useMutation({
        mutationFn: createShipping,
        onError: (error) => {
            toast.error(error.message, {
                id: "create-address"
            })
        },
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "create-address"
            })
            form.reset()
            queryClient.invalidateQueries({ queryKey: ["user-addresses"] })
        }
    })

    const form = useForm<ShippingSchemaType>({
        resolver: zodResolver(ShippingSchema),
        defaultValues: {
            infoName: "",
            name: "",
            address: "",
            division: "",
            phone: "",
        },
    })

    function onSubmit(values: ShippingSchemaType) {
        toast.loading("Creating address...", {
            id: "create-address"
        })
        mutate({
            ...values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="infoName"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                <FormLabel>Address Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Home, Office..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                <FormLabel>Recipient Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter recipient name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                <FormLabel>Division</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a division" />
                                    </SelectTrigger>
                                    </FormControl>
                                        <SelectContent>
                                            {divisions && divisions.map((division:any, i) => (
                                            <SelectItem value={division?.division} key={i}>{division?.division}</SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Enter full address"
                                    className="resize-none"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>Save</Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}