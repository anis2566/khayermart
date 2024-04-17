import { Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishlistState {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (product: Product) => {
        set((state) => {
          const cartIndex = state.wishlist.findIndex(
            (item) => item.id === product.id
          );

          if (cartIndex > -1) {
            return state;
          } else {
            return {
              ...state,
              wishlist: [
                ...state.wishlist,
                {
                  ...product,
                },
              ],
            };
          }
        });
      },
      removeFromWishlist: (productId: string) => {
        set((state) => ({
          ...state,
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        }));
      },
    }),
    {
      name: "user-wishlist",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
