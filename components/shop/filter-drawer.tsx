"use client"

import { useQuery } from "@tanstack/react-query"
import { Filter } from "lucide-react"
import queryString from "query-string"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"

import { getCategories } from "@/actions/category.action"
import { getBrands } from "@/actions/brand.action"
import { FilterPrice } from "./filter-price"


export const FilterDrawer = () => {
    const [brand, setBrand] = useState<string>("")

    const { data: categories} = useQuery({
        queryKey: ["get-categories"],
        queryFn: async () => {
            const data = await getCategories()
            return data.categories
        },
        staleTime: 60 * 60 * 1000
    })

    const { data: brands} = useQuery({
        queryKey: ["get-brands"],
        queryFn: async () => {
            const data = await getBrands()
            return data.brands
        }
    })

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleClick = (category: string) => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                category,
                search: searchParams.get("search"),
                brand: searchParams.get("brand"),
                sort: searchParams.get("sort"),
                minPrice: searchParams.get("minPrice"),
                maxPrice: searchParams.get("maxPrice"),
            }
        }, { skipEmptyString: true, skipNull: true });
        
        router.push(url)
    }

    const handleChange = (value: string) => {
        const newBrand = brand === value ? "" : value;
        setBrand(newBrand)
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                brand: newBrand,
                category: searchParams.get("category"),
                search: searchParams.get("search"),
                sort: searchParams.get("sort"),
                minPrice: searchParams.get("minPrice"),
                maxPrice: searchParams.get("maxPrice"),
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-x-1">
                    <Filter className="w-5 h-5" />
                    Filter
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                    <div className="grid gap-2">
                        <h3 className="font-semibold text-lg">Filters</h3>
                        <div className="grid gap-1">
                            <SheetClose asChild>
                                <div className="font-normal hover:underline cursor-pointer" onClick={() => handleClick("")}>
                                    All Products
                                </div>
                            </SheetClose>
                            {
                                categories && categories.map(category => (
                                   <SheetClose key={category.id} asChild>
                                        <div className={cn("font-normal hover:underline cursor-pointer", searchParams.get("category") === category.name && "text-primary hover:no-underline" )} onClick={() => handleClick(category.name)} key={category.id}>
                                            {category.name}
                                        </div>
                                   </SheetClose>
                                ))
                            }
                        </div>
                    </div>
                    <FilterPrice />
                    <div className="grid gap-2">
                        <h3 className="font-semibold text-lg">Brand</h3>
                        <div className="grid gap-2">
                            {
                                brands && brands.map((brand) => (
                                    <SheetClose key={brand.id} asChild>
                                        <div>
                                            <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox id="brand-nike" checked={searchParams.get("brand") === brand.name} onCheckedChange={() => handleChange(brand.name)} />
                                                {brand.name}
                                            </Label>
                                        </div>
                                    </SheetClose>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}