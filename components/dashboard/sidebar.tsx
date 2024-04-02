"use client"

import { Bell } from "lucide-react"

import { Button } from "../ui/button"

import { Logo } from "../logo"
import { SidebarItem } from "./sidebar-item"
import { DASHBOARD_SIDEBAR } from "@/constant"

export const Sidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo callbackUrl="/dashboard" />
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1 mt-3">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                        {
                            DASHBOARD_SIDEBAR.map((item) => (
                                <SidebarItem key={item.href} {...item} />
                            ))
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}