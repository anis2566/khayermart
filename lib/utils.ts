import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDiscountPercentage(price: number, discountPrice: number): number {
    const discount = price - discountPrice;
    const discountPercentage = (discount / price) * 100;
    return discountPercentage;
}