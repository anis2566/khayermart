"use server"

import { ShippingSchema, ShippingSchemaType } from "@/schema/shipping"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { getUserId } from "@/service/user.service"

export const createShipping = async (values: ShippingSchemaType) => {

    const userId = await getUserId()

    const parseBody = ShippingSchema.safeParse(values)

    if (!parseBody.success) {
        throw new Error("Invalid field validation")
    }

    const existShippingAddress = await db.shippingInfo.findFirst({
        where: {
            infoName: values.infoName,
            userId
        }
    })

    if (existShippingAddress) {
        throw new Error("Address already exist")
    }

    await db.shippingInfo.create({
        data: {
            ...parseBody.data,
            userId
        }
    })

    revalidatePath("/account/address")

    return {
        success: "Address saved"
    }
}


export const getUserAddresses = async () => {
    const userId = await getUserId()

    const addresses = await db.shippingInfo.findMany({
        where: {
            userId
        }
    })

    return {
        addresses
    }
}

export const deleteAddress = async (id: string) => {
    const userId = await getUserId()

    const address = await db.shippingInfo.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!address) {
        throw new Error("Address not found")
    }

    await db.shippingInfo.delete({
        where: {
            id,
            userId
        }
    })

    revalidatePath("/account/address")

    return {
        success: "Address deleted"
    }
}