import {
  Layers3,
  LayoutDashboard,
  CirclePercent,
  Package,
  ShoppingCart,
  ShoppingBasket,
  MapPinned,
  MapPin,
  UserCog,
  Users,
  Ribbon,
} from "lucide-react";

export const DASHBOARD_SIDEBAR = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Brand",
    href: "/dashboard/brand",
    icon: Ribbon,
  },
  {
    label: "Category",
    href: "/dashboard/category",
    icon: Layers3,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    label: "Coupon",
    href: "/dashboard/coupon",
    icon: CirclePercent,
  },
] as const;

export const SIZES = [
  {
    label: "S",
    value: "s",
  },
  {
    label: "M",
    value: "m",
  },
  {
    label: "L",
    value: "l",
  },
  {
    label: "XL",
    value: "xl",
  },
];


export const CUSTOMER_SIDEBAR = [
  {
    label: "Dashboard",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/account/orders",
    icon: ShoppingBasket,
  },
  {
    label: "Track Order",
    href: "/account/order-tracking",
    icon: MapPinned,
  },
  {
    label: "My Address",
    href: "/account/address",
    icon: MapPin,
  },
  {
    label: "Setting",
    href: "/account/setting",
    icon: UserCog,
  },
] as const;

export const ORDER_STATUS = [
  {
    label: "Pending",
    value: "pending"
  },
  {
    label: "Processing",
    value: "processing"
  },
  {
    label: "Shipping",
    value: "shipping"
  },
  {
    label: "Delivered",
    value: "delivered"
  },
  {
    label: "Returned",
    value: "returned"
  },
] as const;