"use client"
import {  usePathname } from "next/navigation";

import Link from "next/link";
import { CUSTOMER_SIDEBAR } from "@/constant"
import { cn } from "@/lib/utils"

export const Sidebar = () => {
    const pathname = usePathname();
    
    return (
        <div className="space-y-3 w-full">
            {
                CUSTOMER_SIDEBAR.map(({ label, href, icon: Icon }, i) => {
                    const active = href === pathname;
                    return (
                        <Link href={href} className={cn("flex items-center gap-x-3 w-full max-w-[80%] mx-auto border-gray-300 border p-3 rounded-md cursor-pointer font-normal hover:bg-muted/60", active && "border-primary text-primary")} key={i}>
                            <Icon className={cn("w-5 h-5", active && "text-primary")} />
                            {label}
                        </Link>
                    )}
                )
            }
        </div>
    )
}