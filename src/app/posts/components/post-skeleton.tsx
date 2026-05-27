import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonAvatar } from "./skeleton-avatar"

export function PostSkeleton() {
  return (
    <Card className="w-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
      <CardHeader>
        <SkeletonAvatar/>
        <Skeleton className="h-4 w-40 mt-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  )
}
