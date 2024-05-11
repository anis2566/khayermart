import { Product as PrismaProduct, Stock } from "@prisma/client";
import { create } from "zustand";

interface Product extends PrismaProduct {
  stocks?: Stock[]
}

interface QuickOrderState {
  open: boolean;
  productId: string;
  product?: Product;
  onOpen: (productId: string, product:Product) => void;
  onClose: () => void;
}

export const useQuickOrder = create<QuickOrderState>()((set) => ({
  open: false,
  productId: "",
  product: undefined,
  onOpen: (productId: string, product: Product) => {
    set(() => ({ open: true, productId, product }));
  },
  onClose: () => set(() => ({ open: false, productId: "", product: undefined })),
}));
