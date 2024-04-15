import { currentUser } from "@clerk/nextjs"
import { Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { CardContent, Card, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { db } from "@/lib/db"


export const Dashboard = async () => {
    const user = await currentUser()
    const products = await db.product.findMany()
    return (
        <div className="space-y-5 w-full px-3 flex-1">
            <Card className="border shadow-sm w-full">
                <CardContent className="flex items-center gap-4 p-4 md:p-6">
                    <Image
                        alt="Avatar"
                        className="rounded-full"
                        height="100"
                        src={user?.imageUrl || ""}
                        style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                        }}
                        width="100"
                    />
                <div className="grid gap-1 text-sm md:gap-2">
                    <div className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</div>
                    <div>{user?.emailAddresses[0].emailAddress}</div>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead >Invoice</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="p-0">
                                <TableCell className="py-1">INV001</TableCell>
                                <TableCell className="py-1">&#2547;2500</TableCell>
                                <TableCell className="py-1">
                                    <Badge variant="outline" className="bg-green-500 text-white">Delivered</Badge>
                                </TableCell>
                                <TableCell className="py-1">
                                    <Link href="/order/123">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow className="p-0">
                                <TableCell className="py-1">INV001</TableCell>
                                <TableCell className="py-1">&#2547;2500</TableCell>
                                <TableCell className="py-1">
                                    <Badge variant="outline" className="bg-green-500 text-white">Delivered</Badge>
                                </TableCell>
                                <TableCell className="py-1">
                                    <Link href="/order/123">
                                        <Button variant="ghost" size="icon">
                                            <Eye />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow className="p-0">
                                <TableCell className="py-1">INV001</TableCell>
                                <TableCell className="py-1">&#2547;2500</TableCell>
                                <TableCell className="py-1">
                                    <Badge variant="outline" className="bg-green-500 text-white">Delivered</Badge>
                                </TableCell>
                                <TableCell className="py-1">
                                    <Link href="/order/123">
                                        <Button variant="ghost" size="icon">
                                            <Eye />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {
                            products.map((product) => (
                                <div className="flex items-center gap-4" key={product.id}>
                                <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="100"
                                    src={product.featureImageUrl}
                                    width="100"
                                />
                                <div className="grid gap-1 text-sm md:gap-2">
                                    <div className="font-semibold">{product.name}</div>
                                    <div className="text-muted-foreground">&#2547;{product.discountPrice}</div>
                                    <div className="text-sm">
                                    <Button size="sm">
                                        Add to cart
                                    </Button>
                                    </div>
                                </div>
                                </div>
                            ))
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}