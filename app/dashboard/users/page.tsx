import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {UserList} from "@/components/dashboard/user/user-list"
import { db } from "@/lib/db"

interface Props {
    searchParams: {
        search: string;
        perPage: string;
        page: string;
        role: string;
    }
}

const Customers = async ({ searchParams }: Props) => {
    const { search, perPage, page, role } = searchParams;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(perPage);

const users = await db.user.findMany({
    where: {
        ...(role && {role}),
        ...(search && {
            name: {
                contains: search, mode: "insensitive"
            }
        }),
        NOT: {
            role: "admin"
        }
    },
    skip: (pageNumber - 1) * pageSize || 0,
    take: pageSize || 5
})

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashobard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <UserList users={users} />
            </div>
        </div>
    )
}

export default Customers