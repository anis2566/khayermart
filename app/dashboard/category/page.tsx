import { Button } from "@/components/ui/button"
import Link from "next/link"

import { db } from "@/lib/db"
import { CategoryList } from "@/components/dashboard/category/category-list"

const Category = async () => {
    const categories = await db.category.findMany()

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
                <Link href="/dashboard/category/create">
                    <Button size="sm">Create</Button>
                </Link>
            </div>
            <div>
                <CategoryList categories={categories} />
            </div>
        </div>
    )
}

export default Category