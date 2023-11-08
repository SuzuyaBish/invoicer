"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Client } from "@/lib/types"

import ClientBlock from "../clients/ClientBlock"

export default async function DashboardRecentClientList() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data } = await supabase.from("clients").select(`*, lastInvoice (*)`)
  const clients = data as Client[]
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-base font-semibold leading-7">
            Recent clients
          </h2>
          <a
            href="#"
            className="text-primary hover:text-primary text-sm font-semibold leading-6"
          >
            View all<span className="sr-only">, clients</span>
          </a>
        </div>
        <ul
          role="list"
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {clients.map((client) => (
            <ClientBlock key={client.first_name} {...client} />
          ))}
        </ul>
      </div>
    </div>
  )
}
