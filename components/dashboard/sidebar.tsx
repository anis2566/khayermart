"use client"

import { ShoppingCart } from "lucide-react"
import { Logo } from "../logo"
import { SidebarItem } from "./sidebar-item"
import { CLIENT_SIDEBAR, DASHBOARD_SIDEBAR } from "@/constant"
import { Separator } from "../ui/separator"

export const Sidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block fixed left-0 top-0 min-h-screen w-[220px]">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo callbackUrl="/dashboard" />
                </div>
                <div className="flex h-full overflow-auto max-h-screen flex-col gap-2">
                    <div>
                        <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Advertisement</p>
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                            <SidebarItem label="Orders" href="/dashboard/quick-orders" icon={ShoppingCart} />
                        </nav>
                    </div>
                    <Separator />
                    <div className="flex-1 mt-3">
                        <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Main</p>
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                            {
                                DASHBOARD_SIDEBAR.map((item) => (
                                    <SidebarItem key={item.href} {...item} />
                                ))
                            }
                        </nav>
                    </div>
                    <Separator />
                    <div>
                        <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Seller</p>
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                            <SidebarItem label="Orders" href="/dashboard/seller-orders" icon={ShoppingCart} />
                        </nav>
                    </div>
                    <Separator />
                    <div className="flex-1 mt-3">
                        <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Client</p>
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                            {
                                CLIENT_SIDEBAR.map((item) => (
                                    <SidebarItem key={item.href} {...item} />
                                ))
                            }
                        </nav>
                    </div>
                    <Separator />
                </div>
            </div>
        </div>
    )
}