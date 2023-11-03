"use server"

import { cookies } from "next/headers"
import Link from "next/link"
import { classNames } from "@/constants/tailwind-constants"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Invoice } from "@/lib/types"

export default async function InvoiceTable() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data } = await supabase.from("invoices").select(`*, client (*)`)
  const items = data as Invoice[]

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
                {items.map((item, itemIdx) => (
                  <tr key={item.id}>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6 lg:pl-8"
                      )}
                    >
                      INV# {item.id}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-foreground sm:table-cell"
                      )}
                    >
                      {item.client.name}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-foreground lg:table-cell"
                      )}
                    >
                      {item.information.invoicedDate}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-foreground"
                      )}
                    >
                      {item.status}
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <Link
                        href={`/account/invoice-list/preview/${item.id}`}
                        className="text-primary"
                      >
                        Preview<span className="sr-only">, {item.id}</span>
                      </Link>
                    </td>
                    <td
                      className={classNames(
                        itemIdx !== items.length - 1 ? "border-b" : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <a href="#" className="text-primary">
                        Edit<span className="sr-only">, {item.id}</span>
                      </a>
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
