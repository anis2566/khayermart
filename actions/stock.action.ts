"use server"

import { revalidatePath } from "next/cache";


import { db } from "@/lib/db"

type CreateStock = {
  productId: string,
  values: {
    stock: string;
    size?: string;
    id: number;
    custom: boolean;
  }[]
};

export const createStock = async ({values, productId}: CreateStock) => {

  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  })

  if(!product) {
    return {
      error: "Product not found"
    }
  }

  const totalStock = values.reduce((acc, curr) => acc + parseInt(curr.stock), 0);

  await db.product.update({
    where: {
      id: productId
    },
    data: {
      totalStock
    }
  })
    
    await Promise.all(
      values.map(async (value) => {
        await db.stock.create({
          data: {
            productId,
            total: parseInt(value.stock),
            size: value.size,
          },
        });
      })
    );

  revalidatePath(`/dashboard/products`);


    return {
        success: "Stock created"
    }
}


export const updateStock = async ({values, productId}: CreateStock) => {
  const product = await db.product.findUnique({
      where: {
        id: productId
      }
    })

    if(!product) {
      return {
        error: "Product not found"
      }
    }

    await db.stock.deleteMany({
      where: {
        productId
      },
    });

    await Promise.all(
      values.map(async (value) => {
        await db.stock.create({
          data: {
            productId,
            total: parseInt(value.stock),
            size: value.size,
          },
        });
      })
    );

  const totalStock = values.reduce((acc, curr) => acc + parseInt(curr.stock), 0);

  await db.product.update({
    where: {
      id: productId
    },
    data: {
      totalStock
    }
  })

  revalidatePath(`/dashboard/products/${productId}`);

  return {
        success: "Stock updated"
    }

}