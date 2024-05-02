import { z } from "zod"

export const ShippingSchema = z.object({
  infoName: z.string().min(1, {
    message: "required",
  }),
  name: z.string().min(1, {
    message: "required",
  }),
  division: z.string().min(1, {
    message: "required",
  }),
  address: z.string().min(5, {
    message: "required",
  }),
  phone: z.string().min(11, {
    message: "required",
  }),
})

export type ShippingSchemaType = z.infer<typeof ShippingSchema>