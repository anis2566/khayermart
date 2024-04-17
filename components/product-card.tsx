"use client"

import { Product, Stock, Brand } from "@prisma/client"
import Image from "next/image"
import { useState } from "react" 
import {Eye, Heart, ShoppingCart, StarIcon} from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useProduct } from "@/store/use-product"
import { calculateDiscountPercentage } from "@/lib/utils"
import { useCart } from "@/store/user-cart"
import { useWishlist } from "@/store/use-wishlist"


interface ProductCardProps {
    product: Product & {
        category: {
            name: string;
        },
        stocks?: Stock[],
        brand?: Brand,
    }
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const { onOpen, setProduct } = useProduct()
    const {addToCart, cart} = useCart()
    const {addToWishlist} = useWishlist()

    const handleAddToCart = () => {
        const productWithStocks = {
            ...product,
            stocks: product.stocks || [] 
        };
        addToCart(productWithStocks, 1)
        toast.success("Added to cart")
    }

    const handleAddToWishlist = () => {
        addToWishlist(product)
        toast.success("Added to wishlist")
    }

    return (
        <div className="p-3 border border-gray-200 rounded-md w-full max-w-[300px] min-h-[350px] relative space-y-2 overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-md" onMouseEnter={() => setIsHovered(true)} onMouseLeave={()  => setIsHovered(false)}>
            {product.discountPrice && (
                <Badge className="absolute -left-2 top-4 bg-amber-500 -rotate-45">{calculateDiscountPercentage(product.price, product.discountPrice)}% off</Badge>
            )}

            <Link href={`/shop/${product.id}`} className="space-y-2">
                <div className="aspect-square w-full max-w-[100px] mx-auto">
                    <Image
                        alt="Thumbnail"
                        className="object-cover rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out"
                        height="100"
                        src={isHovered ? product.images[0] ? product.images[0] : product.featureImageUrl : product.featureImageUrl}
                        width="100"
                    />
                </div>

                <Badge className="text-muted-foreground" variant="outline">{product.category.name}</Badge>

                <p className="font-semibold">{product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}</p>

                {   
                    product.brand && (
                        <div className="flex items-center gap-x-2">
                            <Image
                                alt="Brand"
                                className="w-6 h-6 rounded-full object-cover"
                                height="100"
                                src={product.brand.imageUrl}
                                width="100"
                            />
                            <Badge variant="outline">{product.brand.name}</Badge>
                        </div>
                    )
                }
                
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
                    </div>
                ): (
                    <p className="text-slate-700 line-through text-md">&#2547;{product.price}</p>
                )}
            </Link>

            <div className="flex items-center justify-between absolute bottom-2 left-0 w-full px-2">
                <p className="text-sm text-muted-foreground">{product.totalStock} (stock)</p>
                <Button className="flex items-center gap-x-2" onClick={handleAddToCart}>
                    <ShoppingCart className="w-5 h-5" />
                    Add to cart
                </Button>
            </div>

            {/* OVERLAY */}
            <div className="absolute -right-20 top-0 group-hover:right-0 border border-gray-500 rounded-tl-xl rounded-bl-xl p-1 transition-all duration-300 ease-in-out hidden md:flex md:flex-col">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost" onClick={() => {
                                setProduct({...product, stocks: product.stocks, category: product.category as any})
                                onOpen()
                            }}>
                                <Eye className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                        <p>Quick View</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost" onClick={handleAddToWishlist}>
                                <Heart className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                        <p>Add to wishlist</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}
