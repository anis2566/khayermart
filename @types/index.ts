export type Product = {
  id: string;
  name: string;
  description: string;
  featureImageUrl: string;
  images: string[];
  totalStock?: number | null;
  price: number;
  discountPrice?: number | null;
  sellerPrice?: number | null;
  status: string;
  stocks: Stock[];
  colors: string[];
  categoryId: string;
  category: Category;
  brandId: string;
  brand: Brand;
  createdAt: Date;
  updatedAt: Date;
};

export type Stock = {
  id: string;
  total: number;
  size?: string | null;
  color?: string | null;
  productId?: string | null;
  product?: Product | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Brand = {
  id: string;
  name: string;
  imageUrl: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl: string;
  tags: string[];
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
};
