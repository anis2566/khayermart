"use client"

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

    const handleDeleteAddress = async () => {
        toast.loading("Deleting address...", {
            id: "delete-address"
        })
        if (!addressId) {
            toast.error("Someting went wrong", {
               id: "delete-address" 
            })
        }
      await deleteAddress(addressId)
        .then(data => {
          toast.success(data.success, {
            id: "delete-address"
          })
      })
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
          <AlertDialogAction onClick={handleDeleteAddress}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
