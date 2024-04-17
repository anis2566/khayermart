import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {db} from "@/lib/db"
import {EditCoupon as EditCouponComp} from "@/components/dashboard/coupon/edit-coupon"
import { redirect } from "next/navigation"

const EditBrand = async ({params}:{params:{id:string}}) => {

    const brand = await db.brand.findFirst({
        where: {
            id:params.id
        }
    })

    if(!brand) redirect("/dashboard/brand")

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/coupon">Coupon</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* <EditCouponComp brand={brand} /> */}
        </div>
    )
}

export default EditBrand