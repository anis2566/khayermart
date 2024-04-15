"use client"

import {Preview } from "@/components"

interface ProductDescriptionProps {
    description: string;
}

export const ProductDescription = ({description}:ProductDescriptionProps) => {
    return (
        <div className="border border-gray-500 w-full max-w-[800px] mx-auto">
            <Preview value={description} />
        </div>
    )
}