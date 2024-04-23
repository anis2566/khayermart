import { db } from "@/lib/db";
import { ProductCard } from "@/components/card/product-card";

export async function PopularProducts() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      category: true,
      stocks: true,
      brand: true,
    }
  })

  if (products.length < 1) return null

  return (
      <div className="w-full px-4 space-y-5">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Popular Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center gap-x-3 gap-y-4">
        {
          products.map(product => (
            <ProductCard key={product.id} product={{ 
                ...product, 
                category: product.category,
                brand: product.brand ?? undefined,
                stocks: product.stocks ?? undefined,
              }}
            />
          ))
        }
      </div>
    </div>
  )
}
