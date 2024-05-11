"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import queryString from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"

export const Pagination = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleIncreasePage = () => {
        const page = searchParams.get("page")
        if (!page) {
            const url = queryString.stringifyUrl({
                url: pathname,
                query: {
                    search: searchParams.get("search"),
                    perPage: searchParams.get("perPage") || "5",
                    page: "2"
                }
            }, { skipEmptyString: true, skipNull: true })
            router.push(url)
        } else {
            const page = parseInt(searchParams.get("page") || "1")
            const url = queryString.stringifyUrl({
                url: pathname,
                query: {
                    search: searchParams.get("search"),
                    perPage: searchParams.get("perPage") || "5",
                    page: page + 1
                }
            }, { skipEmptyString: true, skipNull: true })
            router.push(url)
        }
    }

    const handleDecreasePage = () => {
        const page = parseInt(searchParams.get("page") || "1")
        if (page > 1) {
            const url = queryString.stringifyUrl({
                url: pathname,
                query: {
                    search: searchParams.get("search"),
                    perPage: searchParams.get("perPage") || "5",
                    page: page - 1
                }
            }, { skipEmptyString: true, skipNull: true })
            router.push(url)
        }
    }

    return (
        <div className="w-full flex justify-center">
            <div className="flex items-center gap-x-3">
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={!searchParams.get("page") || searchParams.get("page") === "1"}
                    onClick={handleDecreasePage}
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleIncreasePage}>
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}