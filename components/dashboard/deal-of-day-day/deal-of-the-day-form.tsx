"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { addPopularProduct, getProductIdsAndName } from "@/actions/product.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { useDebounce } from "@/store/use-debounce";
import { FeatureFormSchema } from "@/schema/feature-products"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DealOfTheDaySchema } from "@/schema/deal-of-day-day"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarClock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

type Product = {
    id: string;
    name: string;
    featureImageUrl: string;
}

export const DealOfTheDayForm = () => {
    const [search, setSearch] = useState<string>("")
    const [products, setProducts] = useState<Product[]>([])

    const debounceValue = useDebounce(search, 2000)

    useEffect(() => {
      const fetchProduct = async () => {
          const res = await getProductIdsAndName(debounceValue)
          setProducts(res.products)
      }
      fetchProduct()
    }, [debounceValue])
    
    const form = useForm<z.infer<typeof DealOfTheDaySchema>>({
        resolver: zodResolver(DealOfTheDaySchema),
        defaultValues: {
            productId: "",
            startDeal: new Date(),
            endDeal: new Date(),
        }
    })

    const {mutate: addPopular, isPending} = useMutation({
        mutationFn: addPopularProduct,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "add-feature"
            })
            form.reset()
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "add-feature"
            })
        }
    })

    function onSubmit(data: z.infer<typeof DealOfTheDaySchema>) {
        console.log(data)
        // toast.loading("Creating feature...", {
        //     id: "add-feature"
        // });
        // addPopular(data.productId)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-primary">Assign Product</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl">
                        <FormField
                            control={form.control}
                            name="productId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product</FormLabel>
                                    <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Product" />
                                    </SelectTrigger>
                                    <SelectContent className="space-y-2">
                                        <Input placeholder="Search product" onChange={(e) => setSearch(e.target.value)} className="mb-2" autoFocus />
                                        {products.map((product) => (
                                        <SelectItem
                                            key={product.id}
                                            value={product.id}
                                            >
                                            {product.name.slice(0,30)}...
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDeal"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarClock className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date(new Date().setHours(0, 0, 0, 0))
                                        }
                                        className="w-full"
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDeal"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarClock className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < form.getValues("startDeal")
                                        }
                                        className="w-full"
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}