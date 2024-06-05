import { Wishlist } from "../wishlist/wishlist";
import { Cart } from "../home/navbar/cart";
import { Account } from "../account/account";


export function HeaderOptions() {
  return (
    <div className="flex items-center gap-x-2">
      <Wishlist />
      <Cart />
      <Account />
    </div>
  )
}
