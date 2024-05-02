"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs";

type CreateOrder = {
  shippingInfo: {
    id?: string;
    name: string;
    division: string;
    address: string;
    phone: string;
  };
  products: {
    id: string;
    size?: string;
    color?: string;
    quantity: number;
    price: number;
  }[];
    paymentMethod: string;
    deliveryFee: number;
};

export const createOrder = async ({
  shippingInfo,
  products,
    deliveryFee,
  paymentMethod
}: CreateOrder) => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "User not found",
    };
  }

  let shippingInfoId = shippingInfo.id;
  if (shippingInfoId) {
    // Update existing shippingInfo
    await db.shippingInfo.update({
      where: { id: shippingInfoId },
      data: {
        name: shippingInfo.name,
        division: shippingInfo.division,
        address: shippingInfo.address,
        phone: shippingInfo.phone,
      },
    });
  } else {
    const newShippingInfo = await db.shippingInfo.create({
      data: {
        name: shippingInfo.name,
        division: shippingInfo.division,
        address: shippingInfo.address,
        phone: shippingInfo.phone,
      },
    });
    shippingInfoId = newShippingInfo.id;
  }

  const totalAmount = products.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const orderProductsData = products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    size: product.size,
    color: product.color,
  }));

  await db.order.create({
    data: {
      userId: userId,
      totalAmount: totalAmount + deliveryFee,
      paymentMethod,
      shippingInfoId,
      products: {
        createMany: {
          data: orderProductsData,
        },
      },
    },
  });

  return {
    success: "Order placed",
  };
};