"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@/store/use-debounce"

export const Header = () => {
    const [search, setSearch] = useState<string>("")

    const router = useRouter()
    const pathname = usePathname()
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

    const handleChange = (value: string) => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                sort: value,
                search: searchParams.get("search")
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }
    return (
        <div className="flex items-center justify-between gap-4">
          {/* <div className="md:hidden">
            <FilterDrawer />
          </div> */}
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none"
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>
            <Select onValueChange={(value) => handleChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="asc">Newest</SelectItem>
                    <SelectItem value="desc">Oldest</SelectItem>
                    <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                    <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}