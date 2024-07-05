import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function GuestSkeleton() {
  return (
    <div className="mt-4 flex flex-col space-y-4">
      <Skeleton className="h-20 w-full rounded-md" />
      <Skeleton className="mt-4 h-10 w-32" />
      <Separator className="my-10" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-32 w-full rounded-md" />
    </div>
  )
}
