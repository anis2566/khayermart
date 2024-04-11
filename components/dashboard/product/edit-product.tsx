"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Category,Product, Stock } from "@prisma/client"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import toast from "react-hot-toast"
import { Trash,PlusCircle,RotateCw } from "lucide-react"
import { useTransition } from "react"

import "react-quill/dist/quill.snow.css";

import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Drawer,
    DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select"

import { getCategories } from "@/actions/category.action"
import { updateProduct } from "@/actions/product.action"
import { SIZES } from '@/constant';
import { updateStock } from "@/actions/stock.action"



const formSchema = z.object({ 
  name: z.string().min(1, {
    message: "required"
  }),
    description: z.string().min(1, {
        message: "required"
    }),
    categoryId: z.string().min(1, {
        message: "required"
    }),
    price: z.string().min(1, {
        message: "required"
    }),
    discountPrice: z.string().optional(),
    totalStock: z.string().optional(),
    featureImageUrl: z.string().min(1, {
      message: "required"
  }),
    images: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    status: z.string().min(1, {
        message: "required"
    })
})

interface EditProductProps {
    product: Product & {
        stocks: Stock[]
    }
}

export const EditProduct = ({product}:EditProductProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const router = useRouter()
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
    const [stockVariants, setStockVariants] = useState([{ id: 1, size: 's', stock: '', custom: false }]);
    const [open, setOpen] = useState<boolean>(false)
    const [pending, startTransition] = useTransition()


    useEffect(() => {
        if (product?.stocks) {
        setStockVariants(product.stocks.map((stock, index) => ({
            id: index + 1,
            size: stock.size || "",
            stock: stock?.total?.toString() || "",
            custom: false
        })))
        }
    }, [product?.stocks])
    
    // Function to add a new stock variant
    const addStockVariant = () => {
        const allPreviousKeysNotEmpty = stockVariants.every(variant => variant.size !== '' && variant.stock !== '');
        
        if (allPreviousKeysNotEmpty) {
            const newVariant = { id: stockVariants.length + 1, size: 's', stock: '', custom: false };
            setStockVariants([...stockVariants, newVariant]);
        } else {
            toast.error("Please complete variant details")
        }
    };

    // Function to update the stock value of a variant
    const updateStockValue = (id:number, value:string) => {
        const updatedVariants = stockVariants.map(variant => {
            if (variant.id === id) {
                return { ...variant, stock: value };
            }
            return variant;
        });
        setStockVariants(updatedVariants);
    };

        const updateSizeValue = (id:number, size:string) => {
        const updatedVariants = stockVariants.map(variant => {
            if (variant.id === id) {
                return { ...variant, size: size };
            }
            return variant;
        });
        setStockVariants(updatedVariants);
    };

    const handleCustomChange = (id: number, checked: boolean) => {
        const updatedVariants = stockVariants.map(variant => {
            if (variant.id === id) {
                return { ...variant, custom: checked };
            }
            return variant;
        });
        setStockVariants(updatedVariants);
    };

    const handleDeleteVariant = (id:number) => {
        setStockVariants(
            stockVariants.filter(variant => variant.id !== id)
        )
    }

    
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
            name: product.name || "",
            description: product.description || "",
            categoryId: product.categoryId || "",
            price: product.price.toString() || undefined,
            discountPrice: product.discountPrice?.toString() || undefined,
            totalStock: product.totalStock?.toString() || "",
            featureImageUrl: product.featureImageUrl || "",
            images: product.images || [],
            colors: product.colors || [],
            status: product.status || "DRAFT"
        },
    })

    useEffect(() => {
        const fetchCategory = async () => {
            getCategories()
                .then(data => {
                    if (data?.categories) {
                    setCategories(data?.categories)
                }
            })
        }
        fetchCategory()
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        startTransition(() => {
            updateProduct({product:values, id:product.id})
            .then(data => {
                if(data?.success) {
                    toast.success(data?.success)
                }
            })
        })
    }

    const handleUpdateVariant = async () => {
        const updatedVariants = stockVariants.filter(variant => variant.size !== '' && variant.stock !== "");
        updateStock({values: updatedVariants, productId:product.id})
            .then(data => {
                if(data?.error) {
                    toast.error(data?.error)
                }
                if(data?.success) {
                    toast.success(data?.success)
                    setOpen(false)
                }
            })
    }

    return (
        <div className="w-full space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 ">
                        <Card>
                            <CardHeader>
                                <CardTitle>Identity</CardTitle>
                                <CardDescription>
                                    Provide product indentity with name and description
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product name..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <ReactQuill
                                                    theme="snow"
                                                    onChange={field.onChange}
                                                    value={form.getValues("description")}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Media</CardTitle>
                                <CardDescription>Provide product feature images</CardDescription>
                                <CardContent className="p-0">
                                    <FormField
                                        control={form.control}
                                        name="featureImageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Feature Image</FormLabel>
                                                <FormControl>
                                                    {
                                                        form.getValues("featureImageUrl") ? (
                                                            <div className="relative mt-2">
                                                                <Image
                                                                alt="Upload"
                                                                width={120}
                                                                height={120}
                                                                className="object-contain rounded-md mx-auto"
                                                                src={form.getValues("featureImageUrl")}
                                                                />
                                                                <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("featureImageUrl", "")}>
                                                                    <Trash className="text-rose-500" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <UploadDropzone
                                                                endpoint="imageUploader"
                                                                onClientUploadComplete={(res) => {
                                                                    // Do something with the response
                                                                    field.onChange(res[0].url)
                                                                    // toggleEdit()
                                                                    toast.success("Image uploaded")
                                                                }}
                                                                onUploadError={(error: Error) => {
                                                                    toast.error("Image upload failed")
                                                                }}
                                                            />                                           
                                                        )
                                                    }
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Media</CardTitle>
                                <CardDescription>Provide product images</CardDescription>
                                <CardContent className="p-0">
                                    <FormField
                                        control={form.control}
                                        name="images"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Images</FormLabel>
                                                <FormControl>
                                                    {
                                                        (form.getValues("images")?.length ?? 0) > 0 ? (
                                                            <div className="flex gap-x-4 justify-start flex-wrap">
                                                                {
                                                                    form.getValues("images")?.map((img, index) => (
                                                                        <div key={index} className="relative">
                                                                            <Image
                                                                                alt="Upload"
                                                                                width={120}
                                                                                height={120}
                                                                                className="object-contain rounded-md mx-auto"
                                                                                src={img}
                                                                            />
                                                                            <Button className="absolute -top-5 -right-5" variant="ghost" size="icon" onClick={() => {
                                                                                const images = form.getValues("images")
                                                                                form.setValue("images", images?.filter(image => image !== img))
                                                                            }}>
                                                                                <Trash className="text-rose-500" />
                                                                            </Button>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        ) : (
                                                            <UploadDropzone
                                                                endpoint="productImageUploader"
                                                                onClientUploadComplete={(res) => {
                                                                    // Do something with the response
                                                                    console.log(res)
                                                                    res.map(img => {
                                                                        if (res.length > 0) {
                                                                            const currentImages = form.getValues("images") || [];
                                                                            form.setValue("images", [...currentImages, img.url]);
                                                                        }
                                                                    })
                                                                }}
                                                                onUploadError={(error: Error) => {
                                                                    toast.error("Image upload failed")
                                                                }}
                                                            />                                           
                                                        )
                                                    }
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Category</CardTitle>
                                <CardDescription>Provide product category</CardDescription>
                                <CardContent className="p-0">
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={categories[0]?.id || field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                </FormControl>
                                                    <SelectContent>
                                                        {
                                                            categories && categories.map((category) => (

                                                                <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                                                            ))
                                                        }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="space-y-6">

                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing</CardTitle>
                                <CardDescription>Provide product price</CardDescription>
                                <CardContent className="p-0 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product price..." {...field} type="number" />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="discountPrice"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Discount price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product discount price..." {...field} type="number" />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Stock</CardTitle>
                                <CardDescription>Provide product stock</CardDescription>
                                <CardContent className="p-0 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="totalStock"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product stock..." {...field} type="number" />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Colors</CardTitle>
                                <CardDescription>Provide product colors</CardDescription>
                                <CardContent className="p-0 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="colors"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Colors</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter tags" {...field}
                                                    onChange={(e) => {
                                                    const colorArray = e.target.value.split(",").map(color => color.trim());
                                                    field.onChange(colorArray);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Use comma after each color name or hex code
                                            </FormDescription>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                                <CardDescription>Provide product status</CardDescription>
                                <CardContent className="p-0">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                </FormControl>
                                                    <SelectContent>
                                                        {
                                                            ["DRAFT", "ACTIVE"].map((item, index) => (

                                                                <SelectItem value={item} key={index}>{item}</SelectItem>
                                                            ))
                                                        }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </CardHeader>
                        </Card>
                        {product?.stocks?.length > 0 && (
                            <Button className="w-full bg-sky-500 hover:bg-sky-600 text-primary" onClick={() =>setOpen(true)}>Edit variants</Button>
                        )}
                        <Drawer open={open}>
                            <DrawerContent>
                                <DrawerHeader>
                                <DrawerTitle>Stock Variants</DrawerTitle>
                                <DrawerDescription>Provide stock variants</DrawerDescription>
                                </DrawerHeader>
                                <Card className="border-none">
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className='text-center'>Size</TableHead>
                                                    <TableHead className='text-center'>Custom</TableHead>
                                                    <TableHead>Stock</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {stockVariants.map((variant) => (
                                                    <TableRow key={variant.id} className='p-0'>
                                                            <TableCell>
                                                            {variant.custom ? (
                                                                <Input
                                                                    type="text"
                                                                    onChange={(e) => updateSizeValue(variant.id, e.target.value)}
                                                                />
                                                            ) : (
                                                                <ToggleGroup
                                                                    type="single"
                                                                    defaultValue={variant.size}
                                                                    variant="outline"
                                                                    
                                                                >
                                                                    {SIZES.map(size => (
                                                                        <ToggleGroupItem value={size.value} key={size.value} onClick={() => updateSizeValue(variant.id, size.value)}>{size.label}</ToggleGroupItem>
                                                                    )) }
                                                                </ToggleGroup>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className='text-center'>
                                                                <Checkbox onCheckedChange={(checked) => handleCustomChange(variant.id, checked === true)} checked={variant.custom} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    type="number"
                                                                    value={variant.stock}
                                                                    onChange={(e) => updateStockValue(variant.id, e.target.value)}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button size="icon" variant="ghost" onClick={() => handleDeleteVariant(variant.id)}>
                                                                    <Trash className="text-rose-500" />
                                                                </Button>
                                                            </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardFooter className="justify-center border-t p-4">
                                        <Button onClick={addStockVariant} size="sm" variant="ghost" className="gap-1">
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            Add Variant
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <DrawerFooter>
                                <Button className="w-[250px] mx-auto bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" onClick={handleUpdateVariant}>Submit</Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                        <Button type="submit" className="w-full bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" disabled={pending}>
                            {pending && (
                              <RotateCw className="mr-2 h-4 w-4 animate-spin" />  
                            )}
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
