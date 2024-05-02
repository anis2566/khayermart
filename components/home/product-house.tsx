import {TopSelling} from "./top-selling"
import {RecentlyAdded} from "./recently-added"
import {TopRated} from "./top-rated"

export const ProductHouse = () => {
    return (
        <div className="px-4 grid grid-cols-1 md:grid-cols-3 gap-x-5">
            <TopSelling />
            <RecentlyAdded />
            <TopRated />
        </div>
    )
}