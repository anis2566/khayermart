import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Sidebar } from "@/components/account/sidebar";
import { CUSTOMER_SIDEBAR } from "@/constant";
import Link from "next/link";


const AccountLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="w-full mx-auto mt-7 space-y-6">
            <Tabs defaultValue="Dashboard" className="md:hidden w-full">
                <TabsList className="w-full">
                    {
                        CUSTOMER_SIDEBAR.map((item, i) => (
                            <TabsTrigger value={item.label} key={i} asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="hidden md:flex w-full">
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