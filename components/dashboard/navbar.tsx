"use client"

import Link from "next/link"
import { Home, LineChart, Loader, Menu, Package, Package2, Search, ShoppingCart, Users } from "lucide-react"
import {usePathname} from "next/navigation"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"

import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { ModeToggle } from "../mode-toggle"

import { Logo } from "../logo"
import {Notifications} from "@/components/dashboard/notifications"
import { CLIENT_SIDEBAR, DASHBOARD_SIDEBAR } from "@/constant"
import {cn} from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { SidebarItem } from "./sidebar-item"
import { Separator } from "../ui/separator"


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
            <SheetContent side="left" className="flex flex-col w-[250px]">
              <div className="border-r bg-muted/40 md:block fixed left-0 top-0 min-h-screen w-[250px]">
                  <div className="flex h-full max-h-screen flex-col gap-2">
                      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                          <Logo callbackUrl="/dashboard" />
                      </div>
                      <div className="flex h-full overflow-auto max-h-screen flex-col gap-2">
                          <div>
                              <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Advertisement</p>
                              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                                  <SheetClose asChild>
                                    <Link
                                      href="/dashboard/quick-orders"
                                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/dashboard/quick-orders" && "bg-muted text-primary hover:text-primary")}
                                    >
                                      <ShoppingCart className="h-4 w-4" />
                                      Orders
                                    </Link>
                                  </SheetClose> 
                              </nav>
                          </div>
                          <Separator />
                          <div className="flex-1 mt-3">
                              <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Main</p>
                              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                                  {
                                    DASHBOARD_SIDEBAR.map((item) => {
                                      const active = item.href === pathname
                                      return (
                                        <SheetClose key={item.href} asChild>
                                          <Link
                                            href={item.href}
                                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", active && "bg-muted text-primary hover:text-primary")}
                                          >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                          </Link>
                                        </SheetClose>
                                        )
                                    })
                                  }
                              </nav>
                          </div>
                          <Separator />
                          <div>
                              <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Seller</p>
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                                  <SheetClose asChild>
                                    <Link
                                      href="/dashboard/seller-orders"
                                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/dashboard/seller-orders" && "bg-muted text-primary hover:text-primary")}
                                    >
                                      <ShoppingCart className="h-4 w-4" />
                                      Orders
                                    </Link>
                                  </SheetClose>  
                              </nav>
                          </div>
                          <Separator />
                          <div className="flex-1 mt-3">
                              <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Client</p>
                              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
                                  {
                                    CLIENT_SIDEBAR.map((item) => {
                                      const active = item.href === pathname
                                      return (
                                        <SheetClose key={item.href} asChild>
                                          <Link
                                            href={item.href}
                                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", active && "bg-muted text-primary hover:text-primary")}
                                          >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                          </Link>
                                        </SheetClose>
                                        )
                                    })
                                  }
                              </nav>
                          </div>
                          <Separator />
                      </div>
                  </div>
              </div>
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
              <ClerkLoading>
                <Loader className="w-5 h-5 animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <UserButton afterSignOutUrl="/" />
              </ClerkLoaded>
            </div>
        </header>
    )
}