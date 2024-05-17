"use server";

import { db } from "@/lib/db";
import { DealOfTheDaySchema, DealOfTheDaySchemaType } from "@/schema/deal-of-day-day";
import { FeatureFormSchema, FeatureFormSchemaType } from "@/schema/feature-products";
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

export const getProducts = async () => {
  const products = await db.product.findMany();

  return { products };
};


export const getProductIdsAndName = async (name?: string) => {

  const products = await db.product.findMany({
    where: {
      ...(name && {name: {contains: name, mode: "insensitive"}})
    },
    select: {
      id: true,
      name: true,
      featureImageUrl: true
    },
    take: 3
  })

  return {
    products
  }
}

export const addFeatureProduct = async (values: FeatureFormSchemaType) => {
  const parseBody = FeatureFormSchema.safeParse(values)

  if (!parseBody.success) {
    throw new Error("Invalid input value")
  }


  const product = await db.product.findUnique({
    where: {
      id: values.productId
    }
  })

  if (!product) {
    throw new Error("Product not found")
  }

  await db.product.update({
    where: {
      id: values.productId,
    },
    data: {
      genre: [...(product.genre || []), "featured"],
      featureTitle: values.featureTitle
    },
  });

  revalidatePath("/dashboard/feature-products")

  return {
    success: "Product added to feature"
  }
}

export const removeFeatureProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: (product.genre || []).filter((g) => g !== "featured"),
    },
  });

  revalidatePath("/dashboard/feature-products");

  return {
    success: "Product removed from feature",
  };
};


export const getFeatureProducts = async () => {
  const products = await db.product.findMany({
    where: {
      genre: {
        has: "featured"
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 3
  })

  return {products}
}

export const addPopularProduct = async (productId: string) => {
  const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId
    },
    data: {
      genre: [...(product.genre || []), "popular"],
    }
  })

  revalidatePath("/dashboard/popular-products");

  return {
    success: "Product added to popular",
  };
}

export const removePopularProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: (product.genre || []).filter((g) => g !== "popular"),
    },
  });

  revalidatePath("/dashboard/popular-products");

  return {
    success: "Product removed from popular",
  };
};

export const getPopularProducts = async () => {
  const products = await db.product.findMany({
    where: {
      genre: {
        has: "popular"
      }
    },
    include: {
      brand: true,
      category: true,
      stocks: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 3
  });

  return { products };
};

export const addBestDealProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: [...(product.genre || []), "best-deal"],
    },
  });

  revalidatePath("/dashboard/best-deal");

  return {
    success: "Product added to best-deal",
  };
};

export const removeBestDealProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: (product.genre || []).filter((g) => g !== "best-deal"),
    },
  });

  revalidatePath("/dashboard/best-deal");

  return {
    success: "Product removed from best-deal",
  };
};

export const getBestDealProducts = async () => {
  const products = await db.product.findMany({
    where: {
      genre: {
        has: "best-deal"
      }
    },
    include: {
      brand: true,
      category: true,
      stocks: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  });

  return { products };
};

export const addDealOfTheDayProduct = async (values: DealOfTheDaySchemaType) => {
  const parseBody = DealOfTheDaySchema.safeParse(values) 
  
  if (!parseBody.success) {
    throw new Error("Invalid input value")
  } 

  const product = await db.product.findUnique({
    where: {
      id: values.productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: values.productId,
    },
    data: {
      startDeal: values.startDeal,
      endDeal: values.endDeal,
      genre: [...(product.genre || []), "deal-of-day"],
    },
  });

  revalidatePath("/dashboard/deal-of-day");

  return {
    success: "Product added to deal-of-the-day",
  };
};

export const removeDealOfTheDayProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      startDeal: null,
      endDeal: null,
      genre: (product.genre || []).filter((g) => g !== "deal-of-day"),
    },
  });

  revalidatePath("/dashboard/deal-of-day");

  return {
    success: "Product removed from deal-of-the-day",
  };
};

export const getDealOfTheDayProducts = async () => {
  const currentDate = new Date();

  const products = await db.product.findMany({
    where: {
      genre: {
        has: "deal-of-day"
      },
      endDeal: {
        gte: currentDate
      }
    },
    include: {
      brand: true,
      category: true,
      stocks: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 3
  });

  return { products };
};


export const getTopSellingProducts = async () => {
  const productSales = await db.product.findMany({
    include: {
      orderProducts: {
        select: {
          quantity: true,
        },
      },
    },
  });

  const productSalesWithTotal = productSales.map(product => ({
    ...product,
    totalSold: product.orderProducts.reduce((sum, orderProduct) => sum + orderProduct.quantity, 0),
  }));

  productSalesWithTotal.sort((a, b) => b.totalSold - a.totalSold);

  return {
    products: productSalesWithTotal.slice(0, 3),
  }
}

export const getNewProducts = async () => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    take: 3
  });

  console.log(products)

  return { products };
};