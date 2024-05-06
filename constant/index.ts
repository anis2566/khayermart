import {
  Layers3,
  LayoutDashboard,
  CirclePercent,
  Package,
  ShoppingCart,
  ShoppingBasket,
  MapPin,
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
    label: "Address",
    href: "/account/address",
    icon: MapPin,
  },
] as const;

export const ORDER_STATUS = [
  {
    label: "Pending",
    value: "PENDING"
  },
  {
    label: "Processing",
    value: "PROCESSING"
  },
  {
    label: "Shipping",
    value: "SHIPPING"
  },
  {
    label: "Delivered",
    value: "DELIVERED"
  },
  {
    label: "Returned",
    value: "RETURNED"
  },
] as const;