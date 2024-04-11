import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {Header} from "@/components/dashboard/order/header"
import {OrderList} from "@/components/dashboard/order/order-list"

const Orders = () => {
    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashobard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Orders</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Header />
                <OrderList />
        </div>
    )
}

export default Orders