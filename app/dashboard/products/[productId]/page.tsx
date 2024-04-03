import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { ProductCategoryForm } from "@/components/dashboard/product/product-category-form"

const Product = async ({ params }: { params: { productId: string } }) => {

    const product = await db.product.findUnique({
        where: {
            id: params.productId
        }
    })

    const categories = await db.category.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    if (!product) {
        redirect("/dashboard/products")
    }

    const requiredFields = [
        product.name,
        product.description,
        product.featureImageUrl,
        product.price,
        product.totalStock,
        product.categoryId
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                Product creation
                </h1>
                <span className="text-sm text-muted-foreground">
                Complete all fields {completionText}
                </span>
            </div>
            {/* <Actions
                disabled={!isComplete}
                courseId={params.id}
                isPublished={course.isPublished}
            /> */}
            </div>
            <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <ProductIdentity productId={product.id} initialData={product} />
                    </div>
                    <div>
                        <ProductCategoryForm initialData={product} productId={product.id} categories={categories || []} />
                </div>
            </div>
        </div>
    )
}

export default Product