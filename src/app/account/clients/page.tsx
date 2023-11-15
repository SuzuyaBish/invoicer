"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Client } from "@/lib/types"
import ClientList from "@/components/clients/ClientList"
import CreateClientButton from "@/components/clients/CreateClientButton"
import PageTitles from "@/components/PageTitles"

export default async function ClientsPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data } = await supabase.from("clients").select(`*, lastInvoice (*)`)
  const clients = data as Client[]
  return (
    <div className="relative pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <PageTitles title="Clients" />
        <div className="mt-3 flex md:absolute md:right-0 md:mt-0">
          <CreateClientButton />
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
        <ClientList clients={clients} />
      </ul>
    </div>
  )
}
