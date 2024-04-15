import {Logo} from "./logo"
import {Cart} from "@/components/cart/cart"
import {Wishlist} from "@/components/wishlist/wishlist"
import {Account} from "@/components/account/account"
export const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-5 py-2">
            <Logo callbackUrl="/" />
            <div className="flex items-center gap-x-2">
                <Wishlist />
                <Cart />
                <Account />
            </div>
        </div>
    )
}