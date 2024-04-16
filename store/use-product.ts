import { Product } from "@prisma/client";
import { create } from "zustand";

interface ProductState {
    open: boolean;
    product?: Product;
    onOpen: () => void;
    onClose: () => void;
    setProduct: (product: Product) => void;
}

export const useProduct = create<ProductState>()((set) => ({
    open: false,
    product: undefined,
    onOpen: () => set(() => ({ open: true })),
    onClose: () => set(() => ({ open: false })),
    setProduct: (product: Product) => set(() => ({ product })),
}));
