import { Product } from "@prisma/client";
import Image from "next/image"
import Link from "next/link";

import { Badge } from "../ui/badge";

export const ProductCard = ({ product }: { product: Product }) => {

    return (
        <Link href={`/seller/store/${product.id}`} className="p-3 border border-gray-200 rounded-md w-full max-w-[300px] h-[250px] relative space-y-2 overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-md">
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
                <div className="space-y-1">
                    <p className="font-semibold">{product.name.length > 40 ? `${product.name.slice(0, 40)}...` : product.name}</p>
                        <p className="text-slate-700 text-md">&#2547;{product.sellerPrice || product.discountPrice || product.price}</p>
                    <div className="flex justify-between items-center">
                        <Badge className="border-primary">{product.totalStock} in stock</Badge>
                    </div>
                </div>

            </div>
        </Link>
    )
}
