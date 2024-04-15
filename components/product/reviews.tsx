import {StarIcon} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Reviews = () => {
    return (
    <div className="px-4 md:px-6 mx-auto max-w-6xl grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-xl font-bold">Total Reviews (32)</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <div className="grid gap-0.5 text-sm">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <time className="text-sm text-gray-500 dark:text-gray-400">2 days ago</time>
                </div>
                <div className="flex items-center gap-0.5 ml-auto">
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been
                  a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some
                  healthier options.
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4 items-start">
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <div className="grid gap-0.5 text-sm">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <time className="text-sm text-gray-500 dark:text-gray-400">2 days ago</time>
                </div>
                <div className="flex items-center gap-0.5 ml-auto">
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been
                  a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some
                  healthier options.
                </p>
              </div>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </div>
    )
}