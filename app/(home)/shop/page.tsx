import { Filter } from "@/components/shop/filter"
import { FilterSort } from "@/components/shop/filter-sort"
import { ProductCard } from "@/components/card/product-card"
import { PaginationComp } from "@/components/shop/pagination"

import { db } from "@/lib/db"
import { FilterDrawer } from "@/components/shop/filter-drawer"
import { SearchInput } from "@/components/shop/search"



interface SearchPageProps {
  searchParams: {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    brand: string;
    sort: string;
    page: string;
  }
};


export default async function Shop({ searchParams: { search = "", sort, category, minPrice, maxPrice, brand, page } }: SearchPageProps) {
    const itemsPerPage = 20;  
    const currentPage = parseInt(page) || 1; 
  
    // Split the search string into words
    const searchWords = search.split(' ');


    const products = await db.product.findMany({
      where: {
        AND: [
          {
            OR: searchWords.map(word => ({
              OR: [
                {name: {contains: word, mode: "insensitive"}},
                {category: {name: {contains: word, mode: "insensitive"}}}
              ]
            }))
          },
          { category: { name: category } }, // Filter by category
          { brand: { name: brand } },
          ...(minPrice ? [{ price: { gte: parseInt(minPrice) } }] : []),
          ...(maxPrice ? [{ price: { lte: parseInt(maxPrice) } }] : []), // Corrected variable name here
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
      },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    });
  
  const totalProducts = await db.product.count({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { category: { name: { contains: search, mode: 'insensitive' } } }
            ]
          },
          { category: {name: category} },
          { brand: { name: brand } },
          ...(minPrice ? [{ price: { gte: parseInt(minPrice) } }] : []),
          ...(maxPrice ? [{ price: { lte: parseInt(maxPrice) } }] : []),
        ]
      }
  });
  
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  
  return (
    <section className="mx-auto px-4 md:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-start py-8">
      <SearchInput />
      <Filter />
      <div className="space-y-8">
        <div className="flex items-center justify-between md:justify-end gap-4">
          <div className="md:hidden">
            <FilterDrawer />
          </div>
          <FilterSort />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <PaginationComp totalPages={totalPages / itemsPerPage} />
      </div>
    </section>
  )
}