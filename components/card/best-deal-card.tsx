"use client"

import { Product, Stock, Brand, Category } from "@prisma/client"
import Image from "next/image"
import {ShoppingCart, StarIcon} from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { calculateDiscountPercentage, cn } from "@/lib/utils"
import { useCart } from "@/store/use-cart"


interface ProductCardProps {
    product: Product & {
        category: Category,
        stocks?: Stock[],
        brand?: Brand,
    }
}

export const BestDealCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart()
    
    const handleAddToCart = () => {
        addToCart(product, 1)
        toast.success("Added to cart")
    }

    return (
        <div className="p-3 border border-gray-200 rounded-md w-full max-w-[300px] min-h-[350px] relative space-y-2 overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-md">
            

            <Link href={`/shop/${product.id}`} className="space-y-2">
                <div className="aspect-square w-full max-w-[100px] mx-auto">
                    <Image
                        alt="Thumbnail"
                        className="h-[120px] rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out"
                        height="100"
                        src={product.featureImageUrl}
                        width="100"
                    />
                </div>

                <p className="font-semibold">{product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}</p>
             
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">(4.0)</p>
                </div>

                {product.discountPrice ? (
                    <div className="flex items-center gap-x-2">
                        <p className="text-slate-700 text-md font-semibold">&#2547;{product.discountPrice}</p>
                        <p className="text-slate-700 line-through text-sm">&#2547;{product.price}</p>
                        {product.discountPrice && (
                            <Badge className="bg-amber-500">{calculateDiscountPercentage(product.price, product.discountPrice)}% off</Badge>
                        )}
                    </div>
                ): (
                    <p className="text-slate-700 line-through text-md">&#2547;{product.price}</p>
                )}
            </Link>

            <div className="space-y-2">
                <Progress value={(5 / (product.totalStock || 1)) * 100} className="h-1.5" />
                <span className="text-xs text-muted-foreground">Sold: 5/{product?.totalStock}</span>
            </div>

            <Button variant="outline" className="bg-slate-300 flex items-center gap-x-2 w-[90%] absolute bottom-2" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5" />
                Add to cart
            </Button>

        </div>
    )
}
