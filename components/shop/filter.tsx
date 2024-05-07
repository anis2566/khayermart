import { FilterCategory } from "./filter-category"
import { db } from "@/lib/db"
import { FilterPrice } from "./filter-price"
import { FilterBrand } from "./filter-brand"

export const Filter = async () => {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const brands = await db.brand.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return (
        <div className="flex flex-col gap-6">
            <FilterCategory categories={categories} />
            <FilterPrice />
            <FilterBrand brands={brands} />
      </div>
    )
}