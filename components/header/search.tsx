"use client"

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
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/actions/category.action"
import { useState } from "react"
import qs from "query-string"
import { useRouter, useSearchParams } from "next/navigation"


export function Search() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: categories} = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const data = await getCategories()
      return data.categories
    },
    staleTime: 60 * 60 * 1000
  })

  const hanldeSearch = () => {
    if (!searchValue) return 
    const url = qs.stringifyUrl({
        url: `/shop`,
        query: {
          search: searchValue,
          sort: searchParams.get("sort"),
          brand: searchParams.get("brand"),
          category: category || searchParams.get("category"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice")
        }
    }, { skipEmptyString: true, skipNull: true });
    router.push(url);
  }

  return (
      <div className="hidden sm:flex flex-1 max-w-[800px] items-center gap-x-1 border border-gray-400 p-1 relative">
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="All Category" />
              </SelectTrigger>
            <SelectContent>
              {categories && categories.map(category => (
                <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-8 bg-gray-300" />
          <div className="w-full">
            <Input className="focus-visible:ring-0 focus-visible:ring-offset-0 border-none w-full" placeholder="Search for anything" onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <Button variant="ghost" size="icon" className="absolute right-0" onClick={hanldeSearch}>
              <SearchIcon className="h-5 w-5" />
          </Button>
    </div>
  )
}
