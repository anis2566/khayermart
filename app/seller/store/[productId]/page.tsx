import { redirect } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {db} from "@/lib/db"
import {ProductImages} from "@/components/product/product-images"
import {ProductInfo} from "@/components/product/product-details"
import {Reviews} from "@/components/product/reviews"
import {Preview } from "@/components/preview"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const ProductDetails = async ({params}:{params:{productId:string}}) => {
    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            brand: true,
            stocks: true,
            category: true,
        }
    })

    if(!product) redirect("/")

    return (
        <div className="w-full px-3 mt-7 space-y-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductImages featureImage={product.featureImageUrl} images={product.images} />
                 <div className="space-y-3">
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
            <div className="space-y-1">
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
                <Badge variant="outline">{product?.category?.name}</Badge>

            </div>
            <p className="text-3xl font-bold text-slate-600">&#2547;{product.sellerPrice || product.discountPrice || product.price}</p>
            <div className="flex items-center gap-x-4">
                <Badge variant="outline" className="bg-green-500 text-white">In Stock</Badge>
                <p className="text-muted-foreground">({product.totalStock} remaining)</p>
            </div>
            
            {product.colors?.length > 0 && (
                <div className="grid">
                    <Label className="text-lg font-medium">Color</Label>
                    <div className="flex items-center gap-2">
                        <RadioGroup className="flex items-center gap-2" id="size">
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

            {product.stocks && product.stocks?.length > 0 && (
                <div className="grid">
                    <Label className="text-lg font-medium">Size</Label>
                    <div className="flex items-center gap-2">
                        <RadioGroup className="flex items-center gap-2" id="size">
                            {product.stocks.map((stock, i) => (
                                <Label
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800 uppercase"
                                htmlFor={stock.id}
                                key={i}
                                >
                                    <RadioGroupItem id={stock.id} value={stock.size || ""} />
                                    {stock.size}
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            )}
        </div>
            </div>

            <Separator />

            <Tabs defaultValue="description" className="w-full flex flex-col items-center mt-2">
                <TabsList className="w-full max-w-[400px] mx-auto">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="reveiws">Reveiws</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="w-full max-w-[1200px] mx-auto">
                    <Preview value={product.description} />
                </TabsContent>
                <TabsContent value="reveiws" className="w-full max-w-[1200px] mx-auto">
                    <Reviews />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProductDetails;