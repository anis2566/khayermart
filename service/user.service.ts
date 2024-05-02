"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export const getUserId = async () => {
    const {userId} = await auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: {
            clerkId: userId
        }
    })

    if (!user) {
        redirect("/sign-in")
    }

    return user.id
}