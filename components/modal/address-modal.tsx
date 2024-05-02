"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { deleteAddress } from "@/actions/shipping.action"
import { useAddress } from "@/store/use-address"

export function AddressModal() {
    const { open, addressId, onClose } = useAddress()
    const queryClient = useQueryClient()

    const {mutate, isPending } = useMutation({
        mutationFn: deleteAddress,
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-address"
            })
        },
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "delete-address"
            })
            queryClient.invalidateQueries({ queryKey: ["user-addresses"] })
        }
    })

    const handleDeleteAddress = () => {
        toast.loading("Deleting address...", {
            id: "delete-address"
        })
        if (!addressId) {
            toast.error("Someting went wrong", {
               id: "delete-address" 
            })
        }
        mutate(addressId)
    }

    return (
    <AlertDialog open={open && addressId !== ""} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this address
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAddress} disabled={isPending}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
