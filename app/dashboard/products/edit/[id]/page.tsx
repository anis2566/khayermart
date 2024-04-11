import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { EditProduct } from "@/components/dashboard/product/edit-product"
import {db} from "@/lib/db"


const EditProdut = async ({params}:{params:{id:string}}) => {
    const product = await db.product.findFirst({
        where: {
            id:params.id
        },
        include: {
            stocks: true
        }
    })

    console.log(product)
    if(!product) return
    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditProduct product={product} />
        </div>
    )
}

export default EditProdut