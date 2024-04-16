import { NavbarCategory } from "./navbar-category";
import { NavbarNav } from "./navbar-nav";
import { Support } from "./support";


export function Navbar() {
  return (
    <div className="hidden md:flex w-full max-w-screen-2xl mx-auto py-2 px-4 border-b border-gray-200 sticky top-0 left-0 z-40 bg-white">
      <div className="w-full flex items-center justify-between">
        <NavbarCategory />
        <NavbarNav />
        <Support />
      </div>
    </div>
  )
}
