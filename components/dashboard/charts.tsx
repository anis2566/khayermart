"use client"

import {useState} from "react"
import {WeeklySales} from "@/components/dashboard/weekly-sales"
import {WeeklyOrders} from "@/components/dashboard/weekly-orders"
import {cn} from "@/lib/utils"


export const Charts = () => {
  const [activeTab, setActiveTab] = useState<string>("sales")
    return (
        <div className="flex flex-col space-y-4 w-full min-h-[300px] rounded-lg border bg-card text-card-foreground shadow-sm p-3">
          <p className="text-xl font-bold">Weekly {activeTab}</p>
          <div className="flex items-center justify-center rounded-md bg-muted p-1">
              <div className={cn("rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all flex-1 cursor-pointer",activeTab === "sales" && "bg-background")} onClick={() => setActiveTab("sales")}>
                Sales
              </div>
              <div className={cn("rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all flex-1 cursor-pointer",activeTab === "orders" && "bg-background")} onClick={() => setActiveTab("orders")}>
                Orders
              </div>
          </div>
          {activeTab === "sales" && (
            <WeeklySales />
          )}
          {activeTab === "orders" && (
            <WeeklyOrders />
          )}
        </div>
    )
}