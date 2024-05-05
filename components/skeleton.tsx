import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

function SkeletonComp({ className, childrens }: { className?: string, childrens: number }) {
  return (
    <div className="space-y-2">
      {
        [...Array(childrens)].map((_, i) => (
          <Skeleton className={cn("", className)} key={i}>
            <div className="w-full" />
          </Skeleton>
        ))
      }
    </div>
  );
}

export default SkeletonComp;