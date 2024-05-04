import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

function SkeletonComp({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("", className)}>
        <div className="w-full" />
    </Skeleton>
  );
}

export default SkeletonComp;