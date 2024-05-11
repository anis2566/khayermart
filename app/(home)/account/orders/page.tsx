import { UserOrderTable } from "@/components/account/orders/data-table"
import { columns } from "@/components/account/orders/columns"
import { db } from "@/lib/db"
import { getUserId } from "@/service/user.service"
import { UserOrders } from "@/components/account/orders"




const Orders = async () => {
    const userId = await getUserId()
    
    const orders = await db.order.findMany({
        where: {
            userId
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
        take: 5
    })

    return (
        <div className="px-4 space-y-6">
            <h1 className="text-2xl font-semibold">Your <span className="text-indigo-500 font-bold">Orders</span></h1>
            <UserOrders orders={orders} />
        </div>
    )
}

export default Orders