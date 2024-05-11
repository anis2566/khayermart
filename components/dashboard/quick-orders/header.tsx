"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useDebounce } from "@/store/use-debounce"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


export const Header = () => {
    const [search, setSearch] = useState<string>("")

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const debounceValue = useDebounce(search)

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
            perPage: value,
        }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }

    return (
        <div className="w-full flex justify-between items-center gap-x-3">
            <div className="w-full max-w-[300px] relative">
                <Input placeholder="Search...." className="w-full" onChange={(e) => setSearch(e.target.value)} value={search}  />
                <Button variant="ghost" size="icon" onClick={() => setSearch("")} className={cn("hidden absolute right-0 top-0", search && "flex")}>
                    <X className="w-5 h-5" />
                </Button>
            </div>
            <Select onValueChange={value => handleChaange(value)}>
                <SelectTrigger className="w-[120px] flex-shrink-0">
                    <SelectValue placeholder="Per Page" />
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
    )
}