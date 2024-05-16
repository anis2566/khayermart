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
import { DealOfTheDayForm } from "@/components/dashboard/deal-of-day-day/deal-of-the-day-form";

const FeatureProducts = async () => {
    const products = await db.product.findMany({
        where: {
            genre: {
                has: "popular"
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
                    <BreadcrumbPage>Deal of the Day</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-x-3 gap-y-4">
                    {
                        products.map((product) => (
                            <PopulareProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
                <DealOfTheDayForm />
                
            </div>
        </div>
    )
}

export default FeatureProducts;