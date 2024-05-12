"use server";

import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateProduct = {
  name: string;
  description: string;
  brand?: string;
  categoryId: string;
  price: string;
  discountPrice?: string;
  sellerPrice?: string;
  totalStock?: string;
  featureImageUrl: string;
  images?: string[];
  colors?: string[];
  status: string;
};

export const createProduct = async (values: CreateProduct) => {
  const product = await db.product.create({
    data: {
      name: values.name,
      description: values.description,
      brandId: values.brand || "",
      featureImageUrl: values.featureImageUrl,
      images: values.images,
      totalStock: parseInt(values.totalStock || "0", 10),
      price: parseInt(values.price),
      discountPrice: parseInt(values.discountPrice || "0", 10),
      sellerPrice: parseInt(values.sellerPrice || "0", 10),
      status: values.status,
      categoryId: values.categoryId,
      colors: values.colors,
    },
  });

  revalidatePath(`/dashboard/products`);

  return {
    success: "Product created",
    product,
  };
};

type UpdateProduct = {
  id: string;
  product: CreateProduct;
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
      name: product.name,
      description: product.description,
      brandId: product.brand,
      featureImageUrl: product.featureImageUrl,
      images: product.images,
      totalStock: parseInt(product.totalStock || "0", 10),
      price: parseInt(product.price),
      discountPrice: parseInt(product.discountPrice || "0", 10),
      sellerPrice: parseInt(product.sellerPrice || "0", 10),
      status: product.status,
      categoryId: product.categoryId,
      colors: product.colors,
    },
  });

  revalidatePath(`/dashboard/products/${id}`);

  return {
    success: "Product updated",
  };
};


export const deleteProduct = async (id: string) => {
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

  await db.product.delete({
    where: {
      id
    }
  })

  revalidatePath(`/dashboard/products`);

  return {
    success: "Product deleted"
  }
}


export const getProductIdsAndName = async (name?: string) => {

  const products = await db.product.findMany({
    where: {
      ...(name && {name: {contains: name, mode: "insensitive"}})
    },
    select: {
      id: true,
      name: true
    }
  })

  return {
    products
  }
}