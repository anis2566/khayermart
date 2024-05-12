"use client"

import { MapPin, Trash, Trash2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

import { useAddress } from "@/store/use-address"
import { ShippingInfo } from "@prisma/client"
import { Button } from "../ui/button"

interface AddressListProps {
    address: ShippingInfo[]
}

export const AddressList = ({address}:AddressListProps) => {
    const {onOpen} = useAddress()
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-primary">Saved Address</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-x-3 flex-wrap gap-y-3">
                    {
                        address.map((address) => (
                            <div className="flex gap-x-2 border w-auto p-2 rounded-md border-primary/40 items-center space-x-3 space-y-0" key={address.id}>
                                <MapPin className="w-6 h-6 text-primary" />
                                {address.infoName}
                                <Button variant="ghost" className="py-0" onClick={() => onOpen(address.id)}>
                                    <Trash className="w-5 h-5 text-rose-500" />
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}