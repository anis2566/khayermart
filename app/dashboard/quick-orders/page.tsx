import { Header } from "@/components/dashboard/quick-orders/header"
import { Pagination } from "@/components/dashboard/quick-orders/pagination";
import { QuickOrderList } from "@/components/dashboard/quick-orders/quick-order-list"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { db } from "@/lib/db"

interface Props {
    searchParams: {
        search: string;
        perPage: string;
        page: string;
    }
}

const QuickOrders = async ({ searchParams }: Props) => {
    const { search, perPage, page } = searchParams;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(perPage);

    const orders = await db.quickOrder.findMany({
        where: {
            name: {contains: search, mode: "insensitive"}
        },
        include: {
            product: {
                select: {
                    featureImageUrl: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (pageNumber - 1) * pageSize || 0,
        take: pageSize || 5
    })

    return (
        <div className="space-y-5">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Quick Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Header />
            <QuickOrderList orders={orders} />
            <Pagination />
        </div>
    )
}

export default QuickOrders