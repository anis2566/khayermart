import { Category } from "@prisma/client"

import { CategoryCard } from "./category-card"

interface CategoryListProps {
    categories: Category[]
}

export const CategoryList = ({categories}:CategoryListProps) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
            {
                categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))
            }
        </div>
    )
}