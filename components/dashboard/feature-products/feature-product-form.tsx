"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { addFeatureProduct, getProductIdsAndName } from "@/actions/product.action";
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

type Product = {
    id: string;
    name: string;
    featureImageUrl: string;
}

export const FeatureProductForm = () => {
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
    
    const form = useForm<z.infer<typeof FeatureFormSchema>>({
        resolver: zodResolver(FeatureFormSchema),
        defaultValues: {
            productId: "",
            featureTitle: ""
        }
    })

    const {mutate: addFeature, isPending} = useMutation({
        mutationFn: addFeatureProduct,
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

    function onSubmit(data: z.infer<typeof FeatureFormSchema>) {
        toast.loading("Creating feature...", {
            id: "add-feature"
        });
        addFeature(data)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-primary">Add Product</CardTitle>
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
                                            className="flex flex-row items-center gap-2"
                                            >
                                                <Avatar>
                                                    <AvatarImage className="w-8 h-8" src={product.featureImageUrl} />
                                                    <AvatarFallback>PS</AvatarFallback>
                                                </Avatar>
                                                <p>
                                                {product.name.slice(0,30)}...
                                                </p>
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
                            name="featureTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Feature Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter featuer title" {...field} />
                                    </FormControl>
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