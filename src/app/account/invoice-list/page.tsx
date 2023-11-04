import { Suspense } from "react"

import InvoiceTableFallback from "@/components/fallbacks/InvoiceTableFallback"
import InvoiceTable from "@/components/InvoiceTable"
import InvoiceListHeading from "@/components/layout/InvoiceListHeading"

export default function InvoiceList({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <InvoiceListHeading />
      <Suspense fallback={<InvoiceTableFallback />}>
        <InvoiceTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
