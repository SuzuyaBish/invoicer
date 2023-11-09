import { cookies } from "next/headers"
import Link from "next/link"
import { PaperClipIcon } from "@heroicons/react/20/solid"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Edit, ExternalLink } from "lucide-react"

import { Client } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default async function ClientView({
  params,
}: {
  params: { slug: string }
}) {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data } = await supabase
    .from("clients")
    .select("*, lastInvoice(id, information)")
    .eq("id", params.slug)
    .single()
  const client = data as Client
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between px-4 sm:px-0">
        <div>
          <h3 className="text-foreground text-base font-semibold leading-7">
            Client Information
          </h3>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm leading-6">
            Personal details and invoices.
          </p>
        </div>
        <Button variant="secondary" asChild>
          <Link href={`/account/clients/edit/${client.id}`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-6 border-t">
        <dl className="divide-border divide-y">
          <div className="bg-background px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Full name
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {client.first_name} {client.last_name}
            </dd>
          </div>
          <div className="bg-muted px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Email address
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              <Link href={`mailto:${client.email_address}`}>
                {client.email_address}
              </Link>
            </dd>
          </div>
          <div className="bg-background px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Total Invoiced Amount
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              $120,000
            </dd>
          </div>
          <div className="bg-muted px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Last Invoice
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              <Link
                href={`/account/invoice-list/preview/${client.lastInvoice.id}`}
                className="flex items-center"
              >
                {client.lastInvoice.information.title}
                <ExternalLink className="mb-0.5 ml-3 h-4 w-4" />
              </Link>
            </dd>
          </div>
          <div className="bg-background px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              About
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {client.about}
            </dd>
          </div>

          <div className="bg-muted px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-muted-foreground text-sm font-medium leading-6">
              Attachments
            </dt>
            <dd className="text-foreground mt-2 text-sm sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-border divide-y rounded-md border"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
