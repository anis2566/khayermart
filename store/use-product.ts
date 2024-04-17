import { Product, Stock } from "@prisma/client";
import { create } from "zustand";

interface ProductState {
    open: boolean;
    product?: Product & {
      stocks?: Stock[]
    };
    onOpen: () => void;
    onClose: () => void;
    setProduct: (product: Product & {stocks?: Stock[]}) => void;
}

export const useProduct = create<ProductState>()((set) => ({
  open: false,
  product: undefined,
  onOpen: () => set(() => ({ open: true })),
  onClose: () => set(() => ({ open: false })),
  setProduct: (product: Product & { stocks?: Stock[] }) =>
    set(() => ({ product })),
}));
