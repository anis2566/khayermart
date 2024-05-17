"use client"

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

import { CUSTOMER_SIDEBAR_ITEMS } from "@/constant";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Logo } from "../logo";

export const Drawer = () => {
    const pathname = usePathname()
    return (
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
                <Logo callbackUrl="/seller" />
                {
                  CUSTOMER_SIDEBAR_ITEMS.map(({label, icon:Icon, href}, i) => {
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
    )
}