"use client"

import { cn } from "@/lib/utils"
import { Flame } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navbarData = [
    {
        label: "Deal",
        path: "/deal",
        Icon: Flame
    },
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Shop",
        path: "/shop"
    },
    {
        label: "About",
        path: "/about"
    },
    {
        label: "Contact",
        path: "/contact"
    },
]
export function NavbarNav() {
    const pathname = usePathname()
  return (
      <div className="flex items-center gap-x-7">
          {
              navbarData.map(nav => {
                  const active = nav.path === pathname
                  return (
                    <Link href={nav.path} className={cn("flex items-center gap-x-1 text-slate-800 hover:text-primary/80 font-semibold transition-all duration-100", active && "text-primary")} key={nav.path}>
                        {nav?.Icon && <nav.Icon className="text-amber-500" />}
                        {nav.label}
                    </Link>
                  )}
              )
          }
    </div>
  )
}
