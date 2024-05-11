"use client"

import Image from "next/image"
import { StarIcon } from "lucide-react"
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Brand, Category, Product, Stock } from "@prisma/client"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { useCart } from "@/store/use-cart";
import { ProductWithFeature } from "@/@types";

interface Props {
    product: ProductWithFeature
}

export const DealOfTheDayCard = ({ product }: Props) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0
    });

    const {addToCart} = useCart()

    const dealEndTime = (() => {
        const now = new Date();
        now.setDate(now.getDate() + 3);
        now.setHours(23, 59, 59, 999);
        return now;
    })();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = dealEndTime.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({days, hours, mins: minutes, secs: seconds});
        }, 1000);

        return () => clearInterval(timer);
    }, [dealEndTime]);

    const handleAddToCart = () => {
        addToCart(product, 1)
        toast.success("Added to cart")
    }
    
    return (
        <Card className="relative min-h-[200px] md:min-h-[350px]">
            <CardContent>
                <AspectRatio ratio={16 / 9} className="bg-muted m-2">
                    <Image
                        src={product.featureImageUrl}
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-md object-cover"
                    />
                </AspectRatio>
                    <div className="w-[90%] md:w-[80%] mx-auto p-2 border border-gray-200 space-y-2 rounded-xl absolute top-[60%] left-[5%] md:left-[10%]">
                        <div className="flex justify-between items-center gap-x-2">
                            <div className="p-2 rounded-xl border border-gray-500 bg-indigo-500 text-white text-center">
                                <p className="text-xl font-bold">{timeLeft.days}</p>
                                <p>days</p>
                            </div>
                            <div className="p-2 rounded-xl border border-gray-500 bg-indigo-500 text-white text-center">
                                <p className="text-xl font-bold">{timeLeft.hours}</p>
                                <p>Hours</p>
                            </div>
                            <div className="p-2 rounded-xl border border-gray-500 bg-indigo-500 text-white text-center">
                                <p className="text-xl font-bold">{timeLeft.mins}</p>
                                <p>Mins</p>
                            </div>
                            <div className="p-2 rounded-xl border border-gray-500 bg-indigo-500 text-white text-center">
                                <p className="text-xl font-bold">{timeLeft.secs}</p>
                                <p>Secs</p>
                            </div>
                        </div>
                        <div className="bg-white">
                        <p className="font-semibold">{product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}</p>
                        <div className="flex items-center gap-x-4">
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">(4.0)</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">&#2547;{product.discountPrice ? product.discountPrice : product.price}</p>
                            <Button onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                        </div>
                    </div>
            </CardContent>
        </Card>
    )
}