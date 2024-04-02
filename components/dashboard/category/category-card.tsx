import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card,CardContent } from "@/components/ui/card"

interface CategoryCardProps {
    category: Category
}

export const CategoryCard = ({category}:CategoryCardProps) => {
    return (
        <Card>
            <CardContent className="pt-5 space-y-3">
                <Image
                    src={category.imageUrl}
                    alt={category.name}
                    height={100}
                    width={100}
                    className="aspect-square rounded-full mx-auto"
                />
                <div className="w-full">
                    <p className="text-xl font-semibold truncate">{category.name}</p>
                    <p className="text-muted-foreground text-sm w-full truncate">{category.description}</p>
                </div>
                <div>
                    <Badge className="bg-slate-600 hover:bg-emerald-400 text-white">120 Products</Badge>
                </div>
                <Link href={`/dashboard/category/${category.id}`}>
                    <Button className="w-full mt-3 bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary">View Products</Button>
                </Link>
            </CardContent>
        </Card>
    )
}