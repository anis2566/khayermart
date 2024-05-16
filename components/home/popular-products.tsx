"use client"

import { getPopularProducts } from "@/actions/product.action";
import { useQuery } from "@tanstack/react-query"
import { ProductCard } from "../card/product-card";

export function PopularProducts() {
  const {data:products} = useQuery({
    queryKey: ["get-popular"],
    queryFn: async () => {
      const { products } = await getPopularProducts();
      return products;
    },
    staleTime: 60 * 60 * 1000
  })

  return (
      <div className="w-full px-4 space-y-5">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Popular Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center gap-x-3 gap-y-4">
        {
          products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}
