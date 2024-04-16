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

import banner1 from "@/assets/banner1.jpg"
import banner2 from "@/assets/banner2.jpg"
import banner3 from "@/assets/banner3.jpg"

export function Banner() {
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
                <CarouselItem>
                    <Image
                        src={banner1}
                        alt="Banner"
                        width={1000}
                        height={1000}
                        className="w-full max-h-[400px]"
                    />
                </CarouselItem>
                <CarouselItem className="">
                    <Image
                        src={banner2}
                        alt="Banner"
                        width={1000}
                        height={1000}
                        className="w-full max-h-[400px]"
                    />
                </CarouselItem>
                <CarouselItem className="">
                    <Image
                        src={banner3}
                        alt="Banner"
                        width={1000}
                        height={1000}
                        className="w-full max-h-[400px]"
                    />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}