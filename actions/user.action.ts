"use server"

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/dashboard/users")

    return {
        success: "Role changed"
    }
}

export const deleteUser = async (userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    await db.user.delete({
        where: {
            id: userId
        }
    });

    await clerkClient.users.deleteUser(user.clerkId);

    revalidatePath("/dashboard/users")

    return {
        success: "User deleted successfully"
    };
}