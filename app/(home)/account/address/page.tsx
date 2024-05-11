import { Suspense } from "react"

import { AddressForm } from "@/components/account/address-form"
import { db } from "@/lib/db"
import SkeletonComp from "@/components/skeleton"
import { AddressList } from "@/components/account/address-list"
import { getUserId } from "@/service/user.service"

const Address = async () => {
    const userId = await getUserId()
    const address = await db.shippingInfo.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })


    return (
        <div className="space-y-6 px-4">
            <Suspense fallback={<SkeletonComp childrens={1} />}>
                <AddressList address={address} />
            </Suspense>
            <AddressForm />
        </div>
    )
}

export default Address