"use client"

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export const FilterSort = () => {
    const handleChange = (value: string) => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                sort: value,
                brand: searchParams.get("brand"),
                category: searchParams.get("category"),
                search: searchParams.get("search"),
                minPrice: searchParams.get("minPrice"),
                maxPrice: searchParams.get("maxPrice"),
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()


    return (
        <Select defaultValue="" onValueChange={(value) => handleChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="asc">Newest</SelectItem>
                <SelectItem value="desc">Oldest</SelectItem>
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            </SelectContent>
        </Select>
    )
}