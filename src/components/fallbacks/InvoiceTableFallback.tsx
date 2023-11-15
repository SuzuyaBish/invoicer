import { classNames } from "@/constants/tailwind-constants"

import { Skeleton } from "../ui/skeleton"

export default function InvoiceTableFallback() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0 rounded-lg border">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-background text-muted-foreground sticky top-16 z-10 border-b bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold backdrop-blur sm:pl-6 lg:pl-8"
                  >
                    Invoice Number
                  </th>
                  <th
                    scope="col"
                    className="bg-background text-muted-foreground sticky top-16 z-10 border-b bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold backdrop-blur"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="bg-background text-muted-foreground sticky top-16 z-10 border-b bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold backdrop-blur"
                  >
                    Invoiced Date
                  </th>
                  <th
                    scope="col"
                    className="bg-background text-muted-foreground sticky top-16 z-10 border-b bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold backdrop-blur"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="bg-background text-muted-foreground sticky top-16 z-10 border-b bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold backdrop-blur sm:pl-6 lg:pl-8"
                  >
                    <span className="sr-only">Preview</span>
                  </th>
                  <th
                    scope="col"
                    className="bg-background text-muted-foreground sticky top-16 z-10 border-b bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold backdrop-blur sm:pl-6 lg:pl-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(1)
                  .fill(0)
                  .map((item, itemIdx) => (
                    <tr key={item.id}>
                      <td
                        className={classNames(
                          itemIdx !== 10 - 1 ? "border-b" : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6 lg:pl-8"
                        )}
                      >
                        <Skeleton className="h-5 w-full"></Skeleton>
                      </td>
                      <td
                        className={classNames(
                          itemIdx !== 10 - 1 ? "border-b" : "",
                          "whitespace-nowrap hidden px-3 py-4 text-sm text-foreground sm:table-cell"
                        )}
                      >
                        <Skeleton className="h-5 w-full"></Skeleton>
                      </td>
                      <td
                        className={classNames(
                          itemIdx !== 10 - 1 ? "border-b" : "",
                          "whitespace-nowrap hidden px-3 py-4 text-sm text-foreground lg:table-cell"
                        )}
                      >
                        <Skeleton className="h-5 w-full"></Skeleton>
                      </td>
                      <td
                        className={classNames(
                          itemIdx !== 10 - 1 ? "border-b" : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-foreground"
                        )}
                      >
                        <Skeleton className="h-5 w-full"></Skeleton>
                      </td>
                      <td
                        className={classNames(
                          itemIdx !== 10 - 1 ? "border-b" : "",
                          "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                        )}
                      >
                        <Skeleton className="h-5 w-full"></Skeleton>
                      </td>
                      <td
                        className={classNames(
                          itemIdx !== 10 - 1 ? "border-b" : "",
                          "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                        )}
                      >
                        <Skeleton className="h-5 w-full"></Skeleton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
