import { Category, Product, Stock, Brand, Order, ShippingInfo, User, OrderProduct} from "@prisma/client";

export interface ProductWithFeature extends Product {
  stocks?: Stock[];
  category: Category | null;
  brand: Brand,
}

interface OrderProducts extends OrderProduct {
    product: {
        featureImageUrl: string;
        name: string;
    }
}

export interface UserOrdersWithFeature extends Order {
    user: User;
    shippingInfo: ShippingInfo;
    products: OrderProducts[]
}

