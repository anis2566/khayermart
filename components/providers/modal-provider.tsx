"use client"

import { AddressModal } from "../modal/address-modal"
import { QuickViewModal } from "../modal/quick-view"

export const ModalProvider = () => {
    return (
        <>
            <QuickViewModal />
            <AddressModal />
        </>
    )
}