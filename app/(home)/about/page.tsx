import Image from "next/image"
import {SquarePercent, Truck, Flame, CheckIcon} from "lucide-react"

import {Card, CardContent} from "@/components/ui/card"

const About = () => {
    return (
        <div className="w-full p-4 mt-6 space-y-10">
          <div className="flex flex-col justify-center lg:flex-row gap-y-4 gap-x-3">
              <div className="grid space-y-4">
                <div className="space-y-2">
                  <h1 className="text-xl font-bold tracking-tighter sm:text-3xl">About our Company</h1>
                  <p className="max-w-[600px] text-muted-foreground text-base md:text-md">
                    We are on a mission to provide the best products and experiences to our customers. Our commitment to
                    quality, innovation, and customer satisfaction is at the heart of everything we do.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 items-start">
                    <p className="font-semibold">Founded</p>
                    <p>April 1, 2022</p>
                  </div>
                  <div className="grid grid-cols-2 items-start">
                    <p className="font-semibold">HQ</p>
                    <p>Chakbazar, Dhaka.</p>
                  </div>
                  <div className="grid grid-cols-2 items-start">
                    <p className="font-semibold">Phone</p>
                    <p>01969-764382</p>
                  </div>
                  <div className="grid grid-cols-2 items-start">
                    <p className="font-semibold">Email</p>
                    <p className="text-sm md:text-normal">padmacart23@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="grid items-center">
                <Image
                  alt="Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="320"
                  src="/about.png"
                  width="600"
                />
              </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl text-center font-bold tracking-tighter">What We Provide?</h1>
            <div className="grid gird-cols-1 md:grid-cols-3 gap-5 items-center justify-center">
              <Card className="group hover:shadow-xl">
                <CardContent className="pt-4 space-y-4">
                  <div className="flex justify-center items-center border border-sky-500 rounded-full w-full mx-auto w-[110px] h-[110px]">
                    <SquarePercent className="w-20 h-20 text-indigo-500 group-hover:rotate-45 ease-in-out duration-300" />
                  </div>
                  <p className="text-xl font-semibold text-center">Best Prices & Offers</p>
                  <p className="text-center">Discover amazing deals and unbeatable prices on a wide range of products. Our commitment to providing the best value ensures you get the most out of your shopping experience.</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-xl">
                <CardContent className="pt-4 space-y-4">
                  <div className="flex justify-center items-center border border-sky-500 rounded-full w-full mx-auto w-[110px] h-[110px]">
                    <Truck className="w-20 h-20 text-indigo-500 group-hover:rotate-45 ease-in-out duration-300" />
                  </div>
                  <p className="text-xl font-semibold text-center">Fast Delivery</p>
                  <p className="text-center">We pride ourselves on our fast and reliable delivery service, ensuring your orders reach you in no time. It takes day inside Dhaka and upto 2 days outside Dhaka.</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-xl">
                <CardContent className="pt-4 space-y-4">
                  <div className="flex justify-center items-center border border-sky-500 rounded-full w-full mx-auto w-[110px] h-[110px]">
                    <Flame className="w-20 h-20 text-indigo-500 group-hover:rotate-45 ease-in-out duration-300" />
                  </div>
                  <p className="text-xl font-semibold text-center">Great Daily Deal</p>
                  <p className="text-center">Get exclusive daily deals on a wide range of products. Our Great Daily Deal offers unbeatable prices and discounts, making your shopping experience even more rewarding.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Our Mission: Delivering Excellence</h2>
                <p className="max-w-2xl text-muted-foreground">
                  We are dedicated to providing our customers with the best products, services, and experiences. Our goal
                  is to exceed expectations and create lifelong relationships with our customers.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Our Values: Customer First</h2>
                <ul className="grid gap-2">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="inline-block h-4 w-4" />
                    Exceptional Service
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="inline-block h-4 w-4" />
                    Innovation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="inline-block h-4 w-4" />
                    Integrity
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="inline-block h-4 w-4" />
                    Community
                  </li>
                </ul>
            </div>
          </div>
        </div>
    )
}

export default About;