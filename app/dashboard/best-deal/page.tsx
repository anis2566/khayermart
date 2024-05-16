import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { db } from "@/lib/db";
import { PopularProductForm } from "@/components/dashboard/popular-products/popular-product-form";
import { PopulareProductCard } from "@/components/card/popular-product-card";
import { BestDealForm } from "@/components/dashboard/best-deal/best-deal-form";
import { BestDealCard } from "@/components/card/best-deal-dashboard-card";

const BestDealProduct = async () => {
    const products = await db.product.findMany({
        where: {
            genre: {
                has: "best-deal"
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })


    return (
        <div className="space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Best Deal</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-x-3 gap-y-4">
                    {
                        products.map((product) => (
                            <BestDealCard key={product.id} product={product} />
                        ))
                    }
                </div>
                <BestDealForm />
                
            </div>
        </div>
    )
}

export default BestDealProduct;