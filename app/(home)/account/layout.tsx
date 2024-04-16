import { Sidebar } from "@/components/account/sidebar";


const AccountLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="w-full max-w-6xl mx-auto mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="w-full">
                    <Sidebar />
                </div>
                <div className="lg:col-span-2">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AccountLayout;