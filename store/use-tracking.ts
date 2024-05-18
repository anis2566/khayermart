import { create } from 'zustand'

interface TrackingState {
   open: boolean;
   orderId: string;
    onOpen: (userId: string) => void
    onClose: () => void;
}

export const useTracking = create<TrackingState>()((set) => ({
    open: false,
    orderId: "",
    onOpen: (orderId) => set((state) => ({orderId, open: true })),
    onClose: () => set(() => ({ open: false, orderId: "" }))
}))