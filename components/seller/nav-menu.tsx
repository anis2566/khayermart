import { ClerkLoaded, ClerkLoading, UserButton, auth } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { ModeToggle } from "../mode-toggle"

export const NavMenu = async () => {
    const { userId } = auth()
    if (!userId) redirect("/sign-in")
    
    // const notificatins = await db.notification.findMany({
    //     where: {
    //         userId,
    //         status: "unread"
    //     },
    //     orderBy: {
    //         createdAt: "desc"
    //     }
    // })

    return (
        <div className="flex items-center gap-x-2">
            <ModeToggle />
            {/* <Notifications notifications={notificatins} /> */}
            <ClerkLoading>
                <Loader className="w-5 h-5 animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <UserButton afterSignOutUrl="/sign-in" />
            </ClerkLoaded>
        </div>
    )
}