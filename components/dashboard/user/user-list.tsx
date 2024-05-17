"use client"

import { EllipsisVertical, Trash2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
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
import { User } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "./header"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useRole } from "@/store/use-role"
import { ChangeRoleModal } from "@/components/modal/change-role"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { deleteUser } from "@/actions/user.action"
import { toast } from "sonner"

interface Props {
  users: User[]
}

export const UserList = ({ users }: Props) => {
  const [userId, setUserId] = useState<string>("")
  const { onOpen } = useRole() 
  
  const {mutate: deleteUserHandler} = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
        toast.success("Banner deleted", {
            id: "delete-user"
        });
    },
    onError: (error) => {
        toast.error(error.message, {
            id: "delete-user"
        });
    }
  })

  const handleDelete = (value: string) => {
    setUserId(value)
    if (!userId) {
        toast.error("Something went wrong");
    } else {
      toast.loading("User Deleting...", {
          id: "delete-user"
      });
      deleteUserHandler(userId)
  }
  }
  return (
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
      <CardContent>
        <Header />
        <Table>
          <TableCaption>A list of your users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {
                users.map((user) => (
                  <TableRow key={user.id}>
                      <TableCell>
                          <Avatar className="w-8 h-8">
                              <AvatarImage src={user.imageUrl || ""} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    <TableCell className="uppercase">
                      <Badge>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <EllipsisVertical className="h-4 w-4" />
                          </Button>
                          </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                              <Button variant="ghost" onClick={() => onOpen(user.id)}>Assign Role</Button>
                            <AlertDialog>
                            <AlertDialogTrigger className="flex gap-x-3 text-rose-500 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 select-none items-center rounded-sm px-2 py-1.5 text-sm w-full">
                              <Trash2 className="text-rose-500 w-4 h-4" />
                              Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will delete the customer permanantly.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)}>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      </TableCell>
                  </TableRow>
                ))
              }
          </TableBody>
        </Table>
      </CardContent>
      </Card>
    )
}