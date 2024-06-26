"use client"

import { Product } from "@prisma/client";
import Image from "next/image"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { removeBestDealProduct } from "@/actions/product.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const BestDealCard = ({ product }: { product: Product }) => {

    const {mutate: removeBestDeal, isPending} = useMutation({
        mutationFn: removeBestDealProduct,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "remove-best-deal"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "remove-best-deal"
            })
        }
    })

    const handleRemoveBestDeal = () => {
        toast.loading("Removing feature...", {
            id: "remove-best-deal"
        });
        removeBestDeal(product.id)
    }
  
    return (
        <div className="p-3 border border-gray-200 rounded-md w-full max-w-[300px] h-[270px] relative space-y-2 overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-md">
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
                                    <Button variant="ghost" size="icon" onClick={handleRemoveBestDeal} disabled={isPending}>
                                        <Trash2 className="text-rose-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Remove from featured</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

            </div>
        </div>
    )
}