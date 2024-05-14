"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"

import { getFeatureProducts } from "@/actions/product.action"

export function FeatureProducts() {
    const {data:products} = useQuery({
        queryKey: ["feature-products"],
        queryFn: async () => {
            const res = await getFeatureProducts()
            return res.products
        },
        staleTime: 60 * 60 * 1000
    })

    return (
        <div className="px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-4">
            {
                products && products.map(product => (
                    <div className="rounded-2xl relative border flex flex-col justify-center pl-10 first:bg-[#F0E8D5] bg-[#f4eaea] last:bg-[#e7eaf3] aspect-video group"
                        style={{ backgroundImage: `url(${product.featureImageUrl})`, backgroundSize: '30%', backgroundPosition: 'right bottom', backgroundRepeat: "no-repeat" }}
                        key={product.id}
                    >
                        <div className="space-y-3 flex flex-col justify-between h-full py-8">
                            <p className="text-md md:text-xl font-bold text-slate-700 max-w-[200px] group-hover:-translate-y-3 transition-all duration-300 ease-in-out">
                                {product.featureTitle}
                            </p>
                            <Link href={`/shop/${product.id}`}>
                                <Button className="group-hover:translate-x-2 transition-all duration-300 ease-in-out max-w-[100px]">
                                    Shop Now
                                    <ArrowRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))
            }
    </div>
  )
}