"use client"

import { useQuery } from "@tanstack/react-query"

import { FilterCategory } from "./filter-category"
import { FilterPrice } from "./filter-price"
import { FilterBrand } from "./filter-brand"
import { getCategories } from "@/actions/category.action"
import { getBrands } from "@/actions/brand.action"

export const Filter = () => {
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

    return (
        <div className="hidden md:flex flex-col gap-6">
            <FilterCategory categories={categories || []} />
            <FilterPrice />
            <FilterBrand brands={brands || []} />
      </div>
    )
}