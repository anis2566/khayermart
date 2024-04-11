import { db } from "@/lib/db"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const ProductList = async () => {
    const products = await db.product.findMany({
        include: {
            stocks: true
        }
    })

    console.log(products)

    return (
        <div className="w-full">
            <DataTable columns={columns} data={products} />
        </div>
    )
}