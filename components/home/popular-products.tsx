import { db } from "@/lib/db";
import { ProductCard } from "../product-card";

export async function PopularProducts() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      category: {
        select: {
          name: true
        }
      },
      stocks: true,
      brand: true,
    }
  })

  if (products.length < 1) return null

  return (
      <div className="w-full px-4 space-y-5 pb-7">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Popular Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-x-3">
        {
          products.map(product => (
            <ProductCard key={product.id} product={{ 
                ...product, 
                category: product.category || { name: 'Uncategorized' },
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
