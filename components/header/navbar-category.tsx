import { LayoutDashboard } from "lucide-react"
import Image from "next/image"

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { db } from "@/lib/db"

export async function NavbarCategory() {
    const categories = await db.category.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

  return (
    <Menubar className="border-none p-0">
        <MenubarMenu>
            <MenubarTrigger className="p-0 bg-muted text-primary data-[state=open]:bg-slate-300 data-[state=open]:text-primary">
                <div className="flex items-center gap-x-2 cursor-pointer p-2 rounded-sm">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-lg">Browse All Category</span>
                </div>
            </MenubarTrigger>
              <MenubarContent align="end" className="w-[500px] p-4 border-slate-400-200 grid grid-cols-2 gap-x-5 gap-y-5">
                  {
                      categories.map(category => (
                        <div className="flex-1 border border-slate-300 hover:border-green-300 text-slate-800 hover:text-green-700 p-1 rounded-sm flex items-center gap-x-3 cursor-pointer transition-all" key={category.id}>
                            <Image
                                src={category.imageUrl}
                                alt={category.name}
                                height={40}
                                width={40}
                            />
                            <span>{category.name}</span>
                        </div>
                      ))
                  }
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
  )
}
