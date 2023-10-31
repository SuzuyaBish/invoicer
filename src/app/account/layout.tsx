"use client"

import { useState } from "react"

import DesktopDrawer from "@/components/layout/DesktopDrawer"
import MobileDrawer from "@/components/layout/MobileDrawer"
import SearchBar from "@/components/layout/SearchBar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <MobileDrawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DesktopDrawer />

      <div className="lg:pl-72">
        <SearchBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
