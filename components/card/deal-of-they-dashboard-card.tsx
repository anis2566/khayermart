"use client"

import { Product } from "@prisma/client";
import Image from "next/image"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { removeDealOfTheDayProduct, removePopularProduct } from "@/actions/product.action";
import { cn } from "@/lib/utils";

export const DealOfTheDay = ({ product }: { product: Product }) => {

    const {mutate: removeDealOfDay, isPending} = useMutation({
        mutationFn: removeDealOfTheDayProduct,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "remove-deal-of-day"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "remove-deal-of-day"
            })
        }
    })

    const handleDealOfTheDay = () => {
        toast.loading("Removing deal-of-day...", {
            id: "remove-deal-of-day"
        });
        removeDealOfDay(product.id)
    }
  
    return (
        <div className="p-3 border border-gray-200 rounded-md w-full max-w-[300px] h-[290px] relative space-y-2 overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-md">
            <div className="space-y-7">
                <div className="aspect-square w-full max-w-[100px] mx-auto relative">
                    <Image
                        alt="Thumbnail"
                        className="h-[120px] rounded-lg group-hover:scale-110 transition-all duration-300 ease-in-out absolute top-0 left-0"
                        height="100"
                        src={product.featureImageUrl}
                        width="100"
                    />
                </div>
                <div>
                    <p className="font-semibold">{product.name.length > 40 ? `${product.name.slice(0, 40)}...` : product.name}</p>

                    {product.discountPrice ? (
                        <div className="flex items-center gap-x-2">
                            <p className="text-slate-700 text-md font-semibold">&#2547;{product.discountPrice}</p>
                            <p className="text-slate-700 line-through text-sm">&#2547;{product.price}</p>
                        </div>
                    ): (
                        <p className="text-slate-700 line-through text-md">&#2547;{product.price}</p>
                    )}
                    <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-primary">{product.totalStock} in stock</Badge>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={handleDealOfTheDay} disabled={isPending}>
                                        <Trash2 className="text-rose-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Remove from featured</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Badge className=
                        {cn(
                            "text-white",
                            product.endDeal && product.endDeal.getTime() > Date.now() && "bg-green-500",
                            product.endDeal && product.endDeal.getTime() < Date.now() && "bg-rose-500",
                        )}
                    >
                        {
                            product.endDeal && product.endDeal.getTime() > Date.now() ? "Running" : "Expired"
                        }
                    </Badge>
                </div>

            </div>
        </div>
    )
}