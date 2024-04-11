"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type CreateCoupon = {
    name: string,
    code: string,
    imageUrl: string,
    value: string,
    startDate: Date,
    expiryDate: Date,
    status: string
}

export const createCoupon = async ({name, code, imageUrl, value, startDate, expiryDate, status}:CreateCoupon) => {
    await db.coupon.create({
        data: {
            name,
            code,
            imageUrl,
            value: parseInt(value),
            startDate,
            expiryDate,
            status
        }
    })

    revalidatePath("/dashboard/coupon")

    return {
        success: "Coupon created"
    }
}


type UpdateCoupon = {
    name: string,
    code: string,
    imageUrl: string,
    value: string,
    startDate: Date,
    expiryDate: Date,
    status: string,
    couponId: string
}

export const updateCoupon = async ({name, code, imageUrl, value, startDate, expiryDate, status, couponId}:UpdateCoupon) => {
    const coupon = await db.coupon.findUnique({
        where: {
            id: couponId
        }
    })

    if(!coupon) {
        return {
            error: "Coupon not found"
        }
    }

    await db.coupon.update({
        where: {
            id: couponId
        },
        data: {
            name,
            code,
            imageUrl,
            value: parseInt(value),
            startDate,
            expiryDate,
            status
        }
    })

    revalidatePath(`/dashboard/coupon/edit/${couponId}`)

    return {
        success: "Coupon updated"
    }
}


export const deleteCoupon = async (id: string) => {
    const coupon = await db.coupon.findUnique({
      where: {
        id
      },
    });

    if (!coupon) {
      return {
        error: "Coupon not found",
      };
    }

    await db.coupon.delete({
        where: {
            id
        }
    })

    revalidatePath(`/dashboard/coupon`)

    return {
        success: "Coupon deleted"
    }
}