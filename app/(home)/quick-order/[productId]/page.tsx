import { ProductImages } from "@/components/product/product-images";
import { ProductInfo } from "@/components/quickOrder/product-details";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { db } from "@/lib/db";
import { calculateDiscountPercentage } from "@/lib/utils";
import { redirect } from "next/navigation";

interface Props {
    params: {
        productId: string;
    }
}

const QuickOrderProduct = async ({ params }: Props) => {
    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            stocks: true
        }
    })
    if (!product) redirect("/")
    
    return (
        <div className="w-full px-3 mt-7 space-y-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductImages featureImage={product.featureImageUrl} images={product.images} />
                <ProductInfo product={product} productId={params.productId} />
            </div>
        </div>
    )
}

export default QuickOrderProduct