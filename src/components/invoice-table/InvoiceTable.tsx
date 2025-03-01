import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Invoice } from "@/lib/types"

import InvoiceTableItems from "./InvoiceTableItems"
import { InvoiceListCheckColumn } from "./InvoiceCheckColumn"

export default async function InvoiceTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
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
                  <InvoiceListCheckColumn />
                  <th
                    scope="col"
                    className="bg-background/75 text-muted-foreground sticky top-16 z-10 border-b py-3.5 pl-4 pr-3 text-left text-sm font-semibold backdrop-blur sm:pl-6 lg:pl-8"
                  >
                    Invoice Number
                  </th>
                  <th
                    scope="col"
                    className="bg-background/75 text-muted-foreground sticky top-16 z-10 hidden border-b py-3.5 pl-2 pr-3 text-left text-sm font-semibold backdrop-blur sm:table-cell"
                  >
                    Invoiced Client
                  </th>
                  <th
                    scope="col"
                    className="bg-background/75 text-muted-foreground sticky top-16 z-10 hidden border-b py-3.5 pl-2 pr-3 text-left text-sm font-semibold backdrop-blur lg:table-cell"
                  >
                    Invoiced Date
                  </th>
                  <th
                    scope="col"
                    className="bg-background/75 text-muted-foreground sticky top-16 z-10 border-b py-3.5 pl-2 pr-3 text-left text-sm font-semibold backdrop-blur"
                  >
                    Invoice Status
                  </th>
                  <th
                    scope="col"
                    className="bg-background/75 text-muted-foreground sticky top-16 z-10 border-b py-3.5 pl-2 pr-3 text-left text-sm font-semibold backdrop-blur"
                  >
                    Invoiced Total
                  </th>
                  <th
                    scope="col"
                    className="bg-background/75 text-muted-foreground sticky top-16 z-10 border-b py-3.5 pl-4 pr-3 text-left text-sm font-semibold backdrop-blur sm:pl-6 lg:pl-8"
                  >
                    <span className="sr-only">Preview</span>
                  </th>
                </tr>
              </thead>
              <InvoiceTableItems items={items} searchParams={searchParams} />
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
