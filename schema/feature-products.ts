import { z } from "zod"

export const FeatureFormSchema = z.object({
    productId: z.string().min(1, {
        message: "required"
    }),
    featureTitle: z.string().min(1, {
        message: "required"
    })
})

export type FeatureFormSchemaType = z.infer<typeof FeatureFormSchema>