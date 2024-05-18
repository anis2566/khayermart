
import { ProfileForm } from "@/components/seller/profile-form"
import { CardContent, Card, CardTitle, CardHeader } from "@/components/ui/card"
import { db } from "@/lib/db"
import { getUserId } from "@/service/user.service"
import Image from "next/image"
import { redirect } from "next/navigation"

const Profile = async () => {
    const userId = await getUserId()

    const user = await db.user.findUnique({
        where: {
            clerkId: userId
        }
    })

    if(!user) redirect("/")

    return (
        <div className="space-y-6 w-full max-w-3xl">
            <Card className="">
                <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
                    <Image
                        alt="Avatar"
                        className="rounded-full"
                        height="100"
                        src={user?.imageUrl || ""}
                        style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                        }}
                        width="100"
                    />
                <div className="grid gap-1 text-sm md:gap-2">
                        <div className="font-semibold text-xl">Hello, <span className="text-primary">{user.name}</span></div>
                        <div>{user.email}</div>
                </div>
                </CardContent>
            </Card>
            <ProfileForm user={user} />
        </div>
    )
}

export default Profile