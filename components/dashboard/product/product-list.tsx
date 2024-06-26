"use client"

import {Copy, EllipsisVertical,Pen, Trash2} from "lucide-react"
import Link from "next/link"
import { Product } from "@prisma/client"
import toast from "react-hot-toast"
import { useTransition } from "react"
import {useState} from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {deleteProduct} from "@/actions/product.action"
import { Badge } from "@/components/ui/badge"

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => {
    const [id, setId] = useState<string>("")
    const [pending, startTransition] = useTransition()

    console.log(window.location.origin)

    const handleDelete = async () => {
        if(!id) {
          toast.error("Something went wrong")
        } else {
          startTransition(() => {
            deleteProduct(id)
                .then((data) => {
                    if (data?.error) {
                    toast.error(data?.error)
                    }
                    if (data?.success) {
                        toast.success(data?.success)
                    }
            })
        })
        }
    }

    const handleCopyLink = (productId: string) => {
        const link = `${window.location.origin}/quick-order/${productId}`
        navigator.clipboard.writeText(link)
            .then(() => {
                toast.success("Link copied to clipboard!")
            })
            .catch(() => {
                toast.error("Failed to copy link")
            })
    }
    
    return (
        <div className="w-full">
            <Table>
                <TableCaption>A list of your recent products.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>D. Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products.map((product:Product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                            <Avatar className="w-7 h-7">
                                <AvatarImage src={product.featureImageUrl} />
                                <AvatarFallback>{product.name}</AvatarFallback>
                            </Avatar>
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.discountPrice}</TableCell>
                            <TableCell>{product.totalStock}</TableCell>
                            <TableCell>
                                <Badge className="bg-green-500">{product.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <EllipsisVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                        <Link href={`/dashboard/products/edit/${product.id}`} className="flex items-center gap-x-3">
                                            <Pen className="w-4 h-4" />
                                            Edit
                                        </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleCopyLink(product.id)} className="flex items-center gap-x-2">
                                            <Copy className="w-4 h-4" />
                                            Copy quick order link
                                        </DropdownMenuItem>
                                        <AlertDialog>
                                            <AlertDialogTrigger className="flex gap-x-3 text-rose-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 select-none items-center rounded-sm px-2 py-1.5 text-sm w-full" onClick={() => setId(product.id)}>
                                            <Trash2 className="text-rose-500 w-4 h-4" />
                                            Delete
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                This action will delete the product permanantly.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete} disabled={pending}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}