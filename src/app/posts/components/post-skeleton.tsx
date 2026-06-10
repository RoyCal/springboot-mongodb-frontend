import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonAvatar } from './skeleton-avatar';

export function PostSkeleton() {
    return (
        <div className="space-y-6 md:space-y-10">
            {[1, 2, 3].map((i) => (
                <Card
                    key={i}
                    className="w-full bg-linear-to-br from-slate-950 via-purple-950 to-slate-950"
                >
                    <CardHeader className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0">
                            <div className="flex space-x-3">
                                <SkeletonAvatar />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-3 md:h-4 w-32" />
                                    <Skeleton className="h-3 md:h-4 w-24" />
                                </div>
                            </div>
                            <Skeleton className="h-3 md:h-4 w-20" />
                        </div>
                        <Skeleton className="h-4 md:h-5 w-48 mt-3" />
                    </CardHeader>
                    <CardContent className="bg-black/30 py-4 md:py-5 rounded-3xl mx-4 md:mx-5">
                        <div className="space-y-2">
                            <Skeleton className="h-3 md:h-4 w-full" />
                            <Skeleton className="h-3 md:h-4 w-full" />
                            <Skeleton className="h-3 md:h-4 w-2/3" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
