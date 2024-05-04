"use client"

import { Trash2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

import { useAddress } from "@/store/use-address"
import { ShippingInfo } from "@prisma/client"

interface AddressListProps {
    address: ShippingInfo[]
}

export const AddressList = ({address}:AddressListProps) => {
    const {onOpen} = useAddress()
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Saved Address</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-x-3 flex-wrap gap-y-3">
                    {
                        address.map((address) => (
                            <div className="flex items-center gap-x-2 border border-gray-400 rounded-xl p-2 cursor-pointer" key={address.id}>
                                {address.infoName}
                                <Trash2 className="w-5 h-5 text-rose-500" onClick={() => onOpen(address.id)} />
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}