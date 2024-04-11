"use client"

import Link from "next/link"
import { Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from "lucide-react"
import {usePathname} from "next/navigation"

import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { ModeToggle } from "../mode-toggle"

import { Logo } from "../logo"
import {Notifications} from "@/components/dashboard/notifications"
import { DASHBOARD_SIDEBAR } from "@/constant"
import {cn} from "@/lib/utils"


export const Navbar = () => {
  const pathname = usePathname()
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 left-0 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Logo callbackUrl="/dashboard" />
                {
                  DASHBOARD_SIDEBAR.map(({label, icon:Icon, href}, i) => {
                    const active = pathname === href;
                    return (
                      <SheetClose asChild key={i}>
                        <Link
                          href={href}
                          className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", active && "bg-muted")}
                        >
                          <Icon className="h-5 w-5" />
                          {label}
                        </Link>
                      </SheetClose>
                    )
                  })
                }
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
            </div>
            <div className="flex items-center gap-x-2">
              <ModeToggle />
              <Notifications />
            </div>
        </header>
    )
}