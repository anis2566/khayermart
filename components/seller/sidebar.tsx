"use client"

import { CUSTOMER_SIDEBAR_ITEMS } from "@/constant"
import { Logo } from "../logo"
import { SidebarItem } from "./sidebar-item"

export const Sidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block fixed left-0 top-0 min-h-screen w-[220px]">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo callbackUrl="/" />
                </div>
                <div className="flex-1 mt-3">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                        {
                            CUSTOMER_SIDEBAR_ITEMS.map((item) => (
                                <SidebarItem key={item.href} {...item} />
                            ))
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}