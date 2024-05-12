import { db } from "@/lib/db"
import { getUserId } from "@/service/user.service"
import { UserOrders } from "@/components/account/orders"


interface SearchParamsProps {
    searchParams: {
        status: string;
        page: string;
        perPage: string;
    }
}


const Orders = async ({ searchParams }: SearchParamsProps) => {
    const userId = await getUserId()
    
    const { status, perPage, page } = searchParams;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(perPage);
    
    const orders = await db.order.findMany({
        where: {
            userId,
            ...(status !== "ALL" && {status})
        },
        include: {
            products: {
                include: {
                    product: {
                        select: {
                            featureImageUrl: true,
                            name: true
                        }
                    }
                }
            },
            user: true,
            shippingInfo: true,
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (pageNumber - 1) * pageSize || 0,
        take: pageSize || 5
    })

    return (
        <div className="px-4 space-y-6">
            <h1 className="text-2xl font-semibold">Your <span className="text-indigo-500 font-bold">Orders</span></h1>
            <UserOrders orders={orders} />
        </div>
    )
}

export default Orders