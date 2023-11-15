import { Skeleton } from "@/components/ui/skeleton"
import InvoiceTableFallback from "@/components/fallbacks/InvoiceTableFallback"

export default function Loading() {
  return (
    <div>
      <div className="relative border-b pb-5 sm:pb-0">
        <div className="md:flex md:items-center md:justify-between">
          <Skeleton className="h-10 w-32" />
          <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="ml-3 h-10 w-40" />
          </div>
        </div>
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>

            <Skeleton className="ml-3 h-10 w-40" />
          </div>
          <div className="hidden sm:block">
            <nav className="mb-5 flex space-x-8">
              {Array(5)
                .fill(0)
                .map((tab, index) => (
                  <Skeleton key={index} className="h-10 w-40" />
                ))}
            </nav>
          </div>
        </div>
      </div>
      <InvoiceTableFallback />
    </div>
  )
}
