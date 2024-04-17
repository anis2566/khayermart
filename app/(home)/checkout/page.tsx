"use client"

import { useAuth } from '@clerk/clerk-react';
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import {useCart} from "@/store/user-cart"

const Checkout = () => {
    const { isSignedIn } = useAuth()
    const {cart} = useCart()
    
    if (!isSignedIn) redirect("/")

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
                <p>Shipping Address</p>
            </div>
            
        </div>
    )
}

export default Checkout