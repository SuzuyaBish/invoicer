import { Suspense } from "react"

import InvoiceTableFallback from "@/components/fallbacks/InvoiceTableFallback"
import InvoiceTable from "@/components/InvoiceTable"
import InvoiceListHeading from "@/components/layout/InvoiceListHeading"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Client } from "@/lib/types"

export default async function InvoiceList({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({cookies: () => cookieStore})
  const {data, error} = await supabase.from("clients").select("*")
  const clients = data as Client[]
  return (
    <>
      <InvoiceListHeading clients={clients} />
      <Suspense fallback={<InvoiceTableFallback />}>
        <InvoiceTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
