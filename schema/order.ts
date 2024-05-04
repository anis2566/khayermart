import { z } from "zod"

const ProductSchema = z.object({
    id: z.string().min(1, {
        message: "required"
    }),
    size: z.string().optional(),
    color: z.string().optional(),
    quantity: z.number().min(1, {
        message: "required"
    }),
    price: z.number().min(1, {
        message: "required"
    })
})

const ShippingSchema = z.object({
  name: z.string().min(4, {
    message: "required",
  }),
  division: z.string().min(1, {
    message: "required",
  }),
  address: z.string().min(10, {
    message: "required",
  }),
  phone: z.string().min(11, {
    message: "required",
  }),    
})

export const OrderSchema = z.object({
  shippingInfo: ShippingSchema.optional(),
  shippingInfoId: z.string().optional(),
  paymentMethod: z.string().min(1, {
    message: "required",
  }),
  deliveryFee: z.number().min(1, {
    message: "required",
  }),
    products: ProductSchema.array().min(1, {
      message: "required"
  })
});

export type OrderSchemaType = z.infer<typeof OrderSchema>

