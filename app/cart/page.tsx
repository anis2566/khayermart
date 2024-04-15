"use client"

import {useState} from "react"
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton  } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const Cart = () => {
    const [insideDhaka, setInsideDhaka] = useState<boolean>(true)
    return (
        <div className="w-full space-y-6 p-3 mt-6">
            <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Shopping Cart</CardTitle>
                            <CardDescription>
                                You have 3 items in your cart
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="border divide-y">
                                <div className="grid items-center gap-4 md:grid-cols-[100px_1fr_200px_100px] p-4">
                                    <div className="aspect-square w-full max-w-[100px]">
                                    <Image
                                        alt="Thumbnail"
                                        className="aspect-object object-cover rounded-lg"
                                        height="100"
                                        src="/product.jpg"
                                        width="100"
                                    />
                                    </div>
                                    <div className="grid gap-1">
                                    <h3 className="font-semibold text-base">Glimmer Lamps</h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="font-medium">Color: Black</div>
                                    </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:justify-end">
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="outline">
                                        <MinusIcon className="h-3 w-3" />
                                        <span className="sr-only">Decrease</span>
                                        </Button>
                                        <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">1</div>
                                        <Button size="icon" variant="outline">
                                        <PlusIcon className="h-3 w-3" />
                                        <span className="sr-only">Increase</span>
                                        </Button>
                                    </div>
                                    <Button size="icon" variant="outline">
                                        <TrashIcon className="h-4 w-4 text-rose-500" />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                    </div>
                                    <div className="flex items-center gap-2 md:justify-end">
                                    <div className="font-semibold">$99</div>
                                    </div>
                                </div>
                                <div className="grid items-center gap-4 md:grid-cols-[100px_1fr_200px_100px] p-4">
                                    <div className="aspect-square w-full max-w-[100px]">
                                    <Image
                                        alt="Thumbnail"
                                        className="aspect-object object-cover rounded-lg"
                                        height="100"
                                        src="/product.jpg"
                                        width="100"
                                    />
                                    </div>
                                    <div className="grid gap-1">
                                    <h3 className="font-semibold text-base">Glimmer Lamps</h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="font-medium">Color: Black</div>
                                    </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:justify-end">
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="outline">
                                        <MinusIcon className="h-3 w-3" />
                                        <span className="sr-only">Decrease</span>
                                        </Button>
                                        <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">1</div>
                                        <Button size="icon" variant="outline">
                                        <PlusIcon className="h-3 w-3" />
                                        <span className="sr-only">Increase</span>
                                        </Button>
                                    </div>
                                    <Button size="icon" variant="outline">
                                        <TrashIcon className="h-4 w-4 text-rose-500" />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                    </div>
                                    <div className="flex items-center gap-2 md:justify-end">
                                    <div className="font-semibold">$99</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle>Cart Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2 border-t">
                                    <div>Items 3</div>
                                    <div className="font-semibold">&#2547;200</div>
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
                                    <span className="text-base font-semibold">$226</span>
                                </div>
                            </div>
                            <SignedIn>
                                <Button className="w-full md:w-auto bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" size="lg">
                                Proceed to Checkout
                                </Button>
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