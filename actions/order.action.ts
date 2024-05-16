"use server"

import { db } from "@/lib/db"
import { OrderSchema, OrderSchemaType } from "@/schema/order";
import { getUserId } from "@/service/user.service";

export const createOrder = async (values: OrderSchemaType) => {
  
  const userId = await getUserId()

  const parseBody = OrderSchema.safeParse(values)
  
  if (!parseBody.success) {
   throw new Error("Invalid input field")
 }

  const { shippingInfo, products, paymentMethod, deliveryFee, shippingInfoId } = parseBody.data
  
  if (shippingInfoId) {
    const orderProductsData = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
    }));

    const totalAmount = products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    await db.order.create({
      data: {
        userId,
        products: {
          createMany: {
            data: orderProductsData,
          },
        },
        totalAmount,
        deliveryFee,
        paymentMethod,
        shippingInfoId,
      },
    });

    return {
      success: "Order placed",
    };
  } else {
    const orderProductsData = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
    }));

    const totalAmount = products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    if (!shippingInfo) {
      throw new Error("Shipping info is required")
    }

    const newShippingInfo = await db.shippingInfo.create({
      data: {
        name: shippingInfo.name,
        division: shippingInfo.division,
        address: shippingInfo.address,
        phone: shippingInfo.phone,
      },
    });

    await db.order.create({
      data: {
        userId,
        products: {
          createMany: {
            data: orderProductsData,
          },
        },
        totalAmount,
        paymentMethod,
        deliveryFee,
        shippingInfoId: newShippingInfo.id,
      },
    });

    for (const product of products) {
      if (!product.size) {
        await db.product.update({
          where: { id: product.id },
          data: { totalStock: { decrement: product.quantity } },
        });
        return {
          success: "Order placed",
        };
      } else {
        const stock = await db.stock.findFirst({
          where: {
            productId: product.id
          }
        })

        if (!stock) {
          throw new Error("Stock not found")
        }

        await db.stock.update({
          where: {
            id: stock.id,
            size: product.size
          },
          data: {
            total: {decrement: product.quantity}
          }
        })

        const stocks = await db.stock.findMany({
          where: {
            productId: product.id
          }
        })

        const totalStock = stocks.reduce((acc, curr) => acc+curr.total,0)

        await db.product.update({
          where: {
            id: product.id
          },
          data: {
            totalStock
          }
        })

        return {
          success: "Order placed",
        };
      }
    }
  }
};