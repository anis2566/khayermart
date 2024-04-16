import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import onion from "@/assets/feature.png"

export function FeatureProducts() {
  return (
      <div className="px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div className="rounded-2xl relative border flex flex-col justify-center pl-10 bg-[#F0E8D5] aspect-video group"
               style={{ backgroundImage: `url(${onion.src})`, backgroundSize: '50%', backgroundPosition: 'right bottom', backgroundRepeat: "no-repeat" }}>
              <div className="space-y-3">
                  <p className="text-md md:text-xl font-bold text-slate-700 max-w-[200px] group-hover:-translate-y-3 transition-all duration-300 ease-in-out">
                      Everyday Fresh & Clean with Our Products
                  </p>
                  <Button className="bg-green-600 hover:bg-amber-400 group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                      Shop Now
                        <ArrowRight />
                  </Button>
              </div>
          </div>
          <div className="rounded-2xl relative border flex flex-col justify-center pl-10 bg-[#F4EAEA] aspect-video group"
               style={{ backgroundImage: `url(${onion.src})`, backgroundSize: '50%', backgroundPosition: 'right bottom', backgroundRepeat: "no-repeat" }}>
              <div className="space-y-3">
                  <p className="text-md md:text-xl font-bold text-slate-700 max-w-[200px] group-hover:-translate-y-3 transition-all duration-300 ease-in-out">
                      Everyday Fresh & Clean with Our Products
                  </p>
                  <Button className="bg-green-600 hover:bg-amber-400 group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                      Shop Now
                        <ArrowRight />
                  </Button>
              </div>
          </div>
          <div className="rounded-2xl relative border flex flex-col justify-center pl-10 bg-[#e7eaf3] aspect-video group"
               style={{ backgroundImage: `url(${onion.src})`, backgroundSize: '50%', backgroundPosition: 'right bottom', backgroundRepeat: "no-repeat" }}>
              <div className="space-y-3">
                  <p className="text-md md:text-xl font-bold text-slate-700 max-w-[200px] group-hover:-translate-y-3 transition-all duration-300 ease-in-out">
                      Everyday Fresh & Clean with Our Products
                  </p>
                  <Button className="bg-green-600 hover:bg-amber-400 group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                      Shop Now
                        <ArrowRight />
                  </Button>
              </div>
          </div>
    </div>
  )
}