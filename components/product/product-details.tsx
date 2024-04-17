"use client"

import {useState} from "react"
import {Product} from "@prisma/client"
import {StarIcon} from "lucide-react"
import { MinusIcon, PlusIcon, HeartIcon } from "lucide-react"
import toast from "react-hot-toast"

import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { calculateDiscountPercentage } from "@/lib/utils"
import {useCart} from "@/store/user-cart"
import { useProduct } from "@/store/use-product"
import { useWishlist } from "@/store/use-wishlist"

interface ProductInfoProps {
    product: Product
}

export const ProductInfo = ({product}:ProductInfoProps) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [color, setColor] = useState<string>("")

    const {addToCart} = useCart()
    const { onClose } = useProduct()
    const {addToWishlist} = useWishlist()

    const increamentQuantity = () => {
        if(product.totalStock && quantity < product.totalStock) {
            setQuantity(prev => prev + 1)
        }
    }

    const decreamentQuantity = () => {
        if(quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, "", color || product.colors[0])
        onClose()
        toast.success("Added to cart")
    }

    const handleAddToWishlist = () => {
        addToWishlist(product)
        toast.success("Added to wishlist")
    }

    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-bold text-slate-700">{product.name}</h1>
            <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">(32 Reviews)</p>
            </div>
            <div className="flex items-center gap-x-4">
                <p className="text-3xl font-bold text-slate-600">&#2547;{product.discountPrice ? product.discountPrice : product.price}</p>
                {product.discountPrice && (
                    <div>
                        <p className="text-muted-foreground text-xs">{calculateDiscountPercentage(product.price, product.discountPrice)}% off</p>
                        <p className="text-slate-700 line-through text-md">&#2547;{product.price}</p>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-x-4">
                <Badge variant="outline" className="bg-green-500 text-white">In Stock</Badge>
                <p className="text-muted-foreground">({product.totalStock} remaining)</p>
            </div>
            
            {product.colors?.length > 0 && (
                <div className="grid gap-2">
                    <Label className="text-lg font-medium">Color</Label>
                    <div className="flex items-center gap-2">
                        <RadioGroup className="flex items-center gap-2" onValueChange={(color) => setColor(color)} defaultValue={color || product.colors[0] || ""} id="size">
                            {product.colors.map((color, i) => (
                                <Label
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                htmlFor={color}
                                key={i}
                                >
                                    <RadioGroupItem id={color} value={color} />
                                    {color}
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            )}

            <div className="grid gap-2">
                <Label className="text-lg font-medium">Quantity</Label>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={decreamentQuantity}>
                        <MinusIcon className="h-3 w-3" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">{quantity}</div>
                    <Button size="icon" variant="outline" onClick={increamentQuantity}>
                        <PlusIcon className="h-3 w-3" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" onClick={handleAddToCart}>Add to cart</Button>
                <Button size="lg" variant="outline" onClick={handleAddToWishlist}>
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Add to wishlist
                </Button>
            </div>
        </div>
    )
}