import { Banner } from "./banner"
import { DailyBestDeal } from "./daily-best-deal"
import { FeatureCategory } from "./feature-category"
import { FeatureProducts } from "./feature-products"
import { PopularProducts } from "./popular-products"
import { DealOfTheDay } from "./deal-of-the-day"
import { ProductHouse } from "./product-house"
import { NewsLetter } from "./newsletter"
import { SearchInput } from "../shop/search"

export const Home = () => {
    return (
        <div className="w-full max-w-screen-2xl mx-auto space-y-[100px]">
            <div className="mt-3">
                <SearchInput />
                <div className="px-[50px]">
                <Banner />
                </div>
            </div>
            <FeatureCategory />
            <FeatureProducts />
            <PopularProducts />
            <DailyBestDeal />
            <DealOfTheDay />
            <ProductHouse />
            <NewsLetter />
        </div>
    )
}