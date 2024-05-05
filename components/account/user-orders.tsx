import { db } from "@/lib/db"

export const UserOrders = async () => {
    const orders = await db.order.findMany()
    const products = await db.product.findMany()
    const stocks = await db.stock.findMany()
    return (
        <div>User orders</div>
    )
}