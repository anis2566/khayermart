"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { getBanners } from "@/actions/banner.action"

export function Banner() {
    const {data: banners} = useQuery({
        queryKey: ["get-banners"],
        queryFn: async () => {
           return await getBanners()
        },
        staleTime: 60 * 60 * 1000
    })

    return (
        <Carousel
            className="w-full max-w-[1450px] mx-auto mt-5 max-h-[400px]"
            plugins={[
                Autoplay({
                delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                {
                    banners && banners.map((banner) => (
                        <CarouselItem key={banner.id}>
                            <Image
                                src={banner.imageUrl}
                                alt="Banner"
                                width={1000}
                                height={1000}
                                className="w-full max-h-[400px]"
                            />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}