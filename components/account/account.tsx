import { ClerkLoaded, ClerkLoading, SignOutButton, SignedOut, SignedIn, SignInButton, currentUser  } from "@clerk/nextjs"
import {User, Loader, UserCog, MapPinned, Heart, LogOut} from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"


export const Account = async () => {
    const user = await currentUser()
    return (
        <div>
            <SignedOut>
              <ClerkLoading>
                <Loader className="w-5 h-5 animate-spin" />
              </ClerkLoading>
                <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                    <Button variant="outline" size="icon">
                        <User className="h-[1.2rem] w-[1.2rem] dark:text-white" />
                        <span className="sr-only">Open Login</span>
                    </Button>
                </SignInButton >
            </SignedOut>

            <SignedIn>
                <ClerkLoading>
                    <Loader className="w-5 h-5 animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={user?.imageUrl} />
                                <AvatarFallback>{user?.firstName?.slice(0,2)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link 
                                    href={{
                                    pathname: '/account',
                                    query: { active: 'dashboard' },
                                    }}
                                    className="flex items-center gap-x-2"
                                >
                                    <UserCog className="w-5 h-5" /> My Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/order-tracking" className="flex items-center gap-x-2">
                                    <MapPinned className="w-5 h-5" /> Order Tracking
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/wishlist" className="flex items-center gap-x-2">
                                    <Heart className="w-5 h-5" /> My Wishlist
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-0">
                                <SignOutButton>
                                    <Button variant="ghost" className="py-0 flex items-center gap-x-2 ">
                                        <LogOut className="w-5 h-5" /> Logout
                                    </Button>
                                </SignOutButton>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ClerkLoaded>
            </SignedIn>
        </div>
    )
}