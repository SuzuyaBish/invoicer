"use server"

import { Suspense } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Client } from "@/lib/types"
import DashBoardHeader from "@/components/dashboard/DashBoardHeader"
import DashboardRecentActivity from "@/components/dashboard/DashboardRecentActivity"
import DashboardRecentClientList from "@/components/dashboard/DashboardRecentClientList"
import DashboardStats from "@/components/dashboard/DashboardStats"
import ClientBlockFallback from "@/components/fallbacks/ClientBlockFallback"

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data } = await supabase.from("clients").select(`*`)
  const clients = data as Client[]
  return (
    <main>
      <div className="relative isolate overflow-hidden ">
        <DashBoardHeader clients={clients} />
        <DashboardStats />
      </div>
      <div className="space-y-16 py-16 xl:space-y-20">
        <DashboardRecentActivity />
        <Suspense fallback={<ClientBlockFallback />}>
          <DashboardRecentClientList />
        </Suspense>
      </div>
    </main>
  )
}
