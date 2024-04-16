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

import cake from "@/assets/cake.png"
import apple from "@/assets/apple.png"
import orange from "@/assets/orange.png"
import { Card, CardContent } from "@/components/ui/card"

export function FeatureCategorySlider() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-[1400px]"
            >
            <CarouselContent>
                {Array.from({ length: 15}).map((_, index) => (
                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6">
                    <div className="p-0">
                        <Card className="group hover:border-green-200 cursor-pointer">
                            <CardContent className="flex flex-col aspect-square items-center justify-center p-0">
                                <div className="transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                                    <Image
                                        src={cake}
                                        alt="Category"
                                    />
                                </div>
                                <h1 className="text-md font-semibold text-slate-700 group-hover:text-green-600 transition-colors duration-300 ease-in-out">Red Apple</h1>
                                <span className="text-sm text-muted-foreground">54 Item</span>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-[calc(100%-80px)] -top-10" />
            <CarouselNext className="-top-10 right-0" />
        </Carousel>
    )
}