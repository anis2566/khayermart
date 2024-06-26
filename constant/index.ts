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
  TicketSlash,
  Feather,
  Popcorn,
  CalendarClock,
  ClipboardList,
  Store,
  UserCog,
  Home,
  Info,
  Headset
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
    label: "Users",
    href: "/dashboard/users",
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

export const CUSTOMER_SIDEBAR_ITEMS = [
    {
        label: "Dashboard",
        href: "/seller",
        icon: LayoutDashboard
    },
    {
        label: "Store",
        href: "/seller/store",
        icon: Store
    },
    {
        label: "Place Order",
        href: "/seller/order/create",
        icon: ShoppingCart
    },
    {
        label: "Orders",
        href: "/seller/order/list",
        icon: ClipboardList
    },
    {
        label: "Profile",
        href: "/seller/profile",
        icon: UserCog
    },
] as const;

export const CLIENT_UI_SIDEBAR = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Shop",
    href: "/shop",
    icon: ShoppingBasket,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Headset,
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

export const CLIENT_SIDEBAR = [
  {
    label: "Banner",
    href: "/dashboard/banner",
    icon: TicketSlash,
  },
  {
    label: "F. Products",
    href: "/dashboard/feature-products",
    icon: Feather,
  },
  {
    label: "P. Products",
    href: "/dashboard/popular-products",
    icon: Popcorn,
  },
  {
    label: "Best Deal",
    href: "/dashboard/best-deal",
    icon: CirclePercent,
  },
] as const;

export const DIVISIONS = [
  "Barishal",
  "Chittagong",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet"
] as const