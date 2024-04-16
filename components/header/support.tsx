import { Headset } from "lucide-react";

export function Support() {
  return (
      <div className="flex items-center gap-x-4">
          <Headset className="h-8 w-8" />
          <div>
              <p className="tex-xl text-slate-600 font-semibold">01312-344006</p>
              <p className="text-sm text-muted-foreground">24/7 support</p>
          </div>
    </div>
  )
}
