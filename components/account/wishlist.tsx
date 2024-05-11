"use client"

import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

import { useWishlist } from "@/store/use-wishlist"
import { useCart } from "@/store/use-cart"
import { ProductWithFeature } from "@/@types"

export const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist()
    const { addToCart } = useCart()
    
    const handleAddToWishlist = (product:ProductWithFeature) => {
        addToCart({...product, price: product.discountPrice || product.price}, 1)
        removeFromWishlist(product.id)
        toast.success("Added to cart")
    }    

    return (
        <Card className="border border-primary">
            <CardHeader>
            <CardTitle className="text-primary">Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {
                        wishlist.map((product) => (
                            <div className="flex items-center gap-4" key={product.id}>
                            <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="100"
                                src={product.featureImageUrl}
                                width="100"
                            />
                            <div className="grid gap-1 text-sm md:gap-2">
                                <div className="font-semibold">{product.name}</div>
                                <div className="text-muted-foreground">&#2547;{product.discountPrice}</div>
                                <div className="text-sm">
                                <Button size="sm" onClick={() => handleAddToWishlist(product)}>
                                    Add to cart
                                </Button>
                                </div>
                            </div>
                            </div>
                        ))
                    }
                    {wishlist.length < 1 && (
                        <div className="min-h-[20vh] flex flex-col items-center justify-center">
                            <div className="space-y-3 mt-3">
                                <p className="text-center text-muted-foreground">Your wishlist is empty</p>
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
    )
}