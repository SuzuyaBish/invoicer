"use server"

import DashBoardHeader from "@/components/dashboard/DashBoardHeader"
import DashboardRecentActivity from "@/components/dashboard/DashboardRecentActivity"
import DashboardRecentClientList from "@/components/dashboard/DashboardRecentClientList"
import DashboardStats from "@/components/dashboard/DashboardStats"

export default async function Account() {
  return (
    <main>
      <div className="relative isolate overflow-hidden ">
        <DashBoardHeader />
        <DashboardStats />
      </div>
      <div className="space-y-16 py-16 xl:space-y-20">
        <DashboardRecentActivity />
        <DashboardRecentClientList />
      </div>
    </main>
  )
}
