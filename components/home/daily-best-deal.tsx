import { db } from "@/lib/db"
import { BestDealSlider } from "./best-deal-slider"

export const DailyBestDeal = async () => {
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

  if (products.length < 1) return null
    return (
        <div className="w-full px-4 space-y-5">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Daily Best Deal</h1>
            <BestDealSlider products={products} />
        </div>
    )
}