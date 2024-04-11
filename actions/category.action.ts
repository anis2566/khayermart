"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type CreateCategory = {
  name: string;
  description?: string;
  imageUrl: string;
  tags?: string[];
};

export const createCategory = async (values: CreateCategory) => {
  const isExist = await db.category.findFirst({
    where: {
      name: values.name,
    },
  });

  if (isExist) {
    return {
      error: "Category already exists",
    };
  }

  await db.category.create({
    data: {
      ...values,
    },
  });

  revalidatePath("/dashboard/category");

  return {
    success: "Category created",
  };
};

export const getCategories = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    categories,
  };
};

type UpdateCategory = {
  category: {
    name: string;
    description?: string;
    imageUrl: string;
    tags?: string[];
  },
  id: string
};


export const updateCategory = async ({category, id}:UpdateCategory) => {
  const existCategory = await db.category.findFirst({
    where: {
      id: id,
    },
  });

  if (!existCategory) {
    return {
      error: "Category not found",
    };
  }

  await db.category.update({
    where: {
      id,
    },
    data: {
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      tags: category.tags,
    },
  });

  revalidatePath(`/dashboard/category/edit/${id}`);

  return {
    success: "Category updated",
  };
};


export const deleteCategory = async (id:string) => {
  const existCategory = await db.category.findFirst({
    where: {
      id: id,
    },
  });

  if (!existCategory) {
    return {
      error: "Category not found",
    };
  }

  await db.category.delete({
    where: {
      id
    }
  })

  revalidatePath(`/dashboard/category`);

  return {
    success: "Category deleted"
  }
}