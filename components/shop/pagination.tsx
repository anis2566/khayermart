"use client"

import qs from "query-string"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    totalPages: number
}

export const PaginationComp = ({ totalPages }:Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || '1', 10);
    setCurrentPage(page);
  }, [searchParams.get("page")])

  const handleClick = (page: number) => {
    const url = qs.stringifyUrl({
            url: pathname,
            query: {
                sort: searchParams.get("sort"),
                brand: searchParams.get("brand"),
                category: searchParams.get("category"),
                search: searchParams.get("search"),
                minPrice: searchParams.get("minPrice"),
                maxPrice: searchParams.get("maxPrice"),
                page,
            }
    }, { skipEmptyString: true, skipNull: true });
    router.push(url);
    setCurrentPage(page)
  }

    return (
        <Pagination className="ml-auto">
            <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => handleClick((parseInt(searchParams.get("page") || '0') - 1) || 1)}
              className="flex items-center gap-x-1"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="ghost"
                  disabled={currentPage >= totalPages}
                  onClick={() => handleClick((parseInt(searchParams.get("page") || '1') + 1) || 1)}
                  className="flex items-center gap-x-1"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}