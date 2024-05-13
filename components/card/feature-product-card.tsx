"use client"

import Image from "next/image"

import { ProductWithFeature } from "@/@types"


interface ProductCardProps {
    product: ProductWithFeature;
}

export const FeatureProductCard = ({ product }: ProductCardProps) => {
  
    return (
        <div className="p-3 border border-gray-200 rounded-md w-full max-w-[300px] min-h-[250px] relative space-y-2 overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-md">
            <div className="space-y-7">
                <div className="aspect-square w-full max-w-[100px] mx-auto relative">
                    <Image
                        alt="Thumbnail"
                        className="h-[120px] rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out absolute top-0 left-0"
                        height="100"
                        src={product.featureImageUrl}
                        width="100"
                    />
                </div>
                <div>
                    <p className="font-semibold">{product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}</p>

                    {product.discountPrice ? (
                        <div className="flex items-center gap-x-2">
                            <p className="text-slate-700 text-md font-semibold">&#2547;{product.discountPrice}</p>
                            <p className="text-slate-700 line-through text-sm">&#2547;{product.price}</p>
                        </div>
                    ): (
                        <p className="text-slate-700 line-through text-md">&#2547;{product.price}</p>
                    )}
                </div>

            </div>
        </div>
    )
}
