import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { db } from "@/lib/db"


export async function Search() {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })


  return (
      <div className="hidden sm:flex flex-1 max-w-[800px] items-center gap-x-1 border border-gray-400 p-1 relative">
          <Select>
            <SelectTrigger className="w-[180px] border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="All Category" />
              </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-8 bg-gray-300" />
          <div className="w-full">
            <Input className="focus-visible:ring-0 focus-visible:ring-offset-0 border-none w-full" placeholder="Search for anything" />
          </div>
          <Button variant="ghost" size="icon" className="absolute right-0">
              <SearchIcon className="h-5 w-5" />
          </Button>
    </div>
  )
}
