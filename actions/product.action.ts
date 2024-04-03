"use server";

import { db } from "@/lib/db";
import { PRODUCT_STATUS, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateProduct = {
  name: string;
  description: string;
  categoryId: string;
  price: string;
  discountPrice?: string;
  totalStock?: string;
  featureImageUrl: string;
  images?: string[];
  colors?: string[];
  // status?: PRODUCT_STATUS;
};

export const createProduct = async (values: CreateProduct) => {
  const product = await db.product.create({
    data: {
      name: values.name,
      description: values.description,
      featureImageUrl: values.featureImageUrl,
      images: values.images,
      totalStock: parseInt(values.totalStock || "0", 10),
      price: parseInt(values.price),
      discountPrice: parseInt(values.discountPrice || "0", 10),
      // status: values.status,
      categoryId: values.categoryId,
      colors: values.colors,
    },
  });

  console.log(product);

  return {
    success: "Product created",
    product,
  };
};

type UpdateProduct = {
  id: string;
  product: Product;
};

export const updateProduct = async ({ id, product }: UpdateProduct) => {
  const existProduct = await db.product.findUnique({
    where: {
      id,
    },
  });

  if (!existProduct) {
    return {
      error: "Product not found",
    };
  }

  await db.product.update({
    where: {
      id,
    },
    data: {
      ...product,
    },
  });

  revalidatePath(`/dashboard/products/${id}`);

  return {
    success: "Product updated",
  };
};
