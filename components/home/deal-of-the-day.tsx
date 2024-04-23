import {DealOfTheDayCard} from "@/components/card/deal-of-the-day-card"
import { db } from "@/lib/db"

export const DealOfTheDay = async () => {
    const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      category: true,
      stocks: true,
      brand: true,
    }
  })
    return (
        <div className="w-full px-4 space-y-5 pb-9">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Deal of the Day</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8 gap-y-[170px] md:gap-y-0">
                {
                    products.map(product => (
                        <DealOfTheDayCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}