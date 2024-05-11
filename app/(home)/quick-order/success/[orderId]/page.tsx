"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Loader } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { getOrderById } from "@/actions/quick-order.action"
import { formatPrice } from "@/lib/utils"

const SuccessQuickOrder = ({ params }: { params: { orderId: string } }) => {
    const {data:order, isFetching} = useQuery({
        queryKey: ["get-quick-order"],
        queryFn: async () => {
            const data = await getOrderById(params.orderId)
            return data.order
        }
    })

    return (
        <>
            {
                isFetching ? (
                <div className="w-full h-[30vh] flex justify-center items-center">
                        <Loader className="w-10 h-10 animate-spin" />
                </div>
                ) : (
                    <div className="flex flex-col min-h-screen">
                    <header className="bg-gray-100 px-6 py-4 dark:bg-gray-800">
                        <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                height={50}
                                width={50}
                            />
                            <div className="space-y-1">
                            <h2 className="text-lg font-semibold">Padmashops</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Chakbazar, Puran Dhaka, Dhaka</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">01969-764382</p>
                            </div>
                        </div>
                        <div className="space-y-1 text-right">
                            <h3 className="text-lg font-semibold uppercase">#{order?.id.slice(0, 6)}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{format(order?.createdAt || new Date(), "dd MMMM yyyy")}</p>
                        </div>
                        </div>
                    </header>
                    <main className="flex-1 container mx-auto px-6 py-8">
                        <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold">Bill To:</h3>
                            <div className="space-y-2 text-sm">
                            <p>{order?.name}</p>
                            <p>{order?.phone}</p>
                            <p>{order?.address}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h3 className="text-lg font-semibold">Ship To:</h3>
                            <div className="space-y-2 text-sm">
                            <p>{order?.name}</p>
                            <p>{order?.phone}</p>
                            <p>{order?.address}</p>
                            </div>
                        </div>
                        </div>
                                <div className="mt-8">
                                    {
                                        order && (
                                            <Table>
                                                <TableHeader>
                                                <TableRow>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>Quantity</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead>D. Fee</TableHead>
                                                    <TableHead>Total</TableHead>
                                                </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarImage src={order?.product.featureImageUrl} />
                                                            <AvatarFallback>{order?.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{order?.quantity}</TableCell>
                                                    <TableCell>{formatPrice(order?.deliveryFee)}</TableCell>
                                                    <TableCell>{formatPrice(order?.total)}</TableCell>
                                                    <TableCell>{formatPrice(order?.total + order?.deliveryFee)}</TableCell>
                                                </TableRow>
                                                </TableBody>
                                            </Table>
                                        )
                                    }
                        </div>
                        <p className="text-center text-lg mt-4 text-muted-foreground">Product will reach in your hand upto <span className="font-bold text-primary">3 days</span></p>
                        
                        <div className="flex justify-center mt-5">
                            <Link href="/">
                                <Button>Explore More</Button>
                            </Link>
                        </div>
                    </main>
                    </div>
                )
            }
        </>
    )
}

export default SuccessQuickOrder
