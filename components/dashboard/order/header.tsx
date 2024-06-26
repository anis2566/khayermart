"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import queryString from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {Input} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useDebounce } from "@/store/use-debounce"


export const Header = () => {
    const [search, setSearch] = useState<string>("")

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const debounceValue = useDebounce(search, 1000)

    useEffect(() => {
        const url = queryString.stringifyUrl({
        url: pathname,
        query: {
            search: debounceValue,
        }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }, [debounceValue, router, pathname])

    const handleChaange = (value:string) => {
        const url = queryString.stringifyUrl({
        url: pathname,
        query: {
          search: searchParams.get("search"),
          status: searchParams.get("status"),
          perPage: value,
        }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
  }
  
    const handleStatusChaange = (value:string) => {
        const url = queryString.stringifyUrl({
        url: pathname,
        query: {
            search: searchParams.get("search"),
            status: value,
        }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }
    return (
      <div className="w-full flex items-center justify-between gap-x-3">
            <div className="flex items-center gap-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select defaultValue="5" onValueChange={(value) => handleChaange(value)}>
                <SelectTrigger className="max-w-[80px]">
                    <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                  {
                    ["5", "10", "20", "50"].map((v, i) => (
                      <SelectItem key={i} value={v}>{v}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
 
              <Select defaultValue="ALL" onValueChange={(value) => handleStatusChaange(value)}>
                <SelectTrigger className="max-w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="SHIPPING">Processing</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="RETURNED">Returned</SelectItem>
                </SelectContent>
              </Select>

        </div>
    )
}