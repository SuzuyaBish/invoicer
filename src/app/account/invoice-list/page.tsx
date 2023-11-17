import { Suspense } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Client } from "@/lib/types"
import InvoiceTableFallback from "@/components/fallbacks/InvoiceTableFallback"
import InvoiceListHeading from "@/components/layout/InvoiceListHeading"
import InvoiceTable from "@/components/invoice-table/InvoiceTable"

export default async function InvoiceList({
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data, error } = await supabase.from("clients").select("*")
  const clients = data as Client[]
  return (
    <Suspense key={2}>
      <InvoiceListHeading clients={clients} />
      <Suspense fallback={<InvoiceTableFallback />}>
        <InvoiceTable searchParams={searchParams} />
      </Suspense>
    </Suspense>
  )
}
