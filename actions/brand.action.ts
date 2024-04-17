"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type CreateCoupon = {
    name: string,
    imageUrl: string,
}

export const createBrand = async ({name, imageUrl}:CreateCoupon) => {
    const brand = await db.brand.findFirst({
        where: {
            name
        }
    })

    if(brand) {
        return {
            error: "Brand exists"
        }
    }

    await db.brand.create({
        data: {
            name,
            imageUrl,
        }
    })

    revalidatePath("/dashboard/brand")

    return {
        success: "Brand created"
    }
}