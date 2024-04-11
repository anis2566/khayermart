import {
  Layers3,
  LayoutDashboard,
  CirclePercent,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export const DASHBOARD_SIDEBAR = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
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
