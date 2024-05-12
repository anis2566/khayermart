"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronsUpDown, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { getProductIdsAndName } from "@/actions/product.action"
import { Input } from "@/components/ui/input"
import { Select, SelectContent } from "@/components/ui/select"

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const FormSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "required"
    }),
    productId: z.string().min(1, {
        message: "required"
    }),
})

type Product = {
    id: string;
    name: string;
}

export function BannerForm() {
    const [search, setSearch] = useState<string>("")
    const [products, setProducts] = useState<Product[]>([])
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getProductIdsAndName(search)
            setProducts(res.products)
        }
        fetchProduct()
    },[search])


  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
          imageUrl: "",
          productId: ""
      }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
    })
    }
    
    console.log(products)

  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Product</FormLabel>
                          <FormControl>
                              <Popover>
                                  <PopoverTrigger onClick={() => setOpen(true)}>Open</PopoverTrigger>
                                  <PopoverContent>
                                      <Select open={open}>
                                          <SelectContent>
                                              alfal
                                          </SelectContent>
                                      </Select>
                                  </PopoverContent>
                              </Popover>
                          </FormControl>
                      </FormItem>
                  )}
              />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
