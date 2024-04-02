"use server";

import { revalidatePath } from "next/cache";
import { db } from "./../lib/db";

type CreateTodo = {
  title: string;
};

export const createTodo = async ({ title }: CreateTodo) => {
  await db.todo.create({
    data: {
      title,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: "Todo assigned",
  };
};

export const toggleComplete = async (id: string) => {
  const todo = await db.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return {
      error: "Todo not found",
    };
  }

  await db.todo.update({
    where: {
      id,
    },
    data: {
      isCompleted: !todo.isCompleted,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: "Todo updated",
  };
};

export const removeTodo = async (id: string) => {
  const todo = await db.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return {
      error: "Todo not found",
    };
  }

  await db.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: "Todo deleted",
  };
};
