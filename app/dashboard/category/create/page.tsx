"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import {  Undo2, RotateCw } from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UploadDropzone } from "@/lib/uploadthing"

import { createCategory } from "@/actions/category.action"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "required"
  }),
    description: z.string().optional(),
    imageUrl: z.string().min(1, {
      message: "required"
  }),
    tags: z.array(z.string()).optional()
})

const CreateCategory = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
            tags: []
        },
    })

    const {isSubmitting} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        createCategory({ ...values })
            .then((data) => {
                if (data?.error) {
                toast.error(data?.error)
                }
                if (data?.success) {
                    toast.success(data?.success)
                    router.push("/dashboard/category")
                }
        })
    }

    return (
        <div className="w-full space-y-8">
            <div className="flex items-center gap-4">
                <Button size="sm" onClick={() => router.back()} className="flex items-center gap-x-1">
                    <Undo2 className="w-5 h-5" />
                    Back
                </Button>
            </div>
            <Form {...form}>
                <form className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Identity</CardTitle>
                                <CardDescription>Give the category name and description</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter category name" {...field} />
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
                                                <Textarea
                                                placeholder="Tell us a about category"
                                                className="resize-none"
                                                {...field}
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
                                <CardTitle>Media </CardTitle>
                                <CardDescription>Provide category image</CardDescription>
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
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-5">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tags</CardTitle>
                                <CardDescription>Provide some tags</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter tags" {...field}
                                                    onChange={(e) => {
                                                    const tagsArray = e.target.value.split(",").map(tag => tag.trim());
                                                    field.onChange(tagsArray);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Use comma after each tag
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Button type="submit" className="w-full bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-800 dark:text-primary" disabled={isSubmitting}>
                            {isSubmitting && (
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

export default CreateCategory