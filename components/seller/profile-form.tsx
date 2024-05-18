"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { UpdateUserSchema } from "@/schema/user"
import { updateSeller } from "@/actions/user.action"

export const ProfileForm = ({user}:{user:User}) => {

    const form = useForm<z.infer<typeof UpdateUserSchema>>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            name: user.name || "",
            phone: user.phone || "",
        },
    })

    const {mutate: updateSellerHandler, isPending} = useMutation({
        mutationFn: updateSeller,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-seller"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-seller"
            })
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateUserSchema>) => {
        toast.loading("User updating...", {
            id: "update-seller"
        });
        updateSellerHandler(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-3" disabled={isPending}>Update</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}