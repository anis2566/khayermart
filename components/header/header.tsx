import { Menu } from "lucide-react"

import { Logo } from "@/components/logo"

import { Search } from "./search"
import { Sidebar } from "./sidebar"
import { Support } from "./support"
import { HeaderOptions } from "./header-options"

export function Header() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto py-2 border-b border-gray-200">
      <div className="w-full flex justify-between items-center gap-x-3 px-4">
        <div className="block sm:hidden">
          <Sidebar>
            <Menu className="cursor-pointer" />
          </Sidebar>
        </div>
        <Logo callbackUrl="/" />
        <Search />
        <div className="md:hidden">
          <HeaderOptions />
        </div>
        <Support />
      </div>
    </div>
  )
}
