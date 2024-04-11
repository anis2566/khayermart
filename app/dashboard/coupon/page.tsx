import { Pen } from "lucide-react"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

import {db} from "@/lib/db"
import {CouponList} from "@/components/dashboard/coupon/coupon-list"


const Coupon = async () => {

    const coupons = await db.coupon.findMany()

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Coupon</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/dashboard/coupon/create">
                    <Button size="sm" className="flex items-center gap-x-2">
                        <Pen className="w-5 h-5" />
                        Create
                    </Button>
                </Link>
            </div>
            <div>
                <CouponList coupons={coupons} />
            </div>
        </div>
    )
}

export default Coupon