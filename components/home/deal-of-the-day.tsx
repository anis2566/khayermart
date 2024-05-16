"use client"

import { getDealOfTheDayProducts } from "@/actions/product.action"
import { DealOfTheDayCard } from "@/components/card/deal-of-the-day-card"
import { useQuery } from "@tanstack/react-query"

export const DealOfTheDay = () => {
  const {data: products} = useQuery({
    queryKey: ["get-deal-of-the-day"],
    queryFn: async () => {
      const res = await getDealOfTheDayProducts()
      return res.products
    },
    staleTime: 60 * 60 * 1000
  })
    
    return (
        <div className="w-full px-4 space-y-5 pb-9">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Deal of the Day</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8 gap-y-[170px] md:gap-y-0">
                {
                    products && products.map(product => (
                        <DealOfTheDayCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}