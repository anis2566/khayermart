"use server"

import { db } from "@/lib/db"
import { BannerSchema, BannerSchemaType } from "@/schema/banner"
import { revalidatePath } from "next/cache"

export const createBanner = async (values: BannerSchemaType) => {
    const parseBody = BannerSchema.safeParse(values)
    if (!parseBody.success) {
        throw new Error("Invalid input value")
    }

    await db.banner.create({
        data: {
            imageUrl: values.imageUrl,
            productId: values.productId
        }
    })

    revalidatePath("/dashboard/banner")

    return {
        success: "Banner created"
    }
}

export const deleteBanner = async (bannerId: string) => {
    const banner = await db.banner.findUnique({
      where: {
        id: bannerId,
      },
    });

    if (!banner) {
        throw new Error("Banner not found")
    }

    await db.banner.delete({
        where: {
            id: bannerId
        }
    })

    revalidatePath("/dashboard/banner")

    return {
        success: "Banner deleted"
    }
}