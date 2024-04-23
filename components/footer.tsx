import { Headset, Mail, MapPin } from "lucide-react"
import { Logo } from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"

export const Footer = () => {
    return (
        <div className="px-4 space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-7">
                <div className="space-y-3">
                    <div>
                        <Logo callbackUrl="/" />
                        <p className="text-muted-foreground">An assistant on your shopping</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MapPin className="w-5 h-5 text-sky-500" />
                        <p><span className="font-bold">Address:</span> Armanitola, Bongshal, Dhaka</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Headset className="w-5 h-5 text-sky-500" />
                        <p><span className="font-bold">Call:</span> 01312-344660</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Mail className="w-5 h-5 text-sky-500" />
                        <p><span className="font-bold">Email:</span> khayermart@gmail.com</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-2xl font-bold">Company</p>
                    <Link href="/about" className="hover:ml-2 hover:underline transition-all duration-200">
                        About Us
                    </Link>
                    <Link href="/delivery-info" className="hover:ml-2 hover:underline transition-all duration-200">
                        Delivery Info
                    </Link>
                    <Link href="/contact" className="hover:ml-2 hover:underline transition-all duration-200">
                        Contact Us
                    </Link>
                    <Link href="/support" className="hover:ml-2 hover:underline transition-all duration-200">
                        Support
                    </Link>
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-2xl font-bold">Account</p>
                    <Link href="/cart" className="hover:ml-2 hover:underline transition-all duration-200">
                        View Cart
                    </Link>
                    <Link href="/wishlist" className="hover:ml-2 hover:underline transition-all duration-200">
                        My Wishlist
                    </Link>
                    <Link href="/track-order" className="hover:ml-2 hover:underline transition-all duration-200">
                       Track My Order
                    </Link>
                    <Link href="/support" className="hover:ml-2 hover:underline transition-all duration-200">
                        Support
                    </Link>
                </div>
            </div>
        </div>
    )
}