import { Logo } from "../logo"
import { Drawer } from "./drawer"
import { NavMenu } from "./nav-menu"

export const Navbar = () => {
    return (
        <div className="flex h-14 items-center justify-between md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 left-0 z-10">
            <Drawer />
            <div className="md:hidden">
                <Logo callbackUrl="/seller" />
            </div>
            <NavMenu />
        </div>
    )
}