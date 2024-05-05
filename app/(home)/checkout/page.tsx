"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState} from "react"
import { useAuth } from "@clerk/nextjs"
import { redirect, useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"

import { useCart } from "@/store/use-cart"
import { createOrder } from "@/actions/order.action"
import { getUserAddresses } from "@/actions/shipping.action"
import SkeletonComp from "@/components/skeleton"
import { PlusCircle } from "lucide-react"


const formSchema = z.object({
  shippingInfoId: z.string().optional(),
  name: z.string(),
  division: z.string(),
  address: z.string(),
  phone: z.string(),
  paymentMethod: z.string().min(1, {
    message: "required"
  })
}).superRefine((data, ctx) => {
  if (!data.shippingInfoId) {
    if (data.name.length < 4) {
      ctx.addIssue({
        path: ["name"],
        message: "required",
        code: z.ZodIssueCode.too_small,
        minimum: 4,
        inclusive: true,
        type: 'string'
    });
    }
    if (data.division.length < 1) {
      ctx.addIssue({
        path: ["division"],
        message: "required",
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        inclusive: true,
        type: 'string'
      });
    }
    if (data.address.length < 10) {
      ctx.addIssue({
        path: ["address"],
        message: "required",
        code: z.ZodIssueCode.too_small,
        minimum: 10,
        inclusive: true,
        type: 'string'
      });
    }
    if (data.phone.length < 10) {
      ctx.addIssue({
        path: ["phone"],
        message: "required",
        code: z.ZodIssueCode.too_small,
        minimum: 10,
        inclusive: true,
        type: 'string'
    });
    }
  }
});



const Checkout = () => {
    const [divisions, setDivisions] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const router = useRouter()
    const { userId } = useAuth()
    const { cart, deliveryFee, updateDeliveryFee, resetCart } = useCart()

    useEffect(() => {
        if (!userId || (cart.length < 1 && !orderPlaced)) {
            redirect("/");
        }
    }, [userId, cart, orderPlaced]);

    const { data:addresses, isFetching } = useQuery({
        queryKey: ["user-address"],
        queryFn: async () => {
            const queryData = await getUserAddresses()
            return queryData.addresses.map(item => ({name: item.infoName, id: item.id}))
        },
        staleTime: 60 * 60 * 1000, 
    })

    const { mutate, isPending} = useMutation({
        mutationFn: createOrder,
        onError: (error) => {
            toast.error(error.message, {
                id: "create-order"
            })
        },
        onSuccess: (data) => {
            setOrderPlaced(true);
            router.push("/account/orders")
            resetCart()
            toast.success(data.success, {
                id: "create-order"
            })
        }
    })
    
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
            phone: "",
            shippingInfoId: "",
            paymentMethod: "cod"
        },
    })

async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Placing order...", {
        id: "create-order"
    })
    const products = cart.map(product => ({
        id: product.id,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        color: product.color
    }))

    const shippingInfo = {
        name: values.name,
        division: values.division,
        address: values.address,
        phone: values.phone
    }

    if (!values.shippingInfoId) {
        mutate({shippingInfo, paymentMethod: values.paymentMethod, deliveryFee, shippingInfoId: values.shippingInfoId, products})
    } else {
        mutate({paymentMethod: values.paymentMethod, deliveryFee, shippingInfoId: values.shippingInfoId, products})
    }
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
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="shippingInfoId"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="space-y-3"
                                            disabled={isPending }
                                            >
                                                {
                                                    isFetching ? (
                                                        <SkeletonComp className="w-full h-10" />
                                                    ) : 
                                                    addresses?.map(address => (
                                                        <FormItem className="flex items-center space-x-3 space-y-0" key={address.id}>
                                                            <FormControl>
                                                                <RadioGroupItem value={address.id} checked={field.value === address.id} />
                                                            </FormControl>
                                                            <FormLabel>
                                                                {address.name}
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
                                {
                                    form.watch("shippingInfoId") !== "" && (
                                        <div className="flex justify-end">
                                            <Button className="flex items-center gap-x-2" onClick={() => form.resetField("shippingInfoId")} disabled={isPending}>
                                                <PlusCircle className="w-5 h-5" />
                                                New
                                            </Button>
                                        </div>
                                    )
                                }
                            </CardContent>
                        </Card>
                        <Collapsible open={form.getValues("shippingInfoId") === ""}>
                            <CollapsibleContent>
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
                                                    <Input placeholder="Enter name" {...field} disabled={isPending} />
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
                                                }} defaultValue={field.value} disabled={isPending}>
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
                                                    disabled={isPending}
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
                                                    <Input placeholder="Enter phone number" {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </CollapsibleContent>
                        </Collapsible>
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
                                    <FormField
                                        control={form.control}
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                            <FormControl>
                                                <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="space-y-4"
                                                disabled={isPending}
                                                >   
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="cod" />
                                                        </FormControl>
                                                        <FormLabel>
                                                            Cash On Deliver
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="mob" />
                                                        </FormControl>
                                                        <FormLabel>
                                                            Mobile Banking
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                            </CardContent>
                        </Card>
                        <div className="flex justify-end mt-5">
                            <Button type="submit" className="w-full max-w-[200px] bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" disabled={isPending}>
                                Place Order
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default Checkout