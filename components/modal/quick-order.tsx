"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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

import { useQuickOrder } from "@/store/use-quick-order"
import { QuickOrderSchema } from "@/schema/quick-order"
import { createQuickOrder } from "@/actions/quick-order.action"
import { useConfettiStore } from "@/store/use-confetti-store"

export const QuickOrderModal = () => {
    const { open, productId, product, onClose } = useQuickOrder()
    const router = useRouter()
    const {onOpen} = useConfettiStore()

    const form = useForm<z.infer<typeof QuickOrderSchema>>({
        resolver: zodResolver(QuickOrderSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            quantity: 1,
            deliveryFee: 120,
            color: "",
            size: ""
        },
    })

    const { setValue, watch } = form;
    const quantity = watch("quantity");
    watch("deliveryFee")
 
    const {mutate: createOrder, isPending} = useMutation({
        mutationFn: createQuickOrder,
        onSuccess: (data) => {
            onClose()
            onOpen()
            router.push(`/quick-order/success/${data.newOrder.id}`)
            toast.success(data.success, {
                id: "place-order"
            })
            form.reset()
        }
    })

    async function onSubmit(values: z.infer<typeof QuickOrderSchema>) {
        toast.loading("Placing order...", {
            id: "place-order"
        })
        await createOrder({
            productId,
            values
        })
    }

    const incrementQuantity = () => {
        setValue("quantity", quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setValue("quantity", quantity - 1);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Order Form</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="text-left">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                disabled={isPending}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="text-left">
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="full address"
                                        className="resize-none"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                disabled={isPending}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="text-left">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                disabled={isPending}
                            />
                            {
                                product?.colors && product.colors.length > 0 && (
                                    <FormField
                                        control={form.control}
                                        name="color"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3 text-left">
                                            <FormLabel>Color</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                    className="flex flex-row space-y-1"
                                                    disabled={isPending}
                                                >   
                                                    {
                                                        product?.colors?.map((color, i) => (
                                                            <FormItem className="flex items-center space-x-3 space-y-0" key={i}>
                                                                <FormControl>
                                                                <RadioGroupItem value={color} />
                                                                </FormControl>
                                                                <FormLabel className="capitalize">
                                                                {color}
                                                                </FormLabel>
                                                            </FormItem>
                                                        ))
                                                    }
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                            {
                                product?.stocks && product?.stocks?.length > 0 && (
                                    <FormField
                                        control={form.control}
                                        name="size"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3 text-left">
                                            <FormLabel>Color</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-row space-y-1"
                                                disabled={isPending}
                                                >   
                                                    {
                                                        product?.stocks?.map((stock, i) => (
                                                            <FormItem className="flex items-center space-x-3 space-y-0" key={i}>
                                                                <FormControl>
                                                                <RadioGroupItem value={stock.size || ""} />
                                                                </FormControl>
                                                                <FormLabel className="uppercase">
                                                                {stock.size}
                                                                </FormLabel>
                                                            </FormItem>
                                                        ))
                                                    }
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }

                            <div className="flex flex-col md:flex-row">
                                <div className="grid">
                                    <Label className="text-md text-left">Quantity</Label>
                                    <div className="flex items-center gap-2">
                                        <Button disabled={isPending} type="button" size="icon" variant="outline" onClick={decrementQuantity}>
                                            <MinusIcon className="h-3 w-3" />
                                            <span className="sr-only">Decrease</span>
                                        </Button>
                                        <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">
                                            {quantity}
                                        </div>
                                        <Button disabled={isPending} type="button" size="icon" variant="outline" onClick={incrementQuantity}>
                                            <PlusIcon className="h-3 w-3" />
                                            <span className="sr-only">Increase</span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid">
                                    <Label className="text-md text-left">Location</Label>
                                    <Select disabled={isPending} defaultValue="120" onValueChange={(value) => setValue("deliveryFee", parseInt(value))}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                <SelectItem value={"60"}>Inside Dhaka</SelectItem>
                                            <SelectItem value={"120"}>Outside Dhaka</SelectItem>
                                            <SelectItem value="100">Dhaka Sub Area</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>

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