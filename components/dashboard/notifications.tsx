import {Bell, Trash2} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

export const Notifications = () => {
    return (
        <DropdownMenu> 
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <Button variant="outline" size="icon">
                        <Bell className="h-[1.2rem] w-[1.2rem] dark:text-white" />
                        <span className="sr-only">Open Notification</span>
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="space-y-1 p-2">
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-x-2 hover:bg-muted/60 p-2 rounded-md cursor-pointer"
                        >
                            <div className="flex items-center gap-x-3">
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                <p className="text-sm font-medium leading-none truncate">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                            </div>
                            <Button size="icon" variant="ghost">
                                <Trash2 className="h-5 w-5 text-rose-500" />
                            </Button>
                        </div>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}