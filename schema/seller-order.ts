import { z } from "zod";

const ProductSchema = z.object({
  productId: z.string().min(1, {
    message: "required",
  }),
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.number().min(1, {
    message: "required",
  }),
  quantity: z.number().min(1, {
    message: "required",
  }),
});

export const CreateOrderSchema = z.object({
    products: z.array(ProductSchema),
    customerName: z.string().min(1, {
        message: "required"
    }),
    address: z.string().min(1, {
        message: "required"
    }),
    mobile: z.string().min(1, {
        message: "required"
    }),
    deliveryFee: z.number().min(1, {
        message: "required"
    }),
});

export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;

export const AddTrackingNumberSchema = z.object({
  orderId: z.string().min(1, {
    message: "required"
  }),
  trackingId: z.string().min(1, {
    message: "required"
  }),
})

export type AddTrackingNumberSchemaType = z.infer<typeof AddTrackingNumberSchema>