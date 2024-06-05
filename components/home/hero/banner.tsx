"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useQuery } from "@tanstack/react-query"
import { getBanners } from "@/actions/banner.action"

export function Banner() {
    const {data:banners} = useQuery({
        queryKey: ["get-banners"],
        queryFn: async () => {
            const res = await getBanners()
            return res.banners
        }
    })

    return (
        <Carousel
            className="flex-1 relative"
            plugins={[ 
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                {
                    banners?.map(banner => (
                        <CarouselItem key={banner.id}>
                            <Image
                                src={banner.imageUrl}
                                alt="Banner"
                                width={1000}
                                height={1000}
                                className="w-full h-full max-h-[380px]"
                            />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="absolute left-3" />
            <CarouselNext className="absolute right-3" />
        </Carousel>
    )
}