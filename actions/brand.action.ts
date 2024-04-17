"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type CreateBrand = {
    name: string,
    imageUrl: string,
}

export const createBrand = async ({name, imageUrl}:CreateBrand) => {
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

type UpdateBrand = {
    name: string;
    imageUrl: string;
    id: string;
}


export const updateBrand = async ({ id, name, imageUrl }: UpdateBrand) => {
    const brand = await db.brand.findUnique({
        where: {
            id
        }
    })

    if (!brand) {
        return {
            error: "Brand not found"
        }
    }

    await db.brand.update({
        where: {
            id,
        },
        data: {
            name,
            imageUrl
        }
    })

    revalidatePath(`/dashboard/brand/edit/${id}`);

    return {
        success: "Brand updated",
    };
}

export const deleteBrand = async (id: string) => {
    const brand = await db.brand.findUnique({
        where: {
            id
        }
    })

    if (!brand) {
        return {
            error: "Brand not found"
        }
    }

    await db.brand.delete({
        where: {
            id
        }
    })

    revalidatePath(`/dashboard/brand`);

    return {
      success: "Brand deleted",
    };
}

export const getBrands = async () => {
    const brands = await db.brand.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return {
        brands
    }
}