"use client"

import { Product as PrismaProduct, Stock } from "@prisma/client"
import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import {toast} from "sonner"
import { Loader, PlusCircle, Trash2 } from "lucide-react"
import { useAuth } from "@clerk/nextjs"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"
// import { getProducts } from "@/actions/product.action"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getProducts } from "@/actions/product.action"
import { createOrder } from "@/actions/seller-order.action"

const productSchema = z.object({
    product: z.string().min(1, {
        message: "required"
    }),
    quantity: z.string().min(1, {
        message: "required"
    }),
    price: z.string().min(1, {
        message: "required"
    }),
    size: z.string().optional(),
    color: z.string().optional(),
})

const formSchema = z.object({ 
    products: z.array(productSchema),
    customerName: z.string().min(1, {
        message: "required"
    }),
    address: z.string().min(1, {
        message: "required"
    }),
    mobile: z.string().min(1, {
        message: "required"
    }),
    deliveryFee: z.string().min(1, {
        message: "required"
    }),
})

interface Product extends PrismaProduct {
    stocks?: Stock[]
}


const CreateOrder = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState<number>(1)
    const [deliveryFee, setDeliveryFee] = useState<number>(120)
 
    const { userId } = useAuth()
    const router = useRouter()
    
    if (!userId) redirect("/")
    
    const productQuery = useQuery({
        queryKey: ["user-products"],
        queryFn: async () => {
            const queryProducts = await getProducts()
            return queryProducts.products;
        },
        staleTime: 60 * 60 * 1000, 
    })

    const { mutate, isPending } = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            fetch("/api/notification/admin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            router.push("/seller/order/list")
            toast.success(data.success, {
                id: "create-order",
                duration: 2000
            })
        }, 
        onError: (error) => {
            toast.error(error.message, {
                id: "create-order",
                duration: 2000
            })
        },
    })

    const calculateTotalPrice = () => {
        const formValues = form.getValues();
        const productsTotal = formValues.products.reduce((acc, product) => {
            return acc + (parseInt(product.price) * parseInt(product.quantity));
        }, 0);
        return productsTotal
}

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            products: [{
                product: "",
                quantity: "1",
                price: "",
                color: '',
                size: ""
            }],
            customerName: "",
            address: "",
            mobile: "",
            deliveryFee: "120"
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "products"
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        toast.loading("Creating order...", { id: "create-order" });
        const transformedProducts = values.products.map(product => ({
            ...product,
            productId: product.product,
            quantity: parseInt(product.quantity),
            price: parseInt(product.price),
            size: product.size,
            color: product.color
        }));
        mutate({
            products: transformedProducts,
            customerName: values.customerName,
            address: values.address,
            mobile: values.mobile,
            deliveryFee: parseInt(values.deliveryFee),
        })
    }

    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/order/list">Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Form {...form}>
                
                    {productQuery.isFetching ? (
                        <div className="h-[80vh] lg:col-span-2  flex items-center justify-center">
                            <Loader className="animate-spin" />
                        </div>
                    ) : (
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 ">
                                {fields.map((field, index) => (
                                    <Card key={field.id}>
                                        <CardHeader>
                                            <CardTitle>Product</CardTitle>
                                            <CardDescription>Fill product details</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.product`}
                                                render={({ field, fieldState }) => (
                                                    <FormItem className="space-y-0">
                                                        <FormLabel>Product</FormLabel>
                                                        <Select value={field.value} onValueChange={(value) => {
                                                           const newProduct = productQuery.data && productQuery.data.find(p => p.id === value);
                                                            if (newProduct) {
                                                                const updatedSelectedProducts = [...selectedProducts];
                                                                updatedSelectedProducts[index] = newProduct;
                                                                setSelectedProducts(updatedSelectedProducts);
                                                                field.onChange(value);
                                                            }
                                                            }}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a product" />
                                                            </SelectTrigger>
                                                            </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        productQuery.data && productQuery.data.map((product) => (
                                                                            <SelectItem value={product.id} key={product.id}>
                                                                                <div className="flex items-center gap-x-2">
                                                                                <Avatar>
                                                                                    <AvatarImage src={product.featureImageUrl} className="w-9 h-9" />
                                                                                    <AvatarFallback>{product.name}</AvatarFallback>
                                                                                </Avatar>
                                                                                <p>{product.name}</p>
                                                                                </div>
                                                                            </SelectItem>
                                                                        ))
                                                                    }
                                                            </SelectContent>
                                                        </Select>
                                                        {fieldState.error && (
                                                            <FormMessage>{fieldState.error.message}</FormMessage>
                                                        )}
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.quantity`}
                                                render={({ field, fieldState }) => (
                                                    <FormItem className="space-y-0">
                                                        <FormLabel>Quantity</FormLabel>
                                                        <Input {...field} onChange={(e) => {
                                                            setQuantity(parseInt(e.target.value))
                                                            field.onChange(e.target.value)
                                                        }} type="number" />
                                                        {fieldState.error && (
                                                            <FormMessage>{fieldState.error.message}</FormMessage>
                                                        )}
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.price`}
                                                render={({ field, fieldState }) => (
                                                    <FormItem className="space-y-0">
                                                        <FormLabel>Price</FormLabel>
                                                        <Input {...field} type="number" />
                                                        {fieldState.error && (
                                                            <FormMessage>{fieldState.error.message}</FormMessage>
                                                        )}
                                                    </FormItem>
                                                )}
                                            />
                                            <Collapsible open={!!selectedProducts[index]?.stocks?.length}>
                                                <CollapsibleContent>
                                                    <FormField
                                                        control={form.control}
                                                        name={`products.${index}.size`}
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-0">
                                                            <FormLabel>Size</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a size" />
                                                                </SelectTrigger>
                                                                </FormControl>
                                                                    <SelectContent>
                                                                        {
                                                                            selectedProducts[index]?.stocks?.map((stock) => (
                                                                                <SelectItem className="uppercase" value={stock.size || ""} key={stock.id}>{stock.size}</SelectItem>
                                                                            ))
                                                                        }
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CollapsibleContent>
                                            </Collapsible>
                                            <Collapsible open={selectedProducts[index]?.colors?.some(color => color.trim() !== '')}>
                                                <CollapsibleContent>
                                                    <FormField
                                                        control={form.control}
                                                        name={`products.${index}.color`}
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-0">
                                                                <FormLabel>Color</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select a color" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {
                                                                            selectedProducts[index]?.colors?.filter(color => color).map((color, i) => (
                                                                                <SelectItem className="capitalize" value={color} key={i}>{color}</SelectItem>
                                                                            ))
                                                                        }
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CollapsibleContent>
                                            </Collapsible>
                                            <div className={cn("flex justify-end", index === 0 && "hidden")}>
                                                <Button type="button" onClick={() => remove(index)} size="icon" variant="ghost">
                                                    <Trash2 className="text-rose-500" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                <div className="flex justify-end">
                                <Button type="button" className="flex items-center gap-x-1" onClick={() => append({
                                    product: "",
                                    quantity: "1",
                                    price: "",
                                })} disabled={isPending}>
                                        <PlusCircle className="w-5 h-5" /> Add more
                                </Button>
                                </div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shipping</CardTitle>
                                        <CardDescription>Fill shipping address</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="customerName"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Customer Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter customer name..." {...field} type="text" />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
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
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Mobile No</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter mobile no..." {...field} type="text" />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="space-y-6">
                                <Card className="flex flex-col">
                                    <CardHeader className="pb-4">
                                        <CardTitle>Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between gap-2 border-t">
                                                <div>Items {quantity}</div>
                                                <div className="font-semibold">&#2547;{calculateTotalPrice() || 0}</div>
                                            </div>
                                            <div className="border-t pt-1">
                                                <div className="flex items-center space-x-2 my-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="deliveryFee"
                                                        render={({ field }) => (
                                                            <FormItem className="w-full">
                                                                <Select onValueChange={(value) => {
                                                                    field.onChange(value)
                                                                    setDeliveryFee(parseInt(value))
                                                                }} defaultValue={field.value}>
                                                                <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select delivery zone" />
                                                                </SelectTrigger>
                                                                </FormControl>
                                                                    <SelectContent className="w-full">
                                                                        {
                                                                            [{label: "Inside Dhaka", value: 60}, {label: "Outside Dhaka", value: 120}, {label: "Dhaka Sub Area", value: 100}].map((value, i) => (
                                                                                <SelectItem value={value.value.toString()} key={i}>{value.label}</SelectItem>
                                                                            ))
                                                                        }
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>Delivery Charge</div>
                                                    <div className="font-semibold">&#2547;{deliveryFee}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between p-4">
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                Total
                                                <span className="text-base font-semibold">&#2547;{isNaN(calculateTotalPrice()) ? 0 : calculateTotalPrice() + deliveryFee}</span>
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full max-w-[200px]" disabled={isPending}>
                                            Submit
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </form>
                    )}
            </Form>
        </div>
    )
}

export default CreateOrder