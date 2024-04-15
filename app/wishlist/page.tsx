import Link from "next/link"
import {TrashIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Wishlist = () => {
    return (
        <Card className="w-full max-w-6xl mx-auto mt-6">
            <CardHeader className="flex flex-col items-start">
                <CardTitle className="text-lg font-bold">My Wishlist</CardTitle>
                <CardDescription className="text-sm leading-none mt-1">3 Items in your wishlist</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-t border-gray-200 first:rounded-t-lg dark:border-gray-800">
                    <div className="flex items-center gap-x-2">
                        <Link className="rounded-lg overflow-hidden w-16 h-16 flex items-center justify-center" href="#">
                            <Image alt="Thumbnail" className="aspect-square object-cover" height={75} src="/product.jpg" width={75} />
                        </Link>
                        <div className="flex-1 grid gap-2">
                            <h3 className="font-bold text-base leading-none">CottonSculpt Prism Tee</h3>
                            <div className="text-sm">$99</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button size="icon" variant="ghost">
                            <TrashIcon className="w-6 h-6 text-rose-500" />
                        </Button>
                        <Button size="sm">Add to cart</Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-t border-gray-200 first:rounded-t-lg dark:border-gray-800">
                    <div className="flex items-center gap-x-2">
                        <Link className="rounded-lg overflow-hidden w-16 h-16 flex items-center justify-center" href="#">
                            <Image alt="Thumbnail" className="aspect-square object-cover" height={75} src="/product.jpg" width={75} />
                        </Link>
                        <div className="flex-1 grid gap-2">
                            <h3 className="font-bold text-base leading-none">CottonSculpt Prism Tee</h3>
                            <div className="text-sm">$99</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button size="icon" variant="ghost">
                            <TrashIcon className="w-6 h-6 text-rose-500" />
                        </Button>
                        <Button size="sm">Add to cart</Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-t border-gray-200 first:rounded-t-lg dark:border-gray-800">
                    <div className="flex items-center gap-x-2">
                        <Link className="rounded-lg overflow-hidden w-16 h-16 flex items-center justify-center" href="#">
                            <Image alt="Thumbnail" className="aspect-square object-cover" height={75} src="/product.jpg" width={75} />
                        </Link>
                        <div className="flex-1 grid gap-2">
                            <h3 className="font-bold text-base leading-none">CottonSculpt Prism Tee</h3>
                            <div className="text-sm">$99</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button size="icon" variant="ghost">
                            <TrashIcon className="w-6 h-6 text-rose-500" />
                        </Button>
                        <Button size="sm">Add to cart</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-4">
                <Link href="/">
                    <Button size="sm" className="bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary">Continue shopping</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default Wishlist;