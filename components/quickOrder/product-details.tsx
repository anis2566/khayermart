"use client"

import {Product, Stock} from "@prisma/client"
import {ShoppingCart} from "lucide-react"

import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { useQuickOrder } from "@/store/use-quick-order"

interface PrismaProduct extends Product {
    stocks?: Stock[];
}

interface Props {
    productId: string;
    product: PrismaProduct
}

export const ProductInfo = ({product, productId}:Props) => {
    console.log(productId)
    const {onOpen} = useQuickOrder()

    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-bold text-slate-700">{product.name}</h1>
            <div className="flex items-center gap-x-4">
                <p className="text-3xl font-bold text-slate-600">&#2547;{product?.discountPrice}</p>
            </div>

            <div className="flex items-center gap-x-4">
                <Badge variant="outline" className="bg-green-500 text-white">In Stock</Badge>
                <p className="text-muted-foreground">({product.totalStock})</p>
            </div>
            
            {product.colors?.length > 0 && (
                <div className="grid">
                    <Label className="text-lg font-medium">Color</Label>
                    <div className="flex items-center gap-2">
                            {product.colors.map((color, i) => (
                                <Badge key={i} variant="outline" className="capitalize">{color}</Badge>
                            ))}
                    </div>
                </div>
            )}

            {product.stocks && product.stocks?.length > 0 && (
                <div className="grid">
                    <Label className="text-lg font-medium">Size</Label>
                    <div className="flex items-center gap-2">
                            {product.stocks.map((stock, i) => (
                                <Badge key={i} variant="outline" className="uppercase">{stock?.size}</Badge>
                            ))}
                    </div>
                </div>
            )}

            <Button onClick={() => onOpen(productId, product)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Now
            </Button>
        </div>
    )
}