import { db } from "@/lib/db";
import { FeatureCategorySlider } from "./feature-category-slider";

export async function FeatureCategory  () {
  const categories = await db.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  
  return (
      <div className="w-full px-4 space-y-6 relative">
          <h1 className="text-md md:text-2xl font-bold text-slate-800">Feature Categories</h1>
          <FeatureCategorySlider categories={categories} />
    </div>
  )
}
