import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"
import Link from "next/link"

const Products = () => {
    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                <Link href="/dashboard/products/create">
                    <Button size="sm" className="flex items-center gap-x-2">
                        <Pen className="w-5 h-5" />
                        Create
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Products