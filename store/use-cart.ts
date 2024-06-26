import { Category, Product, Stock, Brand } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; 

import { ProductWithFeature } from "@/@types";

interface CartState {
    cart: {
        id: string;
        name: string;
        featureImageUrl: string;
        price: number;
        colors?: string[];
        sizes?: Stock[];
        size?: string;
        color?: string;
        quantity: number;
    }[];
    deliveryFee: number;
    addToCart: (product: ProductWithFeature, quantity: number, color?: string, size?: string) => void;
    removeFromCart: (productId: string) => void;
    incrementQuantity: (productId: string) => void;
    decrementQuantity: (productId: string) => void;
    updateColor: (productId: string, newColor: string) => void;
    updateSize: (productId: string, newSize: string) => void;
    updateDeliveryFee: (fee: number) => void;
    resetCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      deliveryFee: 120,
      addToCart: (
        product,
        quantity: number = 1,
        size,
        color
      ) => {
        set((state) => {
          const cartIndex = state.cart.findIndex(
            (item) => item.id === product.id
          );

          if (cartIndex > -1) {
            // Product exists, update quantity
            let newCart = [...state.cart];
            newCart[cartIndex].quantity += quantity;
            return { ...state, cart: newCart };
          } else {
            // New product, add to cart
            return {
              ...state,
              cart: [
                ...state.cart,
                {
                  id: product.id,
                  name: product.name,
                  featureImageUrl: product.featureImageUrl,
                  price: product.price,
                  colors: product.colors,
                  sizes: product.stocks,
                  size: size,
                  color: color,
                  quantity: quantity,
                },
              ],
            };
          }
        });
      },
      removeFromCart: (productId: string) => {
        set((state) => ({
          ...state,
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },
      incrementQuantity: (productId: string) => {
        set((state) => {
          const cartIndex = state.cart.findIndex(
            (item) => item.id === productId
          );

          if (cartIndex > -1) {
            // Product exists, increment quantity
            let newCart = [...state.cart];
            newCart[cartIndex].quantity += 1;
            return { ...state, cart: newCart };
          }
          // If product does not exist, do nothing
          return state;
        });
      },
      decrementQuantity: (productId: string) => {
        set((state) => {
          const cartIndex = state.cart.findIndex(
            (item) => item.id === productId
          );

          if (cartIndex > -1) {
            // Product exists, decrement quantity
            let newCart = [...state.cart];
            newCart[cartIndex].quantity -= 1;

            // Optionally remove the product if quantity is 0 or less
            if (newCart[cartIndex].quantity <= 0) {
              newCart.splice(cartIndex, 1);
            }

            return { ...state, cart: newCart };
          }
          // If product does not exist, do nothing
          return state;
        });
      },
      updateColor: (productId: string, newColor: string) => {
        set((state) => {
          const cartIndex = state.cart.findIndex(
            (item) => item.id === productId
          );

          if (cartIndex > -1) {
            // Product exists, update size
            let newCart = [...state.cart];
            newCart[cartIndex].color = newColor;

            return { ...state, cart: newCart };
          }
          // If product does not exist, do nothing
          return state;
        });
      },
      updateSize: (productId: string, newSize: string) => {
        set((state) => {
          const cartIndex = state.cart.findIndex(
            (item) => item.id === productId
          );

          if (cartIndex > -1) {
            // Product exists, update size
            let newCart = [...state.cart];
            newCart[cartIndex].size = newSize;

            return { ...state, cart: newCart };
          }
          // If product does not exist, do nothing
          return state;
        });
      },
      updateDeliveryFee: (fee: number) => {
        set((state) => {
          return { ...state, deliveryFee: fee };
        });
      },
      resetCart: () => {
        set(() => ({
          cart: [],
          deliveryFee: 120,
        }));
      },
    }),
    {
      name: "user-cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);