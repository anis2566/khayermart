"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SendHorizonal } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { createTodo } from "@/actions/todo.action"

const formSchema = z.object({
  title: z.string().min(1),
})

export const TodoForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
            title: "",
        },
    })

    const {isSubmitting} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        createTodo({ title: values.title })    
            .then((data) => {
            if(data?.success) {
                toast.success(data?.success)
                form.reset()
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full space-x-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input placeholder="write todo" {...field} className="flex-1" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button size="icon" type="submit" disabled={isSubmitting}>
                    <SendHorizonal className="w-4 h-4" />
                </Button>
            </form>
        </Form>
    )
}