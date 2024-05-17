import Image from "next/image";
import Link from "next/link"

interface LogoProps {
    callbackUrl: string;
}

export const Logo = ({callbackUrl}:LogoProps) => {
    return (
        <Link href={callbackUrl || "/"} className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" width={40} height={40} />
            <span className="text-lg font-semibold hidden sm:flex">Padma <span className="text-primary italic">Shops</span></span>
        </Link>
    )
}