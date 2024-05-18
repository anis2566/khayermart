import { z } from "zod"

export const UpdateUserSchema = z.object({
  name: z.string().min(1, {
    message: "required"
  }),
  phone: z.string().min(1, {
    message: "required"
  }),
})

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>