"use client"

import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BestDealCard } from "../card/best-deal-card";
import { ProductWithFeature } from "@/@types";

interface Props {
    products: ProductWithFeature[]
}

export const BestDealSlider = ({products}:Props) => {
    return (
            <Carousel
                opts={{
                    align: "center",
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className="w-full max-w-[1400px]"
                >
            <CarouselContent className="-ml-2 md:-ml-4">
                {products.map((product) => (
                <CarouselItem key={product.id} className="basis-1/1 sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
                    <BestDealCard product={product} />
                </CarouselItem>
                ))}
                {products.map((product) => (
                <CarouselItem key={product.id} className="basis-1/1 sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
                    <BestDealCard product={product} />
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 top-[50%]" />
            <CarouselNext className="-right-3 top-[50%]" />
        </Carousel>
    )
}