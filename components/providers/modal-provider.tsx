"use client"

import { AddressModal } from "../modal/address-modal"
import { ChangeRoleModal } from "../modal/change-role"
import { QuickOrderModal } from "../modal/quick-order"
import { QuickViewModal } from "../modal/quick-view"
import { TrackingModal } from "../modal/tracking-modal"

export const ModalProvider = () => {
    return (
        <>
            <QuickViewModal />
            <AddressModal />
            <QuickOrderModal />
            <ChangeRoleModal />
            <TrackingModal />
        </>
    )
}