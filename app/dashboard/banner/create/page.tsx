"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { UploadDropzone } from "@/lib/uploadthing"
import { getProductIdsAndName } from "@/actions/product.action"
import { useDebounce } from "@/store/use-debounce"
import { BannerSchema } from "@/schema/banner"
import { useMutation } from "@tanstack/react-query"
import { createBanner } from "@/actions/banner.action"

type Product = {
    id: string;
    name: string;
    featureImageUrl: string;
}

export default function CreteBanner() {
    const [search, setSearch] = useState<string>("")
    const [products, setProducts] = useState<Product[]>([])
  
  const debounceValue = useDebounce(search, 2000)
  const router = useRouter()

  useEffect(() => {
      const fetchProduct = async () => {
          const res = await getProductIdsAndName(debounceValue)
          setProducts(res.products)
      }
      fetchProduct()
    },[debounceValue])


  const form = useForm<z.infer<typeof BannerSchema>>({
      resolver: zodResolver(BannerSchema),
      defaultValues: {
          imageUrl: "",
          productId: ""
      }
  })

  const {mutate: createBannerHandler, isPending} = useMutation({
    mutationFn: createBanner,
    onSuccess: (data) => {
      router.push("/dashboard/banner")
      toast.success(data.success, {
        id: "create-banner"
      })
    },
    onError: (error) => {
      toast.error(error.message, {
        id: "create-banner"
      })
    }
  })

  function onSubmit(data: z.infer<typeof BannerSchema>) {
    toast.loading("Creating banner...", {
      id: "create-banner"
    });
    createBannerHandler(data)
  }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl">
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/banner">Banner</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage>Create</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Banner Image</FormLabel>
                      <FormControl>
                        {
                            form.getValues("imageUrl") ? (
                                <div className="relative aspect-video mt-2">
                                    <Image
                                    alt="Upload"
                                    fill
                                    className="object-cover rounded-md"
                                    src={form.getValues("imageUrl")}
                                    />
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
          <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Product</FormLabel>
                      <FormControl>
                    <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select Product" />
                      </SelectTrigger>
                      <SelectContent className="space-y-2">
                        <Input placeholder="Search product" onChange={(e) => setSearch(e.target.value)} className="mb-2" autoFocus />
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id}
                            className="flex items-center gap-2"
                          >
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
          />
        <Button type="submit" disabled={isPending}>Submit</Button>
      </form>
    </Form>
  )
}
