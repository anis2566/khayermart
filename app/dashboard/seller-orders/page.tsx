import { OrderList } from "@/components/dashboard/seller-orders/order-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { db } from "@/lib/db"

interface SearchPageProps {
  searchParams: {
      status: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const Orders = async ({searchParams}:SearchPageProps) => {
    const page = parseInt(searchParams.page)
    const perPage = parseInt(searchParams.perPage)
    
    const orders = await db.sellerOrder.findMany({
        where: {
            ...(searchParams.status !== "all" && { status: searchParams.status }),
            customerName: {
                contains: searchParams.search,
                mode: "insensitive"
            }
        },
        include: {
            user: {
                select: {
                    name: true,
                    id: true
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
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
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

export default Orders