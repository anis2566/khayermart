import { Progress } from "@/components/ui/progress"
import { SmallCard } from "../card/small-card"
import { db } from "@/lib/db"

export const TopRated = async () => {
    const products = await db.product.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className="space-y-3 mt-10 md:mt-0">
            <p className="text-2xl font-semibold">Top Rated</p>
            <Progress value={0} className="w-[100px] h-1 bg-muted-foreground" />
            <div className="space-y-4">
                {
                    products.map(product => (
                        <SmallCard product={product} key={product.id} />
                    ))
                }
            </div>
        </div>
    )
}