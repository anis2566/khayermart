import { Banner } from "./banner"
import { FeatureCategory } from "./feature-category"
import { FeatureProducts } from "./feature-products"
import { PopularProducts } from "./popular-products"

export const Home = () => {
    return (
        <div className="w-full max-w-screen-2xl mx-auto space-y-10">
            <div className="px-[50px]">
              <Banner />
             </div>
            <FeatureCategory />
            <FeatureProducts />
            <PopularProducts />
        </div>
    )
}