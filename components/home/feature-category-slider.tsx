"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Category } from "@prisma/client"
import { useRouter } from "next/navigation"
import queryString from "query-string"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: string;
}

interface PrismaCategory extends Category {
  products: Product[];
}

interface Props {
    categories: PrismaCategory[]
}

export function FeatureCategorySlider({ categories }: Props) {
    const router = useRouter()

    const handleClick = (category: string) => {
        const url = queryString.stringifyUrl({
            url: "/shop",
            query: {
                category: category
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            plugins={[
                Autoplay({
                delay: 2000,
                }),
            ]}
            className="w-full max-w-[1400px]"
            >
            <CarouselContent>
                {categories.map((category) => (
                <CarouselItem key={category.id} className="basis-1/2 sm:basis-1/3 md:basis-1/6 lg:basis-1/6">
                    <div className="p-0">
                        <Card className="group hover:border-green-200 cursor-pointer" onClick={() => handleClick(category.name)}>
                            <CardContent className="flex flex-col aspect-square items-center justify-center p-0">
                                <div className="transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                                    <Image
                                        src={category.imageUrl}
                                        alt={category.name}
                                        width={100}
                                        height={100}
                                        className="w-[60px] md:w-[100px] h-[60px] md:h-[100px]"
                                    />
                                </div>
                                <h1 className="text-md font-semibold text-slate-700 group-hover:text-green-600 transition-colors duration-300 ease-in-out">{category.name}</h1>
                                <span className="text-sm text-muted-foreground">{category.products.length} Item</span>
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