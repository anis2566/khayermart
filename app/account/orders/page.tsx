import Link from "next/link"
import { Eye } from "lucide-react"

import { CardContent, Card, CardTitle, CardHeader, CardDescription } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {ORDER_STATUS} from "@/constant"



const Orders = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>All order you have placed so far.</CardDescription>
            </CardHeader>
            <CardContent className="px-2 space-y-3">
                <div className="w-full flex justify-end">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ORDER_STATUS.map((status) => (
                                    <SelectItem value={status.value} key={status.value}>{status.label}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>

                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead >Invoice</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="p-0">
                            <TableCell className="py-1">INV001</TableCell>
                            <TableCell className="py-1">&#2547;2500</TableCell>
                            <TableCell className="py-1">25 April, 2024</TableCell>
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
                            <TableCell className="py-1">25 April, 2024</TableCell>
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
                            <TableCell className="py-1">25 April, 2024</TableCell>
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
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Orders