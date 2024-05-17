"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "../ui/textarea"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRole } from "@/store/use-role"
import React from "react"
import { chnageRole } from "@/actions/user.action"

const formSchema = z.object({
    role: z.string().min(1, {
        message: "required"
    })
})

export const ChangeRoleModal = () => {
    
    const {onClose, open, userId} = useRole()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "",
        },
    })

    const {mutate: changeRoleHandler, isPending} = useMutation({
        mutationFn: chnageRole,
        onSuccess: (data) => {
            onClose()
            toast.success(data.success, {
                id: "change-role"
            })
            form.reset()
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.loading("Changing role...", {
            id: "change-role"
        })
        await changeRoleHandler({userId, role:values.role})
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Assign Role</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="text-left">
                                    <FormLabel>Role</FormLabel>
                                    <Select  value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {
                                            ["user", "seller"].map((v, i) => (
                                            <SelectItem key={i} value={v} className="uppercase">{v}</SelectItem>
                                            ))
                                        }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                disabled={isPending}
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