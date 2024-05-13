import { FeatureProductCard } from "@/components/card/feature-product-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

const FeatureProducts = async () => {
    const products = await db.product.findMany({
        include: {
            category: true,
            brand: true,
            stocks: true,
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
                    <BreadcrumbPage>Feature Products</BreadcrumbPage>
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
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Add Product</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default FeatureProducts;