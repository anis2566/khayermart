"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import {RotateCw, Trash} from "lucide-react"
import { useTransition } from "react"
import { Brand } from "@prisma/client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {updateBrand} from "@/actions/brand.action"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "required"
  }),
  imageUrl: z.string().min(1, {
    message: "required"
  }),
})

interface EditBrandProps {
    brand: Brand
}

export const EditBrand = ({ brand }: EditBrandProps) => {
    const [pending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: brand.name || "",
        imageUrl: brand.imageUrl || "",
      },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      startTransition(() => {
        updateBrand({name: values.name, imageUrl:values.imageUrl, id: brand.id})
        .then(data => {
            if(data?.error) {
                toast.error(data?.error)
            }
            if(data?.success) {
                toast.success(data?.success)
            }
        })
      })
    }
    return (
        <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Identity</CardTitle>
                        <CardDescription>Give the brand name</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter brand name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle>Media </CardTitle>
                    <CardDescription>Provide coupon image</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    {
                                        form.getValues("imageUrl") ? (
                                            <div className="relative mt-2">
                                                <Image
                                                alt="Upload"
                                                width={120}
                                                height={120}
                                                className="object-contain rounded-md mx-auto"
                                                src={form.getValues("imageUrl")}
                                                />
                                                <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")}>
                                                    <Trash className="text-rose-500" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <UploadDropzone
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    field.onChange(res[0].url)
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
                </Card>

                <Button type="submit" className="w-full max-w-[200px] bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-primary" disabled={pending}>
                    {pending && (
                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />  
                    )}
                    Submit
                </Button>
            </form>
        </Form>
    )
}