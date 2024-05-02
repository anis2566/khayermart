"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState, useTransition } from "react"
import toast from "react-hot-toast"
import { RotateCw } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { redirect, useRouter } from "next/navigation"

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useCart } from "@/store/use-cart"
import { createOrder } from "@/actions/order.action"
import { useQuery } from "@tanstack/react-query"
import { getUserAddresses } from "@/actions/shipping.action"


const formSchema = z.object({
  name: z.string().min(4, {
    message: "required",
  }),
  division: z.string().min(1, {
    message: "required",
  }),
  address: z.string().min(10, {
    message: "required",
  }),
  phone: z.string().min(10, {
    message: "required",
  }),
})

const Checkout = () => {
    const [divisions, setDivisions] = useState([])
    const [paymentMethod, setPaymentMethod] = useState<string>("cod")
    const [pending, startTransition] = useTransition()
    
    const router = useRouter()
    const { userId } = useAuth()
    const { cart, deliveryFee, updateDeliveryFee, resetCart } = useCart()

    const { data } = useQuery({
        queryKey: ["user-address"],
        queryFn: async () => {
            const queryData = await getUserAddresses()
            return queryData.addresses
        }
    })
    
    useEffect(() => {
        if(!userId || cart.length < 1) redirect("/")
    },[userId, cart])


    const subTotal = cart.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity)
    }, 0)

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            division: "",
            address: "",
            phone: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(() => {
            createOrder({ shippingInfo: values, paymentMethod, products: cart, deliveryFee })
                .then(data => {
                    if (data?.error) {
                    toast.error(data?.error)
                    }
                    if (data?.success) {
                        router.push("/")
                        resetCart()
                        toast.success(data?.success)
                    }
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-5">
                        <Card>
                            <CardHeader>
                                <CardTitle>Saved Address</CardTitle>
                            </CardHeader>
                            <CardContent>Address</CardContent>
                        </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter name" {...field} />
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
                                    <Select value={field.value} onValueChange={(value) => {
                                        if (value === "Dhaka") {
                                            updateDeliveryFee(80)
                                            field.onChange(value)
                                        } else {
                                            updateDeliveryFee(120)
                                            field.onChange(value)
                                        }
                                }} defaultValue={field.value}>
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
                    </CardContent>
                </Card>
                </div>
                <div>
                <h1 className="text-3xl font-bold">Checkout</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Review your order and complete your purchase.</p>
                    <Card>
                    <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                        <span>Subtotal</span>
                        <span>&#2547;{subTotal}</span>
                        </div>
                        <div className="flex items-center justify-between">
                        <span>Shipping</span>
                        <span>&#2547;{deliveryFee}</span>
                        </div>
                        <div className="flex items-center justify-between">
                        <span>Taxes</span>
                        <span>&#2547;0</span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-medium">
                        <span>Total</span>
                        <span>&#2547;{subTotal + deliveryFee}</span>
                        </div>
                    </div>
                    </CardContent>
                    </Card>
                    <Card className="mt-5">
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value)} className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <Label htmlFor="cod">Cash on Delivery</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="payNow" id="payNow" />
                                    <Label htmlFor="payNow">Pay Now</Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <Button type="submit" className="w-full max-w-[200px] bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" disabled={pending}>
                    {pending && (
                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />  
                    )}
                    Place Order
                </Button>
            </div>
            </form>
        </Form>
    )
}

export default Checkout