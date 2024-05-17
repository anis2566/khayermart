import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {OrderList} from "@/components/seller/order-list"

import { db } from "@/lib/db"
import { getUserId } from "@/service/user.service";

interface SearchPageProps {
  searchParams: {
      status: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const OrderListComp = async ({ searchParams }: SearchPageProps) => {
    const page = parseInt(searchParams.page)
    const perPage = parseInt(searchParams.perPage)

    const userId = await getUserId()

    const orders = await db.sellerOrder.findMany({
        where: {
            ...(searchParams.status !== "all" && { status: searchParams.status }),
            customerName: {
                contains: searchParams.search,
                mode: "insensitive"
            },
            userId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            },
            orderProducts: {
                include: {
                    product: {
                        select: {
                            featureImageUrl: true,
                            name: true
                        }
                    }
                }
            }
        },
        take: perPage || 5,
        skip: (page - 1) * perPage || 0,
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <OrderList orders={orders} />
        </div>
    )
}

export default OrderListComp