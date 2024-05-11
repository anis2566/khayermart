import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDiscountPercentage(price: number, discountPrice: number): number {
    const discount = price - discountPrice;
    const discountPercentage = Math.floor((discount / price) * 100);
    return discountPercentage;
}

export function formatPrice(amount: number): string {
    return `৳${amount.toFixed(2)}`;
}

export function calculateDeliveryFee (districkt: string) {
  if (districkt === "Dhaka") return 60
  else return 120
}