import Link from "next/link";
import ClientItemFallback from "./ClientItemFallback";

export default function ClientBlockFallback() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-base font-semibold leading-7">
            Recent clients
          </h2>
          <Link
            href="#"
            className="text-primary hover:text-primary text-sm font-semibold leading-6"
          >
            View all<span className="sr-only">, clients</span>
          </Link>
        </div>
        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {Array(3)
            .fill(0)
            .map((idx) => (
              <ClientItemFallback key={idx} />
            ))}
        </ul>
      </div>
    </div>
  )
}
