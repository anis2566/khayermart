import { Navbar } from "@/components/seller/navbar"
import { Sidebar } from "@/components/seller/sidebar"

const HomeLayout = async ({children}:{children:React.ReactNode}) => {
    return (
        <main className="w-full flex">
            <Sidebar />
            <section className="flex-1 md:ml-[220px]">
            <Navbar />
            <div className="p-2 md:p-4">
                {children}
            </div>
            </section>
        </main>
    )
}

export default HomeLayout;