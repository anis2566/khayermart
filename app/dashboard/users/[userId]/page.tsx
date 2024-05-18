import { UserOrderList } from "@/components/dashboard/user/user-order-list";
import { PaginationComp } from "@/components/shop/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
    params: {
        userId: string;
    },
    searchParams: {
      status: string;
      page: string;
      perPage: string;
      date: Date;
  }
}

const UserDetails = async ({ params: { userId }, searchParams }: Props) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) redirect("/")
    const date = searchParams.date && new Date(searchParams.date)
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1; 


    const orders = await db.sellerOrder.findMany({
        where: {
            ...(searchParams.status !== "all" && { status: searchParams.status }),
            ...(date && {
                createdAt: {
                    gte: new Date(date.setHours(0, 0, 0, 0)), 
                    lt: new Date(date.setHours(23, 59, 59, 999)) 
                }
            })
        },
        include: {
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
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: {
            createdAt: "desc"
        }
    })

    const totalOrder = await db.sellerOrder.count({
        where: {
            ...(searchParams.status !== "all" && { status: searchParams.status }),
            ...(date && {
                createdAt: {
                    gte: new Date(date.setHours(0, 0, 0, 0)), 
                    lt: new Date(date.setHours(23, 59, 59, 999)) 
                }
            })
        },
    })

    const totalPages = Math.ceil(totalOrder / itemsPerPage);
    
    return (
        <div className="space-y-6">
            <Card className="">
                <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
                    <Image
                        alt="Avatar"
                        className="rounded-full"
                        height="100"
                        src={user?.imageUrl || ""}
                        style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                        }}
                        width="100"
                    />
                    <div className="grid gap-1 text-sm md:gap-2">
                        <div className="font-semibold text-xl"><span className="text-primary">{user.name}</span></div>
                        <div>{user.email}</div>
                        <div>{user.phone}</div>
                    </div>

                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <UserOrderList orders={orders} />
                    <PaginationComp totalPages={totalPages} />
                </CardContent>
            </Card>
        </div>
    )
}

export default UserDetails