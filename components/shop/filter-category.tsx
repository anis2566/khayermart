"use client"

import { cn } from "@/lib/utils"
import { Category } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

interface Props {
    categories: Category[]
}

export const FilterCategory = ({ categories }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleClick = (category: string) => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                category,
                search: searchParams.get("search"),
                brand: searchParams.get("brand"),
                sort: searchParams.get("sort"),
                minPrice: searchParams.get("minPrice"),
                maxPrice: searchParams.get("maxPrice")
            }
        }, { skipEmptyString: true, skipNull: true });
        
        router.push(url)
    }
    return (
        <div className="grid gap-2">
            <h3 className="font-semibold text-lg">Filters</h3>
            <div className="grid gap-1">
                <div className="font-normal hover:underline cursor-pointer" onClick={() => handleClick("")}>
                    All Products
                </div>
                {
                    categories.map(category => (
                        <div className={cn("font-normal hover:underline cursor-pointer", searchParams.get("category") === category.name && "text-primary hover:no-underline" )} onClick={() => handleClick(category.name)} key={category.id}>
                            {category.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}