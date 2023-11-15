import { Skeleton } from "@/components/ui/skeleton"
import ClientItemFallback from "@/components/fallbacks/ClientItemFallback"

export default function Loading() {
  return (
    <div className="relative pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <Skeleton className="h-10 w-32" />
        <div className="mt-3 flex md:absolute md:right-0 md:mt-0">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
      >
        {Array(1)
          .fill(0)
          .map((thing, idx) => {
            return <ClientItemFallback key={idx} />
          })}
      </ul>
    </div>
  )
}
