import { z } from "zod"

export const DealOfTheDaySchema = z.object({
  productId: z.string().min(1, {
    message: "required",
  }),
  startDeal: z.date({
    required_error: "required",
    invalid_type_error: "Invalid date format",
  }),
  endDeal: z.date({
    required_error: "required",
    invalid_type_error: "Invalid date format",
  }),
})

export type DealOfTheDaySchemaType = z.infer<typeof DealOfTheDaySchema>