"use client"

import { AddressModal } from "../modal/address-modal"
import { QuickOrderModal } from "../modal/quick-order"
import { QuickViewModal } from "../modal/quick-view"

export const ModalProvider = () => {
    return (
        <>
            <QuickViewModal />
            <AddressModal />
            <QuickOrderModal />
        </>
    )
}