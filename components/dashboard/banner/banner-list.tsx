"use client"

import { Button } from "@/components/ui/button"
import { Banner } from "@prisma/client"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import queryString from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { deleteBanner } from "@/actions/banner.action"

interface Props {
    banners: Banner[]
}

export const BannerList = ({ banners }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

  const handleClick = (bannerId: string) => {
    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        bannerId: bannerId
      }
    }, {skipEmptyString: true, skipNull: true})
    router.push(url)
  }

    const {mutate} = useMutation({
        mutationFn: deleteBanner,
        onSuccess: () => {
            toast.success("Banner deleted", {
                id: "delete-banner"
            });
            router.push(pathname);
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-banner"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Banner deleted", {
            id: "delete-banner"
        });
        const bannerId = searchParams.get("bannerId");
        if (!bannerId) {
            toast.error("Banner ID not found");
        } else {
            mutate(bannerId)
        }

  }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                banners.map((banner) => (
                    <div key={banner.id} className="relative aspect-video border border-primary p-2 rounded-md">
                        <Image
                            src={banner.imageUrl}
                            alt={banner.productId}
                            fill
                            className="object-cover rounded-md p-2"
                        />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="absolute bottom-0 right-0 text-rose-500" onClick={() => handleClick(banner.id)}>
                                    <Trash2 className="text-rose-500" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the banner.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))
            }
        </div>
    )
}