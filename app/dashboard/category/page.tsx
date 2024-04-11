import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { db } from "@/lib/db"
import { DataTable } from "@/components/dashboard/category/data-table"
import { columns } from "@/components/dashboard/category/columns"

const Category = async () => {
    const categories = await db.category.findMany({
        include: {
            products: true,
        }
    })

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashobard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Category</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/dashboard/category/create">
                    <Button size="sm">Create</Button>
                </Link>
            </div>
            <DataTable columns={columns} data={categories} />
        </div>
    )
}

export default Category