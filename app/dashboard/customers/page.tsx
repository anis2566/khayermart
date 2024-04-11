import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {CustomerList} from "@/components/dashboard/customer/customer-list"

const Customers = () => {
    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashobard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Customers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <CustomerList />
            </div>
        </div>
    )
}

export default Customers