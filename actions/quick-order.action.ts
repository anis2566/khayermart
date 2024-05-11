"use server"

import { db } from "@/lib/db";
import { QuickOrderSchemaType, UpdateQuickOrderSchema, UpdateQuickOrderSchemaType } from "@/schema/quick-order";

interface Props {
    productId: string;
    values: QuickOrderSchemaType
}

export const createQuickOrder = async ({ productId, values }: Props) => {
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        throw new Error("product not found")
    }

    const newOrder = await db.quickOrder.create({
        data: {
            name: values.name,
            address: values.address,
            phone: values.phone,
            quantity: values.quantity,
            deliveryFee: values.deliveryFee,
            total: product.discountPrice ? product.discountPrice * values.quantity : product.price * values.quantity,
            productId,
            size: values.size,
            color: values.color
        }
    })

    if (values.size) {
            const stockItem = await db.stock.findFirst({
                where: {
                    productId: productId,
                    size: values.size
                }
            });
    
            if (!stockItem) {
                throw new Error("Stock item not found");
            }
    
            // Then, update the stock item using its id
            const stock = await db.stock.update({
                where: {
                    id: stockItem.id
                },
                data: {
                    total: {
                        decrement: values.quantity
                    }
                }
            });

            const productStocks = await db.stock.findMany({
                where: {
                    productId,
                }
            })

            const totalStock = productStocks.reduce((acc, curr) => {
                return acc + curr.total
            }, 0)
            
            await db.product.update({
                where: {
                    id: productId
                },
                data: {
                    totalStock
                }
            })
        } else {
            await db.product.update({
                where: {
                    id: productId
                },
                data: {
                    totalStock: {
                        decrement: values.quantity
                    }
                }
            })
        }

    return {
        success: "Order placed",
        newOrder
    }

}

export const getOrderById = async (id: string) => {
    const order = await db.quickOrder.findUnique({
        where: {
            id
        },
        include: {
            product: {
                select: {
                    featureImageUrl: true
                }
            }
        }
    })

    if (!order) {
        throw new Error("Order not found")
    }

    return {
        order
    }
}

export const updateOrder = async (values: UpdateQuickOrderSchemaType) => {
    const parseBody = UpdateQuickOrderSchema.safeParse(values)

    if (!parseBody.success) {
        throw new Error("invalid vield value")
    }

    const { orderId, productId, quantity, status, size } = parseBody.data
    
    const order = await db.quickOrder.findUnique({
        where: {
            id: orderId
        }
    })

    if (!order) {
        throw new Error("Order not found")
    }

    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        throw new Error("Product not found")
    }

    if (status === "DELIVERED") {
        await db.quickOrder.update({
                where: {
                    id: orderId
                },
                data: {
                    status,
                }
            })

        return {
            success: "Order updated"
        }
    }

    else if (status === "RETURNED" || status === "CANCELLED") {
        if (size) {
            const stockItem = await db.stock.findFirst({
                where: {
                    productId: productId,
                    size: size
                }
            });
    
            if (!stockItem) {
                throw new Error("Stock item not found");
            }
    
            // Then, update the stock item using its id
            await db.stock.update({
                where: {
                    id: stockItem.id
                },
                data: {
                    total: {
                        increment: quantity
                    }
                }
            });

            const productStocks = await db.stock.findMany({
                where: {
                    productId,
                }
            })

            const totalStock = productStocks.reduce((acc, curr) => {
                return acc + curr.total
            }, 0)
            
            await db.product.update({
                where: {
                    id: productId
                },
                data: {
                    totalStock
                }
            })

            await db.quickOrder.update({
                where: {
                    id: orderId
                },
                data: {
                    status,
                }
            })

            return {
                success: "Order updated"
            }
        } else {
            await db.product.update({
                where: {
                    id: productId
                },
                data: {
                    totalStock: {
                        increment: quantity
                    }
                }
            })

            await db.quickOrder.update({
                where: {
                    id: orderId
                },
                data: {
                    status,
                }
            })

            return {
                success: "Order updated"
            }
        }
    }

    else {
        await db.quickOrder.update({
                where: {
                    id: orderId
                },
                data: {
                    status,
                }
            })

        return {
            success: "Order updated"
        }
    }

}