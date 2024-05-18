import { PopulareProductCard } from "@/components/card/popular-product-card";
import { Header } from "@/components/seller/header"
import { ProductCard } from "@/components/seller/product-card";
import { db } from "@/lib/db";
import { PaginationComp } from "@/components/shop/pagination"

interface SearchPageProps {
  searchParams: {
    search: string;
    sort: string;
    page: string;
  }
};

const Store = async ({ searchParams }: SearchPageProps) => {
    const { search = "", sort, page } = searchParams
    const itemsPerPage = 20;  
    const currentPage = parseInt(page) || 1; 
  
    // Split the search string into words
    const searchWords = search.split(' ');


    const products = await db.product.findMany({
      where: {
        OR: searchWords.map(word => ({
            OR: [
            {name: {contains: word, mode: "insensitive"}},
            {category: {name: {contains: word, mode: "insensitive"}}}
            ]
        }))
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
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { category: { name: { contains: search, mode: 'insensitive' } } }
            ]
        },
    });
  
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    return (
        <div className="space-y-6">
            <Header />
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <PaginationComp totalPages={totalPages / itemsPerPage} />
        </div>
    )
}

export default Store