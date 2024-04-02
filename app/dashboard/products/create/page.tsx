"use client"

import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react"
import { useRouter } from "next/navigation"

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
        </div>
    )
}

export default CreateProduct