import Link from "next/link"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Filter } from "@/components/shop/filter"
import { FilterSort } from "@/components/shop/filter-sort"
import { db } from "@/lib/db"
import { ProductCard } from "@/components/card/product-card"

interface SearchPageProps {
  searchParams: {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    brand: string;
    sort: string;
  }
};


export default async function Shop({ searchParams:{search, sort, category,minPrice,maxPrice,brand} }: SearchPageProps) {
    const products = await db.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: 'insensitive' } }, // Search by product name
              { category: { name: { contains: search, mode: 'insensitive' } } } // Search by category name
            ]
          },
          { category: {name: category} }, // Filter by category
          { brand: { name: brand } },
          ...(minPrice ? [{ price: { gte: parseInt(minPrice) } }] : []),
          ...(minPrice ? [{ price: { lte: parseInt(maxPrice) } }] : []),
        ]
      },
      include: {
        category: true,
        stocks: true,
        brand: true,
      },
      orderBy: {
        ...(sort === 'asc' && { name: 'asc' }),
        ...(sort === 'desc' && { name: 'desc' }),
        ...(sort === 'high-to-low' && { price: 'desc' }),
        ...(sort === 'low-to-high' && { price: 'asc' }),
      }
    });

  
  return (
    <section className="container mx-auto px-4 md:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-start py-8">
      <Filter />
      <div className="grid gap-8">
        <div className="flex items-center gap-4">
          <FilterSort />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}