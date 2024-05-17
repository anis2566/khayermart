"use server"

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";

type ChangeRole = {
    userId: string;
    role: string;
}

export const chnageRole = async (values:ChangeRole) => {
    const user = await db.user.findUnique({
        where: {
            id: values.userId
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    await db.user.update({
        where: {
            id: values.userId
        },
        data: {
            role:values.role
        }
    })

    await clerkClient.users.updateUserMetadata(user.clerkId, {
      publicMetadata: {
        role: values.role,
      },
    });

    return {
        success: "Role changed"
    }
}