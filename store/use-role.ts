import { create } from 'zustand'

interface RoleState {
   open: boolean;
   userId: string;
    onOpen: (userId: string) => void
    onClose: () => void;
}

export const useRole = create<RoleState>()((set) => ({
    open: false,
    userId: "",
    onOpen: (userId) => set((state) => ({ userId, open: true })),
    onClose: () => set(() => ({ open: false, userId: "" }))
}))