import { Suspense } from "react"

import InvoiceTableFallback from "@/components/fallbacks/InvoiceTableFallback"
import InvoiceTable from "@/components/InvoiceTable"
import InvoiceListHeading from "@/components/layout/InvoiceListHeading"

export default function InvoiceList() {
  return (
    <>
      <InvoiceListHeading />
      <Suspense fallback={<InvoiceTableFallback />}>
        <InvoiceTable />
      </Suspense>
    </>
  )
}
