import { Search } from "lucide-react"

import {Input} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export const Header = () => {
    return (
        <div className="w-full flex items-center justify-between gap-x-3">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none"
                />
              </div>

              <Select>
                <SelectTrigger className="max-w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>

        </div>
    )
}