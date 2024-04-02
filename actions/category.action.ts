"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

type CreateCategory = {
    name: string;
    description?: string;
    imageUrl: string;
    tags?: string[];
}

export const createCategory = async (values:CreateCategory) => {
    const isExist = await db.category.findFirst({
        where: {
            name: values.name
        }
    })

    if (isExist) {
        return {
            error: "Category already exists"
        }
    }

    await db.category.create({
        data: {
            ...values
        }
    })

    revalidatePath("/dashboard/category")

    return {
        success: 'Category created'
    }
}