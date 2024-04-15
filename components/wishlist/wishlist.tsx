import { Heart, Trash2 } from "lucide-react"
import Link from "next/link"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "../ui/button"
import { Separator } from "@/components/ui/separator"

import {db} from "@/lib/db"
import Image from "next/image"


export const Wishlist = async () => {
    const products = await db.product.findMany()

    return (
       <HoverCard>
            <HoverCardTrigger asChild>
                <div className="relative">
                    <Link href="/wishlist">
                        <Button variant="outline" size="icon">
                            <Heart className="h-[1.2rem] w-[1.2rem] dark:text-white" />
                            <span className="sr-only">Open Notification</span>
                        </Button>
                    </Link>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full absolute -right-1 -top-1 bg-rose-500 text-white">
                        3
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="p-2 w-[270px] space-y-4">
                <div className="space-y-2 w-full">
                    {
                        products.map((product, index) => (
                            <div className="flex items-center justify-between hover:bg-muted/60" key={index}>
                                <Image
                                    src={product.featureImageUrl}
                                    alt={product.name}
                                    className="aspect-object object-cover rounded-lg"
                                    height="50"
                                    width="50"
                                />
                                <div className="">
                                    <p className="truncate text-sm text-slate-800">{product.name.slice(0,20)}...</p>
                                    <p className="text-sm text-muted-foreground">1 x &#2547;{product.discountPrice}</p>
                                </div>
                                <Button size="icon" variant="ghost">
                                    <Trash2 className="w-5 h-5 text-rose-500" />
                                </Button>
                            </div>
                        ))
                    }
                    {
                        products.map((product, index) => (
                            <div className="flex items-center justify-between hover:bg-muted/60" key={index}>
                                <Image
                                    src={product.featureImageUrl}
                                    alt={product.name}
                                    className="aspect-object object-cover rounded-lg"
                                    height="50"
                                    width="50"
                                />
                                <div className="">
                                    <p className="truncate text-sm text-slate-800">{product.name.slice(0,20)}...</p>
                                    <p className="text-sm text-muted-foreground">1 x &#2547;{product.discountPrice}</p>
                                </div>
                                <Button size="icon" variant="ghost">
                                    <Trash2 className="w-5 h-5 text-rose-500" />
                                </Button>
                            </div>
                        ))
                    }
                </div>

                <Separator />

                <div className="w-full flex items-center justify-end">
                    <Link href="/wishlist">
                        <Button variant="outline">View Wishlist</Button>
                    </Link>
                </div>

            </HoverCardContent>
        </HoverCard>
    )
}