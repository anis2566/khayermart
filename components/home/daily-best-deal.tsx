"use client"

import { BestDealSlider } from "./best-deal-slider"
import { useQuery } from "@tanstack/react-query";
import { getBestDealProducts } from "@/actions/product.action";

export const DailyBestDeal = () => {
    const { data: products = [] } = useQuery({
        queryKey: ["get-popular"],
        queryFn: async () => {
            const { products } = await getBestDealProducts();
            return products;
        },
        staleTime: 60 * 60 * 1000
    });

    return (
        <div className="w-full px-4 space-y-5">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Daily Best Deal</h1>
            <BestDealSlider products={products} />
        </div>
    )
}