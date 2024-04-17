"use client"

import {useEffect, useState} from "react"
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton  } from "@clerk/nextjs"
import toast from "react-hot-toast"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useCart } from "@/store/user-cart"
import { cn } from "@/lib/utils"

const Cart = () => {
    const [insideDhaka, setInsideDhaka] = useState<boolean>(true)
    const [isClient, setIsClient] = useState(false);

    const {removeFromCart, cart, incrementQuantity, decrementQuantity, updateColor, updateSize} = useCart()

    const handleRemove = (id: string) => {
        removeFromCart(id)
        toast.success("Product removed")
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)
    const items = cart.reduce((acc, product) => acc + product.quantity, 0)
    
    return (
        <div className="w-full space-y-6 p-3 mt-6">
            <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Shopping Cart</CardTitle>
                            <CardDescription>
                                You have {cart.length} product in your cart
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="border divide-y">
                                {
                                    cart.map((product, index) => (
                                        <div className="flex flex-col sm:flex-row justify-between p-4" key={index}>
                                            <div className="flex flex-col md:flex-row gap-x-2">
                                                <div className="aspect-square w-full max-w-[100px]">
                                                <Image
                                                    alt="Thumbnail"
                                                    className="aspect-object object-cover rounded-lg"
                                                    height="100"
                                                    src={product.featureImageUrl}
                                                    width="100"
                                                />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold text-base">{product.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="font-medium capitalize">Color: {product.color}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="font-medium">Size: <span className="font-medium uppercase">{product.size}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 md:justify-end">
                                                    <div className="font-semibold">&#2547;{product.price * product.quantity}</div>
                                                </div>
                                                <div className="flex items-center gap-2 md:justify-end">
                                                    <div className="flex items-center gap-2">
                                                        <Button size="icon" variant="outline" onClick={() => decrementQuantity(product.id)}>
                                                            <MinusIcon className="h-3 w-3" />
                                                            <span className="sr-only">Decrease</span>
                                                        </Button>
                                                        <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">{product.quantity}</div>
                                                            <Button size="icon" variant="outline" onClick={() => incrementQuantity(product.id)}>
                                                            <PlusIcon className="h-3 w-3" />
                                                            <span className="sr-only">Increase</span>
                                                        </Button>
                                                    </div>
                                                    <Button size="icon" variant="outline" onClick={() => handleRemove(product.id)}>
                                                        <TrashIcon className="h-4 w-4 text-rose-500" />
                                                        <span className="sr-only">Remove</span>
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-x-2 md:justify-end">
                                                    <Select onValueChange={(size) => updateSize(product.id, size)} defaultValue={product.size}>
                                                        <SelectTrigger className="w-[100px]">
                                                            <SelectValue placeholder="Size" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {product?.sizes?.map((item, i) => (
                                                                <SelectItem value={item.size || ""} key={i} className="uppercase">{item.size}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Select onValueChange={(color) => updateColor(product.id, color)} defaultValue={product.color}>
                                                        <SelectTrigger className="w-[100px]">
                                                            <SelectValue placeholder="Color" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {product?.colors?.map((color, i) => (
                                                                <SelectItem value={color} key={i}>{color}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                {cart.length < 1 && (
                                    <div className="min-h-[20vh] flex flex-col items-center justify-center">
                                        <div className="space-y-3 mt-3">
                                            <p className="text-center text-muted-foreground">Your cart is empty</p>
                                            <Link href="/" className="flex justify-center">
                                                <Button>
                                                    Continue shopping
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className={cn("block", cart.length < 1 && "hidden")}>
                    <Card className="flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle>Cart Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2 border-t">
                                    <div>Items {items}</div>
                                    <div className="font-semibold">&#2547;{total}</div>
                                </div>
                                <div className="border-t pt-1">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" onCheckedChange={(checked) => setInsideDhaka(checked === true)} />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                                        >
                                            Inside Dhaka
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div>Delivery Charge</div>
                                        <div className="font-semibold">&#2547;{insideDhaka ? 80 : 120}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 border-t">
                                    <div>Vat & Taxes</div>
                                    <div className="font-semibold">&#2547;0</div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between p-4">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                    Total
                                    <span className="text-base font-semibold">&#2547;{total + (insideDhaka ? 80 : 120)}</span>
                                </div>
                            </div>
                            <SignedIn>
                                <Link href="/checkout">
                                    <Button className="w-full md:w-auto bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" size="lg">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal" afterSignInUrl="/cart" afterSignUpUrl="/cart">
                                    <Button className="w-full md:w-auto bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" size="lg">
                                        Login to Checkout
                                    </Button>
                                </SignInButton>
                            </SignedOut>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Cart