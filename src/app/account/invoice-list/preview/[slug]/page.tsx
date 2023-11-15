"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Invoice } from "@/lib/types"
import InvoiceActivityFeed from "@/components/invoice-preview/InvoiceActivityFeed"
import InvoicePreviewDetailsSection from "@/components/invoice-preview/InvoicePreviewDetailsSection"
import InvoicePreviewHeader from "@/components/invoice-preview/InvoicePreviewHeader"
import InvoicePreviewTable from "@/components/invoice-preview/InvoicePreviewTable"
import InvoiceSummaryCard from "@/components/invoice-preview/InvoiceSummaryCard"

export default async function InvoicePreview({
  params,
}: {
  params: { slug: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data } = await supabase
    .from("invoices")
    .select(`*, client (*)`)
    .eq("id", params.slug)
  const invoice = data ? (data[0] as Invoice) : null
  return (
    <main>
      <InvoicePreviewHeader info={invoice!} />
      <div className="mx-auto  px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <InvoiceSummaryCard {...invoice!} />
          <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <InvoicePreviewDetailsSection {...invoice!.information} />
            <InvoicePreviewTable invoice={invoice!} />
          </div>
          <InvoiceActivityFeed activity={invoice!.activity} id={invoice!.id} />
        </div>
      </div>
    </main>
  )
}
