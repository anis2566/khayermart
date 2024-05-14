import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { FeatureProductCard } from "@/components/card/feature-product-card";
import { FeatureProductForm } from "@/components/dashboard/feature-products/feature-product-form";
import { db } from "@/lib/db";
import { PopularProductForm } from "@/components/dashboard/popular-products/popular-product-form";

const FeatureProducts = async () => {
    const products = await db.product.findMany({
        where: {
            genre: {
                has: "featured"
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
                    <BreadcrumbPage>Popular Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-x-3 gap-y-4">
                    {
                        products.map((product) => (
                            <FeatureProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
                <PopularProductForm />
                
            </div>
        </div>
    )
}

export default FeatureProducts;