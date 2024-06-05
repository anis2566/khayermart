"use client"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FilterCategory } from "./filter-category"
import { FilterPrice } from "./filter-price"
import { FilterBrand } from "./filter-brand"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/actions/category.action"
import { getBrands } from "@/actions/brand.action"


export const FilterDrawer = () => {
    const { data: categories } = useQuery({
        queryKey: ["get-categories"],
        queryFn: async () => {
            const data = await getCategories()
            return data.categories
        },
        staleTime: 60 * 60 * 1000
    })

    const { data: brands } = useQuery({
        queryKey: ["get-brands"],
        queryFn: async () => {
            const data = await getBrands()
            return data.brands
        },
        staleTime: 60 * 60 * 1000
    })
    return (
        <Sheet>
            <SheetTrigger className="md:hidden" asChild>
                <Button variant="ghost" size="icon">
                    <Filter className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[270px]">
                <SheetHeader>
                    <SheetTitle className="font-semibold text-md text-start -mt-4">Filter</SheetTitle>
                </SheetHeader>
                <Accordion type="single" collapsible>
                    <AccordionItem value="category">
                        <AccordionTrigger className="text-base font-medium hover:no-underline">Category</AccordionTrigger>
                        <AccordionContent>
                            <FilterCategory categories={categories || []} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                        <AccordionTrigger className="text-base font-medium hover:no-underline">Price Range</AccordionTrigger>
                        <AccordionContent>
                            <FilterPrice />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="brand">
                        <AccordionTrigger className="text-base font-medium hover:no-underline">Brand</AccordionTrigger>
                        <AccordionContent>
                            <FilterBrand brands={brands || []} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </SheetContent>
        </Sheet >

    )
}