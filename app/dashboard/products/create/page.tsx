"use client"

import { Undo2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CreateNonVariantProduct } from "@/components/dashboard/product/create-product"
import "react-quill/dist/quill.snow.css";

const CreateProduct = () => {
    const router = useRouter()

    return (
        <div className="w-full space-y-8">
            <div className="flex items-center gap-4">
                <Button size="sm" onClick={() => router.back()} className="flex items-center gap-x-1">
                    <Undo2 className="w-5 h-5" />
                    Back
                </Button>
            </div>
            <Tabs defaultValue="non-variant" className="w-full">
                <TabsList>
                    <TabsTrigger value="non-variant">Non Variant</TabsTrigger>
                    <TabsTrigger value="variant">Variant</TabsTrigger>
                </TabsList>
                <TabsContent value="non-variant">
                    <CreateNonVariantProduct />
                </TabsContent>
                <TabsContent value="variant">Change your password here.</TabsContent>
            </Tabs>
        </div>
    )
}

export default CreateProduct