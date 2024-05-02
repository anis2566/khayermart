"use client"

import { useQuery } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"

import SkeletonWrapper from "../skeleton-wrapper"

import { getUserAddresses } from "@/actions/shipping.action"
import { useAddress } from "@/store/use-address"

export const AddressList = () => {

    const {onOpen} = useAddress()

    const { data, isFetching} = useQuery({
        queryKey: ["user-addresses"],
        queryFn: async () => {
            const data = await getUserAddresses()
            return data.addresses
        },
        staleTime: 60 * 60 * 1000, 
    })

    return (
        <div className="flex items-center gap-x-3 flex-wrap gap-y-3">
            {
                data?.map((address) => (
                    <SkeletonWrapper isLoading={isFetching} key={address.id}>
                        <div className="flex items-center gap-x-2 border border-gray-400 rounded-xl p-2 cursor-pointer ">
                            {address.infoName}
                                <Trash2 className="w-5 h-5 text-rose-500" onClick={() => onOpen(address.id)} />
                        </div>
                    </SkeletonWrapper>
                ))
            }
        </div>
    )
}