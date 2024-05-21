"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
// import { createNotification } from "./notification.action";
import { auth } from "@clerk/nextjs";
import { OrderProduct } from "@prisma/client";
import { AddTrackingNumberSchema, AddTrackingNumberSchemaType, CreateOrderSchema, CreateOrderSchemaType } from "@/schema/seller-order";

type Product = {
  price: string;
  quantity: string;
  size?: string;
  color?: string;
  product: string;
}[];

type CreateOrder = {
  customerName: string;
  products: Product;
  address: string;
  mobile: string;
  deliveryFee: number;
};

export const createOrder = async (values: CreateOrderSchemaType) => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "User not found",
    };
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  const admin = await db.user.findFirst({
    where: {
      role: "admin",
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!admin) {
    throw new Error("Admin not found");
  }

  const parseBody = CreateOrderSchema.safeParse(values);

  if (!parseBody.success) {
    throw new Error("Invalid input field");
  }

  const total = values.products.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const order = await db.sellerOrder.create({
    data: {
      customerName: values.customerName,
      address: values.address,
      mobile: values.mobile,
      total: total,
      deliveryFee: values.deliveryFee,
      userId: user.id,
      orderProducts: {
        create: values.products.map((product) => ({
          price: product.price,
          quantity: product.quantity,
          size: product.size,
          color: product.color,
          productId: product.productId,
        })),
      },
    },
  });

  revalidatePath("/order/list");

  for (const product of values.products) {
      if (!product.size) {
        await db.product.update({
          where: { id: product.productId },
          data: { totalStock: { decrement: product.quantity } },
        });
        return {
          success: "Order placed",
        };
      } else {
        const stock = await db.stock.findFirst({
          where: {
            productId: product.productId
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
            productId: product.productId
          }
        })

        const totalStock = stocks.reduce((acc, curr) => acc+curr.total,0)

        await db.product.update({
          where: {
            id: product.productId
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
};

type UpdateOrder = {
  id: string;
  status: string;
  products: OrderProduct[];
};

export const updateOrder = async ({ id, status, products }: UpdateOrder) => {
  const order = await db.sellerOrder.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (status === "delivered") {
    await db.sellerOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    await Promise.all(
      products.map(async (product: OrderProduct) => {
        await db.product.update({
          where: {
            id: product.productId,
          },
          data: {
            totalStock: {
              decrement: product.quantity,
            },
          },
        });
      })
    );

    // await createNotification({
    //   id: order.userId,
    //   message: "Your order delivered",
    // });

    revalidatePath(`/dashboard/seller-orders/${id}`);

    return {
      success: "Status updated",
      status
    };
  }

  if (status === "returned") {
    await db.sellerOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    await Promise.all(
      products.map(async (product: OrderProduct) => {
        await db.product.update({
          where: {
            id: product.productId,
          },
          data: {
            totalStock: {
              increment: product.quantity,
            },
          },
        });
      })
    );

    // await createNotification({
    //   id: order.userId,
    //   message: "Your order returned",
    // });

    revalidatePath(`/dashboard/orders/${id}`);

    return {
      success: "Status updated",
      status
    };
  }

  if (status === "shipping") {
    await db.sellerOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    revalidatePath(`/dashboard/seller-orders/${id}`);

    return {
      success: "Status updated",
      status
    };
  }
};

export const addTrackingNumber = async (values: AddTrackingNumberSchemaType) => {
  const parseBody = AddTrackingNumberSchema.safeParse(values)
  if (!parseBody.success) {
    throw new Error("Invalid input value")
  }

  const order = await db.sellerOrder.findUnique({
    where: {
      id: values.orderId
    }
  })

  if (!order) {
    throw new Error("Order not found")
  }

  await db.sellerOrder.update({
    where: {
      id: order.id
    },
    data: {
      trackingId: values.trackingId
    }
  })

  return {
    success: "Tracking ID added"
  }

}

export const deleteOrder = async (id: string) => {
  const order = await db.sellerOrder.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await db.sellerOrder.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/seller-orders");

  return {
    success: "Order deleted",
  };
};